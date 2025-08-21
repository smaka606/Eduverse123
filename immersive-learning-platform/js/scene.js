import * as THREE from 'three';

// A simple OrbitControls implementation for vanilla JS
class OrbitControls {
    constructor(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement;
        this.target = new THREE.Vector3();

        this.minDistance = 0;
        this.maxDistance = Infinity;

        let isMouseDown = false;
        let lastMouseX = 0;
        let lastMouseY = 0;

        const onMouseDown = (event) => {
            isMouseDown = true;
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        };

        const onMouseUp = () => {
            isMouseDown = false;
        };

        const onMouseMove = (event) => {
            if (!isMouseDown) return;
            const deltaX = event.clientX - lastMouseX;
            const deltaY = event.clientY - lastMouseY;
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;

            const newPosition = this.camera.position.clone();
            newPosition.x += deltaX * 0.1;
            newPosition.y -= deltaY * 0.1;

            this.camera.position.copy(newPosition);
            this.camera.lookAt(this.target);
        };

        const onMouseWheel = (event) => {
            const newPosition = this.camera.position.clone();
            newPosition.z += event.deltaY * 0.01;
            this.camera.position.copy(newPosition);
        }

        this.domElement.addEventListener('mousedown', onMouseDown);
        this.domElement.addEventListener('mouseup', onMouseUp);
        this.domElement.addEventListener('mousemove', onMouseMove);
        this.domElement.addEventListener('wheel', onMouseWheel);
    }
}


export function initScene(container) {
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 5, 15);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 2, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 15, 10);
    scene.add(directionalLight);

    // Placeholder object
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({ color: 0xffa500 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 1, 0);
    scene.add(cube);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(30, 30);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}
