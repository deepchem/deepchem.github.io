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
import re
import requests
from bs4 import BeautifulSoup
from utils import clean


def fetch_file_list_from_repo(path_to_directory):
    """
    Fetches the names of all the files from a given directory in a Github repository.

    Parameters
    ----------
    path_to_directory: str
        The URL of the directory in the Github repository.

    Returns
    -------
    files: list
        A list of strings, where each string represents the name of a file present in the directory.
    """
    files = []
    response = requests.get(path_to_directory)
    soup = BeautifulSoup(response.content, 'html.parser')

    fileNames = soup.find_all(
        'a', attrs={'class': 'js-navigation-open Link--primary'})
    for fileName in fileNames:
        fileName = fileName.text
        files.append(fileName)

    return files


def fetch_tutorial_data():
    """
    Fetches the names of all the tutorials from the given Github URL.

    Returns
    -------
    tutorials: list
        A list of strings, where each string represents the name of a tutorial.
    """
    tutorials_url = 'https://github.com/deepchem/deepchem/tree/master/examples/tutorials'
    tutorials = fetch_file_list_from_repo(tutorials_url)

    # Filter only the ipynb files
    tutorials = [
        tutorial for tutorial in tutorials if tutorial.endswith('.ipynb')]
    return tutorials

def fetch_tutorial_render_order():
    """
    Downloads the CSV files containing the tutorial order from the Deepchem repository.
    """

    raw_path = 'https://raw.githubusercontent.com/deepchem/deepchem/master/examples/tutorials/website-render-order/'
    csv_directory = 'https://github.com/deepchem/deepchem/tree/master/examples/tutorials/website-render-order'
    tutorial_order = fetch_file_list_from_repo(csv_directory)

    # Filter only the csv files
    tutorial_order = [
        tutorial for tutorial in tutorial_order if tutorial.endswith('.csv')]

    for tutorial_group in tutorial_order:
        response = requests.get(raw_path + tutorial_group)
        with open(f"./website-render-order/{tutorial_group}", "wb") as tutorial_file:
            tutorial_file.write(response.content)


def create_directories():
    """
    Creates the required directories   
    """
    os.makedirs('./html-notebooks',exist_ok=True)
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
    tutorials = fetch_tutorial_data()
    create_directories()
    convert_to_html(tutorials)
    fetch_tutorial_render_order()
