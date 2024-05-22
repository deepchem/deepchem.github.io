# deepchem.io

Website for DeepChem - https://deepchem.io.

## Instructions

### Setting Up

- Install dependencies using `npm i` in the `/deepchem/` directory

### Run

- Execute `npm run dev` to start a dev server
- Run `npx next dev -H <hotspot-ip> -p 3000` to test on mobile devices

### Build

- Execute `npm run build`

### Lint

- Execute `npm run lint`

### Documentation

- Execute `npm run docs` to generate documentation
- To change the destination folder for the generated docs, set the `opts.destination` property in `deepchem/jsdoc.conf.json`

## TechStack

- [Next-12](https://nextjs.org/blog/next-12)
- [TailwindCSS](https://tailwindcss.com/)

## Features

- Models
- Datasets
- Tutorials

## Links

- [UI/UX](https://www.figma.com/file/lx8RDjCI7XyzLeUMmP7tCw/DeepChem?node-id=0%3A1&t=fen0Nhme)

## Adding users and contributors to the carousels in home page and about page

- To add an organization to the `Used by Scientific Leaders` section, add the the logo of the new organization to the `/deepchem/public/used-by ` directory
- To add an organization to the `Companies and Universities developing Deepchem` section in the About page, add the the logo of the new organization to the `/deepchem/public/about/companies-developing-deepchem` directory
- File names can be flexible, but should be meaningful and represent the organization
- Files must be .png files with transparent backgrounds

## Model Data Fetching

- The model data is fetched from the official [Deepchem repo](https://github.com/deepchem/deepchem/tree/master/docs/source/api_reference) using the `get_models.py` script in the `/utils/models` directory.
- The script downloads the raw csv files hosted at Github and extracts the necessary data.
- The script reads the files using pandas, encodes and saves it to json format in the `/deepchem/data/models` directory.
- The data is generated during the workflow process and not stored in the repository.

## Tutorial Data Fetching

- The tutorial data is fetched from the official [Deepchem repo](https://github.com/deepchem/deepchem) using the `fetch_tutorials.py` script in the `/utils/tutorials` directory.
- The script downloads the raw `.ipynb` files from Github (It uses the Github API to achieve this), and uses `jupyter nbconvert` to convert them to `html` files.
- A second script `export_tutorials.py` in the same directory reads the html files, creates a react component and a json data-file out of the parsed HTML data and exports them to the `/deepchem/pages/tutorials` and `/deepchem/data/tutorials` directories respectively.
- The data is generated only during the workflow process and is not stored in the repository.
- Testing:
  - The tests are stored in `./utils/tutorials/` and have the file naming convention `test_**.py`
  - The tests are configured to run during the build and deploy workflow
  - The tests can also by run manually using `python3 test_**.py`

A detailed description of the working of the scripts is given below.

- ### `fetch_tutorials.py`

  - The script first fetches the list of all tutorials present in the deepchem repo. This is done with the help of the [official Github API](https://api.github.com/). The list is fetched from [deepchem/examples/tutorials](https://github.com/deepchem/deepchem/tree/master/examples/tutorials) and the `assets` and the `README` are ignored
  - Once the list of tutorials has been fetched, the script now fetches each notebook (again using the Github API), uses `jq` to remove the metadata from the downloaded notebook (this is done to prevent errors during conversion), and finally uses `nbconvert` to convert the notebook to an HTML file.
  - The list of converted notebooks is stored in `/utils/tutorials/notebooks.txt` which is used by the `export_tutorials.py` script to generate the react components and the json data files.
  - The script also fetches the order in which the Tutorials are recommended to be completed. The order is stored in the corresponding
    deepchem tutorials directory located [HERE](https://github.com/deepchem/deepchem/tree/master/examples/tutorials/website-render-order)
    - Each CSV file contains an Index Number which specifies the order in which the tutorials mentioned in it should be read.
    - The name of the CSV file signifies the section heading on the website.
    - The CSV file itself contains the Titles and File names of the tutorials in the order in which they should be read.

- ### `export_tutorials.py`

  - This script reads the list of notebooks from `/utils/tutorials/notebooks.txt` and parses the HTML files (downloaded temporarily to `/utils/tutorials/html-notebooks`) using `BeautifulSoup`.
  - The script then creates a react component for each tutorial and exports it to the `/deepchem/pages/tutorials` directory.
  - The script also creates a json data file for each tutorial and exports it to the `/deepchem/data/tutorials` directory.
  - The template for the react components is stored in `utils/tutorials/tutorial_component_template.py`.
    Please note, that any files required by scripts are generated by the scripts themselves and are not stored in the repository.

- ### `build_pdf_book.py`

  - The script reads the list of notebooks from `utils/tutorials/website-render-order` and converts the HTML files (downloaded temporarily to `/utils/tutorials/html-notebooks`) to PDF files using `pdfkit` and stores them in `/utils/tutorials/storage/`.
  - The script then merges these PDFs and creates the file `merged.pdf`.
  - The `merged.pdf` file is then uploaded to the S3 bucket.
    - Please note, pdfunite package is required to be installed for merging. `apt install poppler-utils`
    


## Deployment

- The `next build` command generates the static files for next export to use.
- The `next export` command builds an HTML version of your application from pregenerated static files.
- A [workflow](#workflow-overview) has been set up to handle build time data fetching and automatic deployment of the website to Github Pages.
- The [JamesIves/github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action) is used to deploy the website to GitHub Pages with GitHub Actions.
- The static HTML build is saved in a separate branch called `gh-pages`.
- The workflow is triggered every time the main branch is updated.
- In case the workflow run fails, the build is aborted and the current website deployment stays as is.

## Workflow script

- ### `deploy_gh_pages.yml`
  
  - The `deploy_gh_pages.yml` workflow script in `.github/workflows` is triggered on updates to the main branch.
  - The workflow runs a single job comprising of 3 steps
    - Fetch version data: This step fetches the latest deepchem release version from the github [api endpoint](https://api.github.com/repos/deepchem/deepchem/releases) and updates the terminal commands in `deepchem/data/home/terminal-commands.json`
    - Install and build: This step checks out the repository, installs the required dependencies using npm i, runs the linting process with npm run lint, and generates the static website with npm run export.
    - Deploy: This step deploys the website to the gh-pages branch using the [JamesIves/github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action). The website files are copied from the deepchem/out directory, and any files listed in the clean-exclude parameter are excluded from the cleaning process.
   
  - ### `build_pdf_book.yml`
  
  - The `build_pdf_book.yml` workflow script in `.github/workflows` is triggered on updates to the `deepchem/examples/tutorials` directory in `deepchem` repository.
  - The workflow runs a single job comprising of 3 steps
    - Install requirements: This step installs the dependencies specified in the `requirements.txt` file in `new-website/utils`. It also installs poppler-utils and wkhtmltopdf packages.
    - Fetch latest version of tutorials: It installs the jq package and then runs the `fetch_tutorials.py` script.
    - Build pdf book: This step runs the `build_pdf_book.py` script. 

## Workflow overview

![](./public/assets/workflow.png)