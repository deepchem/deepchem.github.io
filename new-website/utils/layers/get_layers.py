"""
Python script to download all the layer data csv files from the official Deepchem repo and extract the necessary data
"""
import os
import json
import dataclasses
from json import JSONEncoder
import subprocess
import pandas as pd
import numpy as np

PATH = '../../deepchem/data/layers/'
REDIRECT_URL = 'https://deepchem.readthedocs.io/en/latest/api_reference/layers.html#'
CHEATSHEETS = {
    'keras': 'https://raw.githubusercontent.com/deepchem/deepchem/master/docs/source/api_reference/keras_layers.csv',
    'torch': 'https://raw.githubusercontent.com/deepchem/deepchem/master/docs/source/api_reference/torch_layers.csv'
}

layer_list = []

@dataclasses.dataclass
class Layer:
    """
    Layer class to store a single layer information

    Parameters
    ----------
    name: str
        Name of the layer
    url: str
        redirect url to the layer on the official deepchem documentation
    category: str
        Category of the layer
    layer_id: int
        Unique id of the layer
    """
    name: str
    url: str
    category: str 
    models : list
    layer_id: int
    
class LayerListEncoder(JSONEncoder):
    """
    LayerEncoder class to encode the Layer object to JSON
    """
    def default(self, o):
        """
        Default function to encode the Layer object to JSON

        Returns
        -------
        json: str
        """
        return o.__dict__

def convert_to_json(data, name, is_layer=False):
    """
    Convert the list of data to JSON format and write to a file

    Parameters
    ----------
    data: list
        The list of data to be converted to JSON
    name: str
        The name of the file to be written
    is_layer: bool
        Flag to check if the data is a list of Layer objects, different encoding is required for Layer objects
    """
    if is_layer:
        data = json.dumps(data, indent=4, cls=LayerListEncoder)
    else:
        data = list({item for sublist in data for item in sublist})
        data = list(filter(None, data))
        data = json.dumps(data, indent=4)

    with open(PATH + name, 'w', encoding="utf-8") as file:
        file.write(data)

def fetch_data():
    """
    Function to fetch the layer csv files and extract necessary data
    """
    for category in CHEATSHEETS.items():
        subprocess.call(f'curl -o {PATH}{category[0] + ".csv"} {category[1]}', shell=True)

    index = -1
    for filename in os.listdir(PATH):
        for row in pd.read_csv(PATH + filename, on_bad_lines='skip').replace(np.nan, '').iterrows():
            name = row[1]['Layer']
            url = REDIRECT_URL + name.lower()
            category = filename.split('.')[0]
            models = row['Model'].split(' ') if row['Model'] != '' else []
            index += 1

            model_list.append(models) 
            layer_list.append(Layer(name, url, category, models, index))
            

def main():
    """
    Main function to execute the script
    """
    os.makedirs(PATH)
    fetch_data()
    convert_to_json(layer_list, 'layers.json', is_layer=True)
    convert_to_json(model_list, 'models.json')

if __name__ == '__main__':
    main()

