define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var CommentsCollection = Backbone.Collection.extend({
    urlRoot: "https://api.github.com/repos/npm/npm/issues/",

    initialize: function(options) {
      this.urlRoot += options.id + "/comments";
      this.accessToken = {
        access_token: options.apiAccessToken
      }
    },

    url: function() {
      return this.urlRoot + "?" + $.param(this.accessToken);
    }
  });

  return CommentsCollection;

});