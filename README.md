# Vine Challenge

This Web App is built using backboneJS, requireJS, and Mustache. It uses Grunt to build all of the dependencies.

## Main App Sections

###Default Page

**URL**
```
http://0.0.0.0:8765/
```

This is the main page of the web app. It lists all of the NPM issues.


###Issue Page

**URL** 
```
http://0.0.0.0:8765/issues/{link_id}
```

This is the URL where users can go and view the npm issue they're interested in.

##Development and Testing

**Github**

Fork this repository, and clone it on your local machine.

**npm**

Navigate to the /VineChallenge folder and run 
```
npm install
```
to install all of the dependencies for the web application.

**grunt**

Staying in the same /VineChallenge directory, run the command 
```
grunt
```
and this will listen for all changes in the app and compile the necessary files and also run the web server
