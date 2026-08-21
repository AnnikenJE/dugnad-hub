# DugnadHub

A cross-platform app for organizing and coordinating volunteer activities (*dugnader*). Users can create a dugnad with a photo, browse and search what others have posted, sign up as a participant, and keep track of their own events and favourites. Built with React Native and Expo Router on top of Firebase, targeting iOS and web.

## Features

- **Browse** — feed of all dugnader with title search and pull-to-refresh
- **Create** — form modal for title, description, address, tasks, category, date, time and participant limit
- **Photos** — pick an image from the library or shoot a new one in-app, uploaded to Firebase Storage
- **Participate** — sign up for a dugnad or withdraw again
- **My dugnader** — toggle between events you created and events you joined
- **Favourites** — save dugnader to your profile for later
- Email/password and Google Sign-In, with session state shared through an auth context

## Tech Stack

| Layer | Tools |
|---|---|
| Language | TypeScript |
| UI | React Native, React 19, Expo SDK 54 |
| Navigation | Expo Router (file-based, typed routes) with bottom tabs |
| Authentication | Firebase Auth, Google Sign-In |
| Database | Cloud Firestore |
| Storage | Firebase Storage |
| Native APIs | expo-camera, expo-image-picker |
| Linting | ESLint (eslint-config-expo) |

## Architecture

```
app/                      Screens and routing (Expo Router)
  (dugnadHub)/(tabs)/     Home, My dugnader, Profile
  (dugnadHub)/event-details/[id]
  authentication.tsx      Login and registration
api/                      Firebase access layer (auth, events, images, users)
components/               Event card, event form modal, image selection modal
providers/authctx.tsx     Auth session context
types/                    EventData and UserData interfaces
styles/                   Shared colors and component styles
```

Screens never talk to Firebase directly — every read and write goes through a function in `api/`, which returns plain typed objects.

The user interface is in Norwegian; code, comments and documentation are in English.

**Firestore collections**

- `events` — one document per dugnad, holding `authorId`, `participants[]` and the image download URL
- `users` — one document per user, holding `name` and `favourites[]`

## Getting Started

**Requirements:** Node.js 18+, npm, and a Firebase project with Authentication, Firestore and Storage enabled.

```bash
git clone git@github.com:AnnikenJE/dugnad-hub.git
cd dugnad-hub
npm install
```

`firebaseConfig.js`, `firebaseEnv.js` and `GoogleService-Info.plist` are kept out of version control and must be added locally. Copy `firebaseConfig.example.js` to `firebaseConfig.js` and fill in the values from your Firebase project. It exports:

| Export | Purpose |
|---|---|
| `auth` | Initialized Firebase Auth instance |
| `db` | Firestore instance |
| `getStorageRef(path)` | Storage reference for a given path |
| `getDownloadUrl(path)` | Public download URL for a stored file |

Google Sign-In on iOS also needs `GoogleService-Info.plist` in the project root, matching the `googleServicesFile` entry in `app.json`.

```bash
npm start        # Expo dev server
npm run ios      # run on iOS
npm run web      # run in the browser
npm run lint     # ESLint
```

## Background

Originally built as the exam project for **Cross Platform (7.5 ECTS)** — Kristiania University College, graded **B**.

All code is handwritten.
AI is only used to help write the README and commit messages.
