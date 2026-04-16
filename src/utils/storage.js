/**
 * Saves workout data to local storage for progress tracking
 * @param {string} exercise - Exercise name
 * @param {number} reps - Number of repetitions
 * @param {number} kCal - Calories burned
 */
export function saveWorkoutSession(exercise, reps, kCal) {
    const history = JSON.parse(localStorage.getItem('moveMentorHistory') || '[]');
    const session = {
        date: new Date().toISOString(),
        exercise,
        reps,
        calories: parseFloat(kCal.toFixed(1))
    };
    history.push(session);
    localStorage.setItem('moveMentorHistory', JSON.stringify(history));
}

/**
 * Retrieves workout history
 * @returns {Array} List of past sessions
 */
export function getWorkoutHistory() {
    return JSON.parse(localStorage.getItem('moveMentorHistory') || '[]');
}
