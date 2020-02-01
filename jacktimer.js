const sounds = {};
let speed = 180;
let duration = 180000;
let volume = 1;
let stopLoop = false;

function start() {
    //ßperformance_trick();
    asyncLoop(new Date());
}

function stop() {
    stopLoop = true;
}

function performance_trick() {
    if (!sounds.drum) {
        sounds.empty = new Howl({
            src: ['empty_loop_for_js_performance.ogg'],
            volume: 0.5,
            autoplay: true, loop: true,
        });
    }
}

function playDrum() {
    if (!sounds.drum) {
        sounds.drum = new Howl({
            src: ['kick-drum.wav'],
            volume: volume,
            autoplay: false, loop: false,
        });
    }
    sounds.drum.play()
}

function playHandsOff() {
    if (!sounds.handsoff) {
        sounds.handsoff = new Howl({
            src: ['handsoff.mp3'],
            volume: volume,
            autoplay: false, loop: false,
        });
    }
    sounds.handsoff.play()
}

function asyncLoop(startTime) {
    playDrum();
    setTimeout(function () {
        const newTimeStamp = new Date();
        if (newTimeStamp.getTime() - startTime.getTime() < duration) {
            if (!stopLoop) {
                asyncLoop(startTime);
            } else {
                stopLoop = false;
            }
        } else {
            playHandsOff();
        }
    }, 60 / speed * 1000);
}

function sliderChanged(init) {
    if (!init) {
        speed = document.getElementById("sliderWithValue").value;
    } else {
        document.getElementById("sliderWithValue").value = speed;
    }
    document.getElementById("sliderOutput").textContent = speed;
}

function volumeSliderChanged(init) {
    if (!init) {
        volume = document.getElementById("volumeSlider").value;
    } else {
        document.getElementById("volumeSlider").value = volume;
    }
    if (sounds.drum) {
        sounds.drum.volume(volume);
    }
    document.getElementById("volumeSliderOutput").textContent = Math.round(volume * 100);
}

function durationSliderChanged(init) {
    if (!init) {
        duration = document.getElementById("durationSlider").value;
    } else {
        document.getElementById("durationSlider").value = duration;
    }
    document.getElementById("durationSliderOutput").textContent = Math.round(duration / 1000);
}


volumeSliderChanged(true);
sliderChanged(true);
durationSliderChanged(true);
