let darkmode = localStorage.getItem("darkmode");
let darkmodeToggle = document.getElementById("darkmodebtn-secretcheckbox");

if (darkmode){
    darkmodeToggle.checked = true;
}

darkmodeToggle.addEventListener("change", function(){
    if(this.checked){
        localStorage.setItem("darkmode", true);
    }

    else{
        localStorage.setItem("darkmode", false);
    }
});