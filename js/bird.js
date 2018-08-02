function Bird(brain) {
  //Properties of bird.
  //Kuşun x, y, hız, score ve fitness bilgileri.
  this.y = window.gameHeight / 2;
  this.x = 64;
  this.velocity = 0;
  this.score = 0;
  this.fitness = 0;

  //Brain copying of an existing bird. (for mutation)
  //Kuşun mevcut eski bir bireyden türüyor ise onun beynini alması (daha sonradan mutate edilecek.) Yoksa rastgele bir beyin oluşturması.
  if (brain) this.brain = brain.copy();
  else this.brain = new NeuralNetwork(5, 8, 2);

  //Drawing stuff.
  //Boyama ve çizme işlemleri.
  this.show = function () {
    stroke(255);
    fill(255, 100);
    ellipse(this.x, this.y, window.birdR, window.birdR);
  };

  //Jump.
  //Zıplama.
  this.up = function () {
    this.velocity += window.birdLift;
  };

  //Mutation process.
  //Mutasyon işlemi (genetic.js)
  this.mutate = function () {
    this.brain.mutate(0.1);
  };

  //Thinking process. 
  //Düşünme işlemi, kuş kendi yapay sinir ağını kullanarak verilen girdilere göre zıplayıp zıplamamayı tercih ediyor.
  this.think = function (closest) {
    //Neural networks input array. (Inputs are normalized)
    //Sinir ağına girdiler bir dizi olarak veriliyor, bu değerleri normalize ediyoruz.
    var inputs = [];
    inputs[0] = this.y / window.gameHeight;
    inputs[1] = closest.top / window.gameHeight;
    inputs[2] = closest.bottom / window.gameHeight;
    inputs[3] = (closest.x + closest.width) / window.gameWidth;
    inputs[4] = this.velocity / 10;
    var output = this.brain.predict(inputs);

    //Estimation.
    //Çıkan değere göre karar veriyor ve uyguluyoruz (ya da hiç bir şey yapmıyoruz)
    if (output[0] > output[1])
      this.up();
  }

  //Bottom and top boundries control.
  //Ekranın altına ya da üstüne çarptı mı?
  this.offScreen = function () {
    return (this.y > height || this.y < 0);
  };

  //Position and score update. (Score = LifeTime)
  //Konumu ve skorunun sürekli olarak güncellenmesi, puanlama orjinal oyunda boru geçme bazlı yapılsada burada uzun süre hayatta kalma bazlı yapıldı.
  this.update = function () {
    this.score++;
    this.velocity += window.birdGravity;
    this.y += this.velocity;
  };
}
