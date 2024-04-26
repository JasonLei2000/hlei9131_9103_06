let img;

let segments=[];

let numSegments=50;

let pixelCoulour;

let drawSegments = false;

let imgDrwPrps={aspect: 0,width:0,height:0,xOffset:0,yOffset:0};

let canvasAspectRatio = 0;

function preload(){
  img = loadImage("asserts/Mona_Lisa_by_Leonardo_da_Vinci_500_x_700.jpg",0,0)
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  canvasAspectRatio=width/height;

  imgDrwPrps.aspect = img.width/img.height
 calculateImageDrawProps();
  
  let segWidth = img.width/numSegments;
  let segHeight = img.height/numSegments;

  for(let yPos=0; yPos<img.height; yPos += segHeight){
    for(let xPos=0; xPos<img.width; xPos+=segWidth){
    let fillColor = img.get(xPos+segWidth/2,yPos+segHeight/2)
    let segment = new ImageSegment(xPos/segWidth,yPos/segHeight,fillColor);
    segments.calculateSegDrawProps;
    segments.push(segment);
    }
  }
  pixelCoulour=color(0);
}


function calculateImageDrawProps(){
  if(imgDrwPrps.aspect > canvasAspectRatio){
    imgDrwPrps.width =width;
    imgDrwPrps.height = width/imgDrwPrps.aspect;
    imgDrwPrps.xOffset=0;
    imgDrwPrps.yOffset= (height-imgDrwPrps.height)/2;

  }else if(imgDrwPrps.aspect < canvasAspectRatio){
    imgDrwPrps.width = height*imgDrwPrps.aspect;
    imgDrwPrps.height = height;
    imgDrwPrps.xOffset = (width-imgDrwPrps.width)/2;
    imgDrwPrps.yOffset= 0;
  }else if(imgDrwPrps.aspect == canvasAspectRatio){
    imgDrwPrps.width =width;
    imgDrwPrps.height = height;
    imgDrwPrps.xOffset=0;
    imgDrwPrps.yOffset= 0;
  }
}

function draw() {
  background(0);
  if(drawSegments){
    for (const segment of segments){
      segment.draw();
    }
  }else{
    image(img,imgDrwPrps.xOffset,imgDrwPrps.yOffset,imgDrwPrps.width,imgDrwPrps.height);
  }
    stroke(255);
    fill(pixelCoulour);
    // circle(mouseX,mouseY,40)
}

 function mouseMoved(){
  pixelCoulour=img.get(mouseX,mouseY)
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
  canvasAspectRatio=width/height;
  calculateImageDrawProps();

  segments.forEach(segments=>{
    segment.calculateImageDrawProps();
  })
}

class ImageSegment{

  constructor(rowPos,colPos,fillColor){
    this.rowPos=rowPos;
    this.colPos=colPos;

    this.xPos = 0;
    this.yPos = 0;
    this.width = 0;
    this.height = 0;
    this.fillColor=fillColor;
  }

  calculateSegDrawProps(){
    this.width = imgDrwPrps.width/numSegments;
    this.height = imgDrwPrps.height/numSegments;

    this.xPos=this.rowPos*this.width+imgDrwPrps.xOffset
    this.yPos=this.colPos*this.width+imgDrwPrps.yOffset
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
