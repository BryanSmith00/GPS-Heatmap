import re

def parse_gpx(file):
    try:
        input_file = open(file).read()

        lat = re.findall(r'lat="([^"]{13})' , input_file)
        lon = re.findall(r'lon="([^"]{13})' , input_file)
        
        return(list(zip(lat, lon)))
    except:
        return []
