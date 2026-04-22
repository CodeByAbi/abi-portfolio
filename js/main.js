/* ============================================================
   ABI PORTFOLIO - MAIN JAVASCRIPT
   ============================================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer:fine)').matches;

function trackEvent(name, detail = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...detail, ts: Date.now() });
}

/* ==================== CURSOR + PARALLAX (POINTER AWARE) ==================== */
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
const gridBg = document.getElementById('gridBg');

let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;
let mouseRaf = null;

function updateCursorMode() {
  const canUse = finePointer && !prefersReducedMotion && !document.body.classList.contains('keyboard-nav');
  document.body.classList.toggle('use-custom-cursor', canUse);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
    updateCursorMode();
  }
});

document.addEventListener('pointerdown', () => {
  document.body.classList.remove('keyboard-nav');
  updateCursorMode();
});

updateCursorMode();

function flushMouseEffects() {
  mouseRaf = null;

  if (document.body.classList.contains('use-custom-cursor') && cursor && trail) {
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    trailX += (mouseX - trailX) * 0.14;
    trailY += (mouseY - trailY) * 0.14;
    trail.style.left = `${trailX}px`;
    trail.style.top = `${trailY}px`;
  }

  if (gridBg && !prefersReducedMotion) {
    const x = (mouseX / window.innerWidth - 0.5) * 10;
    const y = (mouseY / window.innerHeight - 0.5) * 10;
    gridBg.style.transform = `translate(${x}px, ${y}px)`;
  }
}

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (!mouseRaf) mouseRaf = requestAnimationFrame(flushMouseEffects);
}, { passive: true });

document.querySelectorAll('a,button,.exp-trigger,.proj-open-btn,.cert-card,.c-link,.skill-chip').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('h-cursor'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('h-cursor'));
});

/* ==================== NAV + MOBILE DRAWER ==================== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navDrawer = document.getElementById('navDrawer');
const navDrawerClose = document.getElementById('navDrawerClose');

function toggleDrawer(forceOpen) {
  if (!navDrawer || !navToggle) return;
  const open = typeof forceOpen === 'boolean' ? forceOpen : !navDrawer.classList.contains('open');
  navDrawer.classList.toggle('open', open);
  navDrawer.setAttribute('aria-hidden', String(!open));
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}

if (navToggle && navDrawer) {
  navToggle.addEventListener('click', () => toggleDrawer());
  navDrawerClose?.addEventListener('click', () => toggleDrawer(false));
  navDrawer.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });
}

window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

/* ==================== ACTIVE NAV LINK ==================== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a, .nav-drawer-links a[href^="#"]');

const activeObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach(a => a.classList.remove('active'));
    navAnchors.forEach(a => {
      if (a.getAttribute('href') === `#${entry.target.id}`) a.classList.add('active');
    });
  });
}, { threshold: 0.35 });

sections.forEach(s => activeObs.observe(s));

/* ==================== REVEAL ANIMATION ==================== */
const revealTargets = document.querySelectorAll('[data-reveal]');

if (prefersReducedMotion) {
  revealTargets.forEach(el => el.classList.add('in'));
} else {
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  revealTargets.forEach(el => revealObs.observe(el));
}

/* ==================== COUNTERS ==================== */
function animateCounter(el) {
  const target = parseInt(el.dataset.count || '0', 10);
  const suffix = el.dataset.suffix || '';
  if (prefersReducedMotion) {
    el.textContent = `${target}${suffix}`;
    return;
  }

  const duration = 1200;
  let startedAt = 0;
  const step = timestamp => {
    if (!startedAt) startedAt = timestamp;
    const progress = Math.min((timestamp - startedAt) / duration, 1);
    el.textContent = `${Math.floor(target * progress)}${suffix}`;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    animateCounter(entry.target);
    counterObs.unobserve(entry.target);
  });
}, { threshold: 0.6 });

document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

/* ==================== EXPERIENCE TOGGLE ==================== */
const expCards = Array.from(document.querySelectorAll('.exp-card'));

function setExperienceOpen(card) {
  expCards.forEach(c => {
    const trigger = c.querySelector('[data-exp-trigger]');
    const isTarget = c === card;
    const willOpen = isTarget ? !c.classList.contains('open') : false;
    c.classList.toggle('open', willOpen);
    if (trigger) trigger.setAttribute('aria-expanded', String(willOpen));
  });
}

document.querySelectorAll('[data-exp-trigger]').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.exp-card');
    if (card) setExperienceOpen(card);
  });
});

/* ==================== PROJECT MODAL ==================== */
const projectData = {
  p1: {
    title: 'Rainfall Prediction in Australia',
    sub: 'Machine Learning · Weather Forecasting',
    problem: 'Weather forecasting for rainfall is critical for agriculture and disaster mitigation, but traditional approaches can miss local variability.',
    solution: 'Built a supervised classification workflow with feature engineering, model comparison, and robust validation loops.',
    arch: 'Python data pipeline with preprocessing, training, and evaluation stages using Pandas and Scikit-learn.',
    tradeoff: 'Balanced higher model complexity with interpretability by combining tree-based and linear baselines before selecting final behavior.',
    result: 'Delivered a reproducible pipeline with benchmark tracking for precision/recall and clearer decision support outputs.',
    lessons: [
      'Class imbalance skewed early recall — stratified cross-validation fixed this without oversampling noise.',
      'Switching from logistic regression to gradient boosting improved minority-class recall significantly; the non-linear boundary mattered.',
      'Imputation strategy (median vs. KNN) had more impact on final accuracy than model choice at this data scale.'
    ],
    proof: [
      { label: 'GitHub', href: 'https://github.com/CodeByAbi/Rainfall-Prediction-in-Australia' }
    ]
  },
  p2: {
    title: 'SmartFAQ Chatbot (Flagship)',
    sub: 'RAG · LangChain · FastAPI',
    problem: 'Support teams handled repetitive FAQ traffic with inconsistent answers and long response cycles.',
    solution: 'Built retrieval-enhanced chatbot flows with intent routing, answer generation, and observability for latency and token usage.',
    arch: 'LangChain orchestration + FastAPI service + queue workers + searchable storage for chunk retrieval and response synthesis.',
    tradeoff: 'Optimized retrieval depth and context window size to balance response quality, speed, and token cost.',
    result: 'Established production-ready foundation with measurable monitoring points for quality and response efficiency.',
    lessons: [
      'Chunk size tuning had more effect on retrieval quality than swapping embedding models — start with chunking, not models.',
      'Intent routing before retrieval eliminated a class of irrelevant context windows that were silently degrading answers.',
      'Cache warmup scheduling via Celery beat prevented latency spikes on cold first requests in production.'
    ],
    proof: [
      { label: 'Flagship Case Study', href: 'case-study-smartfaq.html' },
      { label: 'GitHub', href: 'https://github.com/CodeByAbi/faq-chatbot' }
    ]
  },
  p3: {
    title: 'House Price Prediction: Tebet',
    sub: 'Regression Modeling · Real Estate',
    problem: 'Property pricing decisions in local markets often depend on subjective estimates and inconsistent comparisons.',
    solution: 'Built a regression workflow using structured features across property characteristics and location context.',
    arch: 'Data cleaning and feature preparation in Pandas followed by baseline and tuned regression evaluation in Scikit-learn.',
    tradeoff: 'Prioritized model interpretability for stakeholders over black-box complexity to keep outputs actionable.',
    result: 'Produced benchmarked pricing estimates with repeatable evaluation steps for iteration and refinement.',
    lessons: [
      'Outlier luxury properties inflated MAE — removing verified out-of-scope listings improved benchmark relevance, not just metrics.',
      'Log-transforming the price target made residuals near-normal and improved R² without any model change.',
      'Location features (subdistrict encoding) contributed more predictive signal than building area alone.'
    ],
    proof: [
      { label: 'GitHub', href: 'https://github.com/CodeByAbi/house-price-prediction' }
    ]
  },
  p4: {
    title: 'Electric Vehicle Data Analysis',
    sub: 'EDA · Tableau · Analytics',
    problem: 'EV trend analysis requires multi-dimensional views across regions, infrastructure readiness, and market behavior.',
    solution: 'Built data-cleaning and exploratory analytics workflow, then delivered interactive Tableau dashboards for decision support.',
    arch: 'Python data preparation pipeline feeding dashboard views with state-level trend and segmentation breakdowns.',
    tradeoff: 'Balanced dashboard complexity with readability by prioritizing high-impact slices and drill-down clarity.',
    result: 'Created reusable dashboard storytelling structure for policy, market, and growth discussions.',
    lessons: [
      'Pre-aggregating in Python before Tableau was significantly faster than relying on Tableau blended data sources.',
      'Per-capita normalization told a completely different regional story than raw EV counts — always normalize before comparing regions.',
      'Starting with the stakeholder question ("which states are under-served?") shaped better filter choices than starting with the data columns.'
    ],
    proof: [
      { label: 'GitHub', href: 'https://github.com/CodeByAbi/ev-data-analysis' }
    ]
  },
  p5: {
    title: 'Demolabs Chatbot',
    sub: 'RAG · Text-to-SQL · Feature Key',
    problem: 'Business users need fast and accurate answers from complex datasets, but manual SQL and chart preparation slow down decisions.',
    solution: 'Built an end-to-end AI-powered data assistant that transforms natural language queries into executable SQL and context-aware visualizations using RAG with vector similarity search.',
    arch: 'Semantic intent detection + data-shape parsing for adaptive chart generation, backed by Celery async tasks, Redis conversation memory, and Azure Blob Storage signed URLs for chart delivery.',
    tradeoff: 'Balanced adaptive chart automation with deterministic post-processing so generated outputs remain accurate, explainable, and stable at scale.',
    result: 'Delivered automated insights generation with structured LLM outputs and robust processing pipelines that support trend and ranking analysis without explicit chart requests.',
    lessons: [
      'SQL hallucinations were the hardest failure mode — schema-grounded post-validation caught ~90% of invalid queries before execution.',
      'Redis TTL tuning for conversation memory was non-obvious: too short broke multi-turn context, too long wasted memory on dead sessions.',
      'Async chart delivery via signed Azure Blob URLs removed a blocking bottleneck; users got faster text responses while charts rendered in background.'
    ],
    proof: [
      { label: 'Demo Video', href: 'assets/vid/demolabs%20chatbot%20video.mp4' },
      { label: 'Request Demo', href: '#contact' }
    ]
  },
  p6: {
    title: 'Sentiment Analysis Telco Tweets',
    sub: 'NLP · Twitter Text Classification',
    problem: 'Telecommunication providers need a reliable way to understand customer perception from high-volume social media conversations.',
    solution: 'Built a sentiment analysis workflow on Telco tweets labeled as positive, negative, and neutral to classify customer opinions with machine learning.',
    arch: 'Python text preprocessing and feature extraction pipeline with supervised classifiers trained and evaluated on labeled Twitter data.',
    tradeoff: 'Balanced model complexity and interpretability by benchmarking multiple classifiers and selecting a configuration with stable class-wise performance.',
    result: 'Produced actionable sentiment classification outputs with class-level metrics to support service quality and customer experience analysis.',
    lessons: [
      'TF-IDF outperformed word embeddings at this dataset size — simpler features generalized better on limited labeled data.',
      'The neutral class was consistently misclassified by all models; adding more labeled neutral examples was the fix, not hyperparameter tuning.',
      'Tweet-specific preprocessing (stripping mentions, URLs, slang normalization) improved F1 more than any model switch.'
    ],
    proof: [
      { label: 'GitHub', href: 'https://github.com/CodeByAbi/Sentiment-Analysis-Telco-Tweets' }
    ]
  }
};

const modalOverlay = document.getElementById('modalOverlay');
const modalDialog = document.getElementById('modalDialog');
const modalContent = document.getElementById('modalContent');
const modalCloseBtn = document.getElementById('modalClose');
let lastFocusedEl = null;

function getFocusable(container) {
  return Array.from(container.querySelectorAll('a, button, input, textarea, [tabindex]:not([tabindex="-1"])'))
    .filter(el => !el.hasAttribute('disabled'));
}

function trapModalFocus(e) {
  if (!modalOverlay?.classList.contains('open') || e.key !== 'Tab') return;
  const focusable = getFocusable(modalDialog);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function renderProofLinks(items) {
  return items.map(item => {
    const external = item.href.startsWith('http');
    return `<a href="${item.href}" ${external ? 'target="_blank" rel="noopener noreferrer"' : ''}>${item.label}</a>`;
  }).join('');
}

function openModal(projectId, triggerEl) {
  const project = projectData[projectId];
  if (!project || !modalOverlay || !modalContent) return;
  lastFocusedEl = triggerEl || document.activeElement;

  const lessonsHtml = project.lessons?.length
    ? `<div class="modal-sh">What I Learned</div>
       <ul class="modal-lessons">${project.lessons.map(l => `<li>${l}</li>`).join('')}</ul>`
    : '';

  modalContent.innerHTML = `
    <h2 class="modal-title" id="modalTitle">${project.title}</h2>
    <div class="modal-sub">${project.sub}</div>
    <div class="modal-sh">Problem</div>
    <p class="modal-p">${project.problem}</p>
    <div class="modal-sh">Solution</div>
    <p class="modal-p">${project.solution}</p>
    <div class="modal-sh">Architecture</div>
    <p class="modal-p">${project.arch}</p>
    <div class="modal-sh">Trade-off Decision</div>
    <p class="modal-p">${project.tradeoff}</p>
    <div class="modal-sh">Result</div>
    <p class="modal-p">${project.result}</p>
    ${lessonsHtml}
    <div class="flow-wrap">
      <div class="flow-label">Proof Links</div>
      <div class="proj-proof">${renderProofLinks(project.proof)}</div>
    </div>
  `;

  modalOverlay.classList.add('open');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => modalCloseBtn?.focus(), 10);
  trackEvent('project_modal_open', { projectId });
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') lastFocusedEl.focus();
}

document.querySelectorAll('[data-project-open]').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.projectOpen, btn));
});

modalOverlay?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
modalCloseBtn?.addEventListener('click', closeModal);

/* ==================== CONTACT FORM ==================== */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const nameInput = document.getElementById('contactName');
const emailInput = document.getElementById('contactEmail');
const messageInput = document.getElementById('contactMessage');

const fieldMap = {
  name: { input: nameInput, err: document.getElementById('nameError') },
  email: { input: emailInput, err: document.getElementById('emailError') },
  message: { input: messageInput, err: document.getElementById('messageError') }
};

function setFieldError(key, message) {
  const field = fieldMap[key];
  if (!field?.input || !field.err) return;
  field.input.classList.add('invalid');
  field.input.setAttribute('aria-invalid', 'true');
  field.err.textContent = message;
}

function clearFieldError(key) {
  const field = fieldMap[key];
  if (!field?.input || !field.err) return;
  field.input.classList.remove('invalid');
  field.input.setAttribute('aria-invalid', 'false');
  field.err.textContent = '';
}

function clearAllErrors() {
  Object.keys(fieldMap).forEach(clearFieldError);
  if (formStatus) {
    formStatus.className = 'form-status';
    formStatus.textContent = '';
  }
}

function validateContactForm() {
  clearAllErrors();
  const errors = [];
  const name = nameInput?.value.trim() || '';
  const email = emailInput?.value.trim() || '';
  const message = messageInput?.value.trim() || '';

  if (name.length < 2) {
    errors.push('name');
    setFieldError('name', 'Please enter your full name.');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('email');
    setFieldError('email', 'Please enter a valid email address.');
  }

  if (message.length < 20) {
    errors.push('message');
    setFieldError('message', 'Message should be at least 20 characters.');
  }

  if (errors.length) {
    fieldMap[errors[0]].input?.focus();
    if (formStatus) {
      formStatus.className = 'form-status error';
      formStatus.textContent = 'Please fix the highlighted fields and try again.';
    }
    return null;
  }

  return { name, email, message };
}

if (contactForm) {
  const submitBtn = contactForm.querySelector('.f-submit');

  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const values = validateContactForm();
    if (!values) return;

    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.name, email: values.email, message: values.message })
      });

      if (res.ok) {
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.textContent = 'Message sent — I will get back to you shortly!';
        }
        contactForm.reset();
        trackEvent('contact_submit', { method: 'formspree' });
      } else {
        throw new Error('non-ok');
      }
    } catch {
      const subject = encodeURIComponent(`Portfolio inquiry from ${values.name}`);
      const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`);
      window.location.href = `mailto:abirawisnu7@gmail.com?subject=${subject}&body=${body}`;
      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Your email app has been opened. Thank you!';
      }
      contactForm.reset();
      trackEvent('contact_submit', { method: 'mailto_fallback' });
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message →'; }
    }
  });
}

/* ==================== KEYBOARD + GLOBAL ESCAPE ==================== */
function trapDrawerFocus(e) {
  if (!navDrawer?.classList.contains('open') || e.key !== 'Tab') return;
  const focusable = getFocusable(navDrawer);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault(); last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault(); first.focus();
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (modalOverlay?.classList.contains('open')) closeModal();
    if (navDrawer?.classList.contains('open')) toggleDrawer(false);
  }
  trapModalFocus(e);
  trapDrawerFocus(e);
});

/* ==================== SKILL STAGGER ==================== */
const chipParent = document.querySelector('.skill-grid');
if (chipParent) {
  Array.from(chipParent.children).forEach((chip, index) => {
    chip.style.transitionDelay = `${index * 0.04}s`;
  });
}

/* ==================== HERO PARALLAX ==================== */
if (!prefersReducedMotion) {
  const circle = document.querySelector('.hero-circle');
  let scrollRaf = null;

  window.addEventListener('scroll', () => {
    if (!circle || scrollRaf) return;
    scrollRaf = requestAnimationFrame(() => {
      circle.style.transform = `translateY(${window.scrollY * 0.08}px)`;
      scrollRaf = null;
    });
  }, { passive: true });
}

/* ==================== PROJECT CARD TILT (SOFT + DESKTOP ONLY) ==================== */
if (finePointer && !prefersReducedMotion) {
  document.querySelectorAll('.proj-card').forEach(card => {
    let tiltRaf = null;
    let dx = 0;
    let dy = 0;

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      dx = (e.clientX - cx) / (rect.width / 2);
      dy = (e.clientY - cy) / (rect.height / 2);

      if (tiltRaf) return;
      tiltRaf = requestAnimationFrame(() => {
        card.style.transform = `translateY(-4px) rotateX(${-dy * 1.2}deg) rotateY(${dx * 1.2}deg)`;
        tiltRaf = null;
      });
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==================== LINK TRACKING ==================== */
document.querySelectorAll('.proj-proof a, .c-link, .footer-link, .hero-ctas a').forEach(link => {
  link.addEventListener('click', () => {
    trackEvent('link_click', { href: link.getAttribute('href') || '' });
  });
});

/* ==================== RAG PLAYGROUND ==================== */
const pgInput = document.getElementById('pgInput');
const pgSubmit = document.getElementById('pgSubmit');
const pgAnswerBox = document.getElementById('pgAnswerBox');
const pgAnswerText = document.getElementById('pgAnswerText');
const pgStepQuery = document.getElementById('pgStepQuery');
const pgStepRetrieve = document.getElementById('pgStepRetrieve');
const pgStepContext = document.getElementById('pgStepContext');
const pgPipeline = document.getElementById('pgPipeline');

const ragKB = [
  {
    keywords: ['rag', 'retrieval', 'pipeline', 'how'],
    chunks: ['SmartFAQ architecture', 'Demolabs pipeline', 'LangChain integration'],
    answer: 'I build RAG pipelines using LangChain for orchestration, PostgreSQL + Elasticsearch for chunk storage, and FastAPI for the service layer. The core loop is: embed the query → cosine similarity retrieval → assemble top-k chunks into a context window → generate with GPT-4o-mini. I tune chunk size, retrieval depth, and context window size independently based on answer-quality evaluation metrics.'
  },
  {
    keywords: ['tech', 'stack', 'skill', 'strongest', 'best', 'use'],
    chunks: ['Skills index', 'Project evidence', 'Nawatech internship context'],
    answer: 'My strongest technical area is production LLM systems — specifically RAG pipelines with LangChain, FastAPI, Celery, and Elasticsearch. On the data side I am strong in Python (Pandas, Scikit-learn, PyTorch) and statistical analysis with R and SPSS. I am comfortable with Azure, Docker, PostgreSQL, and Redis from my internship at Nawatech where I built these systems end-to-end.'
  },
  {
    keywords: ['smartfaq', 'chatbot', 'faq', 'flagship'],
    chunks: ['SmartFAQ case study', 'FAQ chatbot GitHub', 'Nawatech deployment context'],
    answer: 'SmartFAQ is my flagship project — a retrieval-augmented FAQ chatbot built for support teams drowning in repetitive queries. It uses LangChain for orchestration, FastAPI for the API layer, Celery workers for async processing, PostgreSQL for structured storage, and Elasticsearch for semantic chunk retrieval. I built intent routing before retrieval so irrelevant context windows do not pollute the generation step. The full architecture is documented in the case study page.'
  },
  {
    keywords: ['work', 'experience', 'company', 'companies', 'internship', 'job', 'career'],
    chunks: ['Nawatech experience', 'GAOTek internship', 'Gipsy Research role', 'Home Credit internship'],
    answer: 'I have held 6 roles and internships: Machine Learning Engineer Intern at Nawatech (building production RAG systems), AI Chatbot Development Intern at GAOTek (LangChain pipelines), Data Scientist Intern at Home Credit Indonesia, Statistician at Gipsy Research, Data Analyst at PPM Al-Faqih Mandiri (1.5 years), and Web Developer Intern at PT Jaya Konsultan Indonesia. My current focus is AI engineering with production LLM systems.'
  },
  {
    keywords: ['award', 'honor', 'medal', 'competition', 'achievement'],
    chunks: ['Pesta Data Nasional certificate', 'Bank Indonesia qualification', 'IoT contest participation'],
    answer: 'I won a Bronze Medal at Pesta Data Nasional x UIN (APTIKOM national data competition, Aug 2025), had a qualified scientific paper submission to Bank Indonesia\'s national program (Smart Invoice with OCR, Jun 2025), and participated in the International Invitational Contest of IoT Technology during China-ASEAN Education Cooperation Week (Dec 2023).'
  }
];

function pgGetResponse(query) {
  const q = query.toLowerCase();
  for (const entry of ragKB) {
    if (entry.keywords.some(k => q.includes(k))) return entry;
  }
  return {
    chunks: ['About section', 'Projects index', 'Contact details'],
    answer: 'I am Abi — an AI Engineer in training at Nusa Mandiri University, specializing in RAG pipelines, LangChain, FastAPI, and data science. I have worked across 6 roles, built 6 production-style projects, and won a national data competition. The best way to see my work is the SmartFAQ case study or my GitHub at github.com/CodeByAbi. Feel free to contact me directly at abirawisnu7@gmail.com.'
  };
}

function pgTypeText(el, text, done) {
  el.textContent = '';
  let i = 0;
  const speed = Math.max(12, Math.min(28, Math.floor(2400 / text.length)));
  const tick = () => {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(tick, speed);
    } else {
      done?.();
    }
  };
  tick();
}

function pgSetStepActive(stepEl, active) {
  stepEl?.classList.toggle('pg-step-active', active);
  stepEl?.classList.toggle('pg-step-done', false);
}
function pgSetStepDone(stepEl) {
  stepEl?.classList.remove('pg-step-active');
  stepEl?.classList.add('pg-step-done');
}

function pgRunPipeline(query) {
  if (!pgPipeline) return;
  const steps = pgPipeline.querySelectorAll('.pg-step');
  steps.forEach(s => { s.classList.remove('pg-step-active', 'pg-step-done'); });
  if (pgAnswerBox) pgAnswerBox.hidden = true;

  const entry = pgGetResponse(query);

  if (pgStepQuery) pgStepQuery.textContent = query.length > 32 ? query.slice(0, 32) + '…' : query;
  if (pgStepRetrieve) pgStepRetrieve.textContent = `${entry.chunks.length} chunks`;
  if (pgStepContext) pgStepContext.textContent = `${entry.chunks.join(', ').slice(0, 28)}…`;

  const delay = prefersReducedMotion ? 0 : 420;

  pgSetStepActive(steps[0], true);
  setTimeout(() => {
    pgSetStepDone(steps[0]); pgSetStepActive(steps[1], true);
    setTimeout(() => {
      pgSetStepDone(steps[1]); pgSetStepActive(steps[2], true);
      setTimeout(() => {
        pgSetStepDone(steps[2]); pgSetStepActive(steps[3], true);
        setTimeout(() => {
          pgSetStepDone(steps[3]); pgSetStepActive(steps[4], true);
          setTimeout(() => {
            pgSetStepDone(steps[4]);
            if (pgAnswerBox && pgAnswerText) {
              pgAnswerBox.hidden = false;
              if (prefersReducedMotion) {
                pgAnswerText.textContent = entry.answer;
              } else {
                pgTypeText(pgAnswerText, entry.answer);
              }
            }
          }, delay);
        }, delay);
      }, delay);
    }, delay);
  }, delay);
}

function pgHandleSubmit() {
  const query = pgInput?.value.trim();
  if (!query) return;
  pgRunPipeline(query);
  trackEvent('rag_playground_query', { query });
}

pgSubmit?.addEventListener('click', pgHandleSubmit);
pgInput?.addEventListener('keydown', e => { if (e.key === 'Enter') pgHandleSubmit(); });

document.querySelectorAll('.pg-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    if (pgInput) pgInput.value = chip.dataset.q || '';
    pgHandleSubmit();
  });
});
