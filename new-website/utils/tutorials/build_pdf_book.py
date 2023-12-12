"""
This script is used to build the pdf book from DeepChem Tutorials.

Requirements:
    - pdfunite
    - pdfkit

Example Usage:
    - Run the script "fetch_tutorials.py" // It will fetch all the tutorials.
    - Run the script "build_pdf_book.py"
    - It may cause error, mostly due to the type of graphic used in some tutorials
    which donot compile properly, remove them from the website-render-order or fix
    them, and run this script again.
    
NOTE:
    - NO FILES OR DIRECTORIES HAVE TO BE CREATED MANUALLY. The script will create the required directories and files.
    - Run scripts in the Top-Level folder.

"""
import os
import pandas as pd
import pdfkit
from utils import numeric_sorter


INFO_PATH = "/workspaces/deepchem.github.io/new-website/utils/tutorials/website-render-order/"
DATA_PATH = "/workspaces/deepchem.github.io/new-website/utils/tutorials/html-notebooks/"
PDF_PATH = "/workspaces/deepchem.github.io/new-website/utils/tutorials/storage/"

files = os.listdir(INFO_PATH)
files = sorted(files)

files_list = numeric_sorter(files)

def html_to_pdf():
    """
    Converts HTML files to PDF files.

    Raises
    ------
    ProtocolUnknownError
        If it faces some unknown kind of graphic.

    """
    for i in files_list:
        chapter = pd.read_csv(INFO_PATH + "-".join(i))
        for j in chapter["File Name"]:
            print(i, j)
            pdfkit.from_file(DATA_PATH + j[:-5] + "html", PDF_PATH + j[:-5] + "pdf")

def merge_pdf():
    """Merges the compiled PDFs."""
    command = "pdfunite "
    for i in files_list:
        chapter = pd.read_csv(INFO_PATH + "-".join(i))
        for j in chapter["File Name"]:
            print(i, j)
            command = command + PDF_PATH + j[:-5] + "pdf "
    os.system(command + "merged.pdf")


if __name__ == "__main__":
    os.system("mkdir " + PDF_PATH)
    html_to_pdf()
    merge_pdf()