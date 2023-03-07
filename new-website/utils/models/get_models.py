"""
Python script to download all the model data csv files from the official Deepchem repo and extract the necessary data
"""
import os
import json
import dataclasses
from json import JSONEncoder
import subprocess
import pandas as pd
import numpy as np

PATH = '../deepchem/data/models/'
REDIRECT_URL = 'https://deepchem.readthedocs.io/en/latest/api_reference/models.html#'
CHEATSHEETS = {
    'general': 'https://raw.githubusercontent.com/deepchem/deepchem/master/docs/source/api_reference/general_purpose_models.csv',
    'material': 'https://raw.githubusercontent.com/deepchem/deepchem/master/docs/source/api_reference/material_models.csv',
    'molecule': 'https://raw.githubusercontent.com/deepchem/deepchem/master/docs/source/api_reference/molecular_models.csv'
}

model_list = []
backend_list = []
type_list = []
featurizer_list = []

@dataclasses.dataclass
class Model:
    """
    Model class to store a single model information

    Parameters
    ----------
    name: str
        Name of the model
    url: str
        redirect url to the model on the official deepchem documentation
    category: str
        Category of the model
    featurizers: list
        List of featurizers supported by the model
    backends: list
        List of backends supported by the model
    types: list
        List of types supported by the model
    model_id: int
        Unique id of the model
    """
    name: str
    url: str
    category: str
    featurizers: list
    backends: list
    types: list
    model_id: int

class ModelListEncoder(JSONEncoder):
    """
    ModelEncoder class to encode the Model object to JSON
    """
    def default(self, o):
        """
        Default function to encode the Model object to JSON

        Returns
        -------
            json: str
        """
        return o.__dict__

def convert_to_json(data, name, is_model=False):
    """
    Convert the list of data to JSON format and write to a file

    Parameters
    ----------
        data: list
        name: str
        is_model: bool
    """
    if is_model:
        data = json.dumps(data, indent=4, cls=ModelListEncoder)
    else:
        data = list({item for sublist in data for item in sublist})
        data = list(filter(None, data))
        data = json.dumps(data, indent=4)

    with open(PATH + name, 'w', encoding="utf-8") as file:
        file.write(data)

def fetch_data():
    """
    Function to fetch the model csv files and extract necessary data
    """
    for category in CHEATSHEETS.items():
        subprocess.call(f'curl -o {PATH}{category[0] + ".csv"} {category[1]}', shell=True)

    index = -1
    for filename in os.listdir(PATH):
        for idx, row in pd.read_csv(PATH + filename, on_bad_lines='skip').replace(np.nan, '').iterrows():
            name = row['Model']
            url = REDIRECT_URL + name.lower()
            category = filename.split('.')[0]
            featurizers = row['Acceptable Featurizers'].split(' ') if row['Acceptable Featurizers'] != '' else []
            backends = ['PyTorch' if item in {"PTorch", "Torch", "PyTorch "} else item for item in row['Backend'].split('/')]
            types = row['Type'] if filename != 'general.csv' else row['Classifier/Regressor']
            types = types.split('/') if filename == 'material.csv' else types.split('/ ')
            index += 1

            backend_list.append(backends)
            type_list.append(types)
            featurizer_list.append(featurizers)
            model_list.append(Model(name, url, category, featurizers, backends, types, index))

def main():
    """
    Main function to execute the script
    """
    os.makedirs(PATH)
    fetch_data()
    convert_to_json(model_list, 'models.json', is_model=True)
    convert_to_json(backend_list, 'backends.json')
    convert_to_json(type_list, 'types.json')
    convert_to_json(featurizer_list, 'featurizers.json')

if __name__ == '__main__':
    main()
