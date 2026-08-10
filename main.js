// document.body.style.backgroundColor = "lightgreen";
// find my test button
const testButton = document.getElementById("test-button");

// create instrument and connect to audio
const synth = new Tone.Synth().toDestination();

// do smth when we click button
testButton.addEventListener("click", playTestnote);

function playTestnote () {
    synth.triggerAttackRelease("C4", "8n");
}