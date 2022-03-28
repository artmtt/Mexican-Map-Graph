//Changes between node HTML div to connections HTML div
const radios_vertex = document.querySelector('#radios_vertex');
const radios_connection = document.querySelector('#radios_connection');
const radio_vertex = document.querySelector('#radio_vertex');
const radio_connection = document.querySelector('#radio_connection');

const show_vertex = document.querySelector("#show_vertexes");
const show_conn = document.querySelector("#show_connections");

function isMenuRadioChecked(rv, rc) {
    if(rv.checked) {
        //Hide connections HTML div and show nodes HTML div
        show_vertex.setAttribute("style", "display: block;");
        show_conn.setAttribute("style", "display: none;");
    } else if(rc.checked) {
        //Hide nodes HTML div and show connections HTML div
        show_conn.setAttribute("style", "display: block;");
        show_vertex.setAttribute("style", "display: none;");
    }
}