/**
 * Calculates the angle between three points (A, B, C) where B is the vertex.
 * @param {Object} a - Point A {x, y}
 * @param {Object} b - Vertex Point B {x, y}
 * @param {Object} c - Point C {x, y}
 * @returns {number} Angle in degrees
 */
export function calculateAngle(a, b, c) {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);

    if (angle > 180.0) {
        angle = 360 - angle;
    }

    return angle;
}

/**
 * Common landmark pairs for exercises
 */
export const LANDMARKS = {
    SHOULDER_LEFT: 11,
    SHOULDER_RIGHT: 12,
    ELBOW_LEFT: 13,
    ELBOW_RIGHT: 14,
    WRIST_LEFT: 15,
    WRIST_RIGHT: 16,
    HIP_LEFT: 23,
    HIP_RIGHT: 24,
    KNEE_LEFT: 25,
    KNEE_RIGHT: 26,
    ANKLE_LEFT: 27,
    ANKLE_RIGHT: 28
};
