import requests
import json
import os

# URL of the deepchem repository releases.
releases_url = 'https://api.github.com/repos/deepchem/deepchem/releases'

# Set the base latest version as 2.7.1
latest_version = '2.7.1'

# Send a GET request to the releases URL and get the latest version information.
try:
    # Send the GET request to the releases URL.
    response = requests.get(releases_url)

    # Store the latest version information in the 'latest_version' variable.
    # The latest version information is obtained from the first item in the JSON response,
    # which is a list of dictionaries representing the releases.
    latest_version = response.json()[0]['tag_name']

# Catch any exceptions that may occur during the process.
except Exception as e:
    # Print the exception message.
    print(e)

# Dictionary of terminal commands for different package managers.
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

# Try to create the data folder
try:
    os.makedirs("../../deepchem/data/home")
except Exception as e:
    print(e)

# Try to write the terminal commands dictionary to a JSON file.
try:
    # Open the file 'terminal-commands.json' in write mode.
    with open("../../deepchem/data/home/terminal-commands.json", "w") as outfile:
        # Write the terminal commands dictionary to the file in a readable format.
        json.dump(terminal_commands, outfile, indent=2)

# Catch any exceptions that may occur during the process.
except Exception as e:
    # Print the exception message.
    print(e)
