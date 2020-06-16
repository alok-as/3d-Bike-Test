let scene, camera, renderer, model, controls, directionalLight, pointLight;
const ADD = 0.01;

const modelPath = "../assets/bike.glb";

//Model Loader Handler
const modelLoader = () => {
	let geometry, material, texture, loader;
	loader = new THREE.GLTFLoader();
	loader.load(
		modelPath,
		(gltf) => {
			model = gltf.scene;
			model.position.set(0, -1, 0);
			model.rotation.y = Math.PI / 2;
			model.scale.set(5, 5, 5);
			console.log(model);
			scene.add(model);

			// model.traverse((part) => {
			// 	console.log(part);
			// });
		},
		undefined,
		(error) => {
			console.error(`Error in loading file ${error}`);
		}
	);
};

const init = () => {
	//Creating a Scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xfffffff);

	//Setting up the Camera
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);
	camera.position.z = 5;

	//Loading a 3D Model
	modelLoader();

	//Setting up the Renderer
	renderer = new THREE.WebGLRenderer();
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	//Setting Up Orbital Controls
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.autoRotate = true;
	controls.autoRotateSpeed = 3.0;
	controls.update();

	//Setting up the Resize Function
	window.addEventListener("resize", () => {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	});
};

const animate = () => {
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
};

init();
animate();
