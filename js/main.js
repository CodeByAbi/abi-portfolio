/* ============================================================
   ABI PORTFOLIO - MAIN JAVASCRIPT
   ============================================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function trackEvent(name, detail = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...detail, ts: Date.now() });
}

/* ==================== NAV + MOBILE DRAWER ==================== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navDrawer = document.getElementById('navDrawer');
const navDrawerClose = document.getElementById('navDrawerClose');

function toggleDrawer(forceOpen, restoreFocus = false) {
  if (!navDrawer || !navToggle) return;
  const open = typeof forceOpen === 'boolean' ? forceOpen : !navDrawer.classList.contains('open');
  navDrawer.classList.toggle('open', open);
  navDrawer.setAttribute('aria-hidden', String(!open));
  navToggle.setAttribute('aria-expanded', String(open));
  // visibility:hidden already drops the closed panel from tab order; `inert`
  // covers engines that keep hidden subtrees focusable. Guarded for older
  // browsers where the property does not exist.
  if ('inert' in navDrawer) navDrawer.inert = !open;
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) {
    navDrawerClose?.focus();
  } else if (restoreFocus) {
    // Only bounce focus back for dismissals (Escape / close button). When a nav
    // link closed the drawer the user is scrolling to that section, and yanking
    // focus to the toggle would scroll them back up to the navbar.
    navToggle.focus();
  }
}

if (navToggle && navDrawer) {
  if ('inert' in navDrawer) navDrawer.inert = true;
  navToggle.addEventListener('click', () => toggleDrawer());
  navDrawerClose?.addEventListener('click', () => toggleDrawer(false, true));
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
/* Every field here restates something stated elsewhere on the page or in the
   case study. Optional fields (tradeoff, result, lessons, proof) are omitted
   rather than padded when there is nothing verified to say, and openModal()
   skips their headings. */
const projectData = {
  p1: {
    title: 'DemoLabs AI Chatbot',
    sub: 'Nawatech internship · Oct 2025 – Feb 2026',
    problem: 'Analytics users needed answers from complex datasets, but manual SQL writing, PDF review, and chart preparation slowed every decision.',
    solution: 'A multi-capability analytics assistant combining QnA retrieval, RAG-based Text-to-SQL generation, PDF/OCR document analysis, and dynamic chart creation in a single conversational interface with intent routing.',
    arch: 'FastAPI backend with Celery, RabbitMQ, Redis, and Docker — 6 containers, 5 RabbitMQ queues, 4 Celery workers. RAG and Text-to-SQL pipeline with pgvector and Azure OpenAI embeddings, schema retrieval, and few-shot SQL generation.',
    tradeoff: 'Of the 3.23s mean end-to-end latency, retrieval takes 0.40s and LLM generation 2.57s, so generation, not retrieval depth, is where latency work pays off.',
    result: '0.885 mean answer correctness on 60 DeepEval test cases, with automated Excel and Markdown regression reports tracking results across difficulty levels.',
    lessons: [
      'Retrieving the relevant schema before generating SQL mattered more than prompt wording.',
      'Giving QnA, PDF and SQL work their own queues means a slow PDF job doesn’t hold up a quick QnA answer.',
      'A fixed 60-case DeepEval suite makes every retrieval or model change comparable against the previous run.'
    ],
    proof: [
      { label: 'Case study', href: 'case-study-smartfaq.html' },
      { label: 'Demo video (YouTube)', href: 'https://youtu.be/T9D7Ta1O9rU' },
      { label: 'GitHub', href: 'https://github.com/CodeByAbi/faq-chatbot' }
    ]
  },
  p2: {
    title: 'nuxio.ai',
    sub: 'Next.js · TypeScript · Supabase · Sep 2026 – present',
    problem: 'Personal financial planning is fragmented across wallets, budgets, and savings goals, with no forward-looking view of upcoming commitments.',
    solution: 'A financial planning platform with a Gemini-based Financial Copilot and a forward-looking forecasting view, using structured AI outputs.',
    arch: 'Next.js + TypeScript frontend on PostgreSQL (Supabase), with multi-wallet management, budgeting, savings goals, and scheduled transaction planning.',
    tradeoff: 'Structured AI outputs, so the Copilot returns plans the scheduling logic can validate instead of free text.'
  },
  p3: {
    title: 'Student Progress Analytics Dashboard',
    sub: 'Looker Studio · Jan 2025 – Apr 2025',
    problem: 'Curriculum supervisors needed visibility into Qur’an and Hadits memorization progress across cohorts, but data lived in scattered spreadsheets.',
    solution: 'An interactive Looker Studio dashboard aggregating per-student completion rates into class- and cohort-level summaries.',
    arch: 'Spreadsheet masterfiles consolidated into a centralized reporting pipeline feeding Looker Studio summary views.'
  },
  p4: {
    title: 'Sentiment Analysis of Telco Tweets',
    sub: 'NLP · TF-IDF · Logistic Regression · Jun 2025 – Sep 2025',
    problem: 'Telecom providers needed a reliable read on customer perception from high-volume social media conversations.',
    solution: 'TF-IDF and logistic regression to classify customer sentiment in ~10,000 telecom tweets, plus the recurring keywords in negative tweets.',
    arch: 'Python text preprocessing and TF-IDF feature extraction with supervised classifiers trained and evaluated on labeled tweet data.',
    result: '0.82 F1-score on three-class sentiment classification, with the top recurring negative keywords identified for service improvement.',
    proof: [
      { label: 'GitHub', href: 'https://github.com/CodeByAbi/Sentiment-Analysis-Telco-Tweets' }
    ]
  },
  p5: {
    title: 'Car Sales Forecasting: Indonesia’s Top 5 Brands',
    sub: 'SARIMA · Prophet · LSTM · Jul 2024 – Sep 2024',
    problem: 'Car sales planning needed reliable forward estimates across brands with distinct trend and seasonality behavior.',
    solution: 'A forecasting pipeline covering preprocessing, per-brand trend and seasonality analysis, and multi-model training across SARIMA, Prophet, and LSTM.',
    arch: 'Per-brand preprocessing and decomposition feeding three model families, compared on SMAPE.',
    result: 'SMAPE below 10% on all 5 car brands.'
  },
  p6: {
    title: 'Traffic Monitoring with YOLOv8 + DeepSORT',
    sub: 'Computer Vision · Jun 2024 – Jul 2024',
    problem: 'Traffic flow analysis and vehicle counting required persistent per-vehicle tracking across video frames, not just per-frame detection.',
    solution: 'YOLOv8 for vehicle detection combined with DeepSORT for multi-object tracking.',
    arch: 'YOLOv8 detection stage feeding DeepSORT association for persistent IDs, with counting and flow-analysis outputs.'
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

  const section = (label, text) => text
    ? `<div class="modal-sh">${label}</div><p class="modal-p">${text}</p>`
    : '';
  const lessonsHtml = project.lessons?.length
    ? `<div class="modal-sh">What I Learned</div>
       <ul class="modal-lessons">${project.lessons.map(l => `<li>${l}</li>`).join('')}</ul>`
    : '';
  const proofHtml = project.proof?.length
    ? `<div class="flow-wrap">
         <div class="flow-label">Links</div>
         <div class="proj-proof">${renderProofLinks(project.proof)}</div>
       </div>`
    : '';

  modalContent.innerHTML = `
    <h2 class="modal-title" id="modalTitle">${project.title}</h2>
    <div class="modal-sub">${project.sub}</div>
    ${section('Problem', project.problem)}
    ${section('Solution', project.solution)}
    ${section('Architecture', project.arch)}
    ${section('Trade-off', project.tradeoff)}
    ${section('Result', project.result)}
    ${lessonsHtml}
    ${proofHtml}
  `;

  const card = lastFocusedEl?.closest?.('.proj-card');
  if (card && modalDialog) {
    const r = card.getBoundingClientRect();
    modalDialog.style.setProperty('--modal-dx', `${Math.round(r.left + r.width / 2 - window.innerWidth / 2)}px`);
    modalDialog.style.setProperty('--modal-dy', `${Math.round(r.top + r.height / 2 - window.innerHeight / 2)}px`);
    // Commit the card-relative start before .open, or the transition starts
    // from the previous offset instead of this card.
    void modalDialog.offsetWidth;
  }

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
const formSummary = document.getElementById('formSummary');
const formSummaryList = document.getElementById('formSummaryList');
const nameInput = document.getElementById('contactName');
const emailInput = document.getElementById('contactEmail');
const messageInput = document.getElementById('contactMessage');

const fieldMap = {
  name: { input: nameInput, err: document.getElementById('nameError') },
  email: { input: emailInput, err: document.getElementById('emailError') },
  message: { input: messageInput, err: document.getElementById('messageError') }
};

function hideFormSummary() {
  if (!formSummary || !formSummaryList) return;
  formSummary.hidden = true;
  formSummaryList.innerHTML = '';
}

/* Complements the inline errors: a keyboard-reachable list at the top of the form
   whose items jump to the offending field. Inline .f-err text is reused as the
   item label so the two can never drift apart. Built with DOM APIs rather than
   innerHTML — if a message ever echoes user input, string interpolation here
   would turn it into an injection point. */
function showFormSummary(errors) {
  if (!formSummary || !formSummaryList) return;
  formSummaryList.textContent = '';
  errors.forEach(key => {
    const field = fieldMap[key];
    const id = field?.input?.id;
    if (!id) return;
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = field.err?.textContent || '';
    item.appendChild(link);
    formSummaryList.appendChild(item);
  });
  formSummary.hidden = false;
}

formSummaryList?.addEventListener('click', e => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const target = document.querySelector(link.getAttribute('href'));
  if (target) { e.preventDefault(); target.focus(); }
});

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
  hideFormSummary();
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
    setFieldError('name', 'Enter your name.');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('email');
    setFieldError('email', 'Enter an email address in the format name@company.com.');
  }

  if (message.length < 20) {
    errors.push('message');
    setFieldError('message', 'Add a little more detail: the message needs at least 20 characters.');
  }

  if (errors.length) {
    showFormSummary(errors);
    // Focus the summary, not the first input: a screen reader then reads the
    // problem and the full list of failures before the user starts fixing them.
    // The status line stays empty here: the summary already says it once.
    formSummary?.focus();
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
          formStatus.textContent = `Message sent. I’ll reply to ${values.email}.`;
        }
        contactForm.reset();
        trackEvent('contact_submit', { method: 'formspree' });
      } else {
        throw new Error('non-ok');
      }
    } catch {
      const subject = encodeURIComponent(`Portfolio inquiry from ${values.name}`);
      const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`);
      window.location.href = `mailto:abirawisnu@gmail.com?subject=${subject}&body=${body}`;
      if (formStatus) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'The form couldn’t send your message, so your mail app should open with it as a draft. If no draft appears, email me at abirawisnu@gmail.com.';
      }
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
    if (navDrawer?.classList.contains('open')) toggleDrawer(false, true);
  }
  trapModalFocus(e);
  trapDrawerFocus(e);
});

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
const pgArrows = pgPipeline ? Array.from(pgPipeline.querySelectorAll('.pg-arrow')) : [];

/* Answers only restate facts from this page. The keyword match is deliberately
   simple: this is a labelled walkthrough of the pipeline stages, not a model. */
const ragKB = [
  {
    keywords: ['rag', 'retrieval', 'pipeline'],
    chunks: ['DemoLabs architecture', 'BRIN QA system', 'Stack card'],
    answer: 'In the DemoLabs chatbot at Nawatech, questions are embedded with Azure OpenAI embeddings, matched against chunks stored in PostgreSQL with pgvector, and the retrieved context goes to an Azure OpenAI model. For SQL questions the pipeline retrieves the relevant schema first and generates SQL from few-shot examples. Measured on 60 benchmark queries: 3.23s mean end-to-end, of which 0.40s is retrieval. At BRIN, an LLM router chooses between SQL, vector, semantic and knowledge-graph search.'
  },
  {
    keywords: ['tech', 'stack', 'skill', 'strongest', 'best', 'use'],
    chunks: ['Skills index', 'Project evidence', 'Nawatech + BRIN context'],
    answer: 'My strongest technical area is production LLM systems — RAG, Knowledge Graphs, and Text-to-SQL with Azure OpenAI, pgvector, FastAPI, Celery, and RabbitMQ. On the data side I work with Python (Pandas, Scikit-learn, XGBoost, PyTorch, TensorFlow), time series forecasting (SARIMA, Prophet, LSTM), and BI dashboards with Tableau and Looker Studio. I built these systems end-to-end during my internships at Nawatech and BRIN.'
  },
  {
    keywords: ['smartfaq', 'chatbot', 'faq', 'flagship'],
    chunks: ['SmartFAQ case study', 'FAQ chatbot GitHub', 'Nawatech deployment context'],
    answer: 'SmartFAQ is my flagship project — a retrieval-augmented FAQ chatbot built for support teams drowning in repetitive queries. It uses LangChain for orchestration, FastAPI for the API layer, Celery workers for async processing, PostgreSQL for structured storage, and Elasticsearch for semantic chunk retrieval. I built intent routing before retrieval so irrelevant context windows do not pollute the generation step. The full architecture is documented in the case study page.'
  },
  {
    keywords: ['work', 'experience', 'company', 'companies', 'internship', 'job', 'career'],
    chunks: ['BRIN AI Engineer', 'Kupu ID annotator', 'Nawatech ML Engineer', 'GAOTek chatbot', 'Home Credit data', 'PPM data analyst'],
    answer: 'I have held 6 roles: AI Engineer Intern at BRIN (bibliometrics QA + Text-to-SQL), Data Annotator at Kupu ID (ground-truth labels for BYD France autonomous driving), Machine Learning Engineer Intern at Nawatech (Demolabs AI Chatbot), AI Chatbot Development Intern at GAOTek, Data Scientist Intern at Home Credit Indonesia, and Data Analyst at PPM Al Faqih Mandiri. My current focus is production LLM systems.'
  },
  {
    keywords: ['award', 'honor', 'medal', 'competition', 'achievement'],
    chunks: ['PeDaS x APTIKOM bronze', 'Satria Data Top 160', 'Bank Indonesia paper', 'IoT contest'],
    answer: 'I won a Bronze Medal at PeDaS x APTIKOM (Pesta Data Nasional 2025) and ranked Top 160 out of 448 teams with 97.12% accuracy at the Satria Data competition, plus an Agentic AI Hackathon, a Top 5 Abstract Competition, 3rd Place at the International IoT Contest, and a qualified scientific paper for Bank Indonesia.'
  }
];

function pgGetResponse(query) {
  const q = query.toLowerCase();
  for (const entry of ragKB) {
    if (entry.keywords.some(k => q.includes(k))) return entry;
  }
  return {
    chunks: ['About section', 'Projects index', 'Contact details'],
    answer: 'I am Abi — a final-year Data Science student (GPA 3.73) specializing in RAG, Text-to-SQL, and production LLM systems with FastAPI, Celery, and Docker. I have worked across 6 roles, built 6 projects including the DemoLabs AI Chatbot and nuxio.ai, and won a Bronze Medal at PeDaS x APTIKOM 2025. See my GitHub at github.com/CodeByAbi or contact me directly at abirawisnu@gmail.com.'
  };
}

function pgTypeText(el, text, runId, done) {
  el.textContent = '';
  let i = 0;
  const speed = Math.max(12, Math.min(28, Math.floor(2400 / text.length)));
  const tick = () => {
    // A newer query supersedes this run: stop typing so two answers cannot
    // interleave in the same element.
    if (runId !== pgRunId) return;
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

/* Monotonic run token. Each Ask starts a new run; stale timeouts and typing
   loops check their id and bail out, so rapid re-submits cannot interleave
   steps or answers from two queries. */
let pgRunId = 0;

function pgSetSubmitBusy(busy) {
  if (!pgSubmit) return;
  pgSubmit.disabled = busy;
  pgSubmit.setAttribute('aria-busy', String(busy));
  pgSubmit.textContent = busy ? 'Working…' : 'Ask →';
}

function pgRunPipeline(query) {
  if (!pgPipeline) return;
  const runId = ++pgRunId;
  const steps = pgPipeline.querySelectorAll('.pg-step');
  steps.forEach(s => { s.classList.remove('pg-step-active', 'pg-step-done'); });
  if (pgAnswerBox) pgAnswerBox.hidden = true;

  const entry = pgGetResponse(query);

  if (pgStepQuery) pgStepQuery.textContent = query.length > 32 ? query.slice(0, 32) + '…' : query;
  if (pgStepRetrieve) pgStepRetrieve.textContent = `${entry.chunks.length} chunks`;
  if (pgStepContext) pgStepContext.textContent = `${entry.chunks.join(', ').slice(0, 28)}…`;

  pgSetSubmitBusy(true);
  const finish = () => { if (runId === pgRunId) pgSetSubmitBusy(false); };

  const delay = prefersReducedMotion ? 0 : 420;

  pgSetStepActive(steps[0], true);
  setTimeout(() => {
    if (runId !== pgRunId) return;
    pgSetStepDone(steps[0]); pgSetStepActive(steps[1], true);
    setTimeout(() => {
      if (runId !== pgRunId) return;
      pgSetStepDone(steps[1]); pgSetStepActive(steps[2], true);
      setTimeout(() => {
        if (runId !== pgRunId) return;
        pgSetStepDone(steps[2]); pgSetStepActive(steps[3], true);
        setTimeout(() => {
          if (runId !== pgRunId) return;
          pgSetStepDone(steps[3]); pgSetStepActive(steps[4], true);
          setTimeout(() => {
            if (runId !== pgRunId) return;
            pgSetStepDone(steps[4]);
            if (pgAnswerBox && pgAnswerText) {
              pgAnswerBox.hidden = false;
              if (prefersReducedMotion) {
                pgAnswerText.textContent = entry.answer;
                finish();
              } else {
                pgTypeText(pgAnswerText, entry.answer, runId, finish);
              }
            } else {
              finish();
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
