"""
This script is used to build the pdf book from DeepChem Tutorials.

Requirements:
    - pdfunite
    - pdfkit
    - mdpdf

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
from typing import List


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

def merge_pdf_pages(a: List[str]):
    """Merges the PDFs.
    Usage include adding title page, ending, etc.

    Parameters
    ----------
    a: List[str]
        List of addresses of pdf to merge. In correct order.

    """
    command = "pdfunite "
    for i in a:
        command = command + i + ' '
    os.system(command + "storage/merged.pdf")

def compile_information_pages():
    """Converts the Acknowledgent page and content page from
    Markdowns to pdf, then they can be merged with the content
    pdf using `merge_pdf_pages` function.

    """
    os.system('mdpdf -o storage/acknowledgement.pdf acknowledgement.md')
    os.system('mdpdf -o storage/contents.pdf contents.md')

if __name__ == "__main__":
    os.system("mkdir " + PDF_PATH)
    html_to_pdf()
    merge_pdf()
    compile_information_pages()
    merge_pdf_pages(['storage/title.pdf', 'storage/acknowledgement.pdf', 'storage/contents.pdf', 'storage/full_pdf.pdf'])
