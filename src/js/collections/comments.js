define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var CommentsCollection = Backbone.Collection.extend({
    urlRoot: "https://api.github.com/repos/npm/npm/issues/",
    accessToken: {access_token: "db82690a2e997948d3082812dada9fa94cc8aab6"},

    initialize: function(options) {
      this.urlRoot += options.id + "/comments";
    },

    url: function() {
      return this.urlRoot + "?" + $.param(this.accessToken);
    }
  });

  return CommentsCollection;

});