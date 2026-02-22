# Gestion des examens universitaires (React + Node.js)

Application full-stack moderne pour gérer les cours universitaires et le calendrier des examens.

## Stack technique
- **Frontend** : React + Vite + Tailwind CSS
- **Backend** : Node.js + Express
- **Base de données** : MongoDB (Mongoose)

## Structure des dossiers

```text
.
├── backend
│   ├── package.json
│   └── src
│       ├── app.js
│       ├── server.js
│       ├── config
│       │   └── db.js
│       ├── controllers
│       │   ├── courseController.js
│       │   └── examController.js
│       ├── models
│       │   ├── Course.js
│       │   └── Exam.js
│       └── routes
│           ├── courseRoutes.js
│           └── examRoutes.js
└── frontend
    ├── package.json
    ├── index.html
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── vite.config.js
    └── src
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── services
        │   └── api.js
        ├── types
        │   └── index.js
        └── components
            ├── CourseForm.jsx
            ├── CourseList.jsx
            ├── ExamForm.jsx
            ├── ExamList.jsx
            └── UpcomingExamsDashboard.jsx
```

## Schéma MongoDB (relations Cours → Examens)

### Collection `courses`
- `name` (String, requis)
- `professor` (String, requis)
- `ects` (Number, requis)
- `documents` (Array, optionnel): liste de documents liés au cours
  - `title` (String, requis)
  - `url` (String, requis) : URL web ou fichier importé localement (encodé en Data URL)
  - `type` (`pdf`, `word`, `image`, `other`)

### Import de fichiers depuis l'ordinateur

Dans le formulaire de cours, chaque document peut désormais être :
- ajouté via une URL classique,
- ou importé directement depuis votre ordinateur grâce au champ **"ou importer depuis mon ordinateur"**.

Le fichier est encodé côté frontend puis enregistré dans MongoDB dans `documents.url`.

### Collection `exams`
- `course` (ObjectId, ref: `Course`, requis)
- `session` (`session_1` ou `rattrapage`)
- `date` (Date, requis)
- `room` (String, requis)

Un cours peut avoir plusieurs examens (session 1 et rattrapage), relation **1-N** via `Exam.course`.

## Démarrage rapide

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Ajoutez un fichier `backend/.env` :
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/exams_app
```
