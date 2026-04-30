# MoveMentor 🏋️‍♂️🤖

> **An AI-powered virtual fitness coach tracking your workout form in real-time.**

MoveMentor is a high-performance, AI-driven virtual gym trainer that runs entirely in your browser. It uses computer vision to track your body movements, count your repetitions, and provide real-time feedback on your exercise form. 

![MoveMentor UI Preview](index.html) <!-- Replace with an actual screenshot if you have one -->

## ✨ Features

- **Real-Time Pose Detection**: Utilizes MediaPipe Pose for lightning-fast, high-accuracy pose estimation directly in the browser.
- **Exercise Tracking**: Currently supports intelligent tracking for:
  - 💪 Bicep Curls
  - 🏋️‍♂️ Squats
  - 🤸 Pushups
- **Smart Form Feedback**: Gives visual cues and warnings if your form is incorrect (e.g., "GO LOWER", "STRAIGHTEN BACK").
- **Workout Dashboard**: Tracks reps, estimates active calories burned, and includes a built-in workout timer.
- **Premium UI**: Modern, glassmorphism-inspired interface for a clean and focused workout experience.
- **Privacy-First**: All processing happens locally on your device within the browser. No video is ever sent to a server.

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- A webcam (required for pose detection)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/MoveMentor.git
   cd MoveMentor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Navigate to the local URL provided in your terminal (usually `http://localhost:5173`).

## 🛠️ Technology Stack

- **Computer Vision**: [MediaPipe Tasks Vision](https://developers.google.com/mediapipe) (Pose Landmarker)
- **Frontend**: HTML5, Vanilla JavaScript (ES6+), CSS3
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Custom CSS with Glassmorphism principles

## 🏗️ Project Structure

For detailed information about the architecture and how the different modules interact, please see the [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) and [WALKTHROUGH.md](WALKTHROUGH.md).

```
MoveMentor/
├── index.html          # Main application entry
├── style.css           # Premium styling
├── main.js             # App initialization and Vision Engine
├── src/
│   ├── pose.js         # MediaPipe configuration
│   ├── logic/          # Exercise FSM and angle calculations
│   ├── ui/             # Canvas rendering and HUD updates
│   └── utils/          # Storage, timers, etc.
└── package.json        # Project metadata and dependencies
```

## 💡 Usage Tips

- **Lighting**: Ensure you are in a well-lit room. High contrast between your body and the background significantly improves AI tracking.
- **Positioning**: For full-body exercises like squats, ensure your entire body is visible in the camera frame.
- **Performance**: Use modern browsers like Chrome or Edge for the best WebAssembly and GPU acceleration performance.

## 📄 License

This project is licensed under the terms of the LICENSE file included in the repository.
