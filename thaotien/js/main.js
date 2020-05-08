//main js function call after js is loaded

var menuActive = false;
function mainjs() {
    models['header'].init();
    models['footer'].init();
    loadAllLink();

     

}
//function that call after reload page
function redirectinit() {
    loadAllLink();

}

