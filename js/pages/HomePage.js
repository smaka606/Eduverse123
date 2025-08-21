import { state } from '../app.js';

export default function HomePage() {
    const page = document.createElement('div');
    page.className = 'home-page';

    const userName = state.user ? state.user.name : 'Guest';

    page.innerHTML = `
        <div class="card">
            <h1>Welcome, ${userName}!</h1>
            <p>This is your personalized learning dashboard. Ready to dive in?</p>
            <br/>
            <a href="#/scene" class="button button-primary">Enter 3D Classroom</a>
        </div>
    `;

    return page;
}
