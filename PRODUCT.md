# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: hiring managers, recruiters, and engineers at AI/ML teams evaluating Abira "Abi" Wisnunggal for an AI Engineering internship or junior role. They skim first and probe second: they want to judge, quickly, whether Abi has shipped real LLM/RAG systems and can show measured results. Success is an interview or a direct message.

Freelance collaboration is mentioned in the hero ("Open to AI Engineering Internship · Freelance Collaboration") but is secondary; client leads are not the audience the page is optimized for.

## Product Purpose

A personal portfolio site for a final-year Data Science undergraduate (Nusa Mandiri University, GPA 3.73/4.00) who builds production-oriented AI systems. It exists to convert an evaluator's attention into an interview by making Abi's internship work, projects, credentials, and awards verifiable and easy to scan. Success means a reviewer leaves believing Abi can ship and evaluate AI systems, and contacts them.

## Positioning

Measured production RAG, not demos. Projects carry benchmarked numbers from real internships rather than tutorial-grade claims, e.g. DemoLabs AI Chatbot at Nawatech (0.885 mean answer correctness on 60 DeepEval cases, 3.23s mean end-to-end latency, 6 containers / 5 RabbitMQ queues / 4 Celery workers) and the AI Bibliometrics QA system at BRIN (82.6% search relevance on 94 test queries, 726 unit/integration tests passing). The flagship case study is DemoLabs (`case-study-smartfaq.html`; the filename is historical).

## Operating Context

- Static site served by GitHub Pages; plain `index.html`, `css/style.css`, `js/main.js`, plus `case-study-smartfaq.html`. No build step, no framework. Repo operating rules live in AGENTS.md.
- Sections in order: Hero, About (with tech stack), Experience (six roles, expandable), Projects (six, one flagship, detail modal), Certificates, Honors & Awards, Demo (a scripted RAG pipeline walkthrough, labelled as a simulation before it runs), Contact (Formspree form).
- Reviewers arrive from CVs, LinkedIn, and applications, often on mobile, and spend seconds before deciding to read on.

## Capabilities and Constraints

- Canonical name: Abira Wisnunggal; goes by "Abi". Public site: https://codebyabi.github.io/
- Domain terminology to keep consistent: RAG, Hybrid RAG, Text-to-SQL, Knowledge Graphs, pgvector, DeepEval, FastAPI, Celery, RabbitMQ, Azure OpenAI.
- The CV is `assets/pdf/abi-wisnunggal-cv.pdf`, linked from the nav and drawer as "Download CV (PDF)".
- `og:image` is the 779×595 portrait; a proper 1200×630 social card does not exist yet.
- The hero is finished and verified; it is protected by AGENTS.md and is not in scope unless the user names it.
- The Live Demo is a pre-scripted simulation, not a live model, and must stay labelled as such.
- Undecided: whether freelance work gets its own treatment, and where missing visual assets will come from.

## Brand Commitments

- Name "Abira Wisnunggal" with the nickname "Abi"; "AW" monogram (`assets/img/aw-logo.svg`).
- Hero positioning line: "I build AI systems that drive real outcomes."
- Hero portrait is the photo with the BRIN wordmark (`assets/img/abi-brin.jpeg`, 779×595 landscape), shown uncropped.

## Evidence on Hand

- Real employers/organizations with logos in `assets/img/`: BRIN, Nawatech (Nawa Darsana Technology), GAOTek, Home Credit Indonesia, Kupu ID, PPM Al Faqih Mandiri; certifying bodies BNSP, Skilvul, RevoU, Dicoding.
- Real metrics in the page copy (see Positioning), plus Satria Data Top 160 of 448 teams (97.12% accuracy), Bronze Medal at Pesta Data Nasional x APTIKOM 2025, Bank Indonesia qualified scientific paper, Agentic AI Hackathon Top 5 abstract, 3rd place at the China-ASEAN IoT contest (2023).
- Project images exist for most projects in `assets/img/`; some project and certificate cards still show "Add project image" / "Add cert image" placeholders.
- Absent, and future work must not fabricate: missing project and certificate images. Also absent: testimonials and client endorsements; none exist and none should be invented.

## Product Principles

1. Numbers over adjectives. Every claim of capability is backed by a measured result, a named employer, or a verifiable credential.
2. Respect the skim. A reviewer should reach the proof (flagship project, internship metrics) within seconds and never have to dig for it.
3. Never fake the evidence. Placeholders stay visibly honest until a real asset exists; no invented screenshots, logos, testimonials, or resume links.
4. Simulations are labelled. Anything that is scripted rather than live says so.
5. Ship small and verifiable. Changes are checked against real rendered geometry, not assumed.
