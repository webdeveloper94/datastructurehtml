document.addEventListener('DOMContentLoaded', function() {
    // Highlight.js initialization
    hljs.highlightAll();

    // Progress tracking
    const sections = document.querySelectorAll('.lecture-section');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    let progress = 0;

    const updateProgress = () => {
        const windowHeight = window.innerHeight;
        let sectionsRead = 0;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < windowHeight * 0.7) {
                sectionsRead++;
            }
        });

        progress = Math.round((sectionsRead / sections.length) * 100);
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}% o'qildi`;
    };

    // Intersection Observer for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                updateActiveSection(id);
                updateProgress();
            }
        });
    }, {
        threshold: 0.5
    });

    sections.forEach(section => observer.observe(section));

    // Update active section in sidebar
    function updateActiveSection(id) {
        document.querySelectorAll('.lecture-sections li').forEach(li => {
            li.classList.remove('active');
        });
        const activeLink = document.querySelector(`.lecture-sections a[href="#${id}"]`);
        if (activeLink) {
            activeLink.parentElement.classList.add('active');
        }
    }

    // Smooth scroll for section links
    document.querySelectorAll('.lecture-sections a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Demo functionality
    window.runDemo = function(type) {
        const container = document.getElementById('demo-container');
        container.innerHTML = ''; // Clear previous demo

        switch(type) {
            case 'array':
                showArrayDemo(container);
                break;
            case 'list':
                showListDemo(container);
                break;
            case 'stack':
                showStackDemo(container);
                break;
        }
    };

    function showArrayDemo(container) {
        const array = [1, 2, 3, 4, 5];
        const html = `
            <div class="array-demo">
                <h3>Massiv</h3>
                <div class="array-visualization">
                    ${array.map((num, i) => `
                        <div class="array-element">
                            <div class="element-index">${i}</div>
                            <div class="element-value">${num}</div>
                        </div>
                    `).join('')}
                </div>
                <p>Indeks orqali elementga kirish vaqti: O(1)</p>
            </div>
        `;
        container.innerHTML = html;
    }

    function showListDemo(container) {
        const list = [1, 2, 3];
        const html = `
            <div class="list-demo">
                <h3>Bog'langan ro'yxat</h3>
                <div class="list-visualization">
                    ${list.map((num, i) => `
                        <div class="list-node">
                            <div class="node-value">${num}</div>
                            ${i < list.length - 1 ? '<div class="node-pointer">→</div>' : ''}
                        </div>
                    `).join('')}
                </div>
                <p>Element qo'shish vaqti: O(1)</p>
            </div>
        `;
        container.innerHTML = html;
    }

    function showStackDemo(container) {
        const stack = [3, 2, 1];
        const html = `
            <div class="stack-demo">
                <h3>Stek</h3>
                <div class="stack-visualization">
                    ${stack.map(num => `
                        <div class="stack-element">${num}</div>
                    `).join('')}
                </div>
                <p>LIFO (Last In, First Out) prinsipi</p>
            </div>
        `;
        container.innerHTML = html;
    }
});
