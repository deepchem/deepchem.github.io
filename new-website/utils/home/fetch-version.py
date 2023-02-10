import requests
import json

releases_url = 'https://api.github.com/repos/deepchem/deepchem/releases'
latest_version = '2.7.1'

try:
    response = requests.get(releases_url)
    latest_version = response.json()[0]['tag_name']
except Exception as e:
    print(e)


terminal_commands = {
    "pip": ["pip install deepchem"],
    "conda": [
        f"conda install -c conda-forge rdkit deepchem=={latest_version}"
    ],
    "docker": [
        f"docker pull deepchemio/deepchem:{latest_version}",
        f"docker run -it deepchemio/deepchem:{latest_version}"
    ]
}

try:
    with open("../../deepchem/data/home/terminal-commands.json", "w") as outfile:
        json.dump(terminal_commands, outfile, indent=2)
except Exception as e:
    print(e)
