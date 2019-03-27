# webnovel-template

A template for webnovels using Eleventy.

`npm start` and `localhost:8080`.

Using Liquid for the layout just because the markdown is pre-processed with Liquid by default anyway.

## scripts

`serve`: Runs `eleventy --serve`. Compiles templates in `src` into `dist`, as well as copying over `_assets` and `_scripts` as-is. Also watches and serves the site to `localhost:8080`.

`scss`: Runs `sass --watch`. Watches and compiles SCSS files in `src/_styles` into CSS files in `dist/_styles`.

`start`: Runs `serve` and `scss` concurrently.