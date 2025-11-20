/**
 * Theme & Font Switcher for Website Factory
 * 
 * Usage:
 * 1. Include this script in your HTML.
 * 2. Use the UI to select a theme and font.
 * 3. To finalize:
 *    - Note the selected theme/font from the console.
 *    - Update style.css :root variables with the selected values.
 *    - Remove this script.
 */

(function() {
    // Configuration
    const themes = [
        { id: 'forest', name: 'Forest (Default)', color: '#1a2e22' },
        { id: 'ocean', name: 'Ocean', color: '#0e3c45' },
        { id: 'luxury', name: 'Luxury', color: '#000000' },
        { id: 'sunset', name: 'Sunset', color: '#8c3a3a' },
        { id: 'minimal', name: 'Minimal', color: '#ffffff', border: '#ccc' }
    ];

    const fonts = [
        { id: 'classic', name: 'Classic (Cormorant)', font: "'Cormorant Garamond', serif" },
        { id: 'modern', name: 'Modern (Montserrat)', font: "'Montserrat', sans-serif" },
        { id: 'elegant', name: 'Elegant (Playfair)', font: "'Playfair Display', serif" },
        { id: 'editorial', name: 'Editorial (Lora)', font: "'Lora', serif" },
        { id: 'bold', name: 'Bold (Oswald)', font: "'Oswald', sans-serif" }
    ];

    // State
    let currentTheme = localStorage.getItem('site-theme') || 'forest';
    let currentFont = localStorage.getItem('site-font') || 'classic';

    // Apply initial state
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-font', currentFont);

    // Create UI
    const container = document.createElement('div');
    container.id = 'theme-switcher-panel';
    container.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: white;
        padding: 20px;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        z-index: 9999;
        font-family: 'Manrope', sans-serif;
        width: 280px;
        transition: transform 0.3s ease;
        border: 1px solid rgba(0,0,0,0.1);
    `;

    // Toggle Button
    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = '🎨';
    toggleBtn.style.cssText = `
        position: absolute;
        top: -15px;
        right: -15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #1a2e22;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    let isOpen = true;
    toggleBtn.onclick = () => {
        isOpen = !isOpen;
        container.style.transform = isOpen ? 'translateY(0)' : 'translateY(calc(100% + 20px))';
    };

    // Content
    const content = document.createElement('div');
    content.innerHTML = `
        <h3 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 700; color: #333;">Theme Settings</h3>
        
        <div style="margin-bottom: 20px;">
            <label style="display: block; font-size: 12px; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Color Theme</label>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px;">
                ${themes.map(t => `
                    <button 
                        class="theme-btn ${t.id === currentTheme ? 'active' : ''}" 
                        data-id="${t.id}"
                        title="${t.name}"
                        style="
                            width: 100%; 
                            aspect-ratio: 1; 
                            border-radius: 50%; 
                            border: ${t.border ? '1px solid ' + t.border : 'none'}; 
                            background: ${t.color}; 
                            cursor: pointer;
                            transition: transform 0.2s;
                            position: relative;
                        "
                    ></button>
                `).join('')}
            </div>
            <div id="theme-name" style="margin-top: 8px; font-size: 13px; color: #333; font-weight: 600;">${themes.find(t => t.id === currentTheme).name}</div>
        </div>

        <div>
            <label style="display: block; font-size: 12px; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Typography</label>
            <select id="font-select" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #ddd; font-family: inherit; font-size: 14px;">
                ${fonts.map(f => `
                    <option value="${f.id}" ${f.id === currentFont ? 'selected' : ''}>${f.name}</option>
                `).join('')}
            </select>
        </div>

        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; font-size: 11px; color: #999; line-height: 1.4;">
            Select your preferred style. When finished, remove this script and update CSS variables.
        </div>
    `;

    container.appendChild(toggleBtn);
    container.appendChild(content);
    document.body.appendChild(container);

    // Event Listeners
    const themeBtns = container.querySelectorAll('.theme-btn');
    const themeNameDisplay = container.querySelector('#theme-name');
    const fontSelect = container.querySelector('#font-select');

    // Add active styles
    const style = document.createElement('style');
    style.textContent = `
        .theme-btn:hover { transform: scale(1.1); }
        .theme-btn.active { box-shadow: 0 0 0 2px white, 0 0 0 4px #1a2e22; }
    `;
    document.head.appendChild(style);

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            currentTheme = id;
            
            // Update UI
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            themeNameDisplay.textContent = themes.find(t => t.id === id).name;

            // Update DOM & Storage
            document.documentElement.setAttribute('data-theme', id);
            localStorage.setItem('site-theme', id);
            
            console.log(`Theme set to: ${id}`);
        });
    });

    fontSelect.addEventListener('change', (e) => {
        const id = e.target.value;
        currentFont = id;

        // Update DOM & Storage
        document.documentElement.setAttribute('data-font', id);
        localStorage.setItem('site-font', id);

        console.log(`Font set to: ${id}`);
    });

})();
