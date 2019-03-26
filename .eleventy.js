module.exports = function(eleventyConfig){

    eleventyConfig.addPassthroughCopy("src/_scripts");
    eleventyConfig.addPassthroughCopy("src/_assets");

    return {
        dir: {
            input: "src",
            output: "dist"
        },
        passthroughFileCopy: true
    }

}