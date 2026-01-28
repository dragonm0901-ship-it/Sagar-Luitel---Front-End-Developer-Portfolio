uniform sampler2D uTexture;
uniform sampler2D uDataTexture; // The mouse trail/fluid data
uniform float uAberrationIntensity;
varying vec2 vUv;

void main() {
  vec4 data = texture2D(uDataTexture, vUv);
  
  // distortion vector from data (rg channels usually fit velocity or offest)
  vec2 displacement = data.rg * 0.1; // adjust intensity
  
  // Chromatic Aberration
  float r = texture2D(uTexture, vUv + displacement + vec2(uAberrationIntensity, 0.0)).r;
  float g = texture2D(uTexture, vUv + displacement).g;
  float b = texture2D(uTexture, vUv + displacement - vec2(uAberrationIntensity, 0.0)).b;
  
  gl_FragColor = vec4(r, g, b, 1.0);
}
