import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
    antialias: true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setSize( window.innerWidth, window.innerHeight );

const directionalL = new THREE.DirectionalLight(0xffffff, 5);
scene.add(directionalL);

window.addEventListener('resize', function() {

			var width = window.innerWidth;
			var height = window.innerHeight;
			renderer.setSize( width, height );
			camera.aspect = width / height;
			camera.updateProjectionMatrix();


		});

let model;
    const loader = new GLTFLoader();
    loader.load('/model/nissan_silvia_s15_custom.glb',
	 (glb ) => {
        model = glb.scene;
        model.position.y = -1;
        model.position.z = 1;
        scene.add(model);
	});


const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;

camera.position.z = 5;

controls.update();
function animate() {
	requestAnimationFrame( animate );
  model.rotation.y += 0.0009;
	controls.update();
	renderer.render( scene, camera );

}
animate();