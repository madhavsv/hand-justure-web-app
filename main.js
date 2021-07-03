prediction="";
Webcam.set({
    width:400,
    height:400,
    image_format:'png',
    png_quality:100
});

camera=document.getElementById("camera");
Webcam.attach('#camera');
function snapshot() {
    Webcam.snap(function (data_uri) {
      document.getElementById("result").innerHTML='<img id="capture_image" src="' + data_uri +'">';
    });
}
console.log('ml5:version',ml5.version);
classifier=ml5.imageClassifier('model.json',modelLoaded);
function modelLoaded() {
    console.log("model loaded!");
}
    function speak() {
        var synth=window.speechSynthesis;
        speak_data="the  prediction is" + prediction;
        utterthis=new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterthis);
    }
    function get_prediction() {
        img=document.getElementById("capture_image");
        classifier.classify(img,gotResult);
        
    }
function gotResult(error,results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        prediction1=results[0].label;
        speak();
        if (results[0].label=="good") {
            document.getElementById("result_gesture_emoji").innerHTML="&#128077;" + "-good"; 
        }
        if (results[0].label == "you") {
            document.getElementById("result_gesture_emoji").innerHTML="&#128072;" + "-you";
            
        }
        if (results[0].label == "bad") {
            document.getElementById("result_gesture_emoji").innerHTML="&#128078;" + "-bad";
            
        }
        if (results[1].label == "heart") {
            document.getElementById("result_gesture_emoji").innerHTML="&#128079;" +  "heart";

            
        }
        if (results[1].label == "hi") {
            document.getElementById("result_gesture_emoji").innerHTML="&#128075;" + "hi";

            
        }
       
    }
    
}

