// Test savollari bazasi
const testQuestions = {
    1: [ // Ma'lumotlar tuzilmasi asoslari
        {
            question: "Ma'lumotlar tuzilmasi nima?",
            options: [
                "Ma'lumotlarni saqlash va tashkil qilish usuli",
                "Dasturlash tili",
                "Kompyuter qurulmasi",
                "Internet protokoli"
            ],
            correct: 0
        },
        {
            question: "Quyidagi qaysi biri ma'lumotlar tuzilmasining asosiy turiga kirmaydi?",
            options: [
                "Array (Massiv)",
                "Monitor",
                "Stack (Stek)",
                "Queue (Navbat)"
            ],
            correct: 1
        },
        // Qolgan savollar shu formatda qo'shiladi
    ],
    2: [ // Massivlar va Ro'yxatlar
        {
            question: "Massiv indekslari qaysi raqamdan boshlanadi?",
            options: [
                "1",
                "0",
                "-1",
                "Ixtiyoriy"
            ],
            correct: 1
        },
        {
            question: "Bog'langan ro'yxatning afzalligi nimada?",
            options: [
                "Xotiradan samarali foydalanish",
                "Tezroq qidirish",
                "Ma'lumotlarni tartibli saqlash",
                "Elementlarni o'chirish va qo'shish oson"
            ],
            correct: 3
        },
        // Qolgan savollar shu formatda qo'shiladi
    ],
    // Qolgan test to'plamlari shu formatda qo'shiladi
};

let currentTest = null;
let currentQuestion = 0;
let userAnswers = [];
let timer = null;
let timeLeft = 0;
let startTime = 0;

// Test boshlanishi
function startTest(testId) {
    currentTest = testId;
    currentQuestion = 0;
    userAnswers = new Array(10).fill(null);
    
    // Vaqtni o'rnatish
    timeLeft = testId === 3 || testId === 6 ? 1200 : 900; // 20 yoki 15 daqiqa
    startTime = Date.now();
    
    // Modal oynani ochish
    const modal = document.getElementById('testModal');
    modal.style.display = 'block';
    
    // Test sarlavhasini o'rnatish
    const testTitle = document.getElementById('testTitle');
    testTitle.textContent = document.querySelector(`[data-test="${testId}"] .test-info h3`).textContent;
    
    // Birinchi savolni ko'rsatish
    showQuestion();
    
    // Vaqt hisoblagichni boshlash
    startTimer();
}

// Savolni ko'rsatish
function showQuestion() {
    const question = testQuestions[currentTest][currentQuestion];
    
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    
    const optionsContainer = document.getElementById('answerOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'answer-option';
        if (userAnswers[currentQuestion] === index) {
            button.classList.add('selected');
        }
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    // Navigatsiya tugmalarini yangilash
    updateNavigationButtons();
}

// Javobni tanlash
function selectAnswer(optionIndex) {
    userAnswers[currentQuestion] = optionIndex;
    
    // Tanlangan javobni vizual belgilash
    const options = document.querySelectorAll('.answer-option');
    options.forEach((option, index) => {
        option.classList.toggle('selected', index === optionIndex);
    });
}

// Navigatsiya tugmalarini yangilash
function updateNavigationButtons() {
    const prevButton = document.getElementById('prevQuestion');
    const nextButton = document.getElementById('nextQuestion');
    const submitButton = document.getElementById('submitTest');
    
    prevButton.disabled = currentQuestion === 0;
    
    if (currentQuestion === testQuestions[currentTest].length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'block';
    } else {
        nextButton.style.display = 'block';
        submitButton.style.display = 'none';
    }
}

// Oldingi savolga o'tish
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

// Keyingi savolga o'tish
function nextQuestion() {
    if (currentQuestion < testQuestions[currentTest].length - 1) {
        currentQuestion++;
        showQuestion();
    }
}

// Vaqt hisoblagichi
function startTimer() {
    updateTimer();
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        submitTest();
        return;
    }
    
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timeLeft').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    timeLeft--;
}

// Testni yakunlash
function submitTest() {
    clearInterval(timer);
    
    // To'g'ri javoblar sonini hisoblash
    let correctCount = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === testQuestions[currentTest][index].correct) {
            correctCount++;
        }
    });
    
    // Natijalarni ko'rsatish
    const testModal = document.getElementById('testModal');
    const resultsModal = document.getElementById('resultsModal');
    
    testModal.style.display = 'none';
    resultsModal.style.display = 'block';
    
    // Natijalarni to'ldirish
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    
    document.getElementById('scorePercentage').textContent = `${Math.round(correctCount * 100 / 10)}%`;
    document.getElementById('correctAnswers').textContent = correctCount;
    document.getElementById('timeSpent').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Javoblarni ko'rish
function reviewAnswers() {
    // Bu funksiya keyinchalik qo'shiladi
    alert('Bu funksiya tez orada qo'shiladi!');
}

// Natijalar oynasini yopish
function closeResults() {
    document.getElementById('resultsModal').style.display = 'none';
    currentTest = null;
    currentQuestion = 0;
    userAnswers = [];
    clearInterval(timer);
}

// Event Listeners
document.getElementById('prevQuestion').addEventListener('click', prevQuestion);
document.getElementById('nextQuestion').addEventListener('click', nextQuestion);
document.getElementById('submitTest').addEventListener('click', submitTest);
