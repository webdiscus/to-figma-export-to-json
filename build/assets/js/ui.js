// Import styles (this will be bundled by Webpack)
import '../styles/main.scss';

document.addEventListener('DOMContentLoaded', (event) => {
    const exportButton = document.getElementById('export');
    exportButton.onclick = () => {
        parent.postMessage({ pluginMessage: { type: 'export-to-json' } }, '*');
    };

    onmessage = (event) => {
        if (event.data.pluginMessage.type === 'exported-json') {
            const blob = new Blob([event.data.pluginMessage.data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'design.json'; // Default file name
            document.body.appendChild(a); // Append to body
            a.click();
            a.remove(); // Remove after click
        }
    };
});
