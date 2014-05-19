// 设置场景
var scene, camera, renderer;
var $container = document.getElementById('rubiks');
var WIDTH = window.innerWidth, HEIGHT = window.innerHeight, ASPECT = WIDTH/HEIGHT, FOV = 45, FAR = 1000, NEAR = 0.1;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( FOV, ASPECT, NEAR, FAR );
renderer = Detector.webgl?
		new THREE.WebGLRenderer( {antialias: true} )
		: new THREE.CanvasRenderer();

renderer.setClearColor(0xffffff);
camera.position.set(300,300,300);
camera.lookAt(scene.position);
scene.add(camera);
renderer.setSize(WIDTH, HEIGHT);
$container.appendChild( renderer.domElement );

// 灯光
var spotlight = new THREE.SpotLight(0xffffff);
spotlight.intensity = 2;
spotlight.position.set(-60,150,80);
scene.add(spotlight);

var pointLight = new THREE.PointLight( 0xffffff, 1, 200 );
pointLight.position.set( 50, 50, 0 );
scene.add( pointLight );
var pointLight2 = new THREE.PointLight( 0xffffff, 1, 200 );
pointLight2.position.set( 0, 50, -50 );
scene.add( pointLight2 );
var pointLight3 = new THREE.PointLight( 0xffffff, 1, 200 );
pointLight3.position.set( 0, -50, -50 );
scene.add( pointLight3 );

// 方块元素
var cubeWidth = 64;
var colors = [0xFF0000,0x00CC00,0xFFFF00,0x0099CC,0x000000,0xFFFFFF];
var cubeGeo = new THREE.BoxGeometry(cubeWidth, cubeWidth, cubeWidth, 1,1,1);
var materialArray = [];
for (var i = 1; i < 9; i++) {
	materialArray.push( new THREE.MeshBasicMaterial( {map: THREE.ImageUtils.loadTexture('images/'+ i +'.png')} ) );
}
var cubeMaterial = new THREE.MeshFaceMaterial(materialArray);

// 魔方基本模型
var cubeArray = [], cube,
	x,y,z;
for (x=0; x < 3; x++) {
	for (y=0; y < 3; y++) {
		for (z=0; z < 3; z++) {
			cube = new THREE.Mesh(cubeGeo.clone(), cubeMaterial);
			cube.position.set(
					(x-1)*cubeWidth,
					(y-1)*cubeWidth,
					(z-1)*cubeWidth);

			cubeArray.push(cube);
			scene.add(cube);
		}
	}
}

// 点击事件
var mouse = new THREE.Vector2( 0, 0 ),
	projector = new THREE.Projector(),
	raycaster,
	intersects,
	vector;

function onMousedown(event) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y =  - ( event.clientY / window.innerHeight ) * 2 + 1;
	console.log(mouse);

	vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
	projector.unprojectVector(vector, camera);
	raycaster = new THREE.Ray(camera.position, vector.sub(camera.position).normalize() );

	intersects = raycaster.intersectObjects(cubeArray);

	if ( intersects.length ) {
		console.log('test');
	}
}
document.addEventListener('mousedown', onMousedown);


// render & helper
// var axes = new THREE.AxisHelper(100);
// scene.add( axes );
THREEx.WindowResize(renderer, camera);
var controls = new THREE.OrbitControls( camera, renderer.domElement );

function update() {
	controls.update();
}
function render() {
	renderer.render( scene, camera );
}

function animate() {
	requestAnimationFrame( animate );
	update();
	render();
}
animate();