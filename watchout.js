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

var gameAsteroids = d3.select('.game').selectAll('circle.asteroid').data(asteroids, function(d) { return d.id; });

gameAsteroids.enter()
.append('circle')
  .attr({
    'cy': function(d) { return d.y; },
    'cx': function(d) { return d.x; },
    'r':  asteroidRadius,
    'fill': "url(#image)"
  })
  .classed('asteroid', true);

var enemyUpdate = function() {
  // debugger;

  gameAsteroids.transition().duration(800).attr({
    'cy': function(d) { return d.y; },
    'cx': function(d) {return d.x; }
    }).each('end', function(){
      move();
      console.log(asteroids.length)
      enemyUpdate(asteroids);
    });

};

var move = function() {
  for(var i = 0; i < asteroids.length; i++) {
    asteroids[i].x = randomize();
    asteroids[i].y = randomize();
  }
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
  enemyUpdate();
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

var previousCollision = null;

var checkCollisions = function(asteroid) {
  if ( asteroid !== undefined ) {
    var deltaX = Math.abs( ( asteroid.attr('cx') ) - player[0].x);
    var deltaY = Math.abs( ( asteroid.attr('cy') ) - player[0].y);
    if(deltaX < asteroidRadius && deltaY < asteroidRadius) {
      if ( previousCollision != asteroid.data()[0].id) {
        previousCollision = asteroid.data()[0].id;
        scores[2]++;
        return true;
      }
    }
    return false;
  }
};

var collisionCounter = function() {
  gameAsteroids.each(function(){
    if ( checkCollisions(d3.select(this)) ) {
      scores[2]++;
      scores[1] = 0;
      d3.select('.player').attr('fill', 'red');
    } else {
      d3.select('.player').attr('fill', 'blue');
    }
  });
}

var scores = [0,0,0];
var scoreBoard = d3.select('.scoreboard');
var scoreNumbers = scoreBoard.selectAll('.amount').data(scores);

setInterval(function() {
  scores[1]++;
  if(scores[1] > scores[0]) {
    scores[0] = scores[1];
  }
  scoreNumbers.data(scores).text(function(d) {
    return d;
  })
}, 50);

d3.timer(collisionCounter);


initializeGame();
