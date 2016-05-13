define([
  'jquery',
  'underscore',
  'backbone',
  'Mustache',
  'Marked',
  'models/issue',
  'collections/comments',
  'text!templates/issue/issueTemplate.html'
], function($, _, Backbone, Mustache, Marked, Issue, Comments, issueTemplate) {

  var IssueView = Backbone.View.extend({

    el: $("#content"),

    events: {
      
    },

    initialize: function (opts) {
      var self = this;

      this.issueModel = new Issue({
        id: opts.issueId
      });
      this.comments = new Comments({
        id: opts.issueId
      });
    },

    render: function(args) {
      var self = this;
      var rendered;
      var issueData;
      var commentBody;

      this.issueModel.fetch({
        success: function(issue){
          issueData = issue.toJSON();

          issueData.stateOpen = issueData.state === "open";
          issueData.stateClosed = issueData.state === "closed";
          issueData.body = Marked(issueData.body);

          self.comments.fetch({
            success: function(comments) {
              comments.each(function(model){
                commentBody = model.get("body");
                commentBody = Marked(commentBody);

                if (commentBody.indexOf("@") >= 0) {
                  var found = commentBody.match(/@[^\s]+/gi)[0];
                  var re = new RegExp(found, 'g');
                  commentBody = commentBody.replace(re, '<a href="' + model.get("user").html_url + '">@' + model.get("user").login + '</a>');
                }
                model.set({ 'body': commentBody });
              });
              issueData.comments = comments.toJSON();

              rendered = Mustache.to_html(issueTemplate, issueData);
              self.$el.html(rendered);
            }
          });
        },
        error: function(error) {
          console.log("Error fetching issue");
        }
      });
    }

  });

  return IssueView;
});