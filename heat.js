var map = L.map("map").setView([-37.87, 175.475], 12);

var tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

addressPoints = addressPoints.map(function (p) {
  return [p[0], p[1]];
});

var heat = L.heatLayer(addressPoints).addTo(map);
