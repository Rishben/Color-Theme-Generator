// Create bubbles for the hero section
function createBubbles() {
    const bubbles = document.getElementById('bubbles');
    bubbles.innerHTML = '';

    const numBubbles = 20;

    for (let i = 0; i < numBubbles; i++) {
        const size = Math.random() * 80 + 20;
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.bottom = `${Math.random() * 100}%`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        bubble.style.animationDuration = `${Math.random() * 10 + 5}s`;

        bubbles.appendChild(bubble);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    const loadingOverlay = document.querySelector('.loading-overlay');
    const primaryColorInput = document.getElementById('primaryColor');
    const secondaryColorInput = document.getElementById('secondaryColor');
    const accentColorInput = document.getElementById('accentColor');
    const textColorInput = document.getElementById('textColor');
    const backgroundColorInput = document.getElementById('backgroundColor');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const transitionSpeedInput = document.getElementById('transitionSpeed');
    const speedValue = document.getElementById('speedValue');
    const themeButtons = document.querySelectorAll('.theme-button');
    const saveThemeBtn = document.getElementById('saveThemeBtn');
    const savedThemesContainer = document.getElementById('savedThemes');
    const cssOutput = document.getElementById('cssOutput');
    const copyCSS = document.getElementById('copyCSS');
    const colorCodes = {
        primary: document.getElementById('primaryColorCode'),
        secondary: document.getElementById('secondaryColorCode'),
        accent: document.getElementById('accentColorCode'),
        text: document.getElementById('textColorCode'),
        background: document.getElementById('backgroundColorCode')
    };

    // Create bubbles
    createBubbles();

    // Update color code displays
    function updateColorCodes() {
        colorCodes.primary.textContent = primaryColorInput.value;
        colorCodes.secondary.textContent = secondaryColorInput.value;
        colorCodes.accent.textContent = accentColorInput.value;
        colorCodes.text.textContent = textColorInput.value;
        colorCodes.background.textContent = backgroundColorInput.value;
    }

    // Apply the selected colors to the CSS variables
    function applyColors() {
        document.documentElement.style.setProperty('--primary-color', primaryColorInput.value);
        document.documentElement.style.setProperty('--secondary-color', secondaryColorInput.value);
        document.documentElement.style.setProperty('--accent-color', accentColorInput.value);
        document.documentElement.style.setProperty('--text-color', textColorInput.value);
        document.documentElement.style.setProperty('--background-color', backgroundColorInput.value);

        updateColorCodes();
        updateCSSOutput();
    }

    // Toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode', darkModeToggle.checked);
    }

    // Apply transition speed
    function applyTransitionSpeed() {
        const speed = transitionSpeedInput.value;
        document.documentElement.style.setProperty('--transition-speed', speed + 's');
        speedValue.textContent = speed + 's';
    }

    // Apply a predefined theme
    function applyTheme(theme) {
        switch (theme) {
            case 'light':
                primaryColorInput.value = '#4a6fff';
                secondaryColorInput.value = '#ff9d00';
                accentColorInput.value = '#ff4da6';
                textColorInput.value = '#333333';
                backgroundColorInput.value = '#f5f5f5';
                darkModeToggle.checked = false;
                break;
            case 'dark':
                primaryColorInput.value = '#6c5ce7';
                secondaryColorInput.value = '#fd79a8';
                accentColorInput.value = '#00b894';
                textColorInput.value = '#f0f0f0';
                backgroundColorInput.value = '#121212';
                darkModeToggle.checked = true;
                break;
            case 'neon':
                primaryColorInput.value = '#ff00ff';
                secondaryColorInput.value = '#00ffff';
                accentColorInput.value = '#ff0099';
                textColorInput.value = '#ffffff';
                backgroundColorInput.value = '#0a0a1a';
                darkModeToggle.checked = true;
                break;
            case 'pastel':
                primaryColorInput.value = '#a0d8ef';
                secondaryColorInput.value = '#ffb6c1';
                accentColorInput.value = '#c8a2c8';
                textColorInput.value = '#5d5d5d';
                backgroundColorInput.value = '#f0f8ff';
                darkModeToggle.checked = false;
                break;
            case 'forest':
                primaryColorInput.value = '#2e8b57';
                secondaryColorInput.value = '#8b4513';
                accentColorInput.value = '#daa520';
                textColorInput.value = '#333333';
                backgroundColorInput.value = '#f5f5dc';
                darkModeToggle.checked = false;
                break;
            case 'random':
                primaryColorInput.value = getRandomColor();
                secondaryColorInput.value = getRandomColor();
                accentColorInput.value = getRandomColor();
                textColorInput.value = Math.random() > 0.5 ? '#ffffff' : '#333333';
                backgroundColorInput.value = Math.random() > 0.5 ? '#121212' : '#f5f5f5';
                darkModeToggle.checked = Math.random() > 0.5;
                break;
        }

        applyColors();
        toggleDarkMode();
    }

    // Generate a random color
    function getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    // Update the CSS output
    function updateCSSOutput() {
        cssOutput.textContent = `:root {
--primary-color: ${primaryColorInput.value};
--secondary-color: ${secondaryColorInput.value};
--text-color: ${textColorInput.value};
--background-color: ${backgroundColorInput.value};
--accent-color: ${accentColorInput.value};
}`;
    }

    // Save the current theme
    function saveCurrentTheme() {
        const theme = {
            primary: primaryColorInput.value,
            secondary: secondaryColorInput.value,
            accent: accentColorInput.value,
            text: textColorInput.value,
            background: backgroundColorInput.value,
            darkMode: darkModeToggle.checked
        };

        const savedThemes = JSON.parse(localStorage.getItem('savedThemes') || '[]');
        savedThemes.push(theme);
        localStorage.setItem('savedThemes', JSON.stringify(savedThemes));

        updateSavedThemes();
    }

    // Update saved themes display
    // Continuing from the updateSavedThemes() function:

    function updateSavedThemes() {
        const savedThemes = JSON.parse(localStorage.getItem('savedThemes') || '[]');
        savedThemesContainer.innerHTML = '';

        savedThemes.forEach((theme, index) => {
            const themeElement = document.createElement('div');
            themeElement.classList.add('saved-theme');

            const previewElement = document.createElement('div');
            previewElement.classList.add('saved-theme-preview');
            previewElement.style.background = `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`;

            const labelElement = document.createElement('span');
            labelElement.textContent = `Theme ${index + 1}`;

            // Add click event to load the saved theme
            themeElement.addEventListener('click', () => {
                primaryColorInput.value = theme.primary;
                secondaryColorInput.value = theme.secondary;
                accentColorInput.value = theme.accent;
                textColorInput.value = theme.text;
                backgroundColorInput.value = theme.background;
                darkModeToggle.checked = theme.darkMode;

                applyColors();
                toggleDarkMode();
            });

            // Add delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('btn', 'btn-sm', 'btn-danger', 'mt-1');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the parent click event
                savedThemes.splice(index, 1);
                localStorage.setItem('savedThemes', JSON.stringify(savedThemes));
                updateSavedThemes();
            });

            themeElement.appendChild(previewElement);
            themeElement.appendChild(labelElement);
            themeElement.appendChild(deleteBtn);

            savedThemesContainer.appendChild(themeElement);
        });

        // Add message if no saved themes
        if (savedThemes.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'No saved themes yet. Create and save your first theme!';
            emptyMessage.classList.add('text-muted');
            savedThemesContainer.appendChild(emptyMessage);
        }
    }

    // Copy CSS to clipboard
    copyCSS.addEventListener('click', () => {
        const cssText = cssOutput.textContent;
        navigator.clipboard.writeText(cssText).then(() => {
            const originalText = copyCSS.textContent;
            copyCSS.textContent = 'Copied!';
            setTimeout(() => {
                copyCSS.textContent = originalText;
            }, 2000);
        });
    });

    // Event listeners
    primaryColorInput.addEventListener('input', applyColors);
    secondaryColorInput.addEventListener('input', applyColors);
    accentColorInput.addEventListener('input', applyColors);
    textColorInput.addEventListener('input', applyColors);
    backgroundColorInput.addEventListener('input', applyColors);
    darkModeToggle.addEventListener('change', toggleDarkMode);
    transitionSpeedInput.addEventListener('input', applyTransitionSpeed);
    saveThemeBtn.addEventListener('click', saveCurrentTheme);

    // Theme button event listeners
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            applyTheme(button.dataset.theme);
        });
    });

    // Initialize
    applyColors();
    applyTransitionSpeed();
    updateSavedThemes();

    // Hide loading overlay after a short delay
    setTimeout(() => {
        loadingOverlay.style.opacity = 0;
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }, 1000);

    // Apply random colors to the bubbles
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
        const useSecondary = Math.random() > 0.5;
        bubble.style.backgroundColor = useSecondary ?
            `${secondaryColorInput.value}40` : // 40 is for 25% opacity in hex
            `${primaryColorInput.value}40`;
    });

    // Update bubble colors when theme changes
    function updateBubbleColors() {
        const bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach(bubble => {
            const useSecondary = Math.random() > 0.5;
            bubble.style.backgroundColor = useSecondary ?
                `${secondaryColorInput.value}40` :
                `${primaryColorInput.value}40`;
        });
    }

    // Add event listener for updating bubble colors
    primaryColorInput.addEventListener('change', updateBubbleColors);
    secondaryColorInput.addEventListener('change', updateBubbleColors);

    // Refresh bubbles when window is resized
    window.addEventListener('resize', createBubbles);

    // Export theme functionality
    const exportThemeBtn = document.createElement('button');
    exportThemeBtn.classList.add('btn', 'btn-secondary', 'ms-2');
    exportThemeBtn.textContent = 'Export Theme';
    exportThemeBtn.addEventListener('click', () => {
        const theme = {
            primary: primaryColorInput.value,
            secondary: secondaryColorInput.value,
            accent: accentColorInput.value,
            text: textColorInput.value,
            background: backgroundColorInput.value,
            darkMode: darkModeToggle.checked
        };

        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(theme));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', 'theme.json');
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });

    // Add export button next to save button
    saveThemeBtn.parentNode.appendChild(exportThemeBtn);

    // Import theme functionality
    const importThemeBtn = document.createElement('button');
    importThemeBtn.classList.add('btn', 'btn-outline-secondary', 'ms-2');
    importThemeBtn.textContent = 'Import Theme';
    importThemeBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = function (event) {
                try {
                    const theme = JSON.parse(event.target.result);

                    // Validate theme object
                    if (theme.primary && theme.secondary && theme.accent &&
                        theme.text && theme.background !== undefined) {
                        primaryColorInput.value = theme.primary;
                        secondaryColorInput.value = theme.secondary;
                        accentColorInput.value = theme.accent;
                        textColorInput.value = theme.text;
                        backgroundColorInput.value = theme.background;
                        darkModeToggle.checked = !!theme.darkMode;

                        applyColors();
                        toggleDarkMode();

                        alert('Theme imported successfully!');
                    } else {
                        alert('Invalid theme file format!');
                    }
                } catch (e) {
                    alert('Error parsing theme file!');
                }
            };

            reader.readAsText(file);
        };

        input.click();
    });

    // Add import button
    saveThemeBtn.parentNode.appendChild(importThemeBtn);

});