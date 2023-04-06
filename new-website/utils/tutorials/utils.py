"""
Contains various utility functions for the tutorial scripts

Requirements
------------
    re
"""
import re


def to_valid_identifier(s):
    """
    Converts a given string into a valid identifier.

    Parameters
    ----------
    s: str
        The string to be converted into a valid identifier.

    Returns
    -------
    valid_identifier: str
        The converted valid identifier.
    """
    valid_identifier = s.replace(" ", "_")
    valid_identifier = re.sub(r'[^0-9a-zA-Z_]', '_', valid_identifier)
    if valid_identifier[0].isdigit():
        valid_identifier = "_" + valid_identifier
    return valid_identifier


def to_valid_url_path(s):
    """
    Converts a given string into a valid URL path.

    Parameters
    ----------
    s: str
        The string to be converted into a valid URL path.

    Returns
    -------
    valid_url: str
        The converted valid URL path.
    """
    valid_url = s.strip()
    valid_url = re.sub(r"[^\w\s]", "-", valid_url)
    valid_url = re.sub(r'[ _]+', '-', valid_url)
    valid_url = valid_url.lower()
    return valid_url


def clean(invalid_filename):
    """
    Removes non-alphanumeric characters and replaces them with an underscore from the given string.

    Parameters
    ----------
    invalid_filename: str
        String that needs to be cleaned.

    Returns
    -------
    cleaned_string: str
        The cleaned string with every non-alphanumeric character replaced with an underscore
    """

    cleaned_string = re.sub(r'\W+|^(?=\d)', '_', invalid_filename)
    return cleaned_string
