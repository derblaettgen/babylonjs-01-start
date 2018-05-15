import * as BABYLON from 'babylonjs';
import * as DAT from 'dat.gui';
import 'babylonjs-loaders'

// ------------------------------------------------
let gui = new DAT.GUI({
	height : 5 * 32 - 1
});

let params = {
	sphereScale: 1.5
};

gui.add(params, 'sphereScale').min(1).max(10);
// ------------------------------------------------


let canvas = document.getElementById('renderCanvas');
let engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true}, true);

let level_01 = () => {
	let scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3.White();

    let camera = new BABYLON.ArcRotateCamera('mainCamera', 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(10, 10, 10));
	camera.attachControl(canvas, false);

	let sphere = BABYLON.Mesh.CreateSphere('Sphere01', 4, 1, scene, false, BABYLON.Mesh.FRONTSIDE);
	let material = new BABYLON.StandardMaterial('Material01', scene);
	material.wireframe = true;
	sphere.material = material;

	BABYLON.SceneLoader.ImportMesh('', './assets/', 'Test01.gltf', scene, function (meshes) {
        for (let key in meshes) {
            console.log(meshes[key]);
            meshes[key].material = material;
            meshes[key].name = `imported_${meshes[key].name}`
            meshes[key].id = meshes[key].name
            console.log(`name: ${meshes[key].name}`);
        }
    });

	return scene;
};

let scene = level_01();
let sphere = scene.getMeshByID('Sphere01');

engine.runRenderLoop(function () {
	sphere.rotation.x += 0.03;
	sphere.rotation.y += 0.005;

	let scaleFactor = params.sphereScale;
	scene.getMeshByID('Sphere01').scaling = new BABYLON.Vector3(scaleFactor, scaleFactor, scaleFactor);

	scene.render();
});

window.addEventListener('resize', function () { engine.resize(); console.log('resized');} );