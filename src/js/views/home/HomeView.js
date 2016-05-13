define([
  'jquery',
  'underscore',
  'backbone',
  'Mustache',
  'models/issue',
  'models/repo',
  'collections/issues',
  'text!templates/home/homeTemplate.html'
], function($, _, Backbone, Mustache, Issue, Repo, Issues, homeTemplate) {

  var HomeView = Backbone.View.extend({
    el: $("#content"),

    events: {

    },

    initialize: function (opts) {
      this.currentPage = opts.id ? Number(opts.id) : 1;
    },

    render: function() {
      var self = this;
      var bodyText;
      var collection;
      var repo;
      var pagination;
      var resultsData;
      var rendered;

      repo = new Repo();
      repo.fetch({
        success: function(repoModel) {
          pagination = self.determinePagination(repoModel.get("open_issues_count"));

          collection = new Issues({ page: self.currentPage});
          collection.fetch({
            success: function(issues) {
              resultsData = $.extend({}, pagination, { issues: issues.toJSON() });
              rendered = Mustache.to_html(homeTemplate, resultsData);
              self.$el.html(rendered);
            },
            error: function(err) {
              console.log("Error on fetch...");
            }
          });
        }
      });
    },

    //Function to figure out what page the user is on, and how to configure the pagination section at the footer
    determinePagination: function (issuesCount) {
      var pagesPerSet = 8;
      var totalNumberOfPages = Math.ceil(issuesCount / 30);
      var allPageNumbers = [];
      var i;
      var prevArrowState;
      var nextArrowState;
      var totalNumberOfSets;
      var currentSet;
      var lastPageNumberRelatively;
      var pageNum;

      totalNumberOfSets = Math.ceil(totalNumberOfPages / pagesPerSet);
      currentSet = Math.ceil(this.currentPage / pagesPerSet);

      if (currentSet < totalNumberOfSets) {
        for (i = 1; i <= pagesPerSet; i++) {
          pageNum = i + (Math.floor((this.currentPage - 1) / pagesPerSet)*pagesPerSet);
          allPageNumbers.push({
            num: pageNum,
            active: pageNum == this.currentPage
          }); 
        }
      } else {
        lastPageNumberRelatively = totalNumberOfPages % pagesPerSet;
        for (i = 1; i <= pagesPerSet && i <= lastPageNumberRelatively; i++) {
          pageNum = i + (Math.floor((this.currentPage - 1) / pagesPerSet)*pagesPerSet);
          allPageNumbers.push({
            num: pageNum,
            active: pageNum == this.currentPage
          }); 
        }
      }

      //Set the prev and next arrow states
      prevArrowState = {
        state: currentSet > 1,
        link: currentSet > 1 ? (allPageNumbers[0].num - 1): undefined
      };
      nextArrowState = {
        state: currentSet < totalNumberOfSets,
        link: currentSet < totalNumberOfSets ? (allPageNumbers[allPageNumbers.length - 1].num + 1): undefined
      };

      return {
        pageNumbers: allPageNumbers,
        prevArrow: prevArrowState,
        nextArrow: nextArrowState
      };
    }

  });

  return HomeView;

});