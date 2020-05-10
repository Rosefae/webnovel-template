// 11ty handles everything except the CSS stuff.
// For CSS stuff, please see the gulpfile.

module.exports = function(eleventyConfig){

    // Markdown options

    const markdownIt = require("markdown-it");
    const markdownItAttrs = require ("markdown-it-attrs");

    let mdOptions = {
        html: true,
        typographer: true
    }

    let mdAttrsOptions = {
        leftDelimiter: '[-',
        rightDelimiter: '-]'
    }

    eleventyConfig.setLibrary("md", markdownIt(mdOptions).use(markdownItAttrs, mdAttrsOptions));

    // Copy assets and scripts

    eleventyConfig.addPassthroughCopy("src/_scripts");
    eleventyConfig.addPassthroughCopy("src/_assets")

    // Watch for SCSS changes

    eleventyConfig.addWatchTarget("src/_styles/");

    // Handle chapters

    eleventyConfig.addCollection("rawChapters", function(collection){
        return collection.getFilteredByGlob("**/chapters/*").sort(function(a,b){
            return a.data.number - b.data.number;
        });
    });

    // Handle appendices

    eleventyConfig.addCollection("appendices", function(collection){
        let appendices = collection.getFilteredByGlob("**/appendices/*");
        let orderKey = appendices[0].data.appendicesOrder;

        let sortedAppendices = explicitlyOrder(appendices, orderKey);

        return sortedAppendices;
    });

    // Custom filters

    eleventyConfig.addFilter("romanNumerals", function(n){
        let roman = arabicToRoman(n);
        return roman;
    });

    // Custom shortcodes

    eleventyConfig.addShortcode("chapterNumber", function(number, style, prepend, append){
        if (style == "none"){
            return "";
        }
        if (style == "arabic"){
            return prepend + number.toString() + append;
        }
        if (style == "roman"){
            return prepend + arabicToRoman(number) + append;
        }
        return "";
    });

    // Eleventy settings

    return {
        dir: {
            input: "src",
            output: "dist"
        },
        passthroughFileCopy: true
    }
}

function explicitlyOrder(arr, orderKey){
    let orderingDict = {};

    orderKey.forEach((key, index)=>{
        orderingDict[key] = index;
    });

    arr.sort(function(a, b){
        let aIndex = orderingDict[a.fileSlug];
        let bIndex = orderingDict[b.fileSlug];

        if(typeof aIndex === 'undefined' && typeof bIndex === 'undefined'){
            return 0;
        }
        if (typeof aIndex === 'undefined'){
            return 1;
        }
        if(typeof bIndex === 'undefined'){
            return -1;
        }

        return aIndex - bIndex;
    });

    return arr;
}

function arabicToRoman(arabic){
    var n = Number(arabic);
    if(!Number.isInteger(n)){
        return n;
    }
    var numberSymbols = [
        {
            "one" : "I",
            "five" : "V",
        },
        {
            "one" : "X",
            "five" : "L",
        },
        {
            "one" : "C",
            "five" : "D",
        },
        {
            "one" : "M"
        }
    ];
    var output="";
    if(n>3999 || n<=0){
        return n;
    }
    var s = n.toString();
    var place = 0;
    for (i=s.length-1; i>=0; i--){
        let d = Number(s[i]);
        let r = "";
        switch(d){
            case 9:
                r = numberSymbols[place].one + numberSymbols[place+1].one;
                break;
            case 4:
                r = numberSymbols[place].one + numberSymbols[place].five;
                break;
            default:
                if (d>=5){
                    r = numberSymbols[place].five;
                    d = d-5;
                }
                for(j=0;j<d;j++){
                    r += numberSymbols[place].one;
                }
        }
        output = r + output;
        place++;
    }
    return output;
}