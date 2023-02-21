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
- [Next-13](https://nextjs.org/blog/next-13)
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

## Deployment
- The `next build` command generates the static files for next export to use.
- The `next export` command builds an HTML version of your application from pregenerated static files.
- A [workflow](#workflow) has been set up to handle build time data fetching and automatic deployment of the website to Github Pages.
- The [Github pages deploy action](https://github.com/JamesIves/github-pages-deploy-action) is used to deploy the website to GitHub Pages with GitHub Actions.
- The static HTML build is saved in a separate branch called `gh-pages`.
- The workflow is triggered everytime the main branch is updated.
- In case the workflow run fails, the build is aborted and the current website deployment stays as is.

## Workflow

![](./public/assets/workflow.png)
