//New generation func. AssignFitness -> RandomGenom -> Mutation
//Yeni jenerasyon oluşturulması, fitnessler hesaplanıyor, sonra rasgele olarak seçilen bireylerin beyni mutate edilip yeni bir birey ortaya çıkarılıyor.
function nextGeneration() {
  assignFitness();
  chartData.addRow([window.Generation++, Math.max.apply(Math, allBirds.map(function (o) { return o.score; }))]);
  drawChart();

  for (var i = 0; i < NumberOfBirdsInGeneration; i++)
    birds[i] = pickOne();
  allBirds = [];
}

//Random genom selecting from existing birds.
//Eldeki mevcut fitness'ı hesaplanmış kuşlardan, fitness'ı büyük olanları seçiyoruz (çeşitliliği sağlamak için, arada rastgele olarak düşüklerde seçiliyor)
function pickOne() {
  var index = 0;
  var r = random(1);
  while (r > 0) {
    r = r - allBirds[index].fitness;
    index++;
  }
  index--;
  var bird = allBirds[index];
  var child = new Bird(bird.brain);
  child.mutate();
  return child;
}

//Fitness calc.
//Her bir kuşun fitness değeri hesaplanıyor, skor/grubunToplamSkoru
function assignFitness() {
  var sum = 0;
  allBirds.forEach(bird => {
    sum += bird.score;
  });
  allBirds.forEach(bird => {
    bird.fitness = bird.score / sum;
  });
}
