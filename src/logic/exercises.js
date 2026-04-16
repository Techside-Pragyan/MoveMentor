import { calculateAngle, LANDMARKS } from './angles.js';

export const EXERCISES = {
    bicep_curls: {
        name: "Bicep Curls",
        instructions: "Keep your upper arms stationary, curl the weights while contracting your biceps.",
        process: (landmarks, state) => {
            const leftElbow = calculateAngle(
                landmarks[LANDMARKS.SHOULDER_LEFT],
                landmarks[LANDMARKS.ELBOW_LEFT],
                landmarks[LANDMARKS.WRIST_LEFT]
            );
            const rightElbow = calculateAngle(
                landmarks[LANDMARKS.SHOULDER_RIGHT],
                landmarks[LANDMARKS.ELBOW_RIGHT],
                landmarks[LANDMARKS.WRIST_RIGHT]
            );

            const avgAngle = (leftElbow + rightElbow) / 2;
            let feedback = "";
            let progress = 0;

            // Logic: Down (> 160), Up (< 30)
            if (avgAngle > 160) {
                state.stage = "down";
            }
            if (avgAngle < 30 && state.stage === "down") {
                state.stage = "up";
                state.counter++;
                feedback = "PERFECT!";
            }

            // Progress bar logic (0 to 100%)
            progress = Math.min(100, Math.max(0, (160 - avgAngle) / (160 - 30) * 100));

            return { counter: state.counter, feedback, progress };
        }
    },
    squats: {
        name: "Squats",
        instructions: "Keep your back straight and lower your hips until your thighs are parallel to the floor.",
        process: (landmarks, state) => {
            const leftKnee = calculateAngle(
                landmarks[LANDMARKS.HIP_LEFT],
                landmarks[LANDMARKS.KNEE_LEFT],
                landmarks[LANDMARKS.ANKLE_LEFT]
            );
            const rightKnee = calculateAngle(
                landmarks[LANDMARKS.HIP_RIGHT],
                landmarks[LANDMARKS.KNEE_RIGHT],
                landmarks[LANDMARKS.ANKLE_RIGHT]
            );

            const avgAngle = (leftKnee + rightKnee) / 2;
            let feedback = "";
            
            // Squat Depth Check
            if (avgAngle > 160) {
                state.stage = "up";
            }
            if (avgAngle < 90 && state.stage === "up") {
                state.stage = "down";
                state.counter++;
                feedback = "GOOD DEPTH!";
            } else if (avgAngle < 120 && avgAngle > 90) {
                feedback = "GO LOWER!";
            }

            const progress = Math.min(100, Math.max(0, (170 - avgAngle) / (170 - 80) * 100));

            return { counter: state.counter, feedback, progress };
        }
    },
    pushups: {
        name: "Pushups",
        instructions: "Lower your body until your chest nearly touches the floor, then push back up.",
        process: (landmarks, state) => {
            const leftElbow = calculateAngle(
                landmarks[LANDMARKS.SHOULDER_LEFT],
                landmarks[LANDMARKS.ELBOW_LEFT],
                landmarks[LANDMARKS.WRIST_LEFT]
            );
            // Also check back alignment (Hip-Shoulder angle)
            const backAngle = calculateAngle(
                landmarks[LANDMARKS.SHOULDER_LEFT],
                landmarks[LANDMARKS.HIP_LEFT],
                landmarks[LANDMARKS.KNEE_LEFT]
            );

            let feedback = "";
            if (backAngle < 150) {
                feedback = "STRAIGHTEN BACK";
            }

            if (leftElbow > 160) {
                state.stage = "up";
            }
            if (leftElbow < 70 && state.stage === "up" && backAngle > 150) {
                state.stage = "down";
                state.counter++;
                feedback = "EXCELLENT!";
            }

            const progress = Math.min(100, Math.max(0, (160 - leftElbow) / (160 - 60) * 100));

            return { counter: state.counter, feedback, progress };
        }
    }
};
