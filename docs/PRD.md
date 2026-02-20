# Product Requirements Document (PRD)
## Buku Kerja Interaktif — Interactive Workbook

**Version:** 1.0  
**Last Updated:** 2026-02-21  
**Author:** Fadly Zaki

---

## 1. Overview

Buku Kerja Interaktif (Interactive Workbook) is a web-based, bilingual (Indonesian/English) learning platform designed for secondary school students. It combines structured English conversation lessons with gamified progress tracking via Duolingo integration.

### 1.1 Problem Statement

Traditional English workbooks lack interactivity, real-time progress tracking, and personalized feedback. Students struggle with motivation, and teachers have no centralized way to monitor individual performance across activities.

### 1.2 Solution

A single-page web application that delivers 8 learning units with interactive exercises, saves student data to Firebase in real-time, and provides teachers with a dashboard for manual grading and observation.

---

## 2. Target Users

| User | Description |
|------|-------------|
| **Students** | Secondary school students (Kelas 7–11) learning conversational English |
| **Teachers** | English tutors ("Rumbel Geera" / "Bilingual" class instructors) managing student progress |

---

## 3. Core Features

### 3.1 Student Experience

| Feature | Description |
|---------|-------------|
| **Student Registration** | Dropdown-based name & class selection (no password required) |
| **Bilingual Toggle** | Full Indonesia ↔ English language switch across all content |
| **Pre-Test & Post-Test** | 30-question multiple-choice assessments saved to Firestore |
| **Motivation Questionnaire** | 12-question Likert-scale survey measuring intrinsic/extrinsic motivation |
| **8 Learning Units** | Each unit includes: Sing Along (YouTube), Vocabulary, Dialogue, Speaking Practice, Duolingo Play, Self Reflection |
| **Progress Tracker** | XP & Streak tracking per session with Chart.js visualization |
| **Duolingo Integration** | XP/Streak input fields linked to Duolingo for Schools (code: `wuyzyz`) |

### 3.2 Teacher Experience

| Feature | Description |
|---------|-------------|
| **Teacher Mode** | Password-protected mode (`teacher123`) with additional controls |
| **Manual Grading** | Per-section score inputs (vocabulary, dialogue, interview) |
| **Report Dashboard** | Add entries for student progress with XP, streak, grade, and comments |
| **Pre/Post-Test Dashboard** | Visual comparison of pre-test and post-test scores per student |

### 3.3 Unit Structure (×8 Units)

Each unit follows a consistent 6-step pedagogical flow:

1. 🎵 **Sing Along** — YouTube-embedded song with listening tasks
2. 📚 **New Vocabulary** — 4 words with emoji icons + sentence-writing exercises
3. 💬 **Dialogue Example** — Scripted conversation for reading comprehension
4. 🤝 **Speaking Practice** — Peer interview questions with text input
5. 📱 **Duolingo Play** — App-based challenges with XP/Streak tracking
6. ⭐ **Self Reflection** — 5-star confidence rating

### 3.4 Unit Topics

| Unit | Topic (ID) | Topic (EN) |
|------|-----------|-----------|
| 1 | Orientasi & Pengaturan Duolingo | Orientation & Duolingo Setup |
| 2 | Perkenalan Diri | Introducing Myself |
| 3 | Rutinitas Harian | Daily Routines |
| 4 | Kehidupan Sekolah | School Life |
| 5 | Makanan & Minuman | Food & Drinks |
| 6 | Hobi & Waktu Luang | Hobbies & Free Time |
| 7 | Tempat di Kota | Places in Town |
| 8 | Ulasan & Perpisahan | Review & Farewell |

---

## 4. Technical Architecture

### 4.1 Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Vanilla HTML/JS (single-file SPA), TailwindCSS (CDN), Chart.js |
| **Backend** | Firebase (Firestore, Anonymous Auth) |
| **Hosting** | Firebase Hosting |
| **Fonts** | Google Fonts (Poppins, Nunito) |

### 4.2 Data Model (Firestore)

```
students/{studentId}/
  ├── tests/preTest      — Pre-test answers
  ├── tests/postTest     — Post-test answers
  ├── tests/motivation   — Motivation questionnaire
  ├── tests/intensity    — Intensity questionnaire
  └── tracker/           — XP/Streak session snapshots

teacherReports/          — Manual grading entries
teacherScores/           — Per-section scores
teacherObservations/     — Observation notes
```

### 4.3 Authentication

- **Students:** Anonymous Auth (auto-generated UID)
- **Teachers:** Simple password prompt (`teacher123`)

---

## 5. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| **Responsiveness** | Mobile-first, works on student smartphones |
| **Offline** | Not required (Firebase-dependent) |
| **Performance** | < 3s initial load on 3G |
| **Accessibility** | Bilingual support (ID/EN toggle) |
| **Browser Support** | Modern browsers (Chrome, Safari, Firefox) |

---

## 6. Future Considerations

- [ ] Individual student login with proper authentication
- [ ] Offline mode with service worker caching
- [ ] Audio pronunciation for vocabulary words
- [ ] Automated pre/post-test scoring and comparison
- [ ] Export student reports as PDF
- [ ] Push notification reminders for Duolingo streaks
