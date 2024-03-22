//index.js


//imports
import "leaflet";
import "leaflet/dist/leaflet.css"
import markerIcon from "leaflet/dist/images/marker-icon.png"

//creating a map
const map = L.map("map1");

//credit the authours of the copywrighted resources - open street map is an open map - meaning you have to credot ot every time you use it
const attrib = "Map data copyright OpenStreetMap contributer, liscened under the Open Database Liscene";

L.tileLayer
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: attrib } ).addTo(map);


//this would be for the default view 
const pos = [74,40.75];
map.setView(pos, 13);

L.marker.prototype.seticon(L.icon({
    iconurl:markerIcon
}))

L.marker(pos).addTo(map);