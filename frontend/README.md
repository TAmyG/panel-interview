1. create image
   docker build -t wildfire-front .

2. run container
   docker run -d --rm -p 8080:8080 --name wildfire-front wildfire-front:latest
