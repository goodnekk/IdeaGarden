[![Dependency Status](https://david-dm.org/CodeForEindhoven/IdeaGarden.svg?path=src/server)](https://david-dm.org/CodeForEindhoven/IdeaGarden?path=src/server)

#IdeaGarden

#requirements

IdeaGarden requires mongodb.

#Install
We use gulp as a build system. gulp can be installed with:

```
sudo npm install -g gulp
```

cd into the directory for IdeaGarden
```
npm install
gulp build
gulp install_npm
```

#Configure

Copy the file config.default.js to config.js and alter the settings to fit your needs.

#Run

You can run IdeaGarden locally with
```
gulp develop
```

It will watch changes in the source directory.




for development you can use `gulp develop`. This will start the server and automagically rebuild on file changes.
