import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/Addons.js';
import { color } from 'three/tsl';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
    antialias: true,
  alpha: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.toneMapping = THREE.ACESFilmicToneMapping

renderer.outputEncoding = THREE.sRGBEncoding

// const hdrUrl = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/moon_lab_1k.hdr'
// new RGBELoader().load(hdrUrl, texture => {
//   const gen = new THREE.PMREMGenerator(renderer)
//   const envMap = gen.fromEquirectangular(texture).texture
//   scene.environment = envMap
//   // scene.background = envMap
  
//   texture.dispose()
//   gen.dispose()
// })

const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

const directionalL = new THREE.DirectionalLight(0xffffff, 5);
scene.add(directionalL);
directionalL.position.set(0,10,0);
window.addEventListener('resize', function() {

			var width = window.innerWidth;
			var height = window.innerHeight;
			renderer.setSize( width, height );
			camera.aspect = width / height;
			camera.updateProjectionMatrix();


		});

const model = new THREE.Object3D( );
    const loader = new GLTFLoader();
    loader.load('/Gundam.glb',
	 (glb ) => {
        const box = new THREE.Box3( ).setFromObject( glb.scene );
        const c = box.getCenter( new THREE.Vector3( ) );
        const size = box.getSize( new THREE.Vector3( ) );
        // model.position.set( -c.x, size/2 - c.y, -c.z );
        model.position.set(0,-1,-3);
        model.rotateY(3.1);
        model.add( glb.scene ); 
        scene.add( model );
	});

const box = new THREE.Box3();
box.setFromObject(model);

// const helper = new THREE.Box3Helper( box, 0xffff00 );
// scene.add( helper );

// const controls = new OrbitControls( camera, renderer.domElement );
// controls.enableDamping = true;

camera.position.z = 10;


// controls.update();
function animate() {
	requestAnimationFrame( animate );
  model.rotation.y += 0.0009;
	// controls.update();
	renderer.render( scene, camera );

}
animate();