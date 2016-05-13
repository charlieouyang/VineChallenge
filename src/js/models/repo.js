define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var RepoModel = Backbone.Model.extend({
    urlRoot: "https://api.github.com/repos/npm/npm",
    accessToken: {access_token: "db82690a2e997948d3082812dada9fa94cc8aab6"},

    initialize: function(options) {

    },

    url: function() {
      return this.urlRoot + "?" + $.param(this.accessToken);
    }
  });

  return RepoModel;
});
