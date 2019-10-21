# Delux Toolkit

A multi-purpose dev toolkit by Deluxateer. It is designed to streamline development flow by automating common tasks (as listed in Features). Set up with the template engine Pug and preprocessor Sass for efficient view & style authorship. Implements various customizable linters to enforce good code practice. Optimizes files for production.

## Features

1. __Views:__ Compiles Pug into compressed HTML files.
2. __Styles:__ Compiles SCSS files into one CSS file, then enhances it with PostCSS plugins (autoprefixing, polyfills, preset-env, minification).
3. __JavaScript:__ Concatenates all JS files while transpiling (Babel) and minifying the resulting file.
4. __Linting:__ Pug (pug-lint), SCSS (StyleLint) and JavaScript (ESLint).
4. __Sourcemaps:__ Included for SCSS and JS files during development mode.
5. __Assets:__ Minifies images for production.
6. __Live Server:__ Spin up Browsersync for cross-device service with hot-reloading.

### To Be Implemented:
* Unit Testing

## How To Use:

### `npm run build`

Builds the destination folder with static files __FOR DEVELOPMENT__. It runs tasks for `clean`, `views`, `styles`, `js`, and `minimgs`. `favicon` is included.

### `npm run buildwatch` or `npm run bw`

Same as `npm run build`, but also runs the `watch` task at the end.

### `npm run build:prod`

Same as `npm run build` but for production. This means certain options like sourcemaps are not enabled.

### `npm run buildwatch:prod` or `npm run bwp`

Same as `npm run build:prod`, but also runs the `watch` task at the end.

### `npm run views`

Calls the tasks to lint all Pug code and then compiles all the Pug files at the base of the `views` directory into HTML files for the destination directory.

### `npm run styles`

Calls the tasks to lint all SCSS code. Then it compiles `index.scss` file at the base of the `scss` directory into one CSS file for the destination directory (with sourcemaps enabled if not production). Before being outputted, it is enchanced with PostCSS plugins. Reports are generated by the linter.

### `npm run lintjs`

Lints all of the JS files in the source directory and `gulpfile.babel.js` with ESLint. Reports are generated by the linter.

### `npm run js`

Same as `npm run lintjs` but also bundles, transpiles, and minifies all source directory JS files with Webpack. Sourcemaps are included if not in production.

### `npm run watch`

Spins up Browsersync and watches for changes to any source files. On change, the appropriate files will be linted and recompiled, while the browser reloads for changes.

### `npm run clean`

Deletes the destination directory and the reports directory.

### `npm run minimgs`

Minifies all images in the asset directory.

### `npm run favicon`

Moves a copy of `favicon.ico` into the destination directory.

## Architecture

The file structure heavily based on Hugo Giraudel's [7-1 Architecture Pattern](https://sass-guidelin.es/#the-7-1-pattern). A more detailed explanation about the structure can be found there.

The views, styles, and functionality are decoupled as much as possible, where they are separated into global variables & functions, layout pieces, and reusable components. This makes it simple to add/remove code for your specific project or migrate them to another project. For instance, all of the baseline code for carousels can be found pertaining to its:
* __Views:__ `src/views/components/carousel.pug`
* __Styles:__ `src/scss/components/_carousel.scss`
* __Functionality:__ `src/js/components/carousel.js`

### Key Points

* For the `views` directory, we have a somewhat different structure. All of the Pug files at the base of `views` will be the pages that will compile to the desired HTML files. They are all extensions of special pages called "base pages" found in the `base-pages` directory.
  * Base pages are generic templates with some components but various layout pieces, which is why the `layout` directory in this case is a subdirectory of `base-pages` out of convenience. They have the basic skeletal structure that allows the developer to plug different parts into them for customization while keeping a desired structure. Examples would be default, full-page, horizontal-scroll, blog-post, etc.
  * This is quite useful because it is very DRY (Don't Repeat Yourself). It saves the user from having to redeclare the same code for all pages like global head tags and footer, letting the developer just write the code/data that is specific to that page. Simply append, prepend, or completely overwrite a layout/section to customize it. Also since all pages extend the base pages, maintainability will be simpler as making a change in the base pages will reflect on all of its child pages.

* For the `js` directory, we will not have a `pages` directory because we don't want page-specific JavaScript to be shared with other pages. In this case, it is better to simply append an inline `script` tag to the respective Pug page file.

## Notes

Sass Architecture and Boilerplate based from Hugo Giraudel's [Style Guide](https://sass-guidelin.es/) and [Code](https://github.com/HugoGiraudel/sass-boilerplate).

## Goals

I would like to segregate these features between Webpack and Gulp, since the purpose of Webpack is to be a bundler and Gulp to be a task runner.

### Webpack:
* html template engine (pug)
* compile scss files
* postcss (autoprefix, polyfills, linting, use future css tech)
* concatenating js files
* transpile js files with babel
* include sourcemaps for scss and js files too
* minify all static files (html, css, js)
* minify all images

### Gulp:
* linting for js (eslint)
* unit testing
* spin up browsersync
* watch for changes for files

## Issues
* find ways to additional style-guide rules into scss-linter
* there isn't a way to cleanly write the output of pug-lint to a file
* simplify the carousel component's architecture
  * too much of the carousel's inner-workings markup has to be exposed when calling the Pug mixin
* find a way to process inline script tags with the same treatment as the processJs task (ie transpile and minify).
