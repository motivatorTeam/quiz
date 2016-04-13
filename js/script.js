var mainPage = [
    {
      h1: 'The Beatles: найвідоміший гурт в історії людства',
      rubric: 'музика',
      quastions: '7 запитань',
      image: 'img/item_music.jpg',
      url: 'simple-test_Beatles.html',
      type: 'glyphicon glyphicon-check'
    },
    {
      h1: 'Художня література XX-XXI століть',
      rubric: 'література',
      quastions: '6 запитань',
      image: 'img/item_literature.jpg',
      url: 'wheel-of-fortune_LiteratureXX.html',
      type: 'glyphicon glyphicon-stop'
    },
    {
      h1: 'Столиці світу',
      rubric: 'географія',
      quastions: '6 запитань',
      image: 'img/item_capitals.jpg',
      url: 'map-test_capital.html',
      type: 'glyphicon glyphicon-screenshot'
    },
    {
      h1: 'Іноземна мова: Англійська',
      rubric: 'кросворди',
      quastions: '2 завдання',
      image: 'img/English1.jpg',
      url: 'crossword.html',
      type: 'glyphicon glyphicon-hand-up'
    },
    {
      h1: 'Світ, у якому ми живемо',
      rubric: 'географія',
      quastions: '5 запитань',
      image: 'img/item_Nature-miracles.jpg',
      url: 'wheel-of-fortune_Nature-miracles.html',
      type: 'glyphicon glyphicon-stop'
    },
    {
      h1: 'Перша світова війна: театр військових дій',
      rubric: 'історія',
      quastions: '6 запитань',
      image: 'img/item_first-world-war.jpg',
      url: 'simple-test_first-world-war.html',
      type: 'glyphicon glyphicon-check'
    },
    {
      h1: 'Вгадай селебріті на фото',
      rubric: 'Медіа',
      quastions: '10 запитань',
      image: 'img/guessPicture.jpg',
      url: 'guessPicture.html',
      type: 'glyphicon glyphicon-check'
    },
    {
      h1: 'Основи JavaScript',
      rubric: 'IT',
      quastions: '6 запитань',
      image: 'img/item_js-code.jpg',
      url: 'time-test_test.html',
      type: 'glyphicon glyphicon-time'
    },
    {
      h1: 'Правила дорожнього руху',
      rubric: 'Громадськість',
      quastions: '6 запитань',
      image: 'img/auto/foto-ustupi-dorogu.jpg',
      url: 'auto.html',
      type: 'glyphicon glyphicon-check'
    },
    {
      h1: 'Планети',
      rubric: 'Астрономiя',
      quastions: '6 запитань',
      image: 'img/item_astronomy.jpg',
      url: 'astronomy.html',
      type: 'glyphicon glyphicon-check'
    },
    {
      h1: 'Перевір свою спритність та кмітливсть',
      rubric: 'Гра',
      quastions: '1 завдання',
      image: 'img/runner.jpg',
      url: 'trickster.html',
      type: 'glyphicon glyphicon-hand-up'
    },
    {
      h1: 'Іноземна мова: Англійська',
      rubric: 'кросворди',
      quastions: '2 завдання',
      image: 'img/English1.jpg',
      url: 'crossword.html',
      type: 'glyphicon glyphicon-hand-up'
    },
    'temp4'
  ];

angular.module('myApp', []).controller('namesCtrl', function($scope) {
  $scope.names = mainPage;
});
