import { state } from '../app.js';

const headerEl = document.getElementById('main-header');
const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/scene', label: '3D Space' },
    { path: '/reports', label: 'Reports' },
    { path: '/settings', label: 'Settings' },
];

const render = () => {
    if (!headerEl) return;

    const navHtml = navLinks.map(link => `
        <a href="#${link.path}">${link.label}</a>
    `).join('');

    const template = `
        <a href="#/" style="font-weight: bold; text-decoration: none; color: inherit;">EduVerse</a>
        <nav>
            ${navHtml}
        </nav>
        <div>
            <button id="lang-en-btn">EN</button> | <button id="lang-ar-btn">AR</button>
        </div>
    `;
    headerEl.innerHTML = template;

    // Add event listeners for language switching
    document.getElementById('lang-en-btn').addEventListener('click', () => state.setLanguage('en'));
    document.getElementById('lang-ar-btn').addEventListener('click', () => state.setLanguage('ar'));
};

export const renderHeader = () => {
    render();
    // We don't need to re-render the whole header on every state change yet,
    // but this is where we would subscribe if parts of it were dynamic.
    // For now, the language buttons handle their own state changes.
};
