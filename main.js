
// document.body.style.backgroundColor = "red";
// Getting all key elements by ID
const C4 = document.getElementById("C4");
const D4 = document.getElementById("D4");
const E4 = document.getElementById("E4");
const G4 = document.getElementById("G4");

// find our intro modal
const introModal = document.getElementById("intro-modal");
// console.log(introModal);
// find modal close button
const introModalCloseButton = document.getElementById("intro-modal-close");

// is the mouse button held?
let mouseButtonDown = false;
// update our variable based on the mouse being held down
window.addEventListener("mousedown", function(){
    mouseButtonDown = true;
});
window.addEventListener("mouseup", function(){
    mouseButtonDown = false;
});

//introdialog.showModal();
//document.body.style.backgroundColor = "red";

////// Modal
// browser loads html > browser loads js > js to open modal > user presses ok on modal > modal closes > audio init
// user can also close modal with esc key
// show modal on page load
introModal.showModal();
// when ok clicked, close modal
introModalCloseButton.addEventListener("click", function closeIntroModal(){
    // close our modal
    introModal.close();
});
// when dialog closes by whatever means, load audio system
introModal.addEventListener("close", toneInit);

// introModalCloseButton.addEventListener("click", () => {
//    introModal.close();
// });


////// Tone

// create instrument
// change to polysynth
const synth = new Tone.PolySynth();

function toneInit(){
    // connect synth to audio output
    synth.connect(Tone.Destination);
}

function playNote(e){
    // find the element that the event ran on
    let keyPressed = e.target;
    console.log(keyPressed);
    // find the data-note attribute of that element
    let note = keyPressed.dataset.note;
    console.log(note);
    // play the note for the right amount of time
    // if mouse button is held previously play note
    if(e.buttons === 1){
        synth.triggerAttack(note,);
    }
    console.log("shuffled");

}

function endNote(e){
    // find the element that the event ran on
    let keyPressed = e.target;
    console.log(keyPressed);
    // find the data-note attribute of that element
    let note = keyPressed.dataset.note;
    console.log(note);
    // play the note for the right amount of time
    synth.triggerRelease(note);
}

// add event listeners to each key
C4.addEventListener("mousedown", playNote);
C4.addEventListener("mouseenter", playNote);
C4.addEventListener("mouseup", endNote);
C4.addEventListener("mouseleave", endNote);

D4.addEventListener("mousedown", playNote);
D4.addEventListener("mouseenter", playNote);
D4.addEventListener("mouseup", endNote);
D4.addEventListener("mouseleave", endNote);

E4.addEventListener("mousedown", playNote);
E4.addEventListener("mouseenter", playNote);
E4.addEventListener("mouseup", endNote);
E4.addEventListener("mouseleave", endNote);

G4.addEventListener("mousedown", playNote);
G4.addEventListener("mouseenter", playNote);
G4.addEventListener("mouseup", endNote);
G4.addEventListener("mouseleave", endNote);

playbackButton.addEventListener("click", playPauseAudio);

// randomly scrub to location
const randomButton = document.getElementById("random-location");

// move playback to random position in audio file
function randomLocation(){
    // find duration
    let trackLength = audioTrack.duration;
    audioTrack.currentTime = trackLength * Math.random();
}

randomButton.addEventListener("click", randomLocation);

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}