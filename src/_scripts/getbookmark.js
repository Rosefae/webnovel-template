let currChapter = localStorage.getItem("currChapter");
let currChapterLink = document.getElementById("currChapterLink");

if (currChapter){
    currChapterLink.firstElementChild.setAttribute("href", "read/" + currChapter + "/");
    currChapterLink.removeAttribute("hidden");
}