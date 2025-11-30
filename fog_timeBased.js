const canvas = document.getElementById('fogCanvas');
const gl = canvas.getContext('webgl');

// Canvas boyutunu ayarla
function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	gl.viewport(0, 0, canvas.width, canvas.height);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Vertex Shader
const vertexShaderSource = `
	attribute vec2 position;
	void main() {
		gl_Position = vec4(position, 0.0, 1.0);
	}
`;

const fragmentShaderSource = `
	precision highp float;
	uniform vec2 resolution;
	uniform float time;

	float hash(vec2 p) {
		return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);
	}

	float noise(vec2 p) {
		vec2 i = floor(p);
		vec2 f = fract(p);
		f = f*f*(3.0 - 2.0*f);
		float a = hash(i);
		float b = hash(i + vec2(1.0,0.0));
		float c = hash(i + vec2(0.0,1.0));
		float d = hash(i + vec2(1.0,1.0));
		return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
	}

	float fbm(vec2 p) {
		float value = 0.0;
		float amp = 0.5;
		float freq = 1.0;
		for (int i = 0; i < 5; i++) {
			value += amp * noise(p * freq);
			freq *= 2.0;
			amp *= 0.5;
		}
		return value;
	}

	vec3 hsv2rgb(vec3 c){
		vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
		vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
		return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
	}

	// Mavi -> Mor -> Pembe döngüsü
	float getHueFromCycle(float t, float offset) {
		// 0.55 = Mavi, 0.75 = Mor, 0.92 = Pembe
		float cycle = mod(t * 0.08 + offset, 1.0);

		if (cycle < 0.33) {
			// Mavi -> Mor
			return mix(0.55, 0.75, cycle * 3.0);
		} else if (cycle < 0.66) {
			// Mor -> Pembe
			return mix(0.75, 0.92, (cycle - 0.33) * 3.0);
		} else {
			// Pembe -> Mavi
			return mix(0.92, 1.05, (cycle - 0.66) * 3.0);
		}
	}

	// Renkli sis - her katman farklı renkte
	vec3 layerColor(float hue, float fog, float t) {
		float h = mod(hue, 1.0);

		// Parlaklık pulsesi
		float pulse = 0.6 + 0.4 * sin(t * 2.5);

		// TAM DOYGUN RENK - beyaz yok!
		float saturation = 0.95; // Çok yüksek saturation
		float value = fog * pulse * 1.2; // Parlaklık

		return hsv2rgb(vec3(h, saturation, value));
	}

	void main() {
		vec2 uv = gl_FragCoord.xy / resolution.xy;

		// 3 katman - farklı hızlar
		vec2 uv1 = uv * 2.8 + 0.5*vec2(time * 0.2,  time * 0.15);  // Yavaş katman
		vec2 uv2 = uv * 3.5 + 0.5*vec2(time * 0.45, -time * 0.35); // Orta hız
		vec2 uv3 = uv * 4.2 + 0.5*vec2(-time * 0.6, time * 0.25);  // Hızlı katman

		float fog1 = fbm(uv1);
		float fog2 = fbm(uv2);
		float fog3 = fbm(uv3);

		// Her katman farklı renk döngüsünde
		// Katman 1: Başlangıç noktası
		// Katman 2: 0.33 offset (bir sonraki renk)
		// Katman 3: 0.66 offset (daha sonraki renk)
		float hue1 = getHueFromCycle(time, 0.0);   // Örn: Mavi
		float hue2 = getHueFromCycle(time, 0.33);  // Örn: Mor
		float hue3 = getHueFromCycle(time, 0.66);  // Örn: Pembe

		// Her katman TAM RENKLI
		vec3 c1 = layerColor(hue1, fog1, time + 0.0);
		vec3 c2 = layerColor(hue2, fog2, time + 1.5);
		vec3 c3 = layerColor(hue3, fog3, time + 3.0);

		// Katmanları birleştir
		vec3 finalColor = c1 * 0.4 + c2 * 0.4 + c3 * 0.4;
		finalColor = clamp(finalColor, 0.0, 1.0);

		gl_FragColor = vec4(finalColor, 1.0);
	}
`;

// Shader'ları derle
function createShader(gl, type, source) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error('Shader derleme hatası:', gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}
	return shader;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

// Program oluştur
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
	console.error('Program bağlama hatası:', gl.getProgramInfoLog(program));
}
gl.useProgram(program);

// Tam ekran quad
const positions = new Float32Array([
	-1, -1,
	 1, -1,
	-1,  1,
	 1,  1
]);
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

const positionLocation = gl.getAttribLocation(program, 'position');
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// Uniform'ları al
const resolutionLocation = gl.getUniformLocation(program, 'resolution');
const timeLocation = gl.getUniformLocation(program, 'time');

// Animasyon döngüsü
let startTime = Date.now();
function render() {
	const currentTime = (Date.now() - startTime) / 1000.0;
	gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
	gl.uniform1f(timeLocation, currentTime);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	requestAnimationFrame(render);
}

render();
