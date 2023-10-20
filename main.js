song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftwrist=0;
scoreRightwrist=0;

function setup() {
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    //video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose, gotPoses');
}

function gotPoses(results) {
    if (results.length>0) {
        console.log(results);
        scoreRightwrist=results[0].pose.keyPoints[10].score;
        scoreLeftwrist=results[0].pose.keyPoints[9].score;
        console.log("scoreLeftWrist= " + scoreLeftwrist);
        console.log("scoreRightWrist= " + scoreRightwrist);
        leftWristX=results[0].pose.leftWrist.X;
        leftWristY=results[0].pose.leftWrist.Y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX=results[0].pose.rightWrist.X;
        rightWristY=results[0].pose.rightWrist.Y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    if (scoreLeftwrist>0.2) {
        circle(leftWristX, leftWristY, 20);

        if (rightWristY>0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML="velocidade = 0.5x";
            song.rate(0.5);
        }
        else if (rightWristY>100 && rightWristY <= 200) {
                document.getElementById("speed").innerHTML="velocidade = 1x";
                song.rate(1);
            }
            else if (rightWristY>200 && rightWristY <= 300) {
                document.getElementById("speed").innerHTML="velocidade = 1.5x";
                song.rate(1.5);
            }
            
            else if (rightWristY>300 && rightWristY <= 400) {
                document.getElementById("speed").innerHTML="velocidade = 2x";
                song.rate(2);
            }    

            else if (rightWristY>400 && rightWristY <= 500) {
                document.getElementById("speed").innerHTML="velocidade = 2.5x";
                song.rate(2.5);
            }
        }
        InNumberLeftWrist=Number(leftWristY);
        remove_decimals=floor(InNumberLeftWrist);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="volume= "+volume;
        song.setVolume(volume);   
    }


function preload(){
    song=loadSound('music.mp3');
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("Pose Net foi iniciado");
}