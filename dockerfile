FROM ubuntu
COPY . /home/app
WORKDIR /home/app
RUN apt-get install -y nodejs npm && \
    npm install
CMD ["npm","start"]
