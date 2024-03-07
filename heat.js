function readFiles(files) {
  var reader = new FileReader();

  function readFile(index) {
    if (index >= files.length) return;
    var file = files[index];

    reader.onload = function (e) {
      var filedata = e.target.result;

      lat = filedata.match(/lat="[^"]{13}/g);
      lon = filedata.match(/lon="[^"]{13}/g);

      lat = lat.map((e) => parseFloat(e.substring(e.indexOf('"') + 1)));
      lon = lon.map((e) => parseFloat(e.substring(e.indexOf('"') + 1)));

      latlon = lat.map((e, i) => [e, lon[i]]);
      console.log(latlon);

      readFile(index + 1);
    };
    reader.readAsText(file);
  }

  readFile(0);
}

var map = L.map("map").setView([0, 0], 2);

var tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

addressPoints = addressPoints.map(function (p) {
  return [p[0], p[1]];
});

//var heat = L.heatLayer(addressPoints).addTo(map);

let input = document.getElementById("files");

input.onchange = function showFile() {
  let files = input.files;
  readFiles(files);
};
