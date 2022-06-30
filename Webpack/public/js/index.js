// import { div, button } from './doc-ref'
// import '../css/index.css'


button.addEventListener('click', changeColor)

function changeColor() {
    if (div.style.background == "red") {
        div.style.background = "brown";
    }
    else {
        div.style.background = "red";
    }

}