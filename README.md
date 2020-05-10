# webnovel-template

A template for webnovels using Eleventy.

`npm start` and `localhost:8080`.

This readme is mostly for future versions of myself because I'm incredibly forgetful. :D

## Features

* Automagic "Previous Chapter" and "Next Chapter" buttons
* Table of Contents in the menu
* Dark mode
* Remembers where users left off and adds a friendly "Continue Reading" button to the homepage
* Easily add links to mirrors -- both for individual chapters and for your webnovel as a whole
* Support for extra pages like appendices
* Choose between arabic numerals and roman numerals for your chapter numbers. Fancy!
* Autoprefixer and minimizer for SCSS stylesheets
* A 404 page. Just make sure your host directs 404 errors to `404.html`.
* An RSS feed to keep your readers up to date.

## NPM Scripts

`serve`: Runs `eleventy --serve`. Compiles templates in `src` into `dist`, as well as copying over `_assets` and `_scripts` as-is. Also watches and serves the site to `localhost:8080`.

`once`: Compiles templates and copies over `_assets` and `_scripts` once.

`scss`: Runs `gulp`, which watches and compiles SCSS files in `src/_styles` into CSS files in `dist/_styles`.

`oncescss`: Compiles SCSS files once.

`start`: Runs `serve` and `scss` concurrently.

`cleandist`: Cleans the `dist` folder of files only useful during development to make it ready for primetime.

## Global Data

All values are required unless otherwise specified.

* `title`: Title of novel.
* `author`: Name of author.
* `year`: Year or year range of publication as a string. Used in copyright messages.
* `language`: The 2-3 character language tag for the language of your novel. Used to set the HTML `lang` attribute and RSS `language` tag.
* `description`: A short blurb about your novel. Used by search engines and RSS feeds.
* `keywords`: A comma-separated list of keywords for SEO purposes.
* `url` (required for RSS feed; otherwise optional): The base URL of where you will be hosting your webnovel. Be sure to include the trailing slash.
* `numberStyle`: The style you would like to use for chapter numbers. Supported values: `arabic`, `roman`, and `none`. Can be overriden for individual chapters by placing a `numberStyle` attribute in the chapter's frontmatter data.
* `mirrors` (optional): An array of mirror objects. See "Adding Mirrors" section.
* `isComplete` (optional): Removes the "Latest chapter" link from the homepage when set to anything other than `false`.

There is also a `_data/social.json` file which handles all the social media links on the homepage. Everything in this file is optional. The `icon` property, where it exists, refers to the classnames used by FontAwesome.

Any UI text (e.g. "Next Chapter") can be set/changed in `_data/ui-text.json`.

## Adding Content

This template uses Eleventy to generate the static HTML for the final output. Eleventy handles a wide range of templating languages. This template uses Liquid for the layout and Markdown (with Liquid preprocessing) for the content.

This template includes the `markdown-it-attr` plugin, which allows you to add custom classes and attribtues to the generated HTML elements. The delimiters have been set to `[-` and `-]` to set it apart from Liquid's curly braces.

This template supports two types of pages: chapters and appendices.

### Chapter

Layout file: `read.liquid`

Content file(s): `chapters/*`

The main pages of your story.

A chapter takes the following data in its frontmatter:
* `number` (required)
* `title` (optional, unless numberStyle is set to `none`)
* `numberStyle` (optional)
* `mirrors` (optional)

The `number` attribute is the chapter number, i.e. chapter 1 should be given the number "1". This number must be unique. The reading order of your chapters will be determined by the `number` values.

The filename of each chapter can be arbitrary, as they will all output to `read/[number]/`.

Prologues can be placed at the front by giving it a chapter number of 0. Any interlogues/interludes can be ordered correctly by giving its number a decimal value (e.g. 3.5 for an interlude between chapters 3 and 4). You can then set the `numberStyle` attribute to `none` for that chapter to hide the number.

### Appendix

Layout file: `_includes/appendix-layout.liquid`

Content file(s): `appendices/*`

Anything that isn't a part of your main story, such as an about page, cast page, glossary, etc.

To explicitly define the order in which the appendices appear in the menu, use the `appendicesOrder` array in `appendices/appndices.11tydata.json`, where each string is the exact filename of the appendix without the file extension.

## Adding Mirrors

There's an array `_data/global/json` for global mirror links. Each object within the array has a name attribute and a url attribute. The menu uses this array to generate a list of mirror links.

For chapters, the menu will instead use the mirror array in the chapter's frontmatter. Not all global mirrors need to be present in a chapter's mirror array, but for best practice it's best to ensure that the mirrors which *are* present are in the same order as the global array.

## Adding CSS

CSS processing is handled by a gulpfile, which compiles `_styles/style.scss` and passes it through an autoprefixer and a minifier.

When changing the font, be sure to change the lines in `_includes/partials/headstuff.liquid` where the fonts are imported. Then change the value of the font variables in `_styles/_variables.scss`.

## Adding JS

Eleventy is set up to copy anything in `_scripts` directly into the corresponding folder in `dist`. Currently the only thing in there is the JS file for dark mode; everything else is inline. If you want to add any additional JS, remember to link to the JS in either `_includes/partials/headstuff.liquid` or the layout file of the relevant page(s).
