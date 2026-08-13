// document.body.style.backgroundColor = "lightgreen";
// find my test button
const testButton = document.getElementById("test-button");
// find intro modal
const introModal = document.getElementById("intro-modal");
//console.log(introModal);
//find modal close button
const introModalCloseButton = document.getElementById("intro-modal-close");

// Modal
// browser loads html > browser loads js > js to open modal > user presses OK on modal > modal closes > audio init
// user can also close modal w esc key
// show modal on page load
introModal.showModal();
// when ok clicked, close modal
introModalCloseButton.addEventListener("click", function closeIntroModal(){;
    // close modal
    introModal.close();
});


introModal.addEventListener("close", toneInit);

// TONE

// create instrument and connect to audio
const synth = new Tone.Synth().toDestination();

function toneInit(){
    // connect synth to audio output
    synth.connect
}

// do smth when we click button
testButton.addEventListener("click", playTestnote);

function playTestnote () {
    synth.triggerAttackRelease("C4", "8n");
}