"""
Unit tests for the functions in utils.py modules.

These tests verify the correctness of the following functions:
- utils.clean(): removes non-alphanumeric characters from a filename
- utils.to_valid_url_path(): converts a string into a valid URL path
- utils.to_valid_identifier(): converts a string into a valid Python identifier

Each function is tested with multiple test cases that cover different input scenarios.

Example usage:
$ python test_utils.py

"""

import unittest
from utils import to_valid_identifier, to_valid_url_path, clean



class TestClean(unittest.TestCase):

    def test_clean_with_only_alphanumeric_characters(self):
        result = clean("this_is_a_valid_filename_123")
        self.assertEqual(result, "this_is_a_valid_filename_123")

    def test_clean_with_non_alphanumeric_characters(self):
        result = clean("this is an invalid filename!@#$%^&*")
        self.assertEqual(result, "this_is_an_invalid_filename_")

    def test_clean_with_leading_digits(self):
        result = clean("123invalid_filename")
        self.assertEqual(result, "_123invalid_filename")

    def test_clean_with_trailing_whitespace(self):
        result = clean("invalid_filename     ")
        self.assertEqual(result, "invalid_filename_")

    def test_clean_with_empty_string(self):
        result = clean("")
        self.assertEqual(result, "")

    def test_clean_with_only_whitespace(self):
        result = clean("        ")
        self.assertEqual(result, "_")


class TestToValidURLPath(unittest.TestCase):

    def test_valid_url_path_with_no_special_characters(self):
        result = to_valid_url_path("this_is_a_valid_url_path_123")
        self.assertEqual(result, "this-is-a-valid-url-path-123")

    def test_valid_url_path_with_special_characters(self):
        result = to_valid_url_path("this is an invalid url path!@#$%^&*")
        self.assertEqual(result, "this-is-an-invalid-url-path--------")

    def test_valid_url_path_with_multiple_spaces(self):
        result = to_valid_url_path("this has    too many     spaces")
        self.assertEqual(result, "this-has-too-many-spaces")

    def test_valid_url_path_with_leading_and_trailing_spaces(self):
        result = to_valid_url_path("     invalid_url_path     ")
        self.assertEqual(result, "invalid-url-path")

    def test_valid_url_path_with_uppercase_letters(self):
        result = to_valid_url_path("ThisHasUppercaseLetters")
        self.assertEqual(result, "thishasuppercaseletters")

    def test_valid_url_path_with_empty_string(self):
        result = to_valid_url_path("")
        self.assertEqual(result, "")


class TestToValidIdentifier(unittest.TestCase):

    def test_spaces_replaced_by_underscore(self):
        result = to_valid_identifier("hello world")
        self.assertEqual(result, "hello_world")

    def test_special_characters_replaced_by_underscore(self):
        result = to_valid_identifier("hello-world!@#$%^&*()")
        self.assertEqual(result, "hello_world__________")

    def test_leading_digit_prepended_with_underscore(self):
        result = to_valid_identifier("1234hello")
        self.assertEqual(result, "_1234hello")

    def test_returns_valid_identifier(self):
        result = to_valid_identifier("hello_world_123")
        self.assertEqual(result, "hello_world_123")


if __name__ == '__main__':
    unittest.main()
