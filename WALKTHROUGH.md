# MoveMentor Project Walkthrough

MoveMentor is a high-performance, AI-driven virtual gym trainer. Here's how the different pieces fit together:

## 🚀 How to Run Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Browser**:
   Navigate to the local URL (usually `http://localhost:5173`).

---

## 🏗️ Technical Architecture Details

### 1. The Vision Engine (`main.js`)
We use **MediaPipe Tasks Vision** to run pose estimation. It downloads the `pose_landmarker_lite.task` model (optimized for speed) and runs it on the GPU (if available).
- **Latency**: Sub-30ms on modern browsers.
- **Accuracy**: Detects 33 human body landmarks.

### 2. The Logic Engine (`src/logic/`)
- `angles.js`: Uses trigonometry (`atan2`) to calculate the interior angle of joints. For example, the elbow angle is calculated using Shoulder, Elbow, and Wrist coordinates.
- `exercises.js`: Implements a **Finite State Machine (FSM)** for each exercise. 
  - *Example (Bicep Curl)*: 
    - `DOWN`: Angle > 160°
    - `UP`: Angle < 30°
    - The rep counts only when transitioning from `DOWN` to `UP`.

### 3. The UI System
The UI uses **Glassmorphism** (semi-transparent backgrounds with blur) to maintain a modern, "premium" feel.
- **Canvas Overlay**: We draw the skeleton directly over the video feed using `DrawingUtils`.
- **HUD (Heads-Up Display)**: Displays real-time feedback like "GO LOWER" or "STRAIGHTEN BACK" to help users correct their form.

---

## 💡 Best Practices Implemented
- **Modular Code**: Logic is separated from UI. You can easily add new exercises by adding to the `EXERCISES` object in `exercises.js`.
- **Performance**: We use `requestAnimationFrame` for smooth 60fps rendering.
- **Real-World Usability**: Voice coaching ensures users don't have to look at the screen constantly while exercising.
- **Persistence**: Your workouts are saved in the browser's `localStorage`.

---

## 🛠️ Debugging Tips
- **Lighting**: Ensure you are in a well-lit room. High contrast between your body and the background helps the AI.
- **Visibility**: The AI needs to see your full upper body (for curls) or full body (for squats) to work accurately.
- **Browser**: Use Chrome or Edge for the best WebAssembly/GPU performance.
