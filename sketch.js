let field = [];
let text = [];
let rez = 10;
let cols, rows;
let increment = 0.15;
let zoff = 0;
let noise;
var img;
var word;
let frameCount = 0;

function preload(){
  img = loadImage('DSC_6739.jpg');
  //word = loadImage('words.png');
}

function setup() {
createCanvas(img.width, img.height);

  //createCanvas(457, 609);

  //pixelDensity(1);

  noise = new OpenSimplexNoise(Date.now());
  cols = 1 + width / rez;
  rows = 1 + height / rez;
  for (let i = 0; i < cols; i++) {
    let k = [];
    for (let j = 0; j < rows; j++) {
      k.push(0);
    }
    field.push(k);
  }

  img.resize(img.width , img.height);
  // word.resize(width, height);
  //img.loadPixels;
  //loadPixels();
  // for(let x = 0; x < img.width; x++){
  //   let bright = [];
  //   for(let y = 0; y < img.height; y++){
  //     let index = (x + y * width)*4;
  //     let r = img.pixels[index+0];
  //     let g = img.pixels[index+1];
  //     let b = img.pixels[index+2];
  //
  //     bright.push((r+g+b)/3);
  //
  //
  //   }
  //      text.push(bright);
  // }

  img.loadPixels;
  loadPixels();
  //image(img, 0, 0);

  for(let x = 0; x < img.width + rez; x+=rez){
    let bright = [];
    for(let y = 0; y < img.height + rez; y+=rez){

      let c = img.get(x,y);
      //bright[y] = map(brightness(c), 0, 255, 255, 0);
      bright.push(brightness(c));


      // fill(c);
      //stroke(100);
      // rect(x, y, rez, rez);


    }
    text.push(bright);

  }

}



  // function showText(){
  //
  //   for (let i = 0; i < cols; i++) {
  //     for (let j = 0; j < rows; j++) {
  //       fill(text[i][j]*255, 100, text[i][j]*255);
  //       noStroke();
  //       rect(i*rez, j*rez, rez, rez);
  //
  //     }
  //   }
  //
  // }

function drawLine(v1, v2) {
  line(v1.x, v1.y, v2.x, v2.y);
}

function draw() {
//background(255);
//frameCount(60);


  let xoff = 0;
  for (let i = 0; i < cols; i++) {
    xoff += increment;
    let yoff = 0;
    for (let j = 0; j < rows; j++) {
      if (field[i][j] < text[i][j]-40){
      field[i][j] = float(noise.noise3D(xoff, yoff, zoff));
    }else {
        field[i][j] = text[i][j];
      }
      yoff += increment;
    }
  }
  zoff += 0.008;



  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(field[i][j]*255, 100, field[i][j]*255);


      //strokeWeight(0.1);
      noStroke();
      rect(i*rez, j*rez, rez, rez);

    }
  }



  for (let i = 0; i < cols - 1; i++) {
    for (let j = 0; j < rows - 1; j++) {
      let x = i * rez;
      let y = j * rez;
      let a = createVector(x + rez * 0.5, y);
      let b = createVector(x + rez, y + rez * 0.5);
      let c = createVector(x + rez * 0.5, y + rez);
      let d = createVector(x, y + rez * 0.5);
      let state = getState(
        ceil(field[i][j]),
        ceil(field[i + 1][j]),
        ceil(field[i + 1][j + 1]),
        ceil(field[i][j + 1])
      );
      stroke(255);
      strokeWeight(8);
      //noStroke();
      switch (state) {
        case 1:
          drawLine(c, d);
          break;
        case 2:
          drawLine(b, c);
          break;
        case 3:
          drawLine(b, d);
          break;
        case 4:
          drawLine(a, b);
          break;
        case 5:
          drawLine(a, d);
          drawLine(b, c);
          break;
        case 6:
          drawLine(a, c);
          break;
        case 7:
          drawLine(a, d);
          break;
        case 8:
          drawLine(a, d);
          break;
        case 9:
          drawLine(a, c);
          break;
        case 10:
          drawLine(a, b);
          drawLine(c, d);
          break;
        case 11:
          drawLine(a, b);
          break;
        case 12:
          drawLine(b, d);
          break;
        case 13:
          drawLine(b, c);
          break;
        case 14:
          drawLine(c, d);
          break;
      }
    }
  }

//saveFrames('img'+ frameCount, 'jpg');
//frameCount++;
  //image(word, 0, 0);
 }

function getState(a, b, c, d) {
  return a * 8 + b * 4 + c * 2 + d * 1;
}

   //function mousePressed(){
    //saveFrames('##', 'jpg', 10,30);
   //}
