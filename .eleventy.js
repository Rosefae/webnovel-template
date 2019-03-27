module.exports = function(eleventyConfig){

    eleventyConfig.addPassthroughCopy("src/_scripts");
    eleventyConfig.addPassthroughCopy("src/_assets");

    eleventyConfig.addCollection("chaptersFlatList", function(collection){
        // return collection.getFilteredByGlob("**/chapters/*").sort(function(a,b){
        //     return a.data.chapter.number - b.data.chapter.number;
        // });
        return collection.getFilteredByGlob("**/chapters/*");
    });

    eleventyConfig.addFilter("romanNumerals", function(n){
        let roman = arabicToRoman(n);
        return roman;
    });
    eleventyConfig.addFilter("romanNumeralsAccessible", function(n){
        let roman = arabicToRoman(n);
        return `<span aria-label="${n}"><span aria-hidden="true">${roman}</span></span>`;
    });

    return {
        dir: {
            input: "src",
            output: "dist"
        },
        passthroughFileCopy: true
    }
}

// function getTieredChapterList(chapters){
//     // takes a SORTED array of chapters
//     let output = [];
//     for(i=0;i<chapters.length;i++){
//         if (isSuperChapter(chapters[i])){
//             let newSuperChapter = {
//                 chapter: chapters[i],
//                 children: []
//             }
//             output.push(newSuperChapter);
//         }
//         else{
//             output[output.length-1].children.push(chapters[i]);
//         }
//     }

//     function isSuperChapter(ch){
//         if (ch.data.chapter.number==0 || !Number.isInteger(ch.data.chapter.number)){
//             return true;
//         }
//         else return false;
//     }
// }

function arabicToRoman(n){
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