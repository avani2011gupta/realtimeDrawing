noseX = 0;
noseY = 0;
leftWristX = 0;
rightWristX = 0;
difference = 0;

function setup()
{
    video = createCapture(VIDEO);
    video.size(500, 500);

    canvas = createCanvas(550, 550);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is initialized");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("nose X= " + noseX + " nose Y= " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("leftWrist X= " + leftWristX + " rightWrist X= " + rightWristX + " Difference= " + difference);
    }

}

function draw()
{
    background('#eaacf2');
    document.getElementById("square_sides").innerHTML = "Width and Height of a square will be equal to to " + difference + "px"; 
    fill('#552ffa');
    stroke('#512ffa');
    square(noseX, noseY, difference);
}