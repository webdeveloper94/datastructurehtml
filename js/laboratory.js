// Canvas elementlarini olish
const arrayCanvas = document.getElementById('arrayCanvas');
const linkedListCanvas = document.getElementById('linkedListCanvas');
const treeCanvas = document.getElementById('treeCanvas');
const graphCanvas = document.getElementById('graphCanvas');
const sortingCanvas = document.getElementById('sortingCanvas');
const searchCanvas = document.getElementById('searchCanvas');

// Three.js scenes, cameras va rendererlarni yaratish
function createScene(canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Asosiy yorug'lik
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Yo'naltirilgan yorug'lik
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    return { scene, camera, renderer };
}

// Massiv animatsiyasi
function startArrayAnimation() {
    const { scene, camera, renderer } = createScene(arrayCanvas);
    camera.position.z = 5;
    
    // Massiv elementlarini yaratish
    const elements = [];
    const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const materials = [
        new THREE.MeshPhongMaterial({ color: 0x4CAF50 }),
        new THREE.MeshPhongMaterial({ color: 0x2196F3 }),
        new THREE.MeshPhongMaterial({ color: 0xF44336 })
    ];
    
    // Massiv elementlarini joylashtirish
    for(let i = 0; i < 5; i++) {
        const cube = new THREE.Mesh(geometry, materials[i % 3]);
        cube.position.x = i * 1.2 - 2;
        elements.push(cube);
        scene.add(cube);
    }
    
    // Animatsiya
    function animate() {
        requestAnimationFrame(animate);
        
        elements.forEach((cube, index) => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            
            // Yuqoriga va pastga harakat
            cube.position.y = Math.sin(Date.now() * 0.001 + index) * 0.2;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Bog'langan ro'yxat animatsiyasi
function startLinkedListAnimation() {
    const { scene, camera, renderer } = createScene(linkedListCanvas);
    camera.position.z = 8;
    
    // Tugunlarni yaratish
    const nodes = [];
    const nodeGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const nodeMaterial = new THREE.MeshPhongMaterial({ color: 0x4CAF50 });
    
    // Bog'lovchi chiziqlar
    const linkGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 32);
    const linkMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    
    // Tugunlarni va bog'lovchilarni joylashtirish
    for(let i = 0; i < 4; i++) {
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.x = i * 3 - 4;
        nodes.push(node);
        scene.add(node);
        
        if(i < 3) {
            const link = new THREE.Mesh(linkGeometry, linkMaterial);
            link.position.x = i * 3 - 2.5;
            link.rotation.z = Math.PI / 2;
            scene.add(link);
        }
    }
    
    // Animatsiya
    function animate() {
        requestAnimationFrame(animate);
        
        nodes.forEach((node, index) => {
            node.position.y = Math.sin(Date.now() * 0.001 + index) * 0.3;
            node.rotation.y += 0.01;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Daraxt animatsiyasi
function startTreeAnimation() {
    const { scene, camera, renderer } = createScene(treeCanvas);
    camera.position.z = 10;
    camera.position.y = 2;
    
    // Daraxt tugunlarini yaratish
    const nodes = [];
    const nodeGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const nodeMaterial = new THREE.MeshPhongMaterial({ color: 0x4CAF50 });
    
    // Daraxt strukturasini yaratish
    const treeStructure = [
        { x: 0, y: 3, connections: [1, 2] },
        { x: -2, y: 1.5, connections: [3, 4] },
        { x: 2, y: 1.5, connections: [5, 6] },
        { x: -3, y: 0, connections: [] },
        { x: -1, y: 0, connections: [] },
        { x: 1, y: 0, connections: [] },
        { x: 3, y: 0, connections: [] }
    ];
    
    // Tugunlarni va chiziqlarni joylashtirish
    treeStructure.forEach((node, index) => {
        const sphere = new THREE.Mesh(nodeGeometry, nodeMaterial);
        sphere.position.set(node.x, node.y, 0);
        nodes.push(sphere);
        scene.add(sphere);
        
        // Bog'lovchi chiziqlarni yaratish
        node.connections.forEach(childIndex => {
            const childNode = treeStructure[childIndex];
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(node.x, node.y, 0),
                new THREE.Vector3(childNode.x, childNode.y, 0)
            ]);
            const line = new THREE.Line(
                lineGeometry,
                new THREE.LineBasicMaterial({ color: 0xFFFFFF })
            );
            scene.add(line);
        });
    });
    
    // Animatsiya
    function animate() {
        requestAnimationFrame(animate);
        
        nodes.forEach((node, index) => {
            node.rotation.y += 0.01;
            node.position.z = Math.sin(Date.now() * 0.001 + index) * 0.2;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Graf animatsiyasi
function startGraphAnimation() {
    const { scene, camera, renderer } = createScene(graphCanvas);
    camera.position.z = 10;
    
    // Graf tugunlarini yaratish
    const nodes = [];
    const nodeGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const nodeMaterial = new THREE.MeshPhongMaterial({ color: 0x4CAF50 });
    
    // Graf strukturasini yaratish
    const graphStructure = [
        { x: 0, y: 2, connections: [1, 2, 3] },
        { x: -2, y: 0, connections: [2, 4] },
        { x: 0, y: 0, connections: [3] },
        { x: 2, y: 0, connections: [4] },
        { x: 0, y: -2, connections: [] }
    ];
    
    // Tugunlarni va chiziqlarni joylashtirish
    graphStructure.forEach((node, index) => {
        const sphere = new THREE.Mesh(nodeGeometry, nodeMaterial);
        sphere.position.set(node.x, node.y, 0);
        nodes.push(sphere);
        scene.add(sphere);
        
        // Qirralarni yaratish
        node.connections.forEach(childIndex => {
            const childNode = graphStructure[childIndex];
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(node.x, node.y, 0),
                new THREE.Vector3(childNode.x, childNode.y, 0)
            ]);
            const line = new THREE.Line(
                lineGeometry,
                new THREE.LineBasicMaterial({ color: 0xFFFFFF })
            );
            scene.add(line);
        });
    });
    
    // Animatsiya
    function animate() {
        requestAnimationFrame(animate);
        
        nodes.forEach((node, index) => {
            node.rotation.y += 0.01;
            node.position.z = Math.sin(Date.now() * 0.001 + index) * 0.2;
        });
        
        camera.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Saralash animatsiyasi
function startSortingAnimation() {
    const { scene, camera, renderer } = createScene(sortingCanvas);
    camera.position.z = 10;
    
    // Ustunlarni yaratish
    const bars = [];
    const values = [7, 3, 5, 2, 6, 1, 4];
    const barGeometry = new THREE.BoxGeometry(0.8, 1, 0.8);
    const barMaterial = new THREE.MeshPhongMaterial({ color: 0x4CAF50 });
    
    values.forEach((value, index) => {
        const bar = new THREE.Mesh(barGeometry, barMaterial);
        bar.scale.y = value;
        bar.position.x = index * 1.2 - 3;
        bar.position.y = value / 2 - 2;
        bars.push(bar);
        scene.add(bar);
    });
    
    // Bubble sort animatsiyasi
    let step = 0;
    let i = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        
        step++;
        
        if(step % 60 === 0) { // Har sekundda bir marta
            if(i < values.length - 1) {
                if(values[i] > values[i + 1]) {
                    // Qiymatlarni almashtirish
                    [values[i], values[i + 1]] = [values[i + 1], values[i]];
                    
                    // Ustunlarni almashtirish animatsiyasi
                    gsap.to(bars[i].position, {
                        x: bars[i + 1].position.x,
                        duration: 0.5
                    });
                    gsap.to(bars[i + 1].position, {
                        x: bars[i].position.x,
                        duration: 0.5
                    });
                    
                    [bars[i], bars[i + 1]] = [bars[i + 1], bars[i]];
                }
                i++;
                if(i >= values.length - 1) {
                    i = 0;
                }
            }
        }
        
        bars.forEach(bar => {
            bar.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Qidirish animatsiyasi
function startSearchAnimation() {
    const { scene, camera, renderer } = createScene(searchCanvas);
    camera.position.z = 10;
    
    // Elementlarni yaratish
    const elements = [];
    const values = [1, 3, 4, 6, 7, 8, 9];
    const targetValue = 6;
    
    const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const normalMaterial = new THREE.MeshPhongMaterial({ color: 0x4CAF50 });
    const searchMaterial = new THREE.MeshPhongMaterial({ color: 0xF44336 });
    const targetMaterial = new THREE.MeshPhongMaterial({ color: 0x2196F3 });
    
    values.forEach((value, index) => {
        const element = new THREE.Mesh(geometry, 
            value === targetValue ? targetMaterial : normalMaterial);
        element.position.x = index * 1.2 - 3;
        elements.push(element);
        scene.add(element);
    });
    
    // Binary search animatsiyasi
    let left = 0;
    let right = values.length - 1;
    let mid = Math.floor((left + right) / 2);
    let step = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        
        step++;
        
        if(step % 120 === 0) { // Har 2 sekundda
            // Oldingi qidiruv elementini normal rangga qaytarish
            if(mid >= 0 && mid < elements.length) {
                elements[mid].material = values[mid] === targetValue ? 
                    targetMaterial : normalMaterial;
            }
            
            if(left <= right) {
                mid = Math.floor((left + right) / 2);
                
                // Yangi qidiruv elementini belgilash
                elements[mid].material = searchMaterial;
                
                if(values[mid] === targetValue) {
                    // Topildi
                    elements[mid].material = targetMaterial;
                    gsap.to(elements[mid].scale, {
                        x: 1.5,
                        y: 1.5,
                        z: 1.5,
                        duration: 0.5,
                        yoyo: true,
                        repeat: -1
                    });
                } else if(values[mid] < targetValue) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        
        elements.forEach((element, index) => {
            element.rotation.x += 0.01;
            element.rotation.y += 0.01;
            element.position.y = Math.sin(Date.now() * 0.001 + index) * 0.2;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Oyna o'lchamini o'zgartirish hodisasi
window.addEventListener('resize', () => {
    const canvases = [
        arrayCanvas, linkedListCanvas, treeCanvas,
        graphCanvas, sortingCanvas, searchCanvas
    ];
    
    canvases.forEach(canvas => {
        if(canvas.renderer) {
            const camera = canvas.camera;
            const renderer = canvas.renderer;
            
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        }
    });
});
