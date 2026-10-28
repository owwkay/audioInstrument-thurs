////// Modal
const introModal = document.getElementById("intro-modal");
const introModalCloseButton = document.getElementById("intro-modal-close");

introModal.showModal();
introModalCloseButton.addEventListener("click", function () {
    Tone.start(); // starts the audio system (needs a click to work)
    introModal.close();
});

////// Prompts
const prompts = [
    "Make a signature sound for a robot!",
    "Create a theme song for a kids cartoon",
    "KEYBOARD SMASH!",
    "Create a spooky ambience for a haunted house",
    "Make an 8bit style song for an old video game",
    "Come up with a soundbite for an action movie",
];

const promptText = document.getElementById("prompt-text");
const newPromptButton = document.getElementById("new-prompt");
let lastPrompt = "";

function showNewPrompt() {
    let prompt = lastPrompt;
    // keep picking until it's different from the last one
    while (prompt === lastPrompt) {
        prompt = prompts[Math.floor(Math.random() * prompts.length)];
    }
    lastPrompt = prompt;
    promptText.textContent = prompt;
}

newPromptButton.addEventListener("click", showNewPrompt);

// show a prompt as soon as the page loads
showNewPrompt();

////// Tone: one synth shared by everyone
const synth = new Tone.PolySynth();
const filter = new Tone.Filter(5000, "lowpass");
synth.connect(filter);
filter.toDestination();

////// Controls
const waveSelect = document.getElementById("waveSelect");
const pitchSlider = document.getElementById("pitchSlider");
const filterSlider = document.getElementById("filterSlider");

waveSelect.addEventListener("change", function () {
    synth.set({ oscillator: { type: this.value } });
});

pitchSlider.addEventListener("input", function () {
    synth.set({ detune: this.value * 100 });
});

filterSlider.addEventListener("input", function () {
    filter.frequency.value = this.value;
});

// set all three controls at once (used by random + playback)
function setSettings(wave, pitch, filterValue) {
    waveSelect.value = wave;
    pitchSlider.value = pitch;
    filterSlider.value = filterValue;
    waveSelect.dispatchEvent(new Event("change"));
    pitchSlider.dispatchEvent(new Event("input"));
    filterSlider.dispatchEvent(new Event("input"));
}

const waveTypes = ["sine", "square", "sawtooth", "triangle"];

function randomiseSettings() {
    let wave = waveTypes[Math.floor(Math.random() * waveTypes.length)];
    let pitch = Math.floor(Math.random() * 25) - 12;
    let filterValue = Math.floor(Math.random() * 4901) + 100;
    setSettings(wave, pitch, filterValue);
}

document.getElementById("random-values").addEventListener("click", randomiseSettings);

////// Recording
const RECORD_TIME = 10000; // 10 seconds

const recordButton = document.getElementById("record-button");
const playButton = document.getElementById("play-button");
const statusText = document.getElementById("status");

let recording = false;
let recordStart = 0;
let recordedNotes = [];  // every note either player played
let heldNotes = {};      // notes currently held down
let savedSettings = null;

recordButton.addEventListener("click", function () {
    recording = true;
    recordStart = Date.now();
    recordedNotes = [];
    heldNotes = {};
    // remember the settings so playback sounds the same
    savedSettings = {
        wave: waveSelect.value,
        pitch: pitchSlider.value,
        filter: filterSlider.value
    };
    recordButton.disabled = true;
    playButton.disabled = true;
    statusText.textContent = "Recording... jam together!";
    setTimeout(stopRecording, RECORD_TIME);
});

function stopRecording() {
    // finish any notes still being held
    for (const note in heldNotes) {
        recordedNotes.push({ note: note, start: heldNotes[note], end: RECORD_TIME });
    }
    heldNotes = {};
    synth.releaseAll();

    recording = false;
    recordButton.disabled = false;
    playButton.disabled = false;
    statusText.textContent = "Saved! Press play to hear your sound bite.";
}

playButton.addEventListener("click", function () {
    if (recordedNotes.length === 0) {
        statusText.textContent = "Nothing recorded yet!";
        return;
    }

    recordButton.disabled = true;
    playButton.disabled = true;
    statusText.textContent = "Playing sound bite...";

    // go back to the settings used while recording
    setSettings(savedSettings.wave, savedSettings.pitch, savedSettings.filter);

    // schedule every recorded note
    for (const n of recordedNotes) {
        setTimeout(function () {
            synth.triggerAttackRelease(n.note, (n.end - n.start) / 1000);
        }, n.start);
    }

    setTimeout(function () {
        recordButton.disabled = false;
        playButton.disabled = false;
        statusText.textContent = "Done! Record again or keep jamming.";
    }, RECORD_TIME);
});

////// Playing notes (shared by mouse and keyboard)
function noteDown(note) {
    synth.triggerAttack(note);
    if (recording && heldNotes[note] === undefined) {
        heldNotes[note] = Date.now() - recordStart;
    }
}

function noteUp(note) {
    synth.triggerRelease(note);
    if (recording && heldNotes[note] !== undefined) {
        recordedNotes.push({ note: note, start: heldNotes[note], end: Date.now() - recordStart });
        delete heldNotes[note];
    }
}

////// Mouse player
function mouseDown(e) {
    // only play if the mouse button is held (so you can slide across keys)
    if (e.buttons === 1) {
        noteDown(e.target.dataset.note);
    }
}

function mouseUp(e) {
    noteUp(e.target.dataset.note);
}

const mouseKeys = document.querySelectorAll("[data-note]");
mouseKeys.forEach(function (key) {
    key.addEventListener("mousedown", mouseDown);
    key.addEventListener("mouseenter", mouseDown);
    key.addEventListener("mouseup", mouseUp);
    key.addEventListener("mouseleave", mouseUp);
});

////// Keyboard player
const keyMap = {
    a: "C5",
    s: "D5",
    d: "E5",
    f: "F5",
    g: "G5",
    h: "A5",
    j: "B5"
};

window.addEventListener("keydown", function (e) {
    let key = e.key.toLowerCase();
    let note = keyMap[key];
    // ignore other keys, held-down repeats, and the intro popup
    if (note === undefined || e.repeat || introModal.open) return;

    e.preventDefault(); // stops letters changing a focused dropdown
    noteDown(note);
    document.querySelector('[data-key="' + key + '"]').classList.add("active");
});

window.addEventListener("keyup", function (e) {
    let key = e.key.toLowerCase();
    let note = keyMap[key];
    if (note === undefined) return;

    noteUp(note);
    document.querySelector('[data-key="' + key + '"]').classList.remove("active");
});

// if the window loses focus while keys are held, stop all sound
// (otherwise the browser never sees the key being released)
window.addEventListener("blur", function () {
    synth.releaseAll();
    document.querySelectorAll(".kbKey.active").forEach(function (key) {
        key.classList.remove("active");
    });
});

// start with random settings
randomiseSettings();