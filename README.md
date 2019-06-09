# Delux Toolkit

A generic dev toolkit by Deluxateer. It automates several tasks, transpiles, bundles, launches a live server, etc.

## Goals

### Webpack:
* compile scss files
* include sourcemaps for scss (maybe js files too)
* postcss (autoprefix, polyfills, linting, use future css tech)
concatenating js files
* transpile js files with babel
* minify all static files (html, css, js)
* minify all images
* eventually: html template (pug or handlebars)


### Gulp:
* linting for js (eslint)
* unit testing
* spin up browsersync
* watch for changes for files

## Considerations:
* adding a css-loader
  * https://webpack.js.org/guides/asset-management#loading-css
  * sass-loaders are available too...