# Delux Toolkit (v2)

A multi-purpose dev toolkit by Deluxateer. It is designed to streamline development flow by automating common tasks (as listed in Features). Set up with the template engine Pug and preprocessor Sass/SCSS for efficient view & style authorship. Implements various customizable linters to enforce good code practice. Optimizes files for production.

## Features

1. **Views:** Compiles Pug into compressed HTML files.
2. **Styles:** Compiles SCSS files into one CSS file, then enhances it with PostCSS plugins (autoprefixing, polyfills, preset-env).
3. **JavaScript:** Concatenates all JS files while transpiling (Babel) and minifying the resulting file.
4. **Linting:** Pug (pug-lint), SCSS (StyleLint) and JavaScript (ESLint).
5. **Sourcemaps:** Included for SCSS and JS files during development mode.
6. **Assets:** Minifies images for production.
7. **Live Server:** Spin up Webpack dev server with hot-reloading.

## How To Use:

### Main Commands

#### `npm run build:dev` or `npm run build` or `npm run b`

Builds the destination folder with static files **FOR DEVELOPMENT**. Generates static files with styles loaded via JS.

#### `npm run build:prod` or `npm run bp`

Same as `npm run build:dev` but with Webpack mode set to production. This means static files are minified and certain options like sourcemaps are not enabled. Mostly the default webpack optimizations are made here.

#### `npm run watch`

Runs Webpack build process and watches for changes to any source files. On change, the appropriate files will be linted and recompiled, while the browser reloads for changes.

#### `npm run serve`

Spins up the Webpack dev server and watches for changes to any source files. On change, the appropriate files will be linted and recompiled, while the browser reloads for changes.

#### `npm run clean`

Deletes the destination directory and node modules.

## Customization Suggestions:

1. Modify package.json; adjust the name, description, author, and other key/value pairs you desire.
2. Replace/remove favicon.ico
3. Adjust `webpack.config.js` file to your liking.
4. Inspect `.browserlistrc` for the browsers & versions you want to support. [Information on Queries](https://github.com/browserslist/browserslist#queries)
5. `assets` directory
   1. Replace/remove fonts directory
   2. Replace/remove img directory
6. `js` directory
   1. Turn off the modules you won't need for your project in `index.js`
   2. You can always add to the `js` directory as needed.
7. Strip off the partials in the `styles` directory that are irrelevant to your project and references to them, though keeping the components are recommended.
   1. Most configurations will be found in the `abstract` and `base` directories.
   2. Custom page style files will be in the `pages` directory, which has placeholder files that you should modify/delete now.
8. Delete/modify README

## Architecture

The file structure heavily based on Hugo Giraudel's [7-1 Architecture Pattern](https://sass-guidelin.es/#the-7-1-pattern). A more detailed explanation about the structure can be found there.

The views, styles, and functionality are decoupled as much as possible, where they are separated into global variables & functions, layout pieces, and reusable components. This makes it simple to add/remove code for your specific project or migrate them to another project. For instance, all of the baseline code for carousels can be found pertaining to its:

- **Views:** `src/views/components/carousel.pug`
- **Styles:** `src/scss/components/_carousel.scss`
- **Functionality:** `src/js/components/carousel.js`

### Key Points

- For the `views` directory:
  - We have a somewhat different structure. All of the Pug files at the base of `views` will be the pages that will compile to the desired HTML files. They are all extensions of special pages called "base pages" found in the `base-pages` directory.
    - Base pages are generic templates with some components but various layout pieces. They have the basic skeletal structure that allows the developer to plug different parts into them for customization while keeping a desired structure. Examples would be default, full-page, horizontal-scroll, blog-post, etc.
    - This is quite useful because it is very DRY (Don't Repeat Yourself). It saves the user from having to redeclare the same code for all pages like global head tags and footer, letting the developer just write the code/data that is specific to that page. Simply append, prepend, or completely overwrite a layout/section to customize it. Also since all pages extend the base pages, maintainability will be simpler as making a change in the base pages will reflect on all of its child pages.
  - `data.pug` will hold all of the global data that you will use for your markup (HTML) pages. It is intended for this setup to loop through the data you need and output HTML, in order to keep your markup code DRY and decoupled from hard-coded data.
  - `variables.pug` contains all of the global variables to be used between pug files. It contains options for global `<head>` tag attributes, with the optional ones already commented out. Navbar items and social-media hrefs are good ideas to put here.
  - Pug files at the base of the `views` directory are your "main" files that will compile into equivalant html files. They should extend from some `base-page`. List your page-specific head attributes, CDN links, and local data here. It's up to what you want to put here.

## Notes

Sass Architecture and Boilerplate based from Hugo Giraudel's [Style Guide](https://sass-guidelin.es/) and [Code](https://github.com/HugoGiraudel/sass-boilerplate).

## Issues

- find ways to additional style-guide rules into scss-linter
- simplify the carousel component's architecture
  - too much of the carousel's inner-workings markup has to be exposed when calling the Pug mixin
