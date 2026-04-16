import { PoseLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";
import { EXERCISES } from "./src/logic/exercises.js";
import { saveWorkoutSession } from "./src/utils/storage.js";

// DOM Elements
const videoElement = document.getElementById('webcam');
const canvasElement = document.getElementById('output-canvas');
const canvasCtx = canvasElement.getContext('2d');
const repCountDisplay = document.getElementById('rep-count');
const calorieDisplay = document.getElementById('calorie-count');
const feedbackDisplay = document.getElementById('feedback-text');
const instructionDisplay = document.getElementById('instruction-text');
const timerDisplay = document.getElementById('workout-timer');
const repsProgress = document.getElementById('reps-progress');
const currentExDisplay = document.getElementById('current-ex-display');
const exerciseButtons = document.querySelectorAll('.exercise-btn');

// App State
let poseLandmarker = undefined;
let runningMode = "VIDEO";
let lastVideoTime = -1;
let currentExercise = "bicep_curls";
let exerciseState = { counter: 0, stage: "down", startTime: Date.now() };
let totalCalories = 0;
let timerSeconds = 0;

// Initialize MediaPipe
async function initPose() {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
            delegate: "GPU"
        },
        runningMode: runningMode,
        numPoses: 1
    });
    console.log("Pose Landmarker Initialized");
    startWebcam();
}

// Start Webcam
function startWebcam() {
    const constraints = { video: { width: 1280, height: 720 } };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        videoElement.srcObject = stream;
        videoElement.addEventListener("loadeddata", predictWebcam);
        startTimer();
    });
}

// Main Detection Loop
async function predictWebcam() {
    canvasElement.style.height = videoElement.videoHeight;
    canvasElement.style.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    canvasElement.width = videoElement.videoWidth;

    let startTimeMs = performance.now();
    if (lastVideoTime !== videoElement.currentTime) {
        lastVideoTime = videoElement.currentTime;
        const results = poseLandmarker.detectForVideo(videoElement, startTimeMs);

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        
        const drawingUtils = new DrawingUtils(canvasCtx);
        
        if (results.landmarks) {
            for (const landmarks of results.landmarks) {
                // Draw Skeletons with custom styling
                drawingUtils.drawConnectors(landmarks, PoseLandmarker.POSE_CONNECTIONS, {
                    color: '#6366f1',
                    lineWidth: 4
                });
                drawingUtils.drawLandmarks(landmarks, {
                    color: '#06b6d4',
                    lineWidth: 2,
                    radius: 4
                });

                // Process Exercise Logic
                processExercise(landmarks);
            }
        }
        canvasCtx.restore();
    }

    if (poseLandmarker) {
        window.requestAnimationFrame(predictWebcam);
    }
}

// Exercise Logic Handling
function processExercise(landmarks) {
    const logic = EXERCISES[currentExercise];
    const result = logic.process(landmarks, exerciseState);

    // Update UI
    repCountDisplay.innerText = result.counter;
    repsProgress.style.width = `${result.progress}%`;
    
    if (result.feedback) {
        showFeedback(result.feedback);
        speak(result.feedback);
    }

    // Update Calories (Simplified formula)
    totalCalories += (0.05 / 60); // Base metabolic rate increase during activity
    
    if (result.feedback.includes("PERFECT") || result.feedback.includes("GOOD") || result.feedback.includes("EXCELLENT")) {
        totalCalories += 0.15; // Extra burn per rep
    }
    
    calorieDisplay.innerText = totalCalories.toFixed(1);
}

// UI Helpers
function showFeedback(text) {
    feedbackDisplay.innerText = text;
    feedbackDisplay.classList.add('active');
    setTimeout(() => feedbackDisplay.classList.remove('active'), 1000);
}

function speak(text) {
    if ('speechSynthesis' in window && !window.speechSynthesis.speaking) {
        const msg = new SpeechSynthesisUtterance(text);
        msg.rate = 1.2;
        window.speechSynthesis.speak(msg);
    }
}

function startTimer() {
    setInterval(() => {
        timerSeconds++;
        const mins = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
        const secs = (timerSeconds % 60).toString().padStart(2, '0');
        timerDisplay.innerText = `${mins}:${secs}`;
    }, 1000);
}

// Event Listeners
exerciseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        exerciseButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentExercise = btn.dataset.exercise;
        currentExDisplay.innerText = EXERCISES[currentExercise].name;
        instructionDisplay.innerText = EXERCISES[currentExercise].instructions;
        
        // Reset local counter for new exercise
        exerciseState.counter = 0;
        exerciseState.stage = "down";
        repCountDisplay.innerText = "0";
    });
});

// Start App
initPose();
currentExDisplay.innerText = EXERCISES[currentExercise].name;
instructionDisplay.innerText = EXERCISES[currentExercise].instructions;

// Handle session saving
window.addEventListener('beforeunload', () => {
    if (exerciseState.counter > 0) {
        saveWorkoutSession(currentExercise, exerciseState.counter, totalCalories);
    }
});
