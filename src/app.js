var app = angular.module('flapperNews', ['ui.router']);

app.factory('posts', [function () {
  var o = {
    posts: []
  };

  return o;
}]);

app.controller('MainCtrl', ['posts', function (posts) {
  var that = this;

  that.posts = posts.posts;

  that.addPost = function () {
    if (!that.title || that.title === '') {
      return;
    }

    that.posts.push({
      title: that.title,
      link: that.link,
      upvotes: 0
    });

    that.title = '';
    that.link = '';
  };

  that.incrementUpvotes = function (post) {
    post.upvotes++;
  };
}]);
