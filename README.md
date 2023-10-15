# Tiny URL App
This is a tiny url app created as a side project.

## Create database
Run mongodb in docker using docker-compose up -d from project root

## Run api server
cd /server and run npm run start to run the api server

## Create tiny url 
Send a POST request to '/api/tinyurl' with the long url {url: 'www.mylongurl.com'}
Server will respond with a hashed tiny url value of 7 chars e.g. 'NmY0OTI'

## Navigate to tiny url
Navigate to {BASE_PATH}/{tinyurl} e.g. http://localhost:3100/NmY0OTI to be redirected to the original long url

## Client side app coming shortly