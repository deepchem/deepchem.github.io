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

## Adding users and contributers to the carousels in home page and about page
- To add an organisation to the `Used by Scientific Leaders` section, add the the logo of the new organisation to the `/deepchem/public/used-by ` directory
- To add an organisation to the `Companies and Universities developing Deepchem` section in the About page, add the the logo of the new organisation to the `/deepchem/public/about/companies-developing-deepchem` directory
- File names can be flexible, but should be meaningful and represent the organisation
- Files must be .png files with transparent backgrounds

## Model Data Scraping
- The model data is scraped from the offical [Deepchem documentation](https://deepchem.readthedocs.io/en/latest/api_reference/models.html#model-cheatsheet) page using the `get_models.py` script in the `/utils/models` directory.
- The script uses the [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) library to scrape the data from the documentation page.
- The script first scrapes the page, extracts the table data, and then saves it in multiple json files in the `/deepchem/data/models` directory.
- The data is generated during the workflow process and not stored in the repository.

## Deployment
- The `next build` command generates the static files for next export to use.
- The `next export` command builds an HTML version of your application from pregenerated static files.
- A [workflow](#workflow-overview) has been set up to handle build time data fetching and automatic deployment of the website to Github Pages.
- The [JamesIves/github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action) is used to deploy the website to GitHub Pages with GitHub Actions.
- The static HTML build is saved in a separate branch called `gh-pages`.
- The workflow is triggered everytime the main branch is updated.
- In case the workflow run fails, the build is aborted and the current website deployment stays as is.

## Workflow script
- The `deploy_gh_pages.yml` workflow script in `.github/workflows` is triggered on updates to the main branch.
- The workflow runs a single job comprising of 3 steps
   - Fetch version data: This step fetches the latest deepchem release version from the github [api endpoint](https://api.github.com/repos/deepchem/deepchem/releases) and updates the terminal commands in `deepchem/data/home/terminal-commmands.json`
   - Install and build: This step checks out the repository, installs the required dependencies using npm i, runs the linting process with npm run lint, and generates the static website with npm run export. 
   - Deploy: This step deploys the website to the gh-pages branch using the [JamesIves/github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action). The website files are copied from the deepchem/out directory, and any files listed in the clean-exclude parameter are excluded from the cleaning process.

## Workflow overview

![](./public/assets/workflow.png)
