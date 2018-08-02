# genetic-flappy-bird
Genetik Algoritma ve Yapay Sinir Ağları ile Flappy Bird

# Kullanılan Kütüphaneler
 * p5.js
 * nn.js
 * matrix.js
 # Oyun Hakkında
 Oyun p5.js kullanarak yazılmıştır. Bütün olay boru, kuş sınıflarını kullanan main.js içinde gerçekleşmektedir.
 # Öğrenme Aşaması
 Oyun ilk başladığında rastgele yapay sinir ağlarına ait ilk jenerasyon 500 kuş oluşturulmaktadır. Hayatta kalan son kuş ölene kadar oyun devam etmekdir. Son kuş öldüğünde ise, mevcut 500 kuştan skorları en iyi olanları (rastgelelik katmak için skor'a her zaman dikkat edilmiyor.) seçilip yeni jenerasyon ortaya çıkarılıyor. İlerlemeyi görebilmek için ekstra olarak grafiği takip edebilirsiniz, her jenerasyonun en yüksek skorunu göstermektedir.
