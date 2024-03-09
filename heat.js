function readFiles(files, data) {
  var reader = new FileReader();

  function readFile(index, data) {
    if (index >= files.length) {
      //this is where we call our next function
      console.log(data.getTracks());
      console.log(data.getAllData());

      // Takes all the coordinate data and generates a heatmap layer
      var heat = L.heatLayer(data.getAllData(), {
        radius: 10,
        gradient: {
          0.4: "blue",
          0.6: "cyan",
          0.7: "lime",
          0.8: "yellow",
          0.95: "red",
        },
      }).addTo(map);

      return;
    }
    var file = files[index];

    reader.onload = function (e) {
      var filedata = e.target.result;

      lat = filedata.match(/lat="[^"]+/g);
      lon = filedata.match(/lon="[^"]+/g);

      if (lat != null && lon != null) {
        lat = lat.map((e) => parseFloat(e.substring(e.indexOf('"') + 1)));
        lon = lon.map((e) => parseFloat(e.substring(e.indexOf('"') + 1)));
        //zips the lat and lon arrays together into a single list
        latlon = lat.map((e, i) => [e, lon[i]]);

        console.log(lat.length);
        console.log(lon.length);

        data.addTrack(latlon);
      }

      readFile(index + 1, data);
    };
    reader.readAsText(file);
  }

  readFile(0, data);
}

//entry point
let data = new Object();
data.tracks = [];
data.addTrack = function (track) {
  this.tracks.push(track);
};
data.getTracks = function () {
  return this.tracks;
};
data.getAllData = function () {
  let e = [];
  for (let i = 0; i < this.tracks.length; i++) {
    for (let j = 0; j < this.tracks[i].length; j++) {
      e.push(this.tracks[i][j]);
    }
  }
  return e;
};

var map = L.map("map").setView([30, -5], 3);

var tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let input = document.getElementById("files");

input.onchange = function showFile() {
  let files = input.files;
  readFiles(files, data);
};
