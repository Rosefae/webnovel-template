let darkmodeToggle = document.getElementById("darkmodebtn-secretcheckbox");

if (localStorage.getItem("darkmode") == "true"){
    darkmodeToggle.checked = true;
}

darkmodeToggle.addEventListener("change", function(){
    if(this.checked){
        localStorage.setItem("darkmode", "true");
    }

    else{
        localStorage.setItem("darkmode", "false");
    }
});