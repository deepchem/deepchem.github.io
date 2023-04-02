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


def fetch_tutorial_data():
    """
    Fetches the names of all the tutorials from the given Github URL.

    Returns
    -------
    tutorials: list
        A list of strings, where each string represents the name of a tutorial.
    """
    tutorials = []
    tutorials_url = 'https://github.com/deepchem/deepchem/tree/master/examples/tutorials'
    response = requests.get(tutorials_url)
    soup = BeautifulSoup(response.content, 'html.parser')

    fileNames = soup.find_all(
        'a', attrs={'class': 'js-navigation-open Link--primary'})
    for fileName in fileNames:
        fileName = fileName.text
        if(fileName != '.gitignore' and fileName != 'assets'):
            tutorials.append(fileName)

    return tutorials


def create_directories():
    """
    Creates two directories to store the jupyter notebooks and the converted HTML notebooks.   
    """
    try:
        os.makedirs('./html-notebooks')
        os.makedirs('./ipynb-notebooks')

    except Exception as exception:
        print("Directories already exist, or could not create directories. ")
        print(exception)


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
