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
http://0.0.0.0:8765/issues/{issue_number}
```

This is the URL where users can go and view the npm issue they're interested in.

##Development and Testing

**Github**

Fork this repository, and clone it on your local machine.

**Github Personal API Key**

Navigate to /VineChallenge/src/js/router.js and replace my personal API access token (expired already) with one you generated. I had to use tokens because api.github.com thought I was DDOSing it. See this for more information as how to generate your token https://help.github.com/articles/creating-an-access-token-for-command-line-use/

```
this.githubApiAccessToken = "db82690a2e997948d3082812dada9fa94cc8aab6";
```

**npm**

Navigate to the /VineChallenge folder and run 
```
npm install
```
to install all of the dependencies for the web application.

**grunt**

Make sure grunt is installed. https://www.npmjs.com/package/grunt-cli

Staying in the same /VineChallenge directory, run the command 
```
grunt
```
and this will listen for all changes in the app and compile the necessary files and also run the web server
