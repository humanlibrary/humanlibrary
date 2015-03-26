'use strict';

/**
 * @param $window
 * @param $bookCard
 * @returns {{restrict: string, link: link}}
 * @ngInject
 */
function booksContainerDirective($window, $bookCard) {

  function link($scope, $elem, $attrs) {

    var refresh = function() {
      var width = $elem.width();
      $scope.capacity = Math.floor(width / $bookCard.width);
      $scope.margin = (width % $bookCard.width) / ($scope.capacity + 1);
      $scope.$broadcast('refreshBooksPositions');
    };

    refresh();

    angular.element($window).bind('resize', function() {
      refresh();
    });

    $scope.$watch('library.books.length', function(newValue, oldValue) {
      $scope.$broadcast('refreshBooksPositions');
    });
  }

  return {
    restrict: 'C',
    link: link
  };

}

module.exports = booksContainerDirective;