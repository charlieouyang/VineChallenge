define([
  'underscore',
  'backbone',
  'models/issue'
], function(_, Backbone, IssueModel) {

  var IssuesCollection = Backbone.Collection.extend({
    urlRoot: "https://api.github.com/repos/npm/npm/issues",

    initialize: function(options) {
      this.params = options;
      this.accessToken = {
        access_token: options.apiAccessToken
      }
    },

    url: function() {
      var fetchParams = $.extend({}, this.accessToken, this.params);

      return this.urlRoot + "?" + $.param(fetchParams);
    }
  });

  return IssuesCollection;

});