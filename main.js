function same() {
    document.getElementById("heading1").style.backgroundColor = "#f0ad4e";
}

function same1() {
    document.getElementById("speed").style.backgroundColor = "#d9534f";
}

function preload() {
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
    //    song1.rate(0.5)
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    canvas.position(450, 130)
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    if (leftWristScore > 0.20) {
        fill("red");
        stroke("black");
        circle(leftWristX, leftWristY, 20);
        number_leftWristY = Number(leftWristY);
        remove1 = floor(number_leftWristY);
        remove2 = -1;
        if (remove1 > remove2) {
            song2.pause();
            if(song1.isPlaying()){
            
            }else{
                song1.play();
            }
        }
    }
}
song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;

function gotPoses(results) {
    if (results.length > 0) {
        leftWristScore = results[0].pose.keypoints[9].score;
        console.log(results)
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist : X = " + leftWristX + " Y = " + leftWristY);
        console.log("Right Wrist : X = " + rightWristX + " Y = " + rightWristY);
        console.log(leftWristScore);


    }
}

function modelLoaded() {
    console.log("Posenet loaded");
}
