// 场景大小
var WIDTH = 400,
	HEIGHT = 300;

// 相机属性
var VIEW_ANGLE = 45,
	ASPECT = WIDTH/HEIGHT,
	NEAR = 0.1,
	FAR = 10000;

var $container = document.getElementById('container');

// 建造webgl渲染器、相机和场景
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR
	);

var scene = new THREE.Scene();

// 把相机添加到场景里去
scene.add(camera);

// 放置相机
camera.position.z = 300;

// 开始渲染
renderer.setSize(WIDTH, HEIGHT);

// 附加可渲染的DOM元素
$container.appendChild( renderer.domElement );



// 配置 球形 的变量
var radius = 50,
	segments = 16,
	rings = 16;

var sphere = new THREE.Mesh(
	new THREE.SphereGeometry(radius, segments, rings),
	sphereMaterial);

// 添加进场景
scene.add(sphere);

// 简单的材质
var sphereMaterial = new THREE.MeshLambertMaterial({
	color: 0xCC0000
});


// 灯光
var pointLight = new THREE.PointLight(0xFFFFFF);

pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

scene.add(pointLight);


renderer.render(scene, camera);


sphere.geometry.dynamic = true;
sphere.geometry.verticesNeedUpdate = true;
sphere.geometry.normalsNeedUpdate = true;