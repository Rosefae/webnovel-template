module.exports = function(eleventyConfig){

    eleventyConfig.addPassthroughCopy("src/_scripts");
    eleventyConfig.addPassthroughCopy("src/_assets");
    eleventyConfig.addPassthroughCopy("src/_styles/css");

    return {
        dir: {
            input: "src",
            output: "dist"
        },
        passthroughFileCopy: true
    }

}