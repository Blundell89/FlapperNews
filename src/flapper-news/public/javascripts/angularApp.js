var app = angular.module('flapperNews', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl'
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl',
        controllerAs: 'ctrl'
      });

    $urlRouterProvider.otherwise('home');
  }
]);

app.factory('posts', [function() {
  var o = {
    posts: []
  };

  return o;
}]);

app.controller('PostsCtrl', [
  '$stateParams',
  'posts',
  function($stateParams, posts) {
    var that = this;

    that.post = posts.posts[$stateParams.id];

    that.addComment = function () {
      if (that.body === '') {
        return;
      }

      that.post.comments.push({
        body: that.body,
        author: 'user',
        upvotes: 0
      });

      that.body = '';
    };
  }
]);

app.controller('MainCtrl', [
  'posts',
  function(posts) {
    var that = this;

    that.posts = posts.posts;

    that.addPost = function() {
      if (!that.title || that.title === '') {
        return;
      }

      that.posts.push({
        title: that.title,
        link: that.link,
        upvotes: 0,
        comments: [{
          author: 'Joe',
          body: 'Cool post!',
          upvotes: 0
        }, {
          author: 'Bob',
          body: 'Great idea but everything is wrong!',
          upvotes: 0
        }]
      });

      that.title = '';
      that.link = '';
    };

    that.incrementUpvotes = function(post) {
      post.upvotes++;
    };
  }
]);
