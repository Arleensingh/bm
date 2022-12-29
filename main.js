objectDetector = "";

img = "";
objects = [];
status = "";
song = "";

function preload() {
    song = loadSound("alert.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);

}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);

       for (var i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are "+objects.length;

        fill(255, 0, 0);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(255, 0, 0);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if (objects[i].label == "person") {
            document.getElementById("number_of_objects").innerHTML = "Baby Found";
            song.play();
        }
        else {
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
            song.stop();
        }
       }
    }
}