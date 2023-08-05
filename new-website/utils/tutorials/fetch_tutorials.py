"""
This script is used to fetch the tutorials from the Deepchem github repository

Example Usage:
    - Run this script using "python script_name.py".
    - The output .ipynb and corresponding .html notebooks data will be generated in the "./ipynb-notebooks" and
      "./html-notebooks" directories

NOTE: NO FILES OR DIRECTORIES HAVE TO BE CREATED MANUALLY. The script will create the required directories and files

"""
import os
import shutil
import subprocess
import requests
from utils import clean

DEEPCHEM_REPO_OWNER = "deepchem"
DEEPCHEM_REPO_NAME = "deepchem"
TUTORIALS_PATH = "examples/tutorials"
TUTORIAL_RENDER_ORDER_PATH = "examples/tutorials/website-render-order"


def fetch_file_list_from_repo(repo_owner, repo_name, path):
    """
    Fetches the names of all the files in the given path from the given Github repository.

    Parameters
    ----------
    repo_owner: str
        The owner of the Github repository.
    repo_name: str
        The name of the Github repository.
    path: str
        The path in the Github repository from which the file names are to be fetched.

    Returns
    -------
    file_names: list
        A list of strings, where each string represents the name of a file.

    Raises
    ------
    Exception
        If the response status code is not 200.
    """
    url = "https://api.github.com/repos/{}/{}/contents/{}".format(
        repo_owner, repo_name, path)
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return [file["name"] for file in data]
    else:
        raise Exception(
            "Error fetching file names: {}".format(response.status_code))


def get_tutorial_list():
    """
    Fetches the names of all the tutorials from the Deepchem Github repository.
    Returns
    -------
    tutorials: list
        A list of strings, where each string represents the name of a tutorial.
    """
    tutorials = fetch_file_list_from_repo(
        DEEPCHEM_REPO_OWNER, DEEPCHEM_REPO_NAME, TUTORIALS_PATH)

    # Filter only the ipynb files
    tutorials = [
        tutorial for tutorial in tutorials if tutorial.endswith('.ipynb')]
    return tutorials


def fetch_tutorial_render_order():
    """
    Downloads the CSV files containing the tutorial order from the Deepchem repository.
    """

    raw_path = 'https://raw.githubusercontent.com/deepchem/deepchem/master/examples/tutorials/website-render-order/'
    tutorial_order = fetch_file_list_from_repo(
        DEEPCHEM_REPO_OWNER, DEEPCHEM_REPO_NAME, TUTORIAL_RENDER_ORDER_PATH)

    # Filter only the csv files
    tutorial_order = [
        tutorial for tutorial in tutorial_order if tutorial.endswith('.csv')]

    for tutorial_group in tutorial_order:
        response = requests.get(raw_path + tutorial_group)
        if response.status_code == 200:
            with open(f"./website-render-order/{tutorial_group}", "wb") as tutorial_file:
                tutorial_file.write(response.content)
        else:
            raise Exception(
                "Error fetching tutorial render order: {}".format(response.status_code))


def create_directories():
    """
    Creates the required directories   
    """
    os.makedirs('./html-notebooks', exist_ok=True)
    os.makedirs('./ipynb-notebooks', exist_ok=True)
    os.makedirs('./website-render-order', exist_ok=True)


def convert_to_html(tutorials):
    """
    Converts the Jupyter notebooks in the './ipynb-notebooks' directory to HTML files and stores them in the './html-notebooks' directory.

    Parameters
    ----------
    tutorials: list
        A list of strings, where each string represents the name of a tutorial.
    """
    fromPath = "./ipynb-notebooks/"
    toPath = "./html-notebooks/"

    tutorialURL = 'https://raw.githubusercontent.com/deepchem/deepchem/master/examples/tutorials/'

    for tutorial in tutorials:
        try:
            file_name_html = f'{tutorial.rsplit(".")[0]}.html'
            response = requests.get(tutorialURL + tutorial)
            with open(f"./ipynb-notebooks/{tutorial}", "wb") as tutorial_file:
                tutorial_file.write(response.content)

            subprocess.call(
                f'jq -M "del(.metadata.widgets)" ./ipynb-notebooks/{tutorial} > ./ipynb-notebooks/fixed-{tutorial}', shell=True)
            subprocess.call(
                f'python -m nbconvert --to html ./ipynb-notebooks/fixed-{tutorial}', shell=True)
            shutil.copyfile(f'{fromPath}fixed-{file_name_html}',
                            toPath + file_name_html)

            with open('./notebooks.txt', "a") as notebook_list:
                notebook_list.write(file_name_html + '\n')
        except Exception as exception:
            print(exception)
            print(f"Could not process {tutorial}")


if __name__ == "__main__":
    create_directories()
    tutorials = get_tutorial_list()

# The script throws an AssertionError if no tutorials are fetched. This is to prevent website deployment if no tutorials are fetched.
    assert len(tutorials) > 0

    fetch_tutorial_render_order()
    convert_to_html(tutorials)
