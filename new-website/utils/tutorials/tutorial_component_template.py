"""
Utility function and template for generating React components for DeepChem tutorials.

"""


def get_react_component(file_name, component_name):
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
