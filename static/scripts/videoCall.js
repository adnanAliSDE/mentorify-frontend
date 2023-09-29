// Get video elements
const mentorVideo = document.getElementById('mentorVideo');
const studentVideo = document.getElementById('studentVideo');
const studentVideoContainer = document.getElementById('studentVideoContainer');

// Get control buttons
const muteButton = document.getElementById('muteButton');
const cameraButton = document.getElementById('cameraButton');
const disconnectButton = document.getElementById('disconnectButton');

let isCameraOn = true; // Track camera state

// Get the full window toggle button
const fullWindowButton = document.getElementById('fullWindowButton');

// Toggle full window mode
let isFullScreen = false;

disconnectButton.addEventListener('click', () => {
    if (isFullScreen) {
        // Exit full screen
        mentorVideo.style.width = '100%';
        mentorVideo.style.height = 'auto';
        isFullScreen = false;
    } else {
        // Enter full screen
        mentorVideo.style.width = '100vw';
        mentorVideo.style.height = '100vh';
        isFullScreen = true;
    }
});




// Function to toggle mute/unmute
function toggleMute() {
    if (studentVideo.muted) {
        studentVideo.muted = false;
        muteButton.innerText = 'Unmute';
    } else {
        studentVideo.muted = true;
        muteButton.innerText = 'Mute';
    }
}

// Toggle mute/unmute on button click
muteButton.addEventListener('click', toggleMute);

// Function to toggle camera on/off
function toggleCamera() {
    const stream = studentVideo.srcObject;
    const tracks = stream.getTracks();

    // Check if there's a video track
    const videoTrack = tracks.find((track) => track.kind === 'video');

    if (videoTrack) {
        // Toggle the camera track
        videoTrack.enabled = !videoTrack.enabled;
        isCameraOn = videoTrack.enabled;
        cameraButton.innerText = isCameraOn ? 'Camera Off' : 'Camera On';
    }
}

// Toggle camera on/off on button click
cameraButton.addEventListener('click', toggleCamera);


// Function to make student video draggable
function makeVideoDraggable() {
    let isDragging = false;
    let offsetX, offsetY;

    studentVideoContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - studentVideoContainer.getBoundingClientRect().left;
        offsetY = e.clientY - studentVideoContainer.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        studentVideoContainer.style.left = e.clientX - offsetX + 'px';
        studentVideoContainer.style.top = e.clientY - offsetY + 'px';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Add touch event listeners for mobile
    studentVideoContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        const touch = e.touches[0];
        offsetX = touch.clientX - studentVideoContainer.getBoundingClientRect().left;
        offsetY = touch.clientY - studentVideoContainer.getBoundingClientRect().top;
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const touch = e.touches[0];
        studentVideoContainer.style.left = touch.clientX - offsetX + 'px';
        studentVideoContainer.style.top = touch.clientY - offsetY + 'px';
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });
}

// Make student video draggable
makeVideoDraggable();

// Request access to the camera and microphone and display the local video stream
alert('Please allow access to the camera and microphone');
navigator.mediaDevices.enumerateDevices()
.then(devices => {
    const cameras = devices.filter(device => device.kind === 'videoinput');
    // Populate a dropdown or list with camera options and let the user choose
    alert('Please choose the camera');
})
.catch(error => {
    console.error('Error enumerating devices:', error);
    alert('Please choose the camera');
});




navigator.mediaDevices
    .getUserMedia(({ video: { facingMode: 'user' }, audio: true }))
    .then((stream) => {
        alert('Please wait for the mentor to join the call');
        studentVideo.srcObject = stream;
        return studentVideo.play();
    })
    .catch((error) => {
        console.error('Error accessing camera and microphone:', error);
        alert('Error accessing camera and microphone');
    });
