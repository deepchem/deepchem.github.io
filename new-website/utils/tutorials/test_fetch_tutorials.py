"""
Unit tests for the functions in fetch_tutorials.py modules.

These tests verify the correctness of the following functions:
- fetch_tutorials.fetch_tutorial_data(): fetches tutorial data from the DeepChem GitHub repository
- fetch_tutorials.convert_to_html(): converts a list of Jupyter notebooks to HTML files

Example usage:
$ python test_fetch_tutorials.py

"""

import unittest
from unittest.mock import patch
from requests import Response
import fetch_tutorials
import os


class TestConvertToHTML(unittest.TestCase):

    def test_convert_to_html(self):
        tutorials = ['About_nODE_Using_Torchdiffeq_in_Deepchem.ipynb',
                     'Advanced_model_training_using_hyperopt.ipynb']

        fetch_tutorials.convert_to_html(tutorials)

        for tutorial in tutorials:
            file_name_html = f'{tutorial.rsplit(".")[0]}.html'
            self.assertTrue(os.path.isfile(
                f"./html-notebooks/{file_name_html}"))

        with open('./notebooks.txt', "r") as notebook_list:
            content = notebook_list.read()
            for tutorial in tutorials:
                file_name_html = f'{tutorial.rsplit(".")[0]}.html'
                self.assertIn(file_name_html, content)


class TestFetchTutorialData(unittest.TestCase):

    @patch('requests.get')
    def test_fetch_tutorial_data(self, mock_get):

        mock_response = Response()
        mock_response.status_code = 200
        with open('./test-mock-data/github-response-mock.html', 'rb') as f:
            mock_response._content = f.read()
        mock_get.return_value = mock_response

        tutorials = fetch_tutorials.fetch_tutorial_data()

        expected_tutorials = [
            'About_nODE_Using_Torchdiffeq_in_Deepchem.ipynb',
            'Advanced_Model_Training.ipynb',
            'Advanced_model_training_using_hyperopt.ipynb',
            'An_Introduction_To_MoleculeNet.ipynb',
            'Atomic_Contributions_for_Molecules.ipynb',
            'Conditional_Generative_Adversarial_Networks.ipynb'
        ]

        self.assertEqual(tutorials, expected_tutorials)
        self.assertEqual(mock_response.status_code, 200)


if __name__ == '__main__':
    unittest.main()
