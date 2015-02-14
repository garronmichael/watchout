// start slingin' some d3 here.

var asteroids = [];

var Asteroid = function(id, x, y) {
  this.id = id;
  this.x = x;
  this.y = y;
};
var gameSize = 1000;
var asteroidRadius = 22;

var randomize = function() {
  return Math.floor(Math.max(Math.random() * gameSize - asteroidRadius, 0));
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
    .style({'top': function(d) { return d.y + 'px' },
            'left': function(d) {return d.x + 'px' }
          })
    .enter()
    .append('svg')
      .style({'top': function(d) { return d.y + 'px'; },
              'left': function(d) { return d.x + 'px'; }
              })
      .classed('asteroid', true)
      .attr('width', 50)
      .attr('height', 50)
      .append('circle')
      .attr({
              'cx': '25',
              'cy': '25',
              'r': asteroidRadius,
              'fill': 'green',
              'stroke': 'purple',
              'stroke-width': '1'
            });
};

var move = function() {
  for(var i = 0; i < asteroids.length; i++) {
    asteroids[i].x = randomize();
    asteroids[i].y = randomize();
  }
};

var initialize = function() {
  updateAsteroids();
  move();
  setTimeout(function() { initialize(); }, 1000);
};

initialize();

