//index.js


//imports
import "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

//creating a map
const map = L.map("map1");

//credit the authours of the copywrighted resources - open street map is an open map - meaning you have to credot ot every time you use it
const attrib = "Map data copyright OpenStreetMap contributer, liscened under the Open Database Liscene";

L.tileLayer
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: attrib } ).addTo(map);


//this would be for the default view 
const pos = [50.908,-1.4]
map.setView(pos, 14)

L.marker(pos).addTo(map);

//popup
const marker = L.marker(pos).addTo(map);

const description = prompt("Please enter as description for the marker")
marker.bindPopup(description);
