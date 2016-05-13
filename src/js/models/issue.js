define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var IssueModel = Backbone.Model.extend({
    urlRoot: "https://api.github.com/repos/npm/npm/issues/",

    initialize: function(options) {
      this.urlRoot += options.id;
      this.accessToken = {
        access_token: options.apiAccessToken
      }
    },

    url: function() {
      return this.urlRoot + "?" + $.param(this.accessToken);
    }
  });

  return IssueModel;
});
