import { state, localStorageApi } from '../app.js';

export default function AuthPage() {
    const page = document.createElement('div');
    page.className = 'auth-page';

    page.innerHTML = `
        <div class="card" style="max-width: 400px; margin: 2rem auto;">
            <h2>Login</h2>
            <p>Enter a username to begin or continue as a guest.</p>
            <form id="login-form" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
                <input type="text" id="username" placeholder="Enter your name" style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
                <button type="submit" class="button button-primary">Login</button>
                <button type="button" id="guest-login-btn" class="button">Continue as Guest</button>
            </form>
        </div>
    `;

    const form = page.querySelector('#login-form');
    const guestBtn = page.querySelector('#guest-login-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        if (username) {
            // In a real app, you'd find or create a user. Here we just create a new one.
            const user = localStorageApi.createUser(username, false);
            state.setUser(user);
            window.location.hash = '/'; // Redirect to home
        }
    });

    guestBtn.addEventListener('click', () => {
        const user = localStorageApi.createUser('Guest', true);
        state.setUser(user);
        window.location.hash = '/'; // Redirect to home
    });


    return page;
}
