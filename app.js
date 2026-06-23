// Global State for storing current analysis context
let currentAnalysisContext = null;

// DOM Elements
const cvInput = document.getElementById('cvInput');
const jobDescription = document.getElementById('jobDescription');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsSection = document.getElementById('resultsSection');
const compatibilityScore = document.getElementById('compatibilityScore');
const scoreCircle = document.getElementById('scoreCircle');
const analysisFeedback = document.getElementById('analysisFeedback');
const matchedKeywords = document.getElementById('matchedKeywords');
const missingKeywords = document.getElementById('missingKeywords');

// Toast Notification Helper
function showToast(message, type = 'error') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}

// UI State Management Helpers
function showLoading() {
    analyzeBtn.disabled = true;
    const btnText = analyzeBtn.querySelector('.btn-text');
    const icon = analyzeBtn.querySelector('.btn-icon');
    
    if (btnText) btnText.textContent = 'მიმდინარეობს ანალიზი...';
    // ✅ გასწორებულია: .className-ის ნაცვლად ვიყენებთ setAttribute-ს, რადგან icon არის <svg>
    if (icon) icon.setAttribute('class', 'fas fa-spinner fa-spin btn-icon');
}

function hideLoading() {
    analyzeBtn.disabled = false;
    const btnText = analyzeBtn.querySelector('.btn-text');
    const icon = analyzeBtn.querySelector('.btn-icon');
    
    if (btnText) btnText.textContent = 'თავსებადობის RAG ანალიზი';
    // ✅ გასწორებულია: აქაც setAttribute ვიყენებთ საწყისი კლასების დასაბრუნებლად
    if (icon) icon.setAttribute('class', 'fas fa-bolt btn-icon');
}

// Keyword Badge Generator
function createBadges(container, keywords, type) {
    container.innerHTML = '';
    if (!keywords || keywords.length === 0) {
        container.innerHTML = `<span class="no-keywords">მონაცემები არ არის</span>`;
        return;
    }
    keywords.forEach(kw => {
        const span = document.createElement('span');
        span.className = `keyword-badge badge-${type}`;
        span.textContent = kw;
        container.appendChild(span);
    });
}

// Score Ring Visualization Update
function updateScoreCircle(score) {
    if (!scoreCircle) return;
    const strokeDashOffset = 251.2 - (251.2 * score) / 100;
    scoreCircle.style.strokeDashoffset = strokeDashOffset;
    
    // Dynamic Color assignment based on qualification threshold
    if (score >= 75) {
        scoreCircle.style.stroke = '#10b981'; // Success Green
    } else if (score >= 50) {
        scoreCircle.style.stroke = '#f59e0b'; // Warning Orange
    } else {
        scoreCircle.style.stroke = '#ef4444'; // Danger Red
    }
}

// Mock RAG Engine Implementation
async function simulateRAGAnalysis(cvText, jobText) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const normalizedCV = cvText.toLowerCase();
            const normalizedJob = jobText.toLowerCase();
            
            // Core Business Strategy & Tech stack tracking array
            let matched = [];
            let missing = [];
            
            // Evaluate structural vocabulary matches
            Object.entries(MOCK_KEYWORDS_DICTIONARY).forEach(([key, variations]) => {
                const hasMatch = variations.some(v => normalizedCV.includes(v) && normalizedJob.includes(v));
                const neededInJob = variations.some(v => normalizedJob.includes(v));
                
                if (neededInJob) {
                    if (hasMatch) {
                        matched.push(key);
                    } else {
                        missing.push(key);
                    }
                }
            });

            // Default fallback if operational text lacks strategic keywords
            if (matched.length === 0 && missing.length === 0) {
                matched = ['ზოგადი კომპეტენცია', 'საკომუნიკაციო უნარები'];
                missing = ['სტრატეგიული დაგეგმვა'];
            }

            // Calculate objective functional coverage metric
            const totalCriteria = matched.length + missing.length;
            const calculatedScore = totalCriteria > 0 ? Math.round((matched.length / totalCriteria) * 100) : 50;
            
            // Dynamic generation of professional evaluation commentary
            let feedback = '';
            if (calculatedScore >= 80) {
                feedback = 'თქვენი კანდიდატურა იდეალურად შეესაბამება ვაკანსიის მოთხოვნებს. გამოკვეთილია ყველა საჭირო საკვანძო უნარი და გამოცდილება.';
            } else if (calculatedScore >= 60) {
                feedback = 'კარგი შესაბამისობაა, თუმცა რეზიუმეში სასურველია უფრო მეტად გაესვას ხაზი გამოტოვებულ საკვანძო კომპეტენციებს.';
            } else {
                feedback = 'თავსებადობა დაბალია. ვაკანსიის მოთხოვნების დასაკმაყოფილებლად საჭიროა რეზიუმეს მოდიფიცირება და სპეციფიკური ტერმინოლოგიის დამატება.';
            }

            resolve({
                score: calculatedScore,
                matched: matched,
                missing: missing,
                feedback: feedback
            });
        }, 2000); // 2-second extraction and indexing timeout overhead emulation
    });
}

// Controller Logic for main Call-to-Action Action Trigger
async function handleAnalysis() {
    const cvText = cvInput.value.trim();
    const jobText = jobDescription.value.trim();

    if (!cvText || !jobText) {
        showToast('გთხოვთ შეავსოთ ორივე ველი: ატვირთეთ/ჩაწერეთ CV და ვაკანსიის აღწერა.', 'error');
        return;
    }

    try {
        showLoading();
        
        const result = await simulateRAGAnalysis(cvText, jobText);
        
        // Cache historical state context
        currentAnalysisContext = {
            analyzedAt: new Date().toISOString(),
            metrics: result
        };

        // Render calculated metrics payload directly into target viewports
        compatibilityScore.textContent = `${result.score}%`;
        analysisFeedback.textContent = result.feedback;
        
        updateScoreCircle(result.score);
        createBadges(matchedKeywords, result.matched, 'matched');
        createBadges(missingKeywords, result.missing, 'missing');
        
        // Display hidden UI pipeline container blocks smoothly
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        showToast('ანალიზი წარმატებით დასრულდა!', 'success');
    } catch (error) {
        console.error('Execution pipeline failure during RAG parse:', error);
        showToast('RAG ანალიზისას მოხდა შეცდომა: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// Attach Strategic Event Listeners to Application Workflow Elements
if (analyzeBtn) {
    analyzeBtn.addEventListener('click', handleAnalysis);
}

// Global text handling error prevention safety checks
window.addEventListener('error', function(e) {
    if (e.message.includes('className') && e.message.includes('SVGElement')) {
        console.warn('Caught SVG layout rendering mutation standard exception. Managed context recovered.');
    }
});
