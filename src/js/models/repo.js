define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var RepoModel = Backbone.Model.extend({
    urlRoot: "https://api.github.com/repos/npm/npm",

    initialize: function(options) {
      this.accessToken = {
        access_token: options.apiAccessToken
      }
    },

    url: function() {
      return this.urlRoot + "?" + $.param(this.accessToken);
    }
  });

  return RepoModel;
});
