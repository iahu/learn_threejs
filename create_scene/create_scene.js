/**
 * 创造场景
 */
var scene = new THREE.Scene();
var $container = document.getElementById('container');

// 场景大小
var WIDTH = 800,
	HEIGHT = 600;

// 相机属性
var VIEW_ANGLE = 45,
	ASPECT = WIDTH/HEIGHT,
	NEAR = 0.1,
	FAR = 10000;

// 建造webgl渲染器、相机和场景
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR
	);

camera.position.z = 30;

// 把相机添加到场景里去
scene.add(camera);

// 放置相机

// 开始渲染
renderer.setSize(WIDTH, HEIGHT);

// 附加可渲染的DOM元素
$container.appendChild( renderer.domElement );


/**
 * 添加物体
 */
var geometry = new THREE.BoxGeometry(5,5,5);
var geoCylinder = new THREE.CylinderGeometry( 5, 5, 10, 32);
var material = new THREE.MeshPhongMaterial({color:0xff0000});
var cube = new THREE.Mesh( geometry, material );
var cylinder = new THREE.Mesh( geoCylinder, material );
cylinder.position.set(-10,0,-10);
cylinder.rotation.z = -85;
scene.add( cube );
scene.add( cylinder );


/**
 * 添加灯光
 */
var pointLight = new THREE.PointLight(0xffffff, 9, 100);
var ambLight = new THREE.AmbientLight( 0x660000, 0.02, 50 );
pointLight.position.set(50,50,50);
ambLight.position.set (-50,-50,-50);
scene.add( pointLight );
scene.add( ambLight );

/**
 * 渲染
 */
function render() {
	requestAnimationFrame(render);

	cube.rotation.x += 0.1;
	cube.rotation.y += 0.1;

	cylinder.rotation.y += 0.05;

	renderer.render(scene, camera);
}
render();