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
      h1: 'Художня література XX століття',
      rubric: 'література',
      quastions: '5 запитань',
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
      h1: 'Планети',
      rubric: 'Астрономiя',
      quastions: '6 запитань',
      image: 'img/item_astronomy.jpg',
      url: 'astronomy.html',
      type: 'glyphicon glyphicon-check'
    },
    {
      h1: 'Тварини: коти',
      rubric: 'біологія',
      quastions: '6 запитань',
      image: 'img/cats/vHldBQ64fpM.jpg',
      url: 'cats-animal.html',
      type: 'glyphicon glyphicon-check'
    },
    'temp2',
    'temp3',
    'temp4'
  ];

angular.module('myApp', []).controller('namesCtrl', function($scope) {
  $scope.names = mainPage;
});
