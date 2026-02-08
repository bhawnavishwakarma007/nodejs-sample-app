FROM ubuntu
COPY . /home/app
WORKDIR /home/app
RUN apt-get update && apt-get install -y nodejs npm
RUN npm install
CMD ["npm","start"]
