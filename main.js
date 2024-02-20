import "./style.css";
import { Map, View } from "ol";
//import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import Heatmap from "ol/layer/Heatmap";
import GPX from "ol/format/GPX";

//test imports
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";

const style = {
  Point: new Style({
    image: new CircleStyle({
      fill: new Fill({
        color: "rgba(255,255,0,0.4)",
      }),
      radius: 5,
      stroke: new Stroke({
        color: "#ff0",
        width: 1,
      }),
    }),
  }),
  LineString: new Style({
    stroke: new Stroke({
      color: "#f00",
      width: 3,
    }),
  }),
  MultiLineString: new Style({
    stroke: new Stroke({
      color: "#0f0",
      width: 3,
    }),
  }),
};

/*
const heat = new Heatmap({
  source: new VectorSource({
    url: "tracks/2023-05-23 11_11_55.gpx",
    format: new GPX(),
  }),
  blur: 25,
  radius: 1000,
    style: function (feature) {
    return style[feature.getGeometry().getType()];
  },
});
*/

const vector = new VectorLayer({
  source: new VectorSource({
    url: "tracks/2023-05-23 11_11_55.gpx",
    format: new GPX(),
  }),
  style: function (feature) {
    return style[feature.getGeometry().getType()];
  },
});

const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    vector,
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
