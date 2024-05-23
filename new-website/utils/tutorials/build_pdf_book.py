"""
This script is used to build the pdf book from DeepChem Tutorials.

Requirements:
    - pdfunite
    - pdfkit
    - mdpdf
    - boto3

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
import signal
import logging
import boto3
from botocore.exceptions import ClientError

INFO_PATH = "website-render-order/"
DATA_PATH = "html-notebooks/"
PDF_PATH = "storage/"


def timeout_handler(signum, frame):
    """
    For terminating a function call.

    Raises
    ------
    Exception
        If the function is called.

    """
    raise Exception("Coversion Timed out")
    

def html_to_pdf(data_path=DATA_PATH, info_path=INFO_PATH, pdf_path=PDF_PATH):
    """
    Converts HTML files to PDF files.

    Parameters
    ----------
    data_path: str
        Path of the html files to be converted. Defaults to DATA_PATH.
    info_path: str
        Path for Tutorial Render Order. Defaults to INFO_PATH.
    pdf_path: str
        Path where the converted pdf files will be stored. Defaults to PDF_PATH.

    Raises
    ------
    ProtocolUnknownError
        If it faces some unknown kind of graphic.
    IOError
        If the file specified in the website-render-order is not present in /html-notebooks.
    Exception
        If the Conversion takes longer than 60 seconds.

    """
    files = os.listdir(info_path)
    files = sorted(files)
    files_list = numeric_sorter(files)

    for i in files_list:
        chapter = pd.read_csv(info_path + "-".join(i))
        for j in chapter["File Name"]:
            signal.signal(signal.SIGALRM, timeout_handler)
            signal.alarm(60)
            try:
                print(i, j)
                pdfkit.from_file(data_path + j.strip()[:-5] + "html", pdf_path + j.strip()[:-5] + "pdf")
                print("Conversion Successful")
            except Exception as e:
                print("Exception occured: {}".format(e))   


def upload_file(file_name, bucket, object_name=None):
    """
    Upload a file to an S3 bucket

    Parameters
    ----------
    file_name: str 
        Path of the File to be uploaded.
    bucket: str
        Name of the Bucket to upload the file to.
    object_name: str
        S3 object name. If not specified then file_name is used.

    Returns
    -------
    boolean: 
        True if file was uploaded, else False

    """
    s3_client = boto3.client('s3')
    try:
        response = s3_client.head_object(Bucket=bucket, Key=object_name)
    except ClientError as e:
        logging.error(e)
    else:
        last_modified_datetime = response['LastModified']
        format = '%Y-%m-%d_%H:%M:%S'
        formatted_time = last_modified_datetime.strftime(format)
        old_key = object_name
        new_key = f'{object_name[:-4]}_{formatted_time}.pdf'
        
        s3_client.copy_object(
            Bucket=bucket,
            CopySource={'Bucket': bucket, 'Key': old_key},
            Key=new_key
        )

        s3_client.delete_object(
            Bucket=bucket,
            Key=old_key
        )

    if object_name is None:
        object_name = os.path.basename(file_name)
    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True 
    

def merge_pdf(info_path=INFO_PATH, pdf_path=PDF_PATH):
    """
    Merges the compiled PDFs.
    
    Parameters
    ----------
    info_path: str
        Path for Tutorial Render Order. Defaults to INFO_PATH.
    pdf_path: str
        Path where the merged pdf file will be stored. Defaults to PDF_PATH.

    """
    files = os.listdir(info_path)
    files = sorted(files)

    files_list = numeric_sorter(files)

    command = "pdfunite "
    for i in files_list:
        print(i)
        chapter = pd.read_csv(info_path + "-".join(i))
        for j in chapter["File Name"]:
            file_path = pdf_path + j[:-5] + "pdf"
            if (os.path.exists(file_path)):
                print(i, j)
                command = command + pdf_path + j[:-5] + "pdf "
    os.system(command + f"{pdf_path}merged.pdf")


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
    os.system(command + "storage/full_pdf.pdf")


def compile_information_pages():
    """Converts the Acknowledgent page and content page from
    Html to pdf, then they can be merged with the content
    pdf using `merge_pdf_pages` function.

    """
    pdfkit.from_file('title.html', 'storage/title.pdf')
    pdfkit.from_file('contents.html', 'storage/contents.pdf')
    pdfkit.from_file('acknowledgement.html', 'storage/acknowledgement.pdf')


if __name__ == "__main__":
    os.system("mkdir " + PDF_PATH)
    html_to_pdf()
    merge_pdf()
    compile_information_pages()
    merge_pdf_pages(['cover.pdf', 'storage/title.pdf', 'storage/acknowledgement.pdf', 'storage/contents.pdf', 'storage/merged.pdf'])
    upload_file('storage/full_pdf.pdf', 'deepchemdata', 'book/TutorialsBook.pdf')
    