"""
Unit tests for the functions in build_pdf_book.py modules.

These tests verify the correctness of the following functions:
- build_pdf_book.html_to_pdf(): Converts HTML files to PDF files.
- build_pdf_book.merge_pdf(): Merges a list of PDF files into a single PDF file

Example usage:
$ python test_build_pdf_book.py

"""

import unittest
from unittest.mock import patch
import build_pdf_book
import os
import json


class TestConvertHTMLToPDF(unittest.TestCase):
    """
    Test cases for the html_to_pdf function.
    """

    def test_convert_html_to_pdf(self):
        """
        This function tests whether the html_to_pdf function correctly converts 
        HTML files to PDF files and saves them in the appropriate directory.
        
        """
        INFO_PATH = "mocks/mock_website_render_order/"
        DATA_PATH = "mocks/mock_html-notebooks/"   
        PDF_PATH = "mocks/mock_temp_storage/"

        with open('./mocks/github-response-mock.json', 'rb') as f:
            tutorials = json.load(f)

        try:
            os.makedirs('mocks/mock_temp_storage/')

        except Exception as exception:
            print("Directory already exist, or could not create directory. ")
            print(exception)

        build_pdf_book.html_to_pdf(DATA_PATH, INFO_PATH, PDF_PATH)

        for tutorial in tutorials:
            tutorial_file_name = tutorial["name"]
            file_name_pdf = f'{tutorial_file_name.rsplit(".")[0]}.pdf'
            self.assertTrue(os.path.isfile(
                f"mocks/mock_temp_storage/{file_name_pdf}"))
            os.remove(f"mocks/mock_temp_storage/{file_name_pdf}")
        
        os.rmdir("mocks/mock_temp_storage")
            

class TestMergePDF(unittest.TestCase):
    """
    Test cases for the merge_pdf function.
    """

    def test_convert_html_to_pdf(self):
        """
        This function tests whether the merge_pdf function correctly merges
        a list of PDF files into a single PDF file and saves it in the specified directory.

        """

        INFO_PATH = "mocks/mock_website_render_order/"  
        PDF_PATH = "mocks/mock_storage/"

        build_pdf_book.merge_pdf(INFO_PATH, PDF_PATH)

        self.assertTrue(os.path.isfile(
            f"{PDF_PATH}merged.pdf"))
        os.remove(f"{PDF_PATH}merged.pdf")


if __name__ == "__main__":
    unittest.main()
    