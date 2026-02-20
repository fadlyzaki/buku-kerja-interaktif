# 🦉 Buku Kerja Interaktif — Interactive Workbook

A bilingual (Indonesian/English) interactive workbook for teaching conversational English to secondary school students, powered by Firebase and integrated with Duolingo.

## ✨ Features

- **8 Learning Units** — Orientation, Introduction, Routines, School, Food, Hobbies, Places, Review
- **Bilingual Toggle** — Full Indonesia ↔ English language switch
- **Pre-Test & Post-Test** — 30-question assessments with automatic scoring
- **Motivation Survey** — Likert-scale questionnaire measuring student motivation
- **Duolingo Integration** — XP & Streak tracking linked to Duolingo for Schools
- **Teacher Mode** — Manual grading, observation notes, and score dashboards
- **Progress Visualization** — Chart.js-powered XP graphs

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML/JS, TailwindCSS (CDN), Chart.js |
| Backend | Firebase Firestore + Anonymous Auth |
| Hosting | Firebase Hosting |
| Fonts | Google Fonts (Poppins, Nunito) |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for Firebase CLI)
- [Firebase CLI](https://firebase.google.com/docs/cli): `npm install -g firebase-tools`

### Local Development

```bash
# Clone the repository
git clone https://github.com/fadlyzaki/buku-kerja-interaktif.git
cd buku-kerja-interaktif

# Login to Firebase
firebase login

# Serve locally
firebase serve
```

The app will be available at `http://localhost:5000`.

### Deploy

```bash
firebase deploy
```

## 📁 Project Structure

```
buku-kerja-interaktif/
├── firebase.json           # Firebase Hosting config
├── .firebaserc             # Firebase project config
├── docs/
│   └── PRD.md              # Product Requirements Document
└── public/                 # Deployed application (single source of truth)
    ├── index.html           # HTML shell with Firebase init
    ├── app.js               # Application logic (SPA)
    ├── geera-logo.jpg       # Logo asset
    └── 404.html             # Error page
```

## 👨‍🏫 Teacher Mode

Access Teacher Mode by clicking **"Masuk Mode Guru"** in the sidebar and entering the password. Features include:

- Per-section scoring (Vocabulary, Dialogue, Interview)
- Student report entries with XP, streak, grade, and comments
- Pre-Test & Post-Test score comparison dashboard

## 📄 Documentation

- [Product Requirements Document](docs/PRD.md)

## 📝 License

This project is licensed under the [MIT License](LICENSE).
