"""
Python script to scrape the all the models information from the official deepchem documentation
"""

import os
import json
import dataclasses
from json import JSONEncoder
from bs4 import BeautifulSoup
import requests

DOC_URL = 'https://deepchem.readthedocs.io/en/latest/api_reference/models.html#model-cheatsheet'
REDIRECT_URL = 'https://deepchem.readthedocs.io/en/latest/api_reference/models.html#'
TABLES = {
    'id81': 'General',
    'id82': 'Molecule',
    'id83': 'Material'
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

def convert_to_json(data, is_model=False):
    """
    Convert the list of data to JSON

    Parameters
    ----------
        data: list
        is_model: bool

    Returns
    -------
        json: object
    """
    if is_model:
        return json.dumps(data, indent=4, cls=ModelListEncoder)
    data = list({item for sublist in data for item in sublist})
    data = list(filter(None, data))
    return json.dumps(data, indent=4)

def scraper():
    """
    Scraper function to scrape the models information from the official deepchem documentation
    """
    req = requests.get(DOC_URL, timeout=10)
    soup = BeautifulSoup(req.content, 'html.parser')
    index = 0

    for table_id in TABLES:
        table = soup.find('table', attrs = {'id': table_id})
        table_rows = table.find_all('tr')

        for table_row in table_rows:
            table_cols = table_row.find_all('td')
            table_cols = [ele.text.strip() for ele in table_cols]

            if len(table_cols) != 0:
                name = table_cols[0]
                url = REDIRECT_URL + name.lower()
                category = TABLES[table_id]
                featurizers = table_cols[3].split(' ') if table_cols[3] != '' else []
                backends = table_cols[4].split('/')
                backends = ['PyTorch' if item in {"PTorch", "Torch"} else item for item in backends]
                types = table_cols[2].split('/ ') if table_cols[2] != '' else []

                # handling an oulier case in tab, uneven whitespace
                if table_id == 'id83':
                    types = table_cols[2].split('/')

                index += 1

                backend_list.append(backends)
                type_list.append(types)
                featurizer_list.append(featurizers)
                model_list.append(Model(name, url, category, featurizers, backends, types, index))

def main():
    """
    Main function to execute the scraper
    """
    scraper()
    os.makedirs('../../deepchem/data/models')

    with open('../../deepchem/data/models/models.json', 'w', encoding="utf-8") as file:
        file.write(convert_to_json(model_list, is_model=True))

    with open('../../deepchem/data/models/backends.json', 'w', encoding="utf-8") as file:
        file.write(convert_to_json(backend_list))

    with open('../../deepchem/data/models/types.json', 'w', encoding="utf-8") as file:
        file.write(convert_to_json(type_list))

    with open('../../deepchem/data/models/featurizers.json', 'w', encoding="utf-8") as file:
        file.write(convert_to_json(featurizer_list))

if __name__ == '__main__':
    main()
