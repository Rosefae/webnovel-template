# webnovel-template

A template for webnovels using Eleventy.

`npm start` and `localhost:8080`.

This readme is mostly for future versions of myself because I'm incredibly forgetful. :D

## todo

* Fix style issue when menu is longer than page
* Tiered table of contents (eg Part 1: Chapter X)
* Add social links to homepage
* Add browsersync and sourcemap to gulpfile
* RSS feed?
* Delete rawChapters automatically upon finish building?
* Update layout so chapter titles are optional

## Features

* Automagic "Previous Chapter" and "Next Chapter" buttons
* Table of Contents in the menu
* Dark mode
* Remembers where users left off and adds a friendly "Continue Reading" button to the homepage
* Easily add links to mirrors -- both for individual chapters and for your webnovel as a whole
* Support for extra pages like appendices
* Comes with clean and simple aesthetics, but you can also bring your own stylesheet

## Future Features?

* Choose between arabic numerals and roman numerals for your chapter numbers. Fancy!
* RSS feed
* Tiered table of contents (e.g. Part 1: Chapter 30)
* Social links on homepage
* Allow for chapters that only have numbers and don't have titles

## NPM Scripts

`serve`: Runs `eleventy --serve`. Compiles templates in `src` into `dist`, as well as copying over `_assets` and `_scripts` as-is. Also watches and serves the site to `localhost:8080`.

`once`: Compiles templates and copies over `_assets` and `_scripts` once.

`scss`: Runs `gulp`, which watches and compiles SCSS files in `src/_styles` into CSS files in `dist/_styles`.

`oncescss`: Compiles SCSS files once.

`start`: Runs `serve` and `scss` concurrently.

## Adding Content

This template uses Eleventy to generate the static HTML for the final output. Eleventy handles a wide range of templating languages. This template uses Liquid for the OOTB layout and Markdown for the sample content, but by no means are you limited to using these languages.

If you do use Markdown, however, this template includes the `markdown-it-attr` plugin, which allows you to add custome classes and attribtues to the generated HTML elements. However, the delimiters have been set to `[-` and `-]` to set it apart from the Liquid Handlebar syntax.

This template supports two types of pages: chapters and appendices.

### Chapter

Layout file: `read.liquid`

Content file(s): `chapters/*`

The main pages of your story.

Each chapter needs the following data in its frontmatter:

* Title
* Number

It also optionally takes a mirror array (see below).

The reading order of your chapters will be determined by the `Number` values. i.e. chapter 1 should be given the number "1".

The filename of each chapter can be arbitrary, as they will all output to `read/[number]/`.

Prologues can be placed at the front by giving it a chapter number of 0. Any interlogues/interludes can be ordered correctly by giving its number a decimal value (e.g. 3.5 for an interlude between chapters 3 and 4). (Future versions will be adding a flag so you can hide the numbers and it won't look weird).

### Appendix

Layout file: `_includes/appendix-layout.liquid`

Content file(s): `appendices/*`

Anything that isn't a part of your main story, such as an about page, cast page, glossary, etc.

To explicitly define the order in which the appendices appear in the menu, use the `appendicesOrder` array in `appendices/appndices.11tydata.json`, where each string is the exact filename of the appendix without the file extension.

## Adding Mirrors

There's an array `_data/global/json` for global mirror links.

For specific chapters, the menu will instead use the mirror array in the chapter's frontmatter to generate the links.

## Adding CSS

CSS processing is handled by a gulpfile, which compiles `_styles/style.scss` and passes it through Autoprefixer.

When changing the font, be sure to change the lines in `_includes/partials/headstuff.liquid` where the fonts are imported. Then change the value of the font variables in `_styles/_variables.scss`.

## Adding JS

Eleventy is set up to copy anything in `_scripts` directly into the corresponding folder in `dist`. Currently the only thing in there is the JS file for dark mode; everything else is inline. If you want to add any additional JS, remember to link to the JS in either `_includes/partials/headstuff.liquid` or the layout file of the relevant page(s).
