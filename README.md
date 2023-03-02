Prevent docker compose cached

$ docker compose build --no-cache
$ docker compose -f "docker-compose.yml" up -d --build 


Nada api url: https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires&status=open&start=2022-01-01&end=2022-01-31