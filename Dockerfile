FROM node:argon

#Environment Variables
ENV DATABASE_URI "mongodb://localhost/ideagarden"
ENV DATABASE_USER ""
ENV DATABASE_PASS ""
ENV HASH_SECRET "shhhhh"

# Create app directory
RUN mkdir -p /ideaGarden
WORKDIR /ideaGarden

# Install
COPY package.json /ideaGarden
COPY gulpfile.js /ideaGarden
COPY ./src /ideaGarden/src


# Bundle app source
RUN npm install
RUN ./node_modules/.bin/gulp build
RUN ./node_modules/.bin/gulp install_npm
COPY config_docker.js /ideaGarden/build/config.js

#Image configuration
ADD start.sh /start.sh
RUN chmod 755 /*.sh

EXPOSE 80
CMD ["/start.sh"]
