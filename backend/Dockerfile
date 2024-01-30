#base image
FROM ubuntu

# update ubuntu
RUN apt-get update

#install node js
RUN apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash

RUN apt-get upgrade -y

RUN apt-get install -y nodejs




# copy code to container

COPY package.json rms-hackathon-backend/package.json
COPY src rms-hackathon-backend/src
COPY .example.env rms-hackathon-backend/.example.env
COPY .gitignore rms-hackathon-backend/.gitignore
COPY .prettierrc rms-hackathon-backend/.prettierrc

# install dependencies
RUN cd rms-hackathon-backend && npm install


# run the app
ENTRYPOINT [ "node","rms-hackathon-backend/src/server.js" ]

