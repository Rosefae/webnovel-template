module.exports = function(eleventyConfig){

    eleventyConfig.addPassthroughCopy("src/_scripts");
    eleventyConfig.addPassthroughCopy("src/_assets");

    eleventyConfig.addCollection("rawChapters", function(collection){
        return collection.getFilteredByGlob("**/chapters/*").sort(function(a,b){
            return a.data.number - b.data.number;
        });
    });

    eleventyConfig.addCollection("appendices", function(collection){
        let appendices = collection.getFilteredByGlob("**/appendices/*");
        let orderKey = appendices[0].data.appendicesOrder;

        let sortedAppendices = explicitlyOrder(appendices, orderKey);

        return sortedAppendices;
    });

    eleventyConfig.addFilter("romanNumerals", function(n){
        let roman = arabicToRoman(n);
        return roman;
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