let img;

let segments=[];

let numSegments=50;

let pixelCoulour;

let drawSegments = true;

function preload(){
  img = loadImage("asserts/Mona_Lisa_by_Leonardo_da_Vinci_500_x_700.jpg",0,0)
}

function setup() {
  createCanvas(img.width,img.height);

  let segWidth = img.width/numSegments;
  let segHeight = img.height/numSegments;

  for(let yPos=0; yPos<img.height; yPos += segHeight){
    for(let xPos=0; xPos<img.width; xPos+=segWidth){
    let fillColor = img.get(xPos+segWidth/2,yPos+segHeight/2)
    let segment = new ImageSegment(xPos,yPos,segWidth,segHeight,fillColor);
    segments.push(segment);
    }
  }
  pixelCoulour=color(0);
}

function draw() {
  if(drawSegments){
    for (const segment of segments){
      segment.draw();
    }
  }else{
    image(img,0,0);
  }



    stroke(255);
    fill(pixelCoulour);
    circle(mouseX,mouseY,40)
}

 function mouseMoved(){
  pixelCoulour=img.get(mouseX,mouseY)
}

class ImageSegment{
  constructor(xPos,yPos,width,height,fillColor){
    this.xPos = xPos
    this.yPos = yPos
    this.width = width;
    this.height = height;
    this.fillColor=fillColor;
  }

  draw(){
    fill(this.fillColor);
    stroke(0);
    rect(this.xPos,this.yPos,this.width,this.height)
  }
}

function keyPressed(){
  if (key == " "){
    drawSegments=!drawSegments;
    
  }
}
