// start slingin' some d3 here.

/*
 * GAME SETTINGS
 */
var gameSize = 1000;
var asteroidRadius = 22;


var asteroids = [];


var Asteroid = function(id, x, y) {
  this.id = id;
  this.x = x;
  this.y = y;
};

var randomize = function() {
  return Math.random()*gameSize;
};
for(var i = 0; i < 25; i++) {
  var zoom = d3.behavior.zoom();
  var x = randomize();
  var y = randomize();
  var asteroid = new Asteroid(i, x, y);
  asteroids.push(asteroid);
}

var enemyUpdate = function(asteroidData) {

  var gameAsteroids = d3.select('.game').selectAll('circle.asteroid').data(asteroidData);

  gameAsteroids.enter()
  .append('circle')
    .attr({
      'cy': function(d) { return d.y; },
      'cx': function(d) { return d.x; },
      'r':  asteroidRadius,
      'fill': "url(#image)"
    })
    .classed('asteroid', true);

  gameAsteroids.transition().duration(500).attr({
    'cy': function(d) { return d.y; },
    'cx': function(d) {return d.x; }
    })

};

var move = function() {
  for(var i = 0; i < asteroids.length; i++) {
    asteroids[i].x = randomize();
    asteroids[i].y = randomize();
  }
};

var initializeEnemies = function() {
  enemyUpdate(asteroids);
  move();
  setTimeout(function() { initializeEnemies(); }, 1000);
};


var player = [{
  x: .5 * gameSize,
  y: .5 * gameSize
}];

var playerUpdate = function(playerData){
  var player = d3.select('.game')
    .selectAll('.player')
    .data(playerData);

  player.attr({
    'cy': function(d) { return d.y; },
    'cx': function(d) { return d.x; }
  });

  player.enter()
    .append('circle')
      .attr({
        'cy': function(d) { return d.y; },
        'cx': function(d) { return d.x; },
        'r': asteroidRadius,
        'fill': 'blue'
      })
      .classed('player', true).call(drag);

};

var initializeGame = function() {
  initializeEnemies();
  playerUpdate(player);
};

var drag = d3.behavior.drag();

drag.on('drag', function(d) {
  d3.select('.player')
  .attr({
    'cy': function(d) {
      player[0].y = d3.event.y;
      return player[0].y;
    },
    'cx': function(d) {
      player[0].x = d3.event.x;
      return player[0].x;
    }
  })
});

var checkCollisions = function() {
  var deltaX, deltaY;
  for(var i = 0; i < asteroids.length; i++) {
    deltaX = Math.abs(asteroids[i].x - player[0].x);
    deltaY = Math.abs(asteroids[i].y - player[0].y);
    if(deltaX < asteroidRadius && deltaY < asteroidRadius) {
      return true;
    }
  }
  return false;
};

initializeGame();
