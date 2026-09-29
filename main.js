
// document.body.style.backgroundColor = "red";
// Getting all key elements by ID
const C4 = document.getElementById("C4");
const D4 = document.getElementById("D4");
const E4 = document.getElementById("E4");
const F4 = document.getElementById("F4");
const G4 = document.getElementById("G4");
const A4 = document.getElementById("A4");
const B4 = document.getElementById("B4");

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

// Volume slider
const volumeSlider = document.getElementById("myRange");
volumeSlider.addEventListener("input", function() {
    synth.volume.value = this.value - 50;
});

// Pitch slider
const pitchSlider = document.getElementById("pitchSlider");

pitchSlider.addEventListener("input", function() {
    synth.set({
        detune: this.value * 100
    });
});

// Filter slider
const filterSlider = document.getElementById("filterSlider");

filterSlider.addEventListener("input", function() {
    filter.frequency.value = this.value;
});

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

F4.addEventListener("mousedown", playNote);
F4.addEventListener("mouseenter", playNote);
F4.addEventListener("mouseup", endNote);
F4.addEventListener("mouseleave", endNote);

G4.addEventListener("mousedown", playNote);
G4.addEventListener("mouseenter", playNote);
G4.addEventListener("mouseup", endNote);
G4.addEventListener("mouseleave", endNote);

A4.addEventListener("mousedown", playNote);
A4.addEventListener("mouseenter", playNote);
A4.addEventListener("mouseup", endNote);
A4.addEventListener("mouseleave", endNote);

B4.addEventListener("mousedown", playNote);
B4.addEventListener("mouseenter", playNote);
B4.addEventListener("mouseup", endNote);
B4.addEventListener("mouseleave", endNote);


// Random button
const randomButton = document.getElementById("random-values");

randomButton.addEventListener("click", function() {

    // Random volume: 1-100
    volumeSlider.value = Math.floor(Math.random() * 100) + 1;

    // Random pitch: -12 to 12
    pitchSlider.value = Math.floor(Math.random() * 25) - 12;

    // Random filter: 100-5000
    filterSlider.value = Math.floor(Math.random() * 4901) + 100;

    // Make the sliders apply the new values
    volumeSlider.dispatchEvent(new Event("input"));
    pitchSlider.dispatchEvent(new Event("input"));
    filterSlider.dispatchEvent(new Event("input"));

});