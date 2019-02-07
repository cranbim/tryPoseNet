var video;
var poseNet;
var figures=[];
var ready=false;

function setup() {
  createCanvas(640,480);
  video=createCapture(VIDEO);
  video.hide();
  poseNet=ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function draw() {
  image(video,0,0);
  if(ready){
    figures.forEach(function(fig){
      fig.show(0,0,1);
    });
  }
}

function modelReady(){
  console.log("poseNet ready");
  ready=true;
}

function gotPoses(poses){
  // console.log(poses);
  makeFiguresFromPoseData(poses);
}

function makeFiguresFromPoseData(data){
  // console.log(data);
  figures=[];
  data.forEach(function(figData){
    if(figData.pose.score>0.2){
      figures.push(new Figure(figData.pose));
    }
  });
}



function Figure(data){
  // console.log(data.keypoints[0]);
  var nose=[{x: data.keypoints[0].position.x, y: data.keypoints[0].position.y}];
  var eyes=[{x: data.keypoints[1].position.x, y: data.keypoints[1].position.y}, {x: data.keypoints[2].position.x, y: data.keypoints[2].position.y}];
  var ears=[{x: data.keypoints[3].position.x, y: data.keypoints[3].position.y}, {x: data.keypoints[4].position.x, y: data.keypoints[4].position.y}];
  var shoulders=[{x: data.keypoints[5].position.x, y: data.keypoints[5].position.y}, {x: data.keypoints[6].position.x, y: data.keypoints[6].position.y}];
  var hips=[{x: data.keypoints[11].position.x, y: data.keypoints[11].position.y}, {x: data.keypoints[12].position.x, y: data.keypoints[12].position.y}];
  var upperArmL=[{x: data.keypoints[5].position.x, y: data.keypoints[5].position.y}, {x: data.keypoints[7].position.x, y: data.keypoints[7].position.y}];
  var lowerArmL=[{x: data.keypoints[7].position.x, y: data.keypoints[7].position.y}, {x: data.keypoints[9].position.x, y: data.keypoints[9].position.y}];
  var upperLegL=[{x: data.keypoints[11].position.x, y: data.keypoints[11].position.y}, {x: data.keypoints[13].position.x, y: data.keypoints[13].position.y}];
  var lowerLegL=[{x: data.keypoints[13].position.x, y: data.keypoints[13].position.y}, {x: data.keypoints[15].position.x, y: data.keypoints[15].position.y}];
  var upperArmR=[{x: data.keypoints[6].position.x, y: data.keypoints[6].position.y}, {x: data.keypoints[8].position.x, y: data.keypoints[8].position.y}];
  var lowerArmR=[{x: data.keypoints[8].position.x, y: data.keypoints[8].position.y}, {x: data.keypoints[10].position.x, y: data.keypoints[10].position.y}];
  var upperLegR=[{x: data.keypoints[12].position.x, y: data.keypoints[12].position.y}, {x: data.keypoints[14].position.x, y: data.keypoints[14].position.y}];
  var lowerLegR=[{x: data.keypoints[14].position.x, y: data.keypoints[14].position.y}, {x: data.keypoints[16].position.x, y: data.keypoints[16].position.y}];
  
  this.show=function(x,y,scl){
    push();
    translate(x,y);
    scale(scl);
    stroke(0,255,255,180);
    strokeWeight(8);
    noFill();
    ellipse(nose[0].x, nose[0].y,5);
    ellipse(eyes[0].x, eyes[0].y,5);
    ellipse(eyes[1].x, eyes[1].y,5);
    ellipse(ears[0].x, ears[0].y,5);
    ellipse(ears[1].x, ears[1].y,5);
    line(shoulders[0].x, shoulders[0].y, shoulders[1].x, shoulders[1].y);
    line(hips[0].x, hips[0].y, hips[1].x, hips[1].y);
    line(upperArmL[0].x, upperArmL[0].y, upperArmL[1].x, upperArmL[1].y);
    line(lowerArmL[0].x, lowerArmL[0].y, lowerArmL[1].x, lowerArmL[1].y);
    line(upperArmR[0].x, upperArmR[0].y, upperArmR[1].x, upperArmR[1].y);
    line(lowerArmR[0].x, lowerArmR[0].y, lowerArmR[1].x, lowerArmR[1].y);
    line(upperLegL[0].x, upperLegL[0].y, upperLegL[1].x, upperLegL[1].y);
    line(lowerLegL[0].x, lowerLegL[0].y, lowerLegL[1].x, lowerLegL[1].y);
    line(upperLegR[0].x, upperLegR[0].y, upperLegR[1].x, upperLegR[1].y);
    line(lowerLegR[0].x, lowerLegR[0].y, lowerLegR[1].x, lowerLegR[1].y);
    pop();
  }
}