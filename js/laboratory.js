// Canvas elementlarini olish
const arrayCanvas = document.getElementById('arrayCanvas');
const linkedListCanvas = document.getElementById('linkedListCanvas');
const treeCanvas = document.getElementById('treeCanvas');
const graphCanvas = document.getElementById('graphCanvas');
const sortingCanvas = document.getElementById('sortingCanvas');
const searchCanvas = document.getElementById('searchCanvas');

// Global o'zgaruvchilar va Three.js obyektlari
let scenes = {};
let animationSpeed = 1;
let animationFrameIds = {};

// Geometriya va materiallar
const cubeGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
const sphereGeometry = new THREE.SphereGeometry(0.4, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 32);
const defaultMaterial = new THREE.MeshPhongMaterial({ color: 0x4CAF50 });
const highlightMaterial = new THREE.MeshPhongMaterial({ color: 0x2196F3 });
const searchMaterial = new THREE.MeshPhongMaterial({ color: 0xF44336 });

// Sahifa yuklanganda barcha scenalarni yaratish
window.addEventListener('load', () => {
    console.log('Page loaded, initializing scenes...');
    try {
        initializeScenes();
        startAllAnimations();
        
        // Tezlik sliderlarini sozlash
        document.querySelectorAll('.speed-slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                animationSpeed = parseFloat(e.target.value);
            });
        });
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

// Barcha scenalarni yaratish
function initializeScenes() {
    const canvasTypes = ['array', 'linkedList', 'tree', 'graph', 'sorting', 'search'];
    
    canvasTypes.forEach(type => {
        const canvas = document.getElementById(`${type}Canvas`);
        if (!canvas) {
            console.error(`Canvas not found for type: ${type}`);
            return;
        }
        
        try {
            console.log(`Initializing scene for: ${type}`);
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ 
                canvas: canvas, 
                alpha: true, 
                antialias: true 
            });
            
            // Canvas o'lchamlarini to'g'rilash
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            renderer.setSize(width, height, false);
            renderer.setClearColor(0x000000, 0);
            
            // Chiroqlarni qo'shish
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(5, 5, 5);
            scene.add(directionalLight);
            
            camera.position.z = 5;
            
            scenes[type] = {
                scene,
                camera,
                renderer,
                elements: []
            };
            
            // Test element qo'shish
            addTestElement(type);
            
        } catch (error) {
            console.error(`Error initializing ${type} scene:`, error);
        }
    });
}

// Test element qo'shish
function addTestElement(type) {
    const { scene, elements } = scenes[type];
    let mesh;
    
    switch(type) {
        case 'array':
            mesh = new THREE.Mesh(cubeGeometry, defaultMaterial.clone());
            mesh.position.set(0, 0, 0);
            break;
        case 'linkedList':
        case 'tree':
        case 'graph':
        case 'sorting':
        case 'search':
            mesh = new THREE.Mesh(sphereGeometry, defaultMaterial.clone());
            mesh.position.set(0, 0, 0);
            break;
    }
    
    if (mesh) {
        scene.add(mesh);
        elements.push({ mesh, value: 1 });
    }
}

// Animatsiyalarni boshlash
function startAllAnimations() {
    console.log('Starting all animations...');
    for (let type in scenes) {
        if (scenes[type]) {
            try {
                if (animationFrameIds[type]) {
                    cancelAnimationFrame(animationFrameIds[type]);
                }
                animate(type);
            } catch (error) {
                console.error(`Error starting animation for ${type}:`, error);
            }
        }
    }
}

// Animatsiya funksiyasi
function animate(type) {
    if (!scenes[type]) return;
    
    const { scene, camera, renderer, elements } = scenes[type];
    
    function animateScene() {
        try {
            animationFrameIds[type] = requestAnimationFrame(() => animateScene());
            
            // Har bir elementni aylantiramiz
            elements.forEach(element => {
                if (element.mesh) {
                    element.mesh.rotation.y += 0.01 * animationSpeed;
                }
            });
            
            renderer.render(scene, camera);
        } catch (error) {
            console.error(`Animation error in ${type}:`, error);
            cancelAnimationFrame(animationFrameIds[type]);
        }
    }
    
    animateScene();
}

// Scenani tozalash
function clearScene(type) {
    if (!scenes[type]) return;
    
    const { scene, elements } = scenes[type];
    
    elements.forEach(element => {
        if (element.mesh) {
            scene.remove(element.mesh);
        }
    });
    
    elements.length = 0;
    addTestElement(type);
}

// Oyna o'lchamini o'zgartirish hodisasi
window.addEventListener('resize', () => {
    console.log('Window resized, updating scenes...');
    for (let type in scenes) {
        if (scenes[type]) {
            try {
                const { camera, renderer } = scenes[type];
                const canvas = renderer.domElement;
                const width = canvas.clientWidth;
                const height = canvas.clientHeight;
                
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height, false);
            } catch (error) {
                console.error(`Error handling resize for ${type}:`, error);
            }
        }
    }
});

// Massiv funksiyalari
function addElement() {
    const { scene, elements } = scenes.array;
    const cube = new THREE.Mesh(cubeGeometry, defaultMaterial.clone());
    const x = elements.length * 1.2 - (elements.length * 1.2) / 2;
    cube.position.set(x, 0, 0);
    scene.add(cube);
    elements.push({ mesh: cube, value: elements.length + 1 });
}

function removeElement() {
    const { scene, elements } = scenes.array;
    if (elements.length > 0) {
        const element = elements.pop();
        scene.remove(element.mesh);
    }
}

// Linked List funksiyalari
function addNode() {
    const { scene, elements } = scenes.linkedList;
    const sphere = new THREE.Mesh(sphereGeometry, defaultMaterial.clone());
    const x = elements.length * 1.5 - (elements.length * 1.5) / 2;
    sphere.position.set(x, 0, 0);
    scene.add(sphere);
    elements.push({ mesh: sphere, value: elements.length + 1 });
}

function removeNode() {
    const { scene, elements } = scenes.linkedList;
    if (elements.length > 0) {
        const element = elements.pop();
        scene.remove(element.mesh);
    }
}

// Tree funksiyalari
function addTreeNode() {
    const { scene, elements } = scenes.tree;
    const sphere = new THREE.Mesh(sphereGeometry, defaultMaterial.clone());
    sphere.position.set(0, elements.length * -1.5, 0);
    scene.add(sphere);
    elements.push({ mesh: sphere, value: elements.length + 1 });
}

// Graph funksiyalari
function addVertex() {
    const { scene, elements } = scenes.graph;
    const sphere = new THREE.Mesh(sphereGeometry, defaultMaterial.clone());
    const angle = elements.length * (Math.PI * 2 / 8);
    const radius = 2;
    sphere.position.set(
        radius * Math.cos(angle),
        radius * Math.sin(angle),
        0
    );
    scene.add(sphere);
    elements.push({ mesh: sphere, value: elements.length + 1 });
}

function addEdge() {
    const { scene, elements } = scenes.graph;
    if (elements.length < 2) return;
    
    const v1 = Math.floor(Math.random() * elements.length);
    let v2;
    do {
        v2 = Math.floor(Math.random() * elements.length);
    } while (v2 === v1);
    
    const start = elements[v1].mesh.position;
    const end = elements[v2].mesh.position;
    
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    
    const edge = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, length, 8),
        new THREE.MeshPhongMaterial({ color: 0x888888 })
    );
    
    const center = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    edge.position.copy(center);
    
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.normalize()
    );
    edge.setRotationFromQuaternion(quaternion);
    
    scene.add(edge);
}

// Saralash funksiyalari
function initSortingArray() {
    const { scene, elements } = scenes.sorting;
    clearScene('sorting');
    
    const values = Array.from({length: 10}, (_, i) => i + 1);
    shuffleArray(values);
    
    values.forEach((value, index) => {
        const cube = new THREE.Mesh(cubeGeometry, defaultMaterial.clone());
        cube.position.x = index * 1.2 - 5;
        cube.scale.y = value * 0.3;
        elements.push({ mesh: cube, value });
        scene.add(cube);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function clearScene(type) {
    if (!scenes[type]) return;
    
    const { scene, elements } = scenes[type];
    
    elements.forEach(element => {
        if (element.mesh) {
            scene.remove(element.mesh);
        }
    });
    
    elements.length = 0;
    addTestElement(type);
}

async function bubbleSort() {
    const { elements } = scenes.sorting;
    const n = elements.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            await highlightAndCompare(elements[j], elements[j + 1]);
            if (elements[j].value > elements[j + 1].value) {
                await swapElements(elements, j, j + 1);
            }
        }
    }
}

async function highlightAndCompare(el1, el2) {
    el1.mesh.material.color.setHex(0x2196F3);
    el2.mesh.material.color.setHex(0x2196F3);
    await new Promise(resolve => setTimeout(resolve, 500 / animationSpeed));
    el1.mesh.material.color.setHex(0x4CAF50);
    el2.mesh.material.color.setHex(0x4CAF50);
}

async function swapElements(elements, i, j) {
    const tempX = elements[i].mesh.position.x;
    elements[i].mesh.position.x = elements[j].mesh.position.x;
    elements[j].mesh.position.x = tempX;
    
    const temp = elements[i];
    elements[i] = elements[j];
    elements[j] = temp;
    
    await new Promise(resolve => setTimeout(resolve, 500 / animationSpeed));
}

// Qidirish funksiyalari
function initSearchArray() {
    const { scene, elements } = scenes.search;
    clearScene('search');
    
    const values = Array.from({length: 10}, (_, i) => i + 1);
    
    values.forEach((value, index) => {
        const cube = new THREE.Mesh(cubeGeometry, defaultMaterial.clone());
        cube.position.x = index * 1.2 - 5;
        elements.push({ mesh: cube, value });
        scene.add(cube);
    });
}

async function binarySearch(searchValue) {
    const { elements } = scenes.search;
    let left = 0;
    let right = elements.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        elements[mid].mesh.material.color.setHex(0xF44336);
        
        await new Promise(resolve => setTimeout(resolve, 1000 / animationSpeed));
        
        if (elements[mid].value === searchValue) {
            return mid;
        }
        
        elements[mid].mesh.material.color.setHex(0x4CAF50);
        
        if (elements[mid].value < searchValue) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}
