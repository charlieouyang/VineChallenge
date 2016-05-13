// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'views/issue/IssueView',
  'views/error/404View'
], function($, _, Backbone, HomeView, IssueView, error404View) {

  this.githubApiAccessToken = "db82690a2e997948d3082812dada9fa94cc8aab6";

  var AppRouter = Backbone.Router.extend({
    routes: {
      //Default Page
      "": "homePage",
      ":myId": "homePage",
      ":myId/": "homePage",

      //Issue page
      "issues/:myId": "issuePage",
      "issues/:myId/": "issuePage",

      //404
      '*actions': 'undefinedRoutes'
    }
  });

  var initialize = function() {

    var app_router = new AppRouter;

    app_router.on('route:homePage', function(id) {
      console.log("Hit home page: /");
      var homeView = new HomeView({
        id: id,
        apiAccessToken: self.githubApiAccessToken
      });
      homeView.render();
    });

    app_router.on('route:issuePage', function(id) {
      console.log("Hit issue page");
      var issueView = new IssueView({
        issueId: id,
        apiAccessToken: self.githubApiAccessToken
      });
      issueView.render();
    });

    app_router.on('route:undefinedRoutes', function(actions) {
      // We have no matching route, lets display the home page 
      var errorView = new error404View();
      errorView.render({
        action: actions
      });
    });

    Backbone.history.start({
      pushState: true,
      root: '/'
    });
  };

  var navigate = function(url, opts) {
    if (url === "") {
      window.location.href = "/";
    }
  };

  return {
    initialize: initialize,
    navigate: navigate
  };
});