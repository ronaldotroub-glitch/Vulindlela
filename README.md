# Vulindlela

**"Open the Path"** — an AI-powered productivity workspace built for South African SMEs and independent contractors.

Vulindlela clears the administrative bottlenecks that stall small businesses — drafting emails, processing meeting/voice notes, and planning a working day — so professionals can focus on real work whenever the power and connectivity hold.

Built as a prototype with [Lovable](https://lovable.dev) · React · TypeScript · Tailwind CSS · shadcn/ui

---

## The Problem

South African SMEs and contractors lose their most valuable hours to admin catch-up instead of core business, driven by two compounding, everyday realities:

- **The Uptime Crunch** — Load-shedding, cable theft, and spotty connectivity mean high-bandwidth online hours get spent catching up on admin instead of executing core work.
- **The Corporate Language Tax** — The formal economy runs in English, but many entrepreneurs speak it as a second or third language. Drafting proposals and emails costs disproportionate time and anxiety.

Together, these two problems mean SME growth stalls on admin backlog rather than the work that actually moves the business forward.

## The Solution

Three AI-powered features, built around South Africa's uptime and language realities:

### ✉️ Smart Email Contextualizer
Turns rough, conversational English into the right corporate tone — **Corporate Pitch**, **Client Care**, or **Debt Collection** — and suggests rapid replies from incoming threads.

### 🎙️ "Imbizo" Notes Summarizer
Turns long WhatsApp voice notes and meeting transcripts into a three-sentence TL;DR, action items, and hard deadlines — a tiny, text-only summary that loads instantly even on 3G.

### 🔌 Grid-Aware Task Planner
Tags tasks by resource need — Wi-Fi, desktop power, or offline-capable — and reshuffles the day automatically the moment the user goes offline.

## Who It's For

- **SME owners & entrepreneurs** who need to pitch, invoice, and negotiate in polished corporate English without a dedicated admin team
- **Independent contractors** who lose billable hours to admin catch-up during narrow windows of power and connectivity
- **Distributed & remote teams** who need meeting outcomes captured reliably across scattered uptime windows and shaky connections

## Tech Stack

| Layer | Technology |
|---|---|
| Build platform | [Lovable AI](https://lovable.dev) |
| Framework | React + TypeScript + Vite |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Version control | GitHub |
| Ideation & prompt drafting | ChatGPT / Claude |

## Getting Started

Clone the repo and run it locally:

```bash
git clone https://github.com/<your-username>/vulindlela.git
cd vulindlela
npm install
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

### Build for production

```bash
npm run build
```

## Project Structure

```
vulindlela/
├── src/
│   ├── components/     # UI components (shadcn/ui-based)
│   ├── pages/          # Page sections / routes
│   ├── assets/         # Images and static assets
│   └── App.tsx
├── public/
├── index.html
├── tailwind.config.ts
└── package.json
```

> Structure may vary slightly depending on what Lovable generated for your export — adjust this section to match your actual repo layout.

## Roadmap

- [x] Working prototype — 3 core features on one demo page
- [ ] **Multilingual drafting** — extend the email tool to draft directly in isiZulu, isiXhosa, Afrikaans, and other official languages
- [ ] Real backend & WhatsApp integration — connect Imbizo directly to WhatsApp voice notes and a live LLM
- [ ] SME pilot & impact tracking — roll out to a small cohort and measure billable hours reclaimed

## Built With Lovable

This project's front end was generated and iterated on using [Lovable AI](https://lovable.dev) from a detailed design and feature brief, then version-controlled through GitHub.

## Author

**Oageng Kunene**

## License

This project was built as an academic/portfolio submission. Add a license of your choice (e.g. [MIT](https://choosealicense.com/licenses/mit/)) if you plan to open-source it.
