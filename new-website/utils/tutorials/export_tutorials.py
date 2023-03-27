"""
This script is used to parse HTML files containing DeepChem tutorials and convert them into React components
and JSON data that is used to display tutorials on the website.

Requirements:
    - BeautifulSoup (bs4)
    - json
    - re

Example Usage:
    - Ensure that the fetch_tutorials.py script has been executed successfully.
    - Run this script using "python script_name.py".
    - The output JSON and React components data will be generated in the "../../deepchem/data/tutorials/" and
      "../../deepchem/pages/tutorials/" directories.
"""
from bs4 import BeautifulSoup
import json
import re


def to_valid_identifier(s):
    """
    Converts a given string into a valid identifier.

    Args
    ----
        s: str
            The string to be converted into a valid identifier.

    Returns:
        str: The converted valid identifier.
    """
    s = s.replace(" ", "_")
    s = re.sub(r'[^0-9a-zA-Z_]', '_', s)
    if s[0].isdigit():
        s = "_" + s
    return s


def to_valid_url_path(s):
    """
    Converts a given string into a valid URL path.

    Args
    ----
        s: str
            The string to be converted into a valid URL path.

    Returns
    -------
        str: The converted valid URL path.
    """
    s = re.sub(r"[^\w\s]", "-", s)
    s = re.sub(r'[ _]+', '-', s)
    s = s.lower()
    return s


def get_component(file_name, component_name):
    """
    Generates a React component for a given file name and component name.

    Args
    ----
        file_name (str): The name of the file to generate the component for.
        component_name (str): The name of the component to be generated.

    Returns
    -------
        str: The generated React component.
    """
    # Remove file extension if any
    file_name = file_name.rsplit(".")[0]

    return f"""
import TutorialLayout from "../../layouts/tutorial";
import notebookStyles from "../../data/tutorials/styles";
import innerHTML from "../../data/tutorials/{file_name}.js";
import {{useEffect}} from "react";
import scrollnav from "scrollnav";

const {component_name} = () => {{

useEffect(() => {{
        document.getElementsByClassName('scroll-nav')[0]?.remove();
        const content = document.querySelector(".notebook");
        const insertTarget = document.querySelector(".notebook");

        if (insertTarget && content) {{
            scrollnav.init(content, {{
                sections: "h1, h2", insertTarget: insertTarget, insertLocation: "after",
            }});
        }}

        MathJax?.Hub?.Queue(["Typeset", MathJax.Hub]);
    }}, []);

return <div
    className="overflow-x-scroll"
    dangerouslySetInnerHTML={{{{__html: `${{innerHTML.html}} ${{notebookStyles}}`,}}}}
></div>
}}

{component_name}.Layout = TutorialLayout;

export default {component_name};
"""


def parse_and_export_tutorials():
    tutorials = []

    # Open 'notebooks.txt' file and iterate over each file name
    with open('./notebooks.txt', 'r') as notebook_files:
        for file in notebook_files:

            # Open corresponding html file located in the 'html-notebooks' directory
            with open(f'./html-notebooks/{file.strip()}', 'r', encoding="utf-8") as f:
                tutorial = {}
                soup = BeautifulSoup(f.read(), 'html.parser')
                body = soup.body

                # Get the title of the tutorial from the first h1 tag in the html file
                title = soup.find('h1').text

                # Remove the 'id' attribute from all the h1 and h2 tags in the html file
                headings = body.find_all(['h1', 'h2'])
                for heading in headings:
                    del heading['id']

                # Add the class 'overflow-x-scroll' to all the pre tags in the html file
                code_cells = body.find_all('pre')
                for code_cell in code_cells:
                    code_cell['class'] = code_cell.get(
                        'class', []) + ['overflow-x-scroll']

                # Hide the body tag of the html file
                soup.find('body').hidden = True

                # Get the prettified html of the body tag
                html = soup.body.prettify()

                # Generate a url-friendly name for the tutorial and a valid component name for the javascript file
                file_name = file.rsplit(".")[0]
                urlified_file_name = to_valid_url_path(file_name)
                component_name = to_valid_identifier(file_name)

                # Write the tutorial html to a js file located in the 'data/tutorials' directory
                with open(f'../../deepchem/data/tutorials/{urlified_file_name}.js', 'w', encoding="utf-8") as data_file:
                    data_file.write('export default')
                    data_file.write(json.dumps({"html": html}))

                # Generate a component for the tutorial and write it to a js file located in the 'pages/tutorials' directory
                with open(f'../../deepchem/pages/tutorials/{urlified_file_name}.js', 'w', encoding="utf-8") as component:
                    component.write(get_component(
                        urlified_file_name, component_name))

                # Add the tutorial title and urlified file name to the list of tutorials
                tutorial['title'] = file_name.replace("_", " ")
                tutorial['urlifiedFileName'] = urlified_file_name
                tutorials.append(tutorial)

    # Write the list of tutorials to a js file located in the 'data/tutorials' directory

    with open('../../deepchem/data/tutorials/tutorials.js', 'w') as f:
        f.write("export default")
        f.write(json.dumps(tutorials))
