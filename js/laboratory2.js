// Global o'zgaruvchilar
let currentStructure = 'array';
let animationSpeed = 3;
let isPlaying = false;
let animationInterval = null;
let arrayData = [];
let linkedListData = [];
let stackData = [];
let queueData = [];
let treeRoot = null;
let treeNodeCount = 0;
let graphVertices = new Map();
let graphEdges = new Set();
let selectedVertex = null;

// DOM elementlarini olish
document.addEventListener('DOMContentLoaded', () => {
    // Tuzilmalarni tanlash
    const structureItems = document.querySelectorAll('.structure-item');
    structureItems.forEach(item => {
        item.addEventListener('click', () => {
            const structure = item.dataset.structure;
            switchStructure(structure);
        });
    });

    // Tezlik slayderini sozlash
    const speedSlider = document.getElementById('speedSlider');
    speedSlider.addEventListener('input', (e) => {
        animationSpeed = parseInt(e.target.value);
        if (isPlaying) {
            stopAnimation();
            startAnimation();
        }
    });

    // Boshlang'ich holatni o'rnatish
    initializeArray();

    // Vizualizatsiya boshqaruv tugmalari
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', resetVisualization);

    const playBtn = document.getElementById('playBtn');
    playBtn.addEventListener('click', togglePlayPause);
});

// Tuzilmani almashtirish
function switchStructure(structure) {
    // Faol tuzilmani o'zgartirish
    const activeItem = document.querySelector('.structure-item.active');
    if (activeItem) {
        activeItem.classList.remove('active');
    }
    const newActiveItem = document.querySelector(`[data-structure="${structure}"]`);
    if (newActiveItem) {
        newActiveItem.classList.add('active');
    }

    // Vizualizatsiyani o'zgartirish
    const activeVis = document.querySelector('.structure-visualization.active');
    if (activeVis) {
        activeVis.classList.remove('active');
    }
    const newVis = document.getElementById(`${structure}Visualization`);
    if (newVis) {
        newVis.classList.add('active');
    }

    // Operatsiyalarni o'zgartirish
    const activeOps = document.querySelector('.structure-operations.active');
    if (activeOps) {
        activeOps.classList.remove('active');
    }
    const newOps = document.querySelector(`.structure-operations[data-structure="${structure}"]`);
    if (newOps) {
        newOps.classList.add('active');
    }

    // Ma'lumotni o'zgartirish
    const activeInfo = document.querySelector('.info-content.active');
    if (activeInfo) {
        activeInfo.classList.remove('active');
    }
    const newInfo = document.querySelector(`.info-content[data-structure="${structure}"]`);
    if (newInfo) {
        newInfo.classList.add('active');
    }

    currentStructure = structure;
}

// Array funksiyalari
function initializeArray() {
    arrayData = [5, 2, 8, 1, 9];
    updateArrayVisualization();
}

function updateArrayVisualization() {
    const container = document.getElementById('arrayElements');
    const indexContainer = document.getElementById('arrayIndex');
    
    container.innerHTML = '';
    indexContainer.innerHTML = '';
    
    arrayData.forEach((value, index) => {
        // Element yaratish
        const element = document.createElement('div');
        element.className = 'array-element';
        element.textContent = value;
        container.appendChild(element);
        
        // Indeks yaratish
        const indexElement = document.createElement('div');
        indexElement.className = 'array-index-item';
        indexElement.textContent = index;
        indexContainer.appendChild(indexElement);
    });
}

async function arrayAdd() {
    const value = Math.floor(Math.random() * 100);
    arrayData.push(value);
    
    updateArrayVisualization();
    const elements = document.querySelectorAll('.array-element');
    const lastElement = elements[elements.length - 1];
    lastElement.classList.add('highlight');
    
    await sleep(500);
    lastElement.classList.remove('highlight');
}

async function arrayRemove() {
    if (arrayData.length === 0) return;
    
    const elements = document.querySelectorAll('.array-element');
    const lastElement = elements[elements.length - 1];
    lastElement.classList.add('highlight');
    
    await sleep(500);
    arrayData.pop();
    updateArrayVisualization();
}

async function arraySearch() {
    const searchValue = arrayData[Math.floor(Math.random() * arrayData.length)];
    const elements = document.querySelectorAll('.array-element');
    
    for (let i = 0; i < arrayData.length; i++) {
        elements[i].classList.add('highlight');
        await sleep(500 / animationSpeed);
        
        if (arrayData[i] === searchValue) {
            await sleep(1000 / animationSpeed);
            elements[i].classList.remove('highlight');
            break;
        }
        elements[i].classList.remove('highlight');
    }
}

async function arraySort() {
    const elements = document.querySelectorAll('.array-element');
    
    for (let i = 0; i < arrayData.length - 1; i++) {
        for (let j = 0; j < arrayData.length - i - 1; j++) {
            elements[j].classList.add('highlight');
            elements[j + 1].classList.add('highlight');
            
            await sleep(500 / animationSpeed);
            
            if (arrayData[j] > arrayData[j + 1]) {
                // Almashtirish
                [arrayData[j], arrayData[j + 1]] = [arrayData[j + 1], arrayData[j]];
                updateArrayVisualization();
            }
            
            elements[j].classList.remove('highlight');
            elements[j + 1].classList.remove('highlight');
        }
    }
}

// Linked List funksiyalari
function updateLinkedListVisualization() {
    const container = document.getElementById('linkedListContainer');
    container.innerHTML = '';
    
    linkedListData.forEach((value, index) => {
        const node = document.createElement('div');
        node.className = 'node';
        
        const content = document.createElement('div');
        content.className = 'node-content';
        content.textContent = value;
        
        node.appendChild(content);
        
        if (index < linkedListData.length - 1) {
            const arrow = document.createElement('div');
            arrow.className = 'node-arrow';
            node.appendChild(arrow);
        }
        
        container.appendChild(node);
    });
}

async function listAddFront() {
    const value = Math.floor(Math.random() * 100);
    linkedListData.unshift(value);
    updateLinkedListVisualization();
    
    const nodes = document.querySelectorAll('.node-content');
    nodes[0].classList.add('highlight');
    await sleep(500);
    nodes[0].classList.remove('highlight');
}

async function listAddBack() {
    const value = Math.floor(Math.random() * 100);
    linkedListData.push(value);
    updateLinkedListVisualization();
    
    const nodes = document.querySelectorAll('.node-content');
    nodes[nodes.length - 1].classList.add('highlight');
    await sleep(500);
    nodes[nodes.length - 1].classList.remove('highlight');
}

async function listRemove() {
    if (linkedListData.length === 0) return;
    
    const nodes = document.querySelectorAll('.node-content');
    nodes[nodes.length - 1].classList.add('highlight');
    await sleep(500);
    
    linkedListData.pop();
    updateLinkedListVisualization();
}

// Stack funksiyalari
function updateStackVisualization() {
    const container = document.getElementById('stackContainer');
    container.innerHTML = '';
    
    stackData.forEach(value => {
        const element = document.createElement('div');
        element.className = 'stack-element';
        element.textContent = value;
        container.appendChild(element);
    });
}

async function stackPush() {
    const value = Math.floor(Math.random() * 100);
    stackData.push(value);
    updateStackVisualization();
    
    const elements = document.querySelectorAll('.stack-element');
    elements[elements.length - 1].classList.add('highlight');
    await sleep(500);
    elements[elements.length - 1].classList.remove('highlight');
}

async function stackPop() {
    if (stackData.length === 0) return;
    
    const elements = document.querySelectorAll('.stack-element');
    elements[elements.length - 1].classList.add('highlight');
    await sleep(500);
    
    stackData.pop();
    updateStackVisualization();
}

async function stackPeek() {
    if (stackData.length === 0) return;
    
    const elements = document.querySelectorAll('.stack-element');
    elements[elements.length - 1].classList.add('highlight');
    await sleep(1000);
    elements[elements.length - 1].classList.remove('highlight');
}

// Queue funksiyalari
function updateQueueVisualization() {
    const container = document.getElementById('queueContainer');
    container.innerHTML = '';
    
    queueData.forEach(value => {
        const element = document.createElement('div');
        element.className = 'queue-element';
        element.textContent = value;
        container.appendChild(element);
    });
}

async function queueEnqueue() {
    const value = Math.floor(Math.random() * 100);
    queueData.push(value);
    updateQueueVisualization();
    
    const elements = document.querySelectorAll('.queue-element');
    elements[elements.length - 1].classList.add('highlight');
    await sleep(500);
    elements[elements.length - 1].classList.remove('highlight');
}

async function queueDequeue() {
    if (queueData.length === 0) return;
    
    const elements = document.querySelectorAll('.queue-element');
    elements[0].classList.add('highlight');
    await sleep(500);
    
    queueData.shift();
    updateQueueVisualization();
}

async function queuePeek() {
    if (queueData.length === 0) return;
    
    const elements = document.querySelectorAll('.queue-element');
    elements[0].classList.add('highlight');
    await sleep(1000);
    elements[0].classList.remove('highlight');
}

// Tree funksiyalari
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function updateTreeVisualization() {
    const container = document.getElementById('treeContainer');
    container.innerHTML = '';
    
    if (!treeRoot) return;
    
    // Daraxtni darajalar bo'yicha chizish
    const levels = [];
    const queue = [{node: treeRoot, level: 0}];
    
    while (queue.length > 0) {
        const {node, level} = queue.shift();
        
        if (!levels[level]) {
            levels[level] = [];
        }
        
        levels[level].push(node);
        
        if (node.left) queue.push({node: node.left, level: level + 1});
        if (node.right) queue.push({node: node.right, level: level + 1});
    }
    
    // Har bir darajani chizish
    levels.forEach((nodes, levelIndex) => {
        const levelDiv = document.createElement('div');
        levelDiv.className = 'tree-level';
        
        nodes.forEach((node, nodeIndex) => {
            const nodeDiv = document.createElement('div');
            nodeDiv.className = 'tree-node';
            
            const element = document.createElement('div');
            element.className = 'tree-element fade-in';
            element.textContent = node.value;
            nodeDiv.appendChild(element);
            
            // Agar bu tugun birinchi daraja bo'lmasa, uning otasiga chiziq chizish
            if (levelIndex > 0) {
                const parentIndex = Math.floor((nodeIndex) / 2);
                const parent = levels[levelIndex - 1][parentIndex];
                const connection = document.createElement('div');
                connection.className = 'tree-connection';
                
                // Chiziqni pozitsiyalash
                const parentRect = parent.element.getBoundingClientRect();
                const childRect = element.getBoundingClientRect();
                const distance = Math.sqrt(
                    Math.pow(childRect.left - parentRect.left, 2) +
                    Math.pow(childRect.top - parentRect.top, 2)
                );
                const angle = Math.atan2(
                    childRect.top - parentRect.top,
                    childRect.left - parentRect.left
                );
                
                connection.style.width = `${distance}px`;
                connection.style.transform = `rotate(${angle}rad)`;
                nodeDiv.appendChild(connection);
            }
            
            node.element = element;
            levelDiv.appendChild(nodeDiv);
        });
        
        container.appendChild(levelDiv);
    });
}

async function treeAdd() {
    const value = Math.floor(Math.random() * 100);
    
    if (!treeRoot) {
        treeRoot = new TreeNode(value);
    } else {
        // Yangi tuguni daraxtga qo'shish
        let current = treeRoot;
        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = new TreeNode(value);
                    break;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = new TreeNode(value);
                    break;
                }
                current = current.right;
            }
        }
    }
    
    treeNodeCount++;
    updateTreeVisualization();
    
    // Yangi qo'shilgan tuguni animatsiya qilish
    const elements = document.querySelectorAll('.tree-element');
    const newElement = elements[elements.length - 1];
    newElement.classList.add('highlight');
    await sleep(500);
    newElement.classList.remove('highlight');
}

async function treeRemove() {
    if (!treeRoot) return;
    
    // Oxirgi qo'shilgan tuguni topish va o'chirish
    let parent = null;
    let current = treeRoot;
    let lastNode = null;
    
    while (current) {
        if (!current.left && !current.right) {
            lastNode = current;
            break;
        }
        parent = current;
        if (current.right) {
            current = current.right;
        } else {
            current = current.left;
        }
    }
    
    if (lastNode) {
        // O'chirishdan oldin animatsiya
        const elements = document.querySelectorAll('.tree-element');
        const lastElement = elements[elements.length - 1];
        lastElement.classList.add('highlight');
        await sleep(500);
        
        if (parent) {
            if (parent.right === lastNode) {
                parent.right = null;
            } else {
                parent.left = null;
            }
        } else {
            treeRoot = null;
        }
        
        treeNodeCount--;
        updateTreeVisualization();
    }
}

async function treeTraverse(type) {
    if (!treeRoot) return;
    
    const elements = document.querySelectorAll('.tree-element');
    const visited = new Set();
    
    async function traverse(node) {
        if (!node) return;
        
        // Pre-order: Tugun -> Chap -> O'ng
        if (type === 'preorder') {
            await highlightNode(node);
            await sleep(500 / animationSpeed);
            if (node.left) await traverse(node.left);
            if (node.right) await traverse(node.right);
        }
        // In-order: Chap -> Tugun -> O'ng
        else if (type === 'inorder') {
            if (node.left) await traverse(node.left);
            await highlightNode(node);
            await sleep(500 / animationSpeed);
            if (node.right) await traverse(node.right);
        }
        // Post-order: Chap -> O'ng -> Tugun
        else if (type === 'postorder') {
            if (node.left) await traverse(node.left);
            if (node.right) await traverse(node.right);
            await highlightNode(node);
            await sleep(500 / animationSpeed);
        }
    }
    
    async function highlightNode(node) {
        if (visited.has(node)) return;
        visited.add(node);
        
        const element = Array.from(elements).find(el => el.textContent == node.value);
        if (element) {
            // Tugunni yoritish
            element.style.backgroundColor = '#2196F3';
            await sleep(500 / animationSpeed);
            // Tugunni normal holatga qaytarish
            element.style.backgroundColor = '#4CAF50';
        }
    }
    
    // Aylanib chiqishni boshlash
    try {
        document.getElementById('treeVisualization').style.pointerEvents = 'none';
        await traverse(treeRoot);
    } finally {
        document.getElementById('treeVisualization').style.pointerEvents = 'auto';
    }
}

// Graph funksiyalari
function updateGraphVisualization() {
    const container = document.getElementById('graphContainer');
    container.innerHTML = '';
    
    // Vertexlarni chizish
    graphVertices.forEach((pos, value) => {
        const vertex = document.createElement('div');
        vertex.className = 'graph-vertex fade-in';
        if (selectedVertex === value) {
            vertex.classList.add('selected');
        }
        vertex.textContent = value;
        vertex.style.left = `${pos.x}px`;
        vertex.style.top = `${pos.y}px`;
        
        vertex.addEventListener('click', () => {
            if (selectedVertex === value) {
                selectedVertex = null;
            } else {
                if (selectedVertex !== null) {
                    // Ikkinchi vertex tanlanganda, ular orasida qirra yaratish
                    graphAddEdge(selectedVertex, value);
                    selectedVertex = null;
                } else {
                    selectedVertex = value;
                }
            }
            updateGraphVisualization();
        });
        
        container.appendChild(vertex);
    });
    
    // Qirralarni chizish
    graphEdges.forEach(edge => {
        const [from, to] = edge.split('-');
        const fromPos = graphVertices.get(parseInt(from));
        const toPos = graphVertices.get(parseInt(to));
        
        if (fromPos && toPos) {
            const edgeElement = document.createElement('div');
            edgeElement.className = 'graph-edge fade-in';
            
            // Qirra uzunligi va burchagini hisoblash
            const dx = toPos.x - fromPos.x;
            const dy = toPos.y - fromPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            
            edgeElement.style.width = `${distance}px`;
            edgeElement.style.left = `${fromPos.x + 25}px`;
            edgeElement.style.top = `${fromPos.y + 25}px`;
            edgeElement.style.transform = `rotate(${angle}rad)`;
            
            // Qirra identifikatorini saqlash
            edgeElement.dataset.from = from;
            edgeElement.dataset.to = to;
            
            container.appendChild(edgeElement);
        }
    });
}

// Graf uchun qo'shimcha funksiyalar
function getAdjacencyList() {
    const adjacencyList = new Map();
    
    // Har bir vertex uchun bo'sh qo'shnilar ro'yxatini yaratish
    graphVertices.forEach((_, vertex) => {
        adjacencyList.set(vertex, []);
    });
    
    // Qirralar bo'yicha qo'shnilarni qo'shish
    graphEdges.forEach(edge => {
        const [from, to] = edge.split('-').map(Number);
        adjacencyList.get(from).push(to);
        adjacencyList.get(to).push(from);
    });
    
    return adjacencyList;
}

async function highlightVertex(vertex, color = '#2196F3') {
    const elements = document.querySelectorAll('.graph-vertex');
    const element = Array.from(elements).find(el => el.textContent == vertex);
    if (element) {
        const originalColor = element.style.backgroundColor;
        element.style.backgroundColor = color;
        await sleep(500 / animationSpeed);
        element.style.backgroundColor = originalColor;
    }
}

async function highlightEdge(from, to) {
    const edge = document.querySelector(`.graph-edge[data-from="${from}"][data-to="${to}"]`);
    if (edge) {
        edge.classList.add('highlighted');
        await sleep(500 / animationSpeed);
        edge.classList.remove('highlighted');
    }
}

// Asosiy graf funksiyalari
function graphAddVertex() {
    const value = graphVertices.size + 1;
    const containerRect = document.getElementById('graphContainer').getBoundingClientRect();
    
    // Yangi vertex uchun tasodifiy pozitsiya
    const x = Math.random() * (containerRect.width - 100) + 50;
    const y = Math.random() * (containerRect.height - 100) + 50;
    
    graphVertices.set(value, {x, y});
    updateGraphVisualization();
}

function graphAddEdge(from, to) {
    if (from === to) return;
    const edge = `${Math.min(from, to)}-${Math.max(from, to)}`;
    graphEdges.add(edge);
    updateGraphVisualization();
}

async function graphBFS(startVertex = 1) {
    if (graphVertices.size === 0) return;
    if (!graphVertices.has(startVertex)) {
        startVertex = Array.from(graphVertices.keys())[0];
    }
    
    const visited = new Set();
    const queue = [startVertex];
    const adjacencyList = getAdjacencyList();
    
    try {
        document.getElementById('graphVisualization').style.pointerEvents = 'none';
        
        while (queue.length > 0) {
            const vertex = queue.shift();
            
            if (!visited.has(vertex)) {
                // Vertexni belgilash
                await highlightVertex(vertex);
                visited.add(vertex);
                
                // Qo'shnilarni qo'shish
                for (const neighbor of adjacencyList.get(vertex)) {
                    if (!visited.has(neighbor)) {
                        queue.push(neighbor);
                        await highlightEdge(vertex, neighbor);
                    }
                }
            }
        }
    } finally {
        document.getElementById('graphVisualization').style.pointerEvents = 'auto';
    }
}

async function graphDFS(startVertex = 1) {
    if (graphVertices.size === 0) return;
    if (!graphVertices.has(startVertex)) {
        startVertex = Array.from(graphVertices.keys())[0];
    }
    
    const visited = new Set();
    const adjacencyList = getAdjacencyList();
    
    async function dfs(vertex) {
        visited.add(vertex);
        await highlightVertex(vertex);
        
        for (const neighbor of adjacencyList.get(vertex)) {
            if (!visited.has(neighbor)) {
                await highlightEdge(vertex, neighbor);
                await dfs(neighbor);
            }
        }
    }
    
    try {
        document.getElementById('graphVisualization').style.pointerEvents = 'none';
        await dfs(startVertex);
    } finally {
        document.getElementById('graphVisualization').style.pointerEvents = 'auto';
    }
}

// Vizualizatsiya boshqaruv funksiyalari
function resetVisualization() {
    // Joriy tuzilmani aniqlash
    switch(currentStructure) {
        case 'array':
            arrayData = [5, 2, 8, 1, 9];
            updateArrayVisualization();
            break;
        case 'linkedList':
            linkedListData = [12, 45, 67, 23];
            updateLinkedListVisualization();
            break;
        case 'stack':
            stackData = [34, 78, 91];
            updateStackVisualization();
            break;
        case 'queue':
            queueData = [56, 89, 12, 45];
            updateQueueVisualization();
            break;
        case 'tree':
            treeRoot = null;
            treeNodeCount = 0;
            // Boshlang'ich daraxt yaratish
            [50, 30, 70, 20, 40, 60, 80].forEach(value => {
                if (!treeRoot) {
                    treeRoot = new TreeNode(value);
                } else {
                    let current = treeRoot;
                    while (true) {
                        if (value < current.value) {
                            if (!current.left) {
                                current.left = new TreeNode(value);
                                break;
                            }
                            current = current.left;
                        } else {
                            if (!current.right) {
                                current.right = new TreeNode(value);
                                break;
                            }
                            current = current.right;
                        }
                    }
                }
                treeNodeCount++;
            });
            updateTreeVisualization();
            break;
        case 'graph':
            graphVertices.clear();
            graphEdges.clear();
            selectedVertex = null;
            // Boshlang'ich graf yaratish
            const positions = [
                {x: 100, y: 100},
                {x: 200, y: 50},
                {x: 300, y: 100},
                {x: 100, y: 200},
                {x: 300, y: 200}
            ];
            positions.forEach((pos, i) => {
                graphVertices.set(i + 1, pos);
            });
            // Namuna qirralar
            graphEdges.add('1-2');
            graphEdges.add('2-3');
            graphEdges.add('1-4');
            graphEdges.add('3-5');
            updateGraphVisualization();
            break;
    }
}

function togglePlayPause() {
    const playBtn = document.getElementById('playBtn');
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playBtn.innerHTML = '<i class="fas fa-pause"></i> To\'xtatish';
        startAnimation();
    } else {
        playBtn.innerHTML = '<i class="fas fa-play"></i> Boshlash';
        stopAnimation();
        clearAllAnimations();
    }
}

function clearAllAnimations() {
    // Barcha intervallarni tozalash
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
    
    // Barcha timeout va animatsiyalarni to'xtatish
    const highestTimeoutId = setTimeout(";");
    for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }
    
    // Animatsiya holatini qayta o'rnatish
    switch(currentStructure) {
        case 'array':
            updateArrayVisualization();
            break;
        case 'linkedList':
            updateLinkedListVisualization();
            break;
        case 'stack':
            updateStackVisualization();
            break;
        case 'queue':
            updateQueueVisualization();
            break;
        case 'tree':
            updateTreeVisualization();
            break;
        case 'graph':
            updateGraphVisualization();
            break;
    }
}

function stopAnimation() {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
    clearAllAnimations();
}

function updateSpeed(value) {
    animationSpeed = parseInt(value);
    if (isPlaying) {
        stopAnimation();
        startAnimation();
    }
}

// Animatsiya funksiyalari
async function animateArray() {
    if (!isPlaying) return;
    await arraySort();
    isPlaying = false;
    togglePlayPause();
}

async function animateLinkedList() {
    if (!isPlaying) return;
    const interval = setInterval(async () => {
        if (!isPlaying) {
            clearInterval(interval);
            return;
        }
        await listAddBack();
        await sleep(1000);
        await listRemove();
    }, 2000);
    animationInterval = interval;
}

async function animateStack() {
    if (!isPlaying) return;
    const interval = setInterval(async () => {
        if (!isPlaying) {
            clearInterval(interval);
            return;
        }
        await stackPush();
        await sleep(1000);
        await stackPop();
    }, 2000);
    animationInterval = interval;
}

async function animateQueue() {
    if (!isPlaying) return;
    const interval = setInterval(async () => {
        if (!isPlaying) {
            clearInterval(interval);
            return;
        }
        await queueEnqueue();
        await sleep(1000);
        await queueDequeue();
    }, 2000);
    animationInterval = interval;
}

async function animateTree() {
    if (!isPlaying) return;
    const traversalTypes = ['inorder', 'preorder', 'postorder'];
    let index = 0;
    
    const interval = setInterval(async () => {
        if (!isPlaying) {
            clearInterval(interval);
            return;
        }
        await treeTraverse(traversalTypes[index]);
        index = (index + 1) % traversalTypes.length;
    }, 3000);
    animationInterval = interval;
}

async function animateGraph() {
    if (!isPlaying) return;
    const interval = setInterval(async () => {
        if (!isPlaying) {
            clearInterval(interval);
            return;
        }
        await graphBFS();
        await sleep(1000);
        await graphDFS();
    }, 4000);
    animationInterval = interval;
}

function startAnimation() {
    if (animationInterval) clearInterval(animationInterval);
    
    // Joriy tuzilma uchun animatsiya
    switch(currentStructure) {
        case 'array':
            animateArray();
            break;
        case 'linkedList':
            animateLinkedList();
            break;
        case 'stack':
            animateStack();
            break;
        case 'queue':
            animateQueue();
            break;
        case 'tree':
            animateTree();
            break;
        case 'graph':
            animateGraph();
            break;
    }
}

// Yordamchi funksiyalar
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Sahifa yuklanganda
window.addEventListener('load', () => {
    // Boshlang'ich ma'lumotlarni yaratish
    initializeArray();
    linkedListData = [12, 45, 67, 23];
    stackData = [34, 78, 91];
    queueData = [56, 89, 12, 45];
    
    // Vizualizatsiyalarni yangilash
    updateLinkedListVisualization();
    updateStackVisualization();
    updateQueueVisualization();
});
