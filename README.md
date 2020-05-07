# webnovel-template

A template for webnovels using Eleventy.

`npm start` and `localhost:8080`.

Using Liquid for the layout just because the markdown is pre-processed with Liquid by default anyway.

## todo

* Test accessibility
* Tiered table of contents (eg Part 1: Chapter X)
* Local json to remember where the reader left off + dark mode preferences
* Getting screenreaders to read roman numerals nicely
* Add stuff like "Home" and "About" to navigation pane under table of contents

## scripts

`serve`: Runs `eleventy --serve`. Compiles templates in `src` into `dist`, as well as copying over `_assets` and `_scripts` as-is. Also watches and serves the site to `localhost:8080`.

`scss`: Runs `sass --watch`. Watches and compiles SCSS files in `src/_styles` into CSS files in `dist/_styles`.

`start`: Runs `serve` and `scss` concurrently.