function Pipe() {
  //Properties for pipe.
  //Boruların üst, alt, x, genişlik ve hız bilgileri.
  this.top = random(window.gameHeight / 6, 3 / 4 * window.gameHeight);
  this.bottom = window.gameHeight - (this.top + window.pipeSpacing);
  this.x = window.gameWidth;
  this.width = window.pipeWidth
  this.speed = window.pipeSpeed;

  //The pipe is checking to see if it hits a bird.
  //Boru kendine kuş çarpıp çarpmadığını kontrol etmesi.
  this.hits = function (bird) {
    if ((bird.y < this.top || bird.y > height - this.bottom) && (bird.x > this.x && bird.x < this.x + this.width)) return true;
    return false;
  };

  //Drawing stuff.
  //Boyama çizim işlemleri.
  this.show = function () {
    fill(255);
    rectMode(CORNER);
    rect(this.x, 0, this.width, this.top);
    rect(this.x, height - this.bottom, this.width, this.bottom);
  };

  //Position update, based on speed.
  //Hıza göre sola kayması.
  this.update = function () {
    this.x -= this.speed;
  };

  //Screen leaving control.
  //Ekranın solundan çıkıp çıkmadığının kontrolü.
  this.offscreen = function () {
    if (this.x < -this.width)
      return true;
    return false;
  };
}