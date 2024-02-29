import os
import time
import folium
from folium.plugins import HeatMap
import parsefile

data = []

#parsefile.parse_gpx("C:/Users/bryan/Documents/programming/gpx-heatmap/tracks/2023-09-01 09_17_14.gpx")
start_time = time.time()

for file in os.listdir("C:/Users/Bryan/Documents/Programming/gpx-heatmap/tracks"):
    dir = "C:/Users/Bryan/Documents/Programming/gpx-heatmap/tracks/" + file
    data += parsefile.parse_gpx(dir)

m = folium.Map(prefer_canvas=True)

# for point in data[200000:400000]:
#     folium.Circle(
#         location=point,
#         radius=15,
#         color="cornflowerblue",
#         stroke=False,
#         fill=True,
#         fill_opacity=0.25,
#         opacity=1,
#     ).add_to(m)

HeatMap(data, radius=15, gradient={0.60: 'blue', 0.7: 'green', 0.80: 'yellow', 0.9: 'orange', 1: 'red'}).add_to(m)

m.save("index.html")

print('{0:.3f}'.format(time.time() - start_time) + " Seconds")
