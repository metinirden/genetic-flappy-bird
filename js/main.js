//Genetic variables.
//Genetik değişkenleri.
var NumberOfBirdsInGeneration = 500;
var Generation = 1;
var birds = [];
var allBirds = [];
var pipes = [];
var closestPipe = null;

//Game variables.
//Oyun değişkenleri.
var frame = 0;
var gameHeight = window.innerHeight - 20;
var gameWidth = gameHeight * 2 / 3;
var pipeSpeed = Math.round(gameWidth * 0.01);
var pipeSpacing = Math.round(gameHeight * 0.2);
var pipeWidth = Math.round(gameWidth * 0.15);
var distanceBetweenPipesInFrame = 80;
var birdR = Math.round(gameWidth * 0.05);
var birdGravity = gameWidth * 0.001;
var birdLift = gameWidth * -0.025;
var chart = null;
var chartData = null;
var chartOptions = {};

//Init.
//Başlangıç fonk.
function setup() {
  //Canvas creating.
  //Oyun için canvas'ı oluşturma (p5.js)
  createCanvas(gameWidth, gameHeight);

  //First generation birds with random neural networks.
  //Rastgele olarak oluşturularn yapay sinir ağlarına 1. jenerasyon.
  for (var i = 0; i < NumberOfBirdsInGeneration; i++)
    birds[i] = new Bird();
}

//Update func. (p5.js)
//Güncelleme fonk. (p5.js her frame için)
function draw() {
  //Add a pipe every distanceBetweenPipesInFrame.
  //Belirlenen frame miktarı döndükçe boru ekleme.
  if (frame % distanceBetweenPipesInFrame == 0)
    pipes.push(new Pipe());
  frame++;
  findClosestPipe();

  pipes.forEach(pipe => {
    pipe.update();
    birds.forEach(bird => {
      //Any of the birds on the screen crashing into the pipe? 
      //Ekrandaki kuşlardan herhangi biri boruya çarpıyor mu? Çarpıyor ise aktif kuşlardan çıkartıp, ayrı bir listeye alıyoruz.
      if (pipe.hits(bird))
        allBirds.push(birds.splice(birds.indexOf(bird), 1)[0]);
    });

    //Delete pipe when go off the screen
    //Boru ekrandan kaybolduysa siliyoruz.
    if (pipe.offscreen())
      pipes.splice(pipes.indexOf(pipe), 1);
  });

  //Bottom and top boundries control.
  //Kuş ekranın altına ya da üstüne çarpıyor mu?
  birds.forEach(bird => {
    if (bird.offScreen())
      allBirds.push(birds.splice(birds.indexOf(bird), 1)[0]);
  });

  //Every bird, make estimation whether its need to jump or not according to inputs.
  //Her bir kuş, yapar sinir ağlarına verilen girdilere göre zıplamasını gerekip gerekmediğini tahmin ediyor, ve durumu update ediliyor.
  birds.forEach(bird => {
    bird.think(closestPipe);
    bird.update();
  });

  //When we run out of birds, we need to create a new generation and reset game.
  //Eğer elimizde kuş kalmazsa mevcut jenerasyondan yararlanarak yeni bir jenerasyon oluşturuyorus (genetic.js)
  //Bu sırada frame ve oyunuda görsel olarak resetliyoruz.
  if (birds.length === 0) {
    nextGeneration();
    frame = 0;
    pipes = [];
  }

  //Drawing staff.
  //Kuşlar ve boruların boyanması.
  background(0);
  birds.forEach(bird => { bird.show(); });
  pipes.forEach(pipe => { pipe.show(); });
}

//Find the closest pipe.
//En yakın boruyu bulma.
function findClosestPipe(bird) {
  closestPipe = pipes[0];
}

google.charts.load('current', {
  callback: function () {
    chartData = new google.visualization.DataTable({
      "cols": [
        { "id": "", "label": "Life Time", "type": "number" },
        { "id": "", "label": "Generation", "type": "number" }
      ]
    })
    chartData.addRow([0, 0]);
    chartOptions = {
      pointSize: 3,
      animation: {
        startup: true,
        duration: 600,
        easing: 'in'
      },
      legend: 'none',
      hAxis: {
        title: 'Generation',
      },
      vAxis: {
        title: 'Life Time'
      }
    };

    chart = new google.visualization.LineChart(document.getElementById('chart'));
    drawChart();
  },
  packages: ['corechart']
});

function drawChart() {
  chart.draw(chartData, chartOptions);
}