Status = "";
objects = [];
objectDetector = "";
label = "";
function preload() {

}
function setup() {
    canvas = createCanvas(500, 400);
    canvas.position(470, 350);
    cam = createCapture(VIDEO);
    cam.hide();

}
function Start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("start3").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("input").value;

}


function modelLoaded() {
    console.log("model Is Loaded");
    Status = true;
}
function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
function draw() {
    image(cam, 0, 0, 500, 400);
    if (Status != "") {
        objectDetector.detect(cam, gotResults);
        for (i = 1; i <= objects.length; i++) {
            document.getElementById("start3").innerHTML = "Object Detected";
            document.getElementById("objectsLabel").innerHTML = input;
            confidence = objects[0].confidence;
            label = objects[0].label;
            x = objects[0].x;
            y = objects[0].y;
            width = objects[0].width;
            height = objects[0].height;
            noFill();
            stroke("red");
            rect(x - 300, y - 200, width - 200, height - 200);
            if (label == input) {
                cam.stop();
                objectDetector.detect(gotResults);
                document.getElementById("start3").innerHTML + " Is Found";
                synth = window.speechSynthesis;
                Utterthis = new SpeechSynthesisUtterance(label);
                synth.speak(Utterthis);
            }
            else {
                document.getElementById("start3").innerHTML + " Not Found";
            }
        }
    }
}