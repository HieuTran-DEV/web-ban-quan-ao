
// BUTTON ON TOP
function Top(){
    document.body.scroll=0;
    document.documentElement.scrollTop=0;
}

//MENU
var iScrollPos = 0;
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    var iCurScrollPos=document.documentElement.scrollTop;
    if(iCurScrollPos>iScrollPos){
        document.body.classList.add("fit-menu");
    }
    else {
        document.body.classList.remove("fit-menu");
    }
    iScrollPos = iCurScrollPos;
}