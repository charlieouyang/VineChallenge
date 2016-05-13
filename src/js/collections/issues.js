define([
  'underscore',
  'backbone',
  'models/issue'
], function(_, Backbone, IssueModel) {

  var IssuesCollection = Backbone.Collection.extend({
    urlRoot: "https://api.github.com/repos/npm/npm/issues",
    accessToken: {access_token: "db82690a2e997948d3082812dada9fa94cc8aab6"},

    initialize: function(options) {
      this.params = options;
    },

    url: function() {
      var fetchParams = $.extend({}, this.accessToken, this.params);

      return this.urlRoot + "?" + $.param(fetchParams);
    }
  });

  return IssuesCollection;

});