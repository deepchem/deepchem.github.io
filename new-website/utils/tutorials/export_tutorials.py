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
    valid_url = re.sub(r"[^\w\s]", "-", s)
    valid_url = re.sub(r'[ _]+', '-', valid_url)
    valid_url = valid_url.lower()
    return valid_url


def get_component(file_name, component_name):
    """
    Generates a React component for a given file name and component name.

    Parameters
    ----------
    file_name: str
        The name of the file to generate the component for.
    component_name: str
        The name of the component to be generated.

    Returns
    -------
    generated_component: str
        The generated React component.
    """
    # Remove file extension if any
    file_name = file_name.rsplit(".")[0]

    generated_component = f"""
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

    return generated_component


def parse_and_export_tutorials():
    """
    Parses HTML files containing DeepChem tutorials and converts them into React components and JSON data that is used to
    display tutorials on the website
    """
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


if __name__ == "__main__":
    parse_and_export_tutorials()
