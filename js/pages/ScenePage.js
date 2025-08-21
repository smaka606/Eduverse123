import { initScene } from '../scene.js';

export default function ScenePage() {
    const page = document.createElement('div');
    page.className = 'scene-container';

    // Set styles for the container to fill the available space
    page.style.width = '100%';
    // The header is 3.5rem. The main container has 1rem padding top/bottom.
    // We calculate the height to fill the viewport.
    page.style.height = 'calc(100vh - 3.5rem - 2rem)';
    page.style.position = 'relative';
    page.style.overflow = 'hidden';

    // The initScene function needs the container to be in the DOM to measure its size.
    // We use a setTimeout with a delay of 0 to ensure this runs after the current
    // render cycle, once the 'page' element has been appended to the app root.
    setTimeout(() => {
        initScene(page);
    }, 0);

    return page;
}
