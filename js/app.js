import { renderHeader } from './layout/Header.js';

// --- 1. State Management ---
export const state = {
    isAuthenticated: false,
    user: null,
    assessment: null,
    plan: null,
    activities: [],
    team: null,
    language: 'en',

    _listeners: new Set(),
    subscribe(callback) { this._listeners.add(callback); },
    unsubscribe(callback) { this._listeners.delete(callback); },
    notify() { this._listeners.forEach(cb => cb()); },

    setUser(userData) {
        this.user = userData;
        this.isAuthenticated = !!userData;
        this.notify();
    },
    setLanguage(lang) {
        this.language = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        this.notify();
    },
    setAssessment(assessmentData) {
        this.assessment = assessmentData;
        this.notify();
    }
};

// --- 2. Local Storage API ---
const DB_KEY = 'immersive-learning-db';
const getDb = () => JSON.parse(localStorage.getItem(DB_KEY)) || { users: [], assessments: [], plans: [], activities: [], teams: [] };
const saveDb = (db) => localStorage.setItem(DB_KEY, JSON.stringify(db));

export const localStorageApi = {
    getUser: (uid) => getDb().users.find(u => u.uid === uid),
    createUser: (name, isAnonymous) => {
        const db = getDb();
        const newUser = { uid: `u${Date.now()}`, name: isAnonymous ? `Guest-${Date.now().toString().slice(-4)}` : name, lang: 'en' };
        db.users.push(newUser);
        saveDb(db);
        return newUser;
    },
    saveAssessment: (assessment) => {
        const db = getDb();
        const existingIndex = db.assessments.findIndex(a => a.uid === assessment.uid);
        if (existingIndex > -1) db.assessments[existingIndex] = assessment;
        else db.assessments.push(assessment);
        saveDb(db);
        return assessment;
    },
};

// --- 3. Router ---
const routes = {
    '/': 'HomePage',
    '/auth': 'AuthPage',
    '/assessment': 'AssessmentPage',
    '/scene': 'ScenePage',
    '/reports': 'ReportsPage',
    '/settings': 'SettingsPage',
};
const appRoot = document.getElementById('app-root');

async function router() {
    // Basic protected route logic
    const path = window.location.hash.slice(1) || '/';
    if (!state.isAuthenticated && path !== '/auth' && path !== '/') {
        window.location.hash = '/auth';
        return;
    }

    const pageName = routes[path] || 'NotFoundPage';
    try {
        const pageModule = await import(`./pages/${pageName}.js`);
        appRoot.innerHTML = ''; // Clear previous content
        appRoot.appendChild(pageModule.default());
    } catch (error) {
        console.error("Error loading page:", error);
        appRoot.innerHTML = '<h1>404 - Page Not Found</h1><p>Please check the URL.</p><a href="#/">Go Home</a>';
    }
}

// --- 4. App Initialization ---
function init() {
    console.log("Application Initializing...");
    renderHeader();
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
    router(); // Initial call
}

init();
