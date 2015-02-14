// start slingin' some d3 here.
var asteroids = [];

var Asteroid = function(id, x, y) {
  this.id = id;
  this.x = x;
  this.y = y;
};
var asteroidRadius = 22;

var randomize = function() {
  return Math.random()*100;
};
for(var i = 0; i < 25; i++) {
  var zoom = d3.behavior.zoom();
  var x = randomize();
  var y = randomize();
  var asteroid = new Asteroid(i, x, y);
  asteroids.push(asteroid);
}

var updateAsteroids = function(){
  d3.select('.game').selectAll('svg.asteroid')
    .data(asteroids)
    .style({'top': function(d) { return d.y + '%' },
            'left': function(d) {return d.x + '%' }
          })
    .enter()
      .append('svg')
        .style({
          'top': function(d) { return d.y + '%'; },
          'left': function(d) { return d.x + '%'; }
        })
        .classed('asteroid', true)
        .attr({
          'width': 50,
          'height': 50,
        })
        .append('image')
          .attr({
            'xlink:href': 'assets/asteroid.png',
            'width': 25,
            'height': 25
          })
};

var move = function() {
  for(var i = 0; i < asteroids.length; i++) {
    asteroids[i].x = randomize();
    asteroids[i].y = randomize();
  }
};

var initializeEnemies = function() {
  updateAsteroids();
  move();
  setTimeout(function() { initializeEnemies(); }, 1000);
};

initializeEnemies();

var player = [{
  x: 0,
  y: 0
}];

var updatePlayer = function(){
  d3.select('.game').selectAll('.player')
  .data(player)
  .style({
    'top': function(d) { return d.y + 'px' },
    'left': function(d) {return d.x + 'px' }
  })
  .enter()
    .append('svg')
      .style({
        'top': function(d) { return d.y + 'px'; },
        'left': function(d) { return d.x + 'px'; }
      })
      .classed('player', true)
      .attr({
        'width': 50,
        'height': 50,
      })
      .append('circle')
        .attr({
          'r': 25,
          'cx': 25,
          'cy': 25,
          'fill': 'blue'
        }).call(drag);
};

var initializeGame = function() {
  initializeEnemies();
  updatePlayer();
};

var drag = d3.behavior.drag();

drag.on('drag', function(d) {
  d3.select('.player')
  .style({
    'top': function(d) {
      return d3.event.y;
    },
    'left': function(d) {
      return d3.event.x;
    }
  })
  return this;
});


initializeGame();
