
let video;
let poseNet;
let pose;
let skeleton;
let kneeDist;
let stridelength;//added by PB

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() 
{
  console.log('poseNet ready');
  //console.log(pose);
}

function draw() {
  image(video, 0, 0);

  if (pose) {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    let left_leg = pose.leftAnkle;
    let right_leg = pose.rightAnkle;
    let d1 = dist(left_leg.x,left_leg.y,right_leg.x,right_leg.y);
    stridelength = d1;
    if(left_leg.confidence >= 0.5 && right_leg.confidence >= 0.5)
    {
      document.getElementById("stride").innerHTML = "Distance Between Feet = "+str(stridelength)+" s.u.";
    }
    else
    {
      document.getElementById("stride").innerHTML = "<span style='color:red;'>Model Unable to detect feet</span>";
    }
    knee = dist(pose.leftKnee.x, pose.leftKnee.y, pose.rightKnee.x, pose.rightKnee.y);
    //fill(255, 0, 0);
    //ellipse(pose.nose.x, pose.nose.y, d);
    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0, 255, 0);
      ellipse(x, y, 16, 16);
    }

    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
  }
}
/*
stridelength = sl();
function sl()
{
  if (pose)
  {
    let left_leg = pose.leftAnkle;
    let right_leg = pose.rightAnkle;
    let d = dist(left_leg.x,left_leg.y,right_leg.x,right_leg.y);
    stridelength = d;
    console.log(d);
  }
}
*/
