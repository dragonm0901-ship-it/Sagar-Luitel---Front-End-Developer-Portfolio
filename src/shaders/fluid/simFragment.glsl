uniform sampler2D uTexture; // Input texture (previous frame)
uniform vec2 uMouse; // Mouse position (0 to 1)
uniform float uAspect;
uniform float uVelocity; // Mouse velocity or strength
uniform float uViscosity; // How fast it fades
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    
    // Sample previous frame
    vec4 current = texture2D(uTexture, uv);
    
    // Calculate distance to mouse
    vec2 diff = uv - uMouse;
    diff.x *= uAspect;
    
    float dist = length(diff);
    
    // Create a "splat" of color where the mouse is
    float radius = 0.03;
    float splat = smoothstep(radius, 0.0, dist);
    
    // Add velocity/color to the simulation
    // We store intensity in R channel, maybe direction in GB?
    // For simple distortion, just intensity (R) is enough to drive displacement magnitude
    
    vec3 color = current.rgb;
    
    // Add new splat
    color.r += splat * uVelocity;
    
    // Decay/Dissipation
    color.r *= uViscosity; // e.g. 0.98 to fade out
    
    gl_FragColor = vec4(color, 1.0);
}
