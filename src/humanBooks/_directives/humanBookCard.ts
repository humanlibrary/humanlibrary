import templateDirectiveHumanBookCard from '../_templates/directiveHumanBookCard.html';

export function humanBookCardDirective() {

  function link($scope, $element, $attributes, humanBooksCardsController) {

    $element.on('$destroy', function() {
      humanBooksCardsController.availableHumanBooksArranger.unregisterElement($element);
      humanBooksCardsController.unavailableHumanBooksArranger.unregisterElement($element);
    });

    $scope.$watch('book.isRentable()', function(isRentable) {
      if (isRentable) {
        humanBooksCardsController.unavailableHumanBooksArranger.unregisterElement($element);
        humanBooksCardsController.availableHumanBooksArranger.registerElement($element, $scope.book);
        return;
      }
      humanBooksCardsController.availableHumanBooksArranger.unregisterElement($element);
      humanBooksCardsController.unavailableHumanBooksArranger.registerElement($element, $scope.book);
    });

  }

  return {
    link,
    require: '^humanBooksCards',
    restrict: 'E',
    template: templateDirectiveHumanBookCard
  };

}
