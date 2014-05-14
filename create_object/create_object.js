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
