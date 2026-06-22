// app.js - CareerNavigator AI SPA Main Controller

import { 
  mockVacancies, 
  motivationalQuotes, 
  verifiedSuccessStories, 
  professionInsights 
} from './mockData.js';

// Application State
const state = {
  apiKey: localStorage.getItem('gemini_api_key') || '',
  apiModel: localStorage.getItem('gemini_api_model') || 'gemini-2.5-flash',
  cvText: '',
  cvFileName: '',
  vacText: '',
  vacFileName: '',
  chatHistory: [], // { role: 'user'|'model', parts: [{text: string}] }
  currentSearchQuery: ''
};

// Initialize Application on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  initUI();
  setupEventListeners();
  renderSuccessStories();
  renderDailyQuote();
  setupSearchEngine();
});

// Expose key UI interaction functions to the window object for HTML event handlers
window.toggleChatDrawer = toggleChatDrawer;
window.toggleSettingsModal = toggleSettingsModal;
window.saveSettingsKey = saveSettingsKey;
window.clearSettingsKey = clearSettingsKey;
window.startMatchingAnalysis = startMatchingAnalysis;
window.sendQuickPrompt = sendQuickPrompt;
window.sendCoachMessage = sendCoachMessage;
window.askCoachAboutJob = askCoachAboutJob;
window.showHelpModal = showHelpModal;
window.toggleHelpModal = toggleHelpModal;
window.clearSearchFilter = clearSearchFilter;

// Initialize UI States
function initUI() {
  // Populate API key input field in settings modal
  const keyInput = document.getElementById('gemini-key-input');
  if (keyInput && state.apiKey) {
    keyInput.value = state.apiKey;
  }

  // Populate Model select dropdown in settings modal
  const modelSelect = document.getElementById('gemini-model-select');
  if (modelSelect && state.apiModel) {
    modelSelect.value = state.apiModel;
  }
  
  // Set initial chatbot welcome greeting
  resetChatbot();
}

// Setup Event Listeners (File uploads, Drag and Drop)
function setupEventListeners() {
  setupDropZone('cv-drop-zone', 'cv-file-input', (text, filename) => {
    state.cvText = text;
    state.cvFileName = filename;
    updateFileBadge('cv-status-badge', filename, 'cyan');
  });

  setupDropZone('vac-drop-zone', 'vac-file-input', (text, filename) => {
    state.vacText = text;
    state.vacFileName = filename;
    updateFileBadge('vac-status-badge', filename, 'purple');
  });
}

// Helper to setup drag-and-drop & file upload
function setupDropZone(dropZoneId, fileInputId, callback) {
  const dropZone = document.getElementById(dropZoneId);
  const fileInput = document.getElementById(fileInputId);

  if (!dropZone || !fileInput) return;

  // Click handler to open file dialog
  dropZone.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') {
      fileInput.click();
    }
  });

  // Prevent default drag behaviors
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => e.preventDefault(), false);
  });

  // Highlight dropzone on drag over
  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.add('border-indigo-500', 'bg-indigo-950/20');
    }, false);
  });

  // Remove highlight on drag leave or drop
  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.remove('border-indigo-500', 'bg-indigo-950/20');
    }, false);
  });

  // Handle dropped files
  dropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) {
      handleFile(files[0], callback);
    }
  });

  // Handle selected files
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFile(e.target.files[0], callback);
    }
  });
}

// Handle file reading and text extraction (supports PDF and TXT)
async function handleFile(file, callback) {
  const filename = file.name;
  const extension = filename.split('.').pop().toLowerCase();

  try {
    if (extension === 'txt') {
      const reader = new FileReader();
      reader.onload = (e) => callback(e.target.result, filename);
      reader.readAsText(file, 'UTF-8');
    } else if (extension === 'pdf') {
      updateFileBadge('cv-status-badge', 'დამუშავება...', 'amber');
      const text = await extractTextFromPDF(file);
      callback(text, filename);
    } else {
      alert('მხარდაჭერილია მხოლოდ .txt და .pdf ფორმატის ფაილები.');
    }
  } catch (error) {
    console.error('File parsing error:', error);
    alert('ფაილის წაკითხვისას მოხდა შეცდომა: ' + error.message);
  }
}

// Extract text from PDF client-side using PDF.js
async function extractTextFromPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(" ");
      fullText += pageText + "\n";
    }
    return fullText;
  } catch (error) {
    throw new Error("PDF ფაილის დამუშავება ვერ მოხერხდა. დარწმუნდით, რომ ფაილი არ არის დაზიანებული.");
  }
}

// Update file status badge
function updateFileBadge(badgeId, text, color) {
  const badge = document.getElementById(badgeId);
  if (!badge) return;

  badge.textContent = text.length > 15 ? text.substring(0, 12) + '...' : text;
  badge.className = `text-[10px] font-mono-custom px-2 py-0.5 rounded border`;
  
  if (color === 'cyan') {
    badge.classList.add('bg-cyan-950', 'border-cyan-800', 'text-cyan-400');
  } else if (color === 'purple') {
    badge.classList.add('bg-purple-950', 'border-purple-800', 'text-purple-400');
  } else if (color === 'amber') {
    badge.classList.add('bg-amber-950', 'border-amber-800', 'text-amber-400');
  } else {
    badge.classList.add('bg-slate-900', 'border-slate-800', 'text-slate-400');
  }
}

// Search bar & suggestions logic
function setupSearchEngine() {
  const searchInput = document.getElementById('profession-search');
  const suggestionsBox = document.getElementById('search-suggestions');
  const clearBtn = document.getElementById('search-clear-btn');

  if (!searchInput || !suggestionsBox) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length > 0) {
      clearBtn.classList.remove('hidden');
      // Show matching suggestions from keys of insights
      const matches = Object.keys(professionInsights).filter(key => 
        key.includes(query) || 
        professionInsights[key].title.toLowerCase().includes(query)
      );

      if (matches.length > 0) {
        suggestionsBox.innerHTML = matches.map(key => `
          <div class="px-4 py-2 hover:bg-indigo-950/40 text-xs text-slate-300 cursor-pointer border-b border-white/5 last:border-0" onclick="triggerSearch('${key}')">
            🔍 ${professionInsights[key].title}
          </div>
        `).join('');
        suggestionsBox.classList.remove('hidden');
      } else {
        suggestionsBox.classList.add('hidden');
      }
    } else {
      clearBtn.classList.add('hidden');
      suggestionsBox.classList.add('hidden');
      clearSearchFilter();
    }
  });

  // Close suggestions box if clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.classList.add('hidden');
    }
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.classList.add('hidden');
    suggestionsBox.classList.add('hidden');
    clearSearchFilter();
  });
}

// Trigger a specific search query
window.triggerSearch = function(key) {
  const insight = professionInsights[key];
  if (!insight) return;

  // Update input field
  const searchInput = document.getElementById('profession-search');
  if (searchInput) {
    searchInput.value = insight.title;
    document.getElementById('search-clear-btn')?.classList.remove('hidden');
  }
  document.getElementById('search-suggestions')?.classList.add('hidden');

  state.currentSearchQuery = insight.professionKey;

  // Update insight banner
  const banner = document.getElementById('profession-insight-banner');
  const title = document.getElementById('insight-title');
  const desc = document.getElementById('insight-desc');
  const skills = document.getElementById('insight-skills');
  const tips = document.getElementById('insight-tips');

  title.textContent = insight.title;
  desc.textContent = insight.desc;
  tips.textContent = insight.growthTips;

  skills.innerHTML = insight.skills.map(skill => `
    <span class="text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono-custom">${skill}</span>
  `).join('');

  banner.classList.remove('hidden');
  banner.classList.add('flex');

  // Filter success stories
  renderSuccessStories(insight.professionKey);
};

// Clear search filter
function clearSearchFilter() {
  state.currentSearchQuery = '';
  document.getElementById('profession-insight-banner')?.classList.add('hidden');
  renderSuccessStories();
}

// Render success stories based on filtered category
function renderSuccessStories(filterCategory = '') {
  const grid = document.getElementById('success-stories-grid');
  if (!grid) return;

  grid.innerHTML = '';

  const filtered = filterCategory 
    ? verifiedSuccessStories.filter(story => story.tags.includes(filterCategory))
    : verifiedSuccessStories;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full glass-panel p-6 text-center text-xs text-slate-500 rounded-2xl">
        ისტორიები ამ მიმართულებით ვერ მოიძებნა.
      </div>
    `;
    return;
  }

  filtered.forEach(story => {
    const card = document.createElement('div');
    card.className = 'glass-panel rounded-2xl p-4 flex flex-col gap-3 glass-panel-hover animate-fade-in';
    card.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-700 bg-slate-800">
          <img src="${story.photo}" alt="${story.name}" class="w-full h-full object-cover">
        </div>
        <div>
          <h4 class="text-xs font-bold text-white">${story.name}</h4>
          <p class="text-[10px] text-indigo-400 font-medium">${story.role}</p>
        </div>
      </div>
      
      <p class="text-[11px] text-slate-400 leading-relaxed h-[80px] overflow-y-auto pr-1">
        ${story.bio}
      </p>
      
      <div class="border-t border-white/5 pt-2 mt-auto">
        <span class="block text-[9px] text-teal-400 font-bold uppercase tracking-wider mb-1">რჩევა სტუდენტებს:</span>
        <p class="text-[11px] text-slate-200 italic leading-relaxed">
          "${story.advice}"
        </p>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Render a random daily motivational quote
function renderDailyQuote() {
  const textEl = document.getElementById('daily-quote-text');
  const authorEl = document.getElementById('daily-quote-author');

  if (!textEl || !authorEl) return;

  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  const quote = motivationalQuotes[randomIndex];

  textEl.textContent = `"${quote.text}"`;
  authorEl.textContent = `— ${quote.author}`;
}

// Start Matching RAG Analysis
async function startMatchingAnalysis() {
  // Read CV and Vacancy from textarea if file is not uploaded
  const cvInputText = document.getElementById('cv-text-input').value.trim();
  const vacInputText = document.getElementById('vac-text-input').value.trim();

  const finalCv = state.cvText || cvInputText;
  const finalVac = state.vacText || vacInputText;

  if (!finalCv) {
    alert('გთხოვთ ატვირთოთ CV ფაილი ან ჩაწეროთ იგი ტექსტურად.');
    return;
  }
  if (!finalVac) {
    alert('გთხოვთ ატვირთოთ ვაკანსია ან ჩაწეროთ იგი ტექსტურად.');
    return;
  }

  // Show Loading State
  const spinner = document.getElementById('analyze-spinner');
  const btnText = document.getElementById('analyze-btn').querySelector('span');
  const placeholder = document.getElementById('results-placeholder');
  const content = document.getElementById('results-content');

  spinner.classList.remove('hidden');
  btnText.textContent = 'მიმდინარეობს ანალიზი...';
  placeholder.classList.remove('hidden');
  content.classList.add('hidden');

  try {
    let result;
    if (state.apiKey) {
      result = await runGeminiRAGAnalysis(finalCv, finalVac);
      document.getElementById('analysis-mode-indicator').textContent = 'დაკავშირებულია: Gemini Live RAG';
      document.getElementById('analysis-mode-indicator').className = 'text-[10px] font-mono-custom text-emerald-400 font-semibold';
    } else {
      // Simulate delay for a premium feel
      await new Promise(resolve => setTimeout(resolve, 2000));
      result = runLocalHeuristicAnalysis(finalCv, finalVac);
      document.getElementById('analysis-mode-indicator').textContent = 'სიმულაცია (API გასაღების გარეშე)';
      document.getElementById('analysis-mode-indicator').className = 'text-[10px] font-mono-custom text-amber-400 font-semibold';
    }

    // Populate Matcher UI
    populateMatcherResults(result);

    // Dynamic filtering of insights based on match results
    autoDetectProfessionInsight(finalVac);

    // Display Results Content
    placeholder.classList.add('hidden');
    content.classList.remove('hidden');
    content.classList.add('animate-fade-in');
  } catch (error) {
    console.error('RAG matching error:', error);
    alert('RAG ანალიზისას მოხდა შეცდომა: ' + error.message);
  } finally {
    spinner.classList.add('hidden');
    btnText.textContent = '⚡ თავსებადობის RAG ანალიზი';
  }
}

// Local Keyword heuristic RAG matcher (fallback when no API key is specified)
function runLocalHeuristicAnalysis(cv, vacancy) {
  const dictionary = [
    'Python', 'FastAPI', 'Flask', 'SQL', 'PostgreSQL', 'Git', 'HTML', 'CSS', 'JavaScript', 
    'React', 'Redux', 'Figma', 'UI/UX', 'Wireframing', 'Prototyping', 'User Research', 
    'QA Automation', 'Testing', 'Manual Testing', 'OOP', 'Java', 'Pandas', 'NumPy', 
    'Scikit-learn', 'Power BI', 'Tableau', 'Data Analysis', 'Machine Learning', 'AI', 'LLM'
  ];

  const cvLower = cv.toLowerCase();
  const vacLower = vacancy.toLowerCase();

  const matched = [];
  const missing = [];

  // Look for skills required by the vacancy
  const vacSkills = dictionary.filter(skill => vacLower.includes(skill.toLowerCase()));
  
  if (vacSkills.length === 0) {
    // If no matching dictionary skills in vacancy, find matches on words
    return {
      percentage: 50,
      strengths: ["ზოგადი პროფესიული კომუნიკაცია", "სამუშაო მოტივაცია"],
      gaps: ["კონკრეტული ტექნიკური უნარები (ვაკანსია არ შეიცავს დეტალურ მოთხოვნებს)"],
      mentorComment: "ვაკანსიაში ტექნიკური მოთხოვნები ბუნდოვანია. გირჩევთ, დააზუსტოთ დამსაქმებელთან ან ჩაატაროთ დამატებითი კვლევა, რათა უკეთ მოემზადოთ."
    };
  }

  vacSkills.forEach(skill => {
    if (cvLower.includes(skill.toLowerCase())) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  });

  const percentage = Math.round((matched.length / vacSkills.length) * 100);

  // Heuristic Georgian mentor advice
  let mentorComment = "";
  if (percentage >= 70) {
    mentorComment = `შენი CV შესანიშნავად ემთხვევა ამ ვაკანსიას! გაქვს ძირითადი უნარები: ${matched.slice(0, 3).join(', ')}. გირჩევ, პირდაპირ გააგზავნო განაცხადი ან გაიარო გასაუბრების სიმულაცია ჩვენს ჩატბოტთან.`;
  } else if (percentage >= 40) {
    mentorComment = `კარგი თანხვედრაა (${percentage}%), თუმცა დამსაქმებელი ითხოვს დამატებით უნარებს: ${missing.slice(0, 2).join(', ')}. ამ მიმართულებით მცირე პროექტის გაკეთება და CV-ში დამატება საგრძნობლად გაზრდის შენს შანსებს.`;
  } else {
    mentorComment = `თავსებადობა დაბალია (${percentage}%). მოდი ვიმუშაოთ შენი უნარების გაუმჯობესებაზე. გირჩევ, ჯერ ყურადღება გაამახვილო შემდეგ საკვანძო ტექნოლოგიებზე: ${missing.slice(0, 3).join(', ')}.`;
  }

  return {
    percentage,
    strengths: matched.length > 0 ? matched.map(s => `ფლობთ უნარს: ${s}`) : ["საბაზისო სამუშაო ინტერესი"],
    gaps: missing.length > 0 ? missing.map(s => `მოსამზადებელია: ${s}`) : ["გამოკვეთილი ხარვეზები არ იძებნება!"],
    mentorComment
  };
}

// Call Google AI Studio Gemini API for detailed RAG analysis
async function runGeminiRAGAnalysis(cv, vacancy) {
  const model = state.apiModel || 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${state.apiKey}`;

  const systemInstruction = `შენ ხარ ინტელექტუალური კარიერული პლატფორმის Career Navigator AI-ის Matchmaker ბირთვი. შენი მიზანია შეადარო სტუდენტის CV და კონკრეტული ვაკანსია, დაადგინო პროცენტული შესაბამისობა (0%-დან 100%-მდე).
ისაუბრე აკადემიურად გამართული, ამავდროულად მაღალი მოტივაციის მქონე, მეგობრული და პროფესიული ქართული ენით. შენ ხარ მხარდამჭერი პარტნიორი, რომელიც ეხმარება სტუდენტს ინფორმაციული ქაოსის მართვასა და მიზნების განსაზღვრაში.

გამოყავი: "ძლიერი მხარეები" (რა ემთხვევა იდეალურად) და "ხარვეზები/Gaps" (რა უნარები ან გამოცდილება აკლია მომხმარებელს).
მკაცრად აკრძალულია ინფორმაციის გამოგონება (ჰალუცინაცია). დაეყრდენი მხოლოდ რეალურ ფაქტებსა და მონაცემებს.

დააბრუნე პასუხი შემდეგი სუფთა, სტრუქტურირებული ფორმატით:
PERCENTAGE: [მხოლოდ ციფრი 0-დან 100-მდე]
STRENGTHS:
- [ძლიერი მხარე 1]
- [ძლიერი მხარე 2]
GAPS:
- [ხარვეზი / ნაკლოვანი უნარი 1]
- [ხარვეზი / ნაკლოვანი უნარი 2]
COMMENT:
[მენტორის მამოტივირებელი, მიზნებზე ორიენტირებული, მხარდამჭერი და კონსტრუქციული კომენტარი ქართულად, რომელიც დაეხმარება სტუდენტს ინფორმაციული ქაოსის მართვაში]`;

  const userPrompt = `CV (რეზიუმე):
${cv}

ვაკანსიის აღწერა:
${vacancy}

შეადარე ეს ორი დოკუმენტი და მოახდინე RAG ანალიზი.`;

  const payload = {
    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] },
    generationConfig: { temperature: 0.2, maxOutputTokens: 600 }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.error?.message || "Gemini API-სთან დაკავშირება ვერ მოხერხდა");
  }

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;
  
  return parseGeminiRAGResponse(text);
}

// Parse structured RAG response from Gemini
function parseGeminiRAGResponse(text) {
  try {
    const pctMatch = text.match(/PERCENTAGE:\s*(\d+)/i);
    const percentage = pctMatch ? parseInt(pctMatch[1], 10) : 50;

    let strengths = [];
    const strengthsMatch = text.match(/STRENGTHS:\s*([\s\S]*?)(?=GAPS:|COMMENT:|$)/i);
    if (strengthsMatch) {
      strengths = strengthsMatch[1].split('\n').map(line => line.replace(/^-\s*/, '').trim()).filter(Boolean);
    }

    let gaps = [];
    const gapsMatch = text.match(/GAPS:\s*([\s\S]*?)(?=COMMENT:|$)/i);
    if (gapsMatch) {
      gaps = gapsMatch[1].split('\n').map(line => line.replace(/^-\s*/, '').trim()).filter(Boolean);
    }

    let mentorComment = "ანალიზი წარმატებით დასრულდა.";
    const commentMatch = text.match(/COMMENT:\s*([\s\S]*)/i);
    if (commentMatch) {
      mentorComment = commentMatch[1].trim();
    }

    return {
      percentage,
      strengths: strengths.length > 0 ? strengths : ["საბაზისო თავსებადობა"],
      gaps: gaps.length > 0 ? gaps : ["სერიოზული დანაკლისი არ არის"],
      mentorComment
    };
  } catch (err) {
    console.error("Error parsing Gemini response, using fallback", err);
    return {
      percentage: 60,
      strengths: ["იდენტიფიცირებულია ძლიერი მხარეები"],
      gaps: ["იდენტიფიცირებულია გასაუმჯობესებელი უნარები"],
      mentorComment: text
    };
  }
}

// Populate RAG matcher analysis into HTML
function populateMatcherResults(result) {
  const percentText = document.getElementById('match-percent-text');
  const strengthsList = document.getElementById('strengths-list');
  const gapsList = document.getElementById('gaps-list');
  const mentorRecommendation = document.getElementById('mentor-rag-recommendation');
  const progressCircle = document.getElementById('progress-circle');

  // Update texts
  percentText.textContent = `${result.percentage}%`;
  mentorRecommendation.textContent = result.mentorComment;

  // Set colors based on percentage
  let strokeColorClass = 'text-indigo-500';
  if (result.percentage >= 70) {
    strokeColorClass = 'text-emerald-400';
    percentText.className = 'absolute text-sm font-extrabold font-mono-custom text-emerald-400';
  } else if (result.percentage >= 45) {
    strokeColorClass = 'text-amber-400';
    percentText.className = 'absolute text-sm font-extrabold font-mono-custom text-amber-400';
  } else {
    strokeColorClass = 'text-rose-400';
    percentText.className = 'absolute text-sm font-extrabold font-mono-custom text-rose-400';
  }

  // Update circle border color & dashoffset
  progressCircle.className = `progress-ring-circle ${strokeColorClass}`;
  const radius = progressCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (result.percentage / 100) * circumference;
  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressCircle.style.strokeDashoffset = offset;

  // Render list elements
  strengthsList.innerHTML = result.strengths.map(s => `<li>${s}</li>`).join('');
  gapsList.innerHTML = result.gaps.map(g => `<li>${g}</li>`).join('');
}

// Automatically detect profession categories from vacancy text to show relevant insights
function autoDetectProfessionInsight(vacancyText) {
  const text = vacancyText.toLowerCase();
  let matchedKey = '';

  if (text.includes('python') || text.includes('django') || text.includes('fastapi') || text.includes('flask') || text.includes('backend') || text.includes('frontend') || text.includes('javascript') || text.includes('react') || text.includes('web')) {
    matchedKey = 'development';
  } else if (text.includes('data') || text.includes('analyst') || text.includes('sql') || text.includes('machine learning') || text.includes('ai') || text.includes('pandas') || text.includes('power bi')) {
    matchedKey = 'data science';
  } else if (text.includes('design') || text.includes('ui') || text.includes('ux') || text.includes('figma') || text.includes('product designer')) {
    matchedKey = 'design';
  } else if (text.includes('qa') || text.includes('testing') || text.includes('test') || text.includes('automation') || text.includes('manual')) {
    matchedKey = 'testing';
  }

  if (matchedKey) {
    triggerSearch(matchedKey);
  }
}

// Toggling Chat Drawer
function toggleChatDrawer(open) {
  const drawer = document.getElementById('chatbot-drawer');
  if (!drawer) return;

  if (open) {
    drawer.classList.add('open');
  } else {
    drawer.classList.remove('open');
  }
}

// Toggle settings modal
function toggleSettingsModal(open) {
  const modal = document.getElementById('settings-modal');
  if (!modal) return;

  if (open) {
    modal.classList.remove('hidden');
  } else {
    modal.classList.add('hidden');
  }
}

// Save Gemini API key & model
function saveSettingsKey() {
  const input = document.getElementById('gemini-key-input');
  const key = input?.value.trim();
  const modelSelect = document.getElementById('gemini-model-select');
  const model = modelSelect?.value || 'gemini-2.5-flash';

  if (!key) {
    alert('გთხოვთ შეიყვანოთ ვალიდური API Key.');
    return;
  }

  state.apiKey = key;
  state.apiModel = model;
  localStorage.setItem('gemini_api_key', key);
  localStorage.setItem('gemini_api_model', model);
  resetChatbot(); // Reload chatbot system prompts
  toggleSettingsModal(false);
  alert('Gemini კონფიგურაცია წარმატებით შეინახა. სისტემა დაკავშირებულია!');
}

// Clear Gemini API key & model
function clearSettingsKey() {
  state.apiKey = '';
  state.apiModel = 'gemini-2.5-flash';
  localStorage.removeItem('gemini_api_key');
  localStorage.removeItem('gemini_api_model');
  const input = document.getElementById('gemini-key-input');
  if (input) input.value = '';
  const modelSelect = document.getElementById('gemini-model-select');
  if (modelSelect) modelSelect.value = 'gemini-2.5-flash';
  resetChatbot();
  toggleSettingsModal(false);
  alert('კონფიგურაცია წაშლილია. სისტემა გადავიდა სიმულაციურ რეჟიმში.');
}

// Help / Ethics Framework Modals
const modalContents = {
  privacy: `
    <h4 class="font-bold text-white mb-2">კონფიდენციალურობის პოლიტიკა</h4>
    <p class="leading-relaxed">Career Navigator AI პლატფორმაზე თქვენი პრივატულობა 100%-ით დაცულია:</p>
    <ul class="list-disc list-inside space-y-1.5 mt-2">
      <li>თქვენს მიერ ატვირთული ფაილები (PDF, TXT) და ჩაწერილი ტექსტები არ იგზავნება და არ ინახება გარე სერვერებზე.</li>
      <li>ტექსტის წაკითხვა და RAG ანალიზი სრულდება ლოკალურად, თქვენსავე ბრაუზერში.</li>
      <li>თუ იყენებთ Gemini API-ს, მონაცემები უსაფრთხოდ გადაეცემა უშუალოდ Google-ის სერვერებს და არ გამოიყენება მოდელის შემდგომი წვრთნისთვის.</li>
    </ul>
  `,
  rules: `
    <h4 class="font-bold text-white mb-2">სარგებლობის წესები და პირობები</h4>
    <p class="leading-relaxed">პლატფორმა განკუთვნილია საგანმანათლებლო და კარიერული თვითგანვითარების მიზნებისთვის:</p>
    <ul class="list-disc list-inside space-y-1.5 mt-2">
      <li>ხელოვნურმა ინტელექტმა შესაძლოა დაუშვას შეცდომები (ჰალუცინაციები). ნებისმიერი კარიერული რეკომენდაცია მიიღეთ სარეკომენდაციო სახით.</li>
      <li>დაუშვებელია პლატფორმის გამოყენება მავნე მიზნებისთვის, მათ შორის პერსონალური მონაცემების არასათანადო დამუშავებისთვის.</li>
    </ul>
  `,
  help: `
    <h4 class="font-bold text-white mb-2">დახმარება და მხარდაჭერა</h4>
    <p class="leading-relaxed">როგორ გამოვიყენოთ პლატფორმა?</p>
    <ol class="list-decimal list-inside space-y-1.5 mt-2">
      <li>ატვირთეთ თქვენი CV და სამიზნე ვაკანსია (PDF ან TXT).</li>
      <li>დააჭირეთ „თავსებადობის RAG ანალიზს“.</li>
      <li>გაეცანით ძლიერ მხარეებსა და ხარვეზებს.</li>
      <li>გახსენით „Career Coach“ ჩატბოტი და მიიღეთ დამატებითი რჩევები CV-ის გასაუმჯობესებლად ან გასაუბრებისთვის მოსამზადებლად.</li>
    </ol>
  `
};

function showHelpModal(type) {
  const content = modalContents[type];
  if (!content) return;

  const titleEl = document.getElementById('help-modal-title');
  const contentEl = document.getElementById('help-modal-content');

  if (type === 'privacy') {
    titleEl.innerHTML = '🔒 კონფიდენციალურობის პოლიტიკა';
  } else if (type === 'rules') {
    titleEl.innerHTML = '⚖️ წესები და პირობები';
  } else {
    titleEl.innerHTML = '💡 დახმარება და მხარდაჭერა';
  }

  contentEl.innerHTML = content;
  toggleHelpModal(true);
}

function toggleHelpModal(open) {
  const modal = document.getElementById('help-modal');
  if (!modal) return;

  if (open) {
    modal.classList.remove('hidden');
  } else {
    modal.classList.add('hidden');
  }
}

// CAREER COACH CHATBOT LOGIC

// Reset chatbot state
function resetChatbot() {
  state.chatHistory = [];
  const container = document.getElementById('chat-messages');
  if (!container) return;

  container.innerHTML = '';
  
  // Welcome message in Georgian matching persona
  appendChatMessage('assistant', 'მოგესალმები! მე ვარ შენი პერსონალური AI კარიერული ასისტენტი (Career Coach). აქ ვარ, რათა დაგეხმარო CV-ის დახვეწაში, გასაუბრებისთვის მომზადებასა და საჭირო უნარების ათვისებაში. რით შემიძლია დაგეხმარო დღეს?');
}

// Append message block to chatbot GUI
function appendChatMessage(sender, text) {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `p-3 rounded-xl max-w-[85%] leading-relaxed ${
    sender === 'user' 
      ? 'chat-bubble-user self-end text-slate-100' 
      : 'chat-bubble-assistant self-start text-slate-200'
  }`;
  
  // Format basic Markdown-like code or formatting
  const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');

  msgDiv.innerHTML = formattedText;
  container.appendChild(msgDiv);
  
  // Auto-scroll
  container.scrollTop = container.scrollHeight;
}

// Send message to Career Coach Chatbot
async function sendCoachMessage() {
  const input = document.getElementById('chat-input');
  const message = input?.value.trim();

  if (!message) return;

  // Append user message
  appendChatMessage('user', message);
  if (input) input.value = '';

  // Show typing state
  appendChatMessage('assistant', 'მიმდინარეობს ფიქრი...');
  const messages = document.getElementById('chat-messages');
  const typingBubble = messages.lastChild;

  // Track chat history for Gemini API calling
  state.chatHistory.push({ role: 'user', parts: [{ text: message }] });

  try {
    let reply = '';
    if (state.apiKey) {
      reply = await callGeminiCoachAPI();
    } else {
      await new Promise(resolve => setTimeout(resolve, 1500));
      reply = getSimulatedCoachReply(message);
    }

    // Remove typing bubble and append actual reply
    if (typingBubble) typingBubble.remove();
    appendChatMessage('assistant', reply);

    // Track response history
    state.chatHistory.push({ role: 'model', parts: [{ text: reply }] });
  } catch (error) {
    console.error('Chatbot error:', error);
    if (typingBubble) typingBubble.remove();
    appendChatMessage('assistant', 'უკაცრავად, კავშირი გაწყდა. გთხოვთ, შეამოწმოთ თქვენი ინტერნეტ-კავშირი ან API გასაღები.');
  }
}

// Send quick prompts from chips
function sendQuickPrompt(promptText) {
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = promptText;
    sendCoachMessage();
  }
}

// Trigger Career Coach discussion based on current RAG matching outcome
function askCoachAboutJob() {
  toggleChatDrawer(true);
  
  let cvSummary = state.cvFileName ? `ჩემს CV-ში (${state.cvFileName})` : "ჩემს რეზიუმეში";
  let vacSummary = state.vacFileName ? `ამ ვაკანსიასთან (${state.vacFileName})` : "ამ ვაკანსიასთან";

  const promptText = `გამარჯობა! მე გავაკეთე ${cvSummary} და ${vacSummary} თავსებადობის RAG ანალიზი. შეგიძლია მომცე პრაქტიკული რჩევები, როგორ შევავსო ჩემი კომპეტენციური ხარვეზები და როგორ მოვემზადო გასაუბრებისთვის?`;
  
  sendQuickPrompt(promptText);
}

// Simulated Coach replies (when API Key is absent)
function getSimulatedCoachReply(msg) {
  const query = msg.toLowerCase();
  
  if (query.includes('cv') || query.includes('რეზიუმე')) {
    return 'შენი CV-ის გასაუმჯობესებლად გირჩევ: \n1. **გამოიყენე Action Verbs** (მაგ. „შევქმენი“, „ოპტიმიზაცია გავუკეთე“, „დავნერგე“).\n2. **მოახდინე CV-ის მორგება ვაკანსიაზე:** ხაზი გაუსვი იმ ტექნოლოგიებს, რომლებსაც დამსაქმებელი პირდაპირ ითხოვს.\n3. **მიუთითე პორტფოლიო:** დაამატე შენი GitHub-ის ბმული.';
  }
  
  if (query.includes('გასაუბრება') || query.includes('ინტერვიუ')) {
    return 'გასაუბრებისთვის მოსამზადებლად მნიშვნელოვანია:\n1. **შეისწავლე კომპანია:** გაიგე რას საქმიანობენ და რა პროდუქტები აქვთ.\n2. **STAR მეთოდოლოგია:** კითხვებს უპასუხე სტრუქტურირებულად - Situation (სიტუაცია), Task (დავალება), Action (შენი მოქმედება), Result (შედეგი).\n3. **ტექნიკური კითხვები:** ივარჯიშე ძირითად თეორიულ კითხვებზე ჩვენს პლატფორმაში.';
  }

  if (query.includes('ხარვეზ') || query.includes('უნარ') || query.includes('შევსებ')) {
    return 'უნარების შესავსებად საუკეთესო გზაა **საკუთარი პეტ-პროექტის (Pet Project) შექმნა**. მაგალითად, თუ ვაკანსია ითხოვს API ინტეგრაციას, შექმენი მარტივი FastAPI აპლიკაცია, რომელიც უკავშირდება რაიმე საჯარო API-ს, დაწერე დოკუმენტაცია და ატვირთე GitHub-ზე. ეს დამსაქმებელს აჩვენებს, რომ სწრაფად სწავლობ.';
  }

  return 'კარგი კითხვაა! როგორც შენი კარიერული მხარდამჭერი, გირჩევ ყურადღება გაამახვილო პრაქტიკულ სავარჯიშოებზე. \n\n*შენიშვნა: იმისთვის, რომ მიიღოთ პერსონალიზებული, დეტალური პასუხები პირდაპირ თქვენს CV-ზე მორგებით, გთხოვთ მიუთითოთ თქვენი Gemini API Key პარამეტრების პანელში (ზედა მარჯვენა კუთხეში).*';
}

// Call Google Gemini API for chatbot coaching conversational reply
async function callGeminiCoachAPI() {
  const model = state.apiModel || 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${state.apiKey}`;

  const systemInstruction = `შენ ხარ Career Coach - Career Navigator AI პლატფორმის კარიერული მენტორი და ასისტენტი სტუდენტებისთვის.
შენი მიზანია დაეხმარო მომხმარებლებს კარიერულ დაგეგმვაში, CV-ის დახვეწაში, გასაუბრებისთვის მოზადებასა და საჭირო უნარების ათვისებაში.
ისაუბრე აკადემიურად გამართული, ამავდროულად მაღალი მოტივაციის მქონე, მეგობრული, მხარდამჭერი და პროფესიული ქართული ენით. შენ ხარ პარტნიორი, რომელიც ეხმარება სტუდენტს ინფორმაციული ქაოსის მართვასა და მიზნების განსაზღვრაში. იყავი მამოტივირებელი და მიზნებზე ორიენტირებული.
მკაცრად აკრძალულია ინფორმაციის გამოგონება (ჰალუცინაციები). რეალური ადამიანების ან ფაქტების ხსენებისას დაეყრდენი მხოლოდ გადამოწმებულ, რეალურ ინფორმაციას. თუ რამე არ იცი, არ გამოიგონო, არამედ გულწრფელად აღიარე ან შესთავაზე სხვა გადამოწმებული მაგალითი.
უპასუხე სუფთა, სტრუქტურირებული Markdown ფორმატით (გამოიყენე სათაურები Headings, სიები Bullet points, Bold ტექსტი).`;

  // Create payload contents using the state history
  const payload = {
    contents: state.chatHistory,
    systemInstruction: { parts: [{ text: systemInstruction }] },
    generationConfig: { temperature: 0.7, maxOutputTokens: 800 }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.error?.message || "Gemini Coach Connection error");
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
