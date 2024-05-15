document.addEventListener('DOMContentLoaded', () => {
    const observerConfig = { childList: true, subtree: true };
    const observerCallback = (records, observer) => {
    records.forEach(record => {
    record.addedNodes.forEach(node => {
    if (node.matches && node.matches('#whiteboard_team')) {
    applyCustomCSS(node);
    }
    });
    });
    };
    
    const observer = new MutationObserver(observerCallback);
    observer.observe(document.getElementById('wt-container'), observerConfig);
    });
    
    function applyCustomCSS(element) {
    const customStyleElement = document.createElement('style');
    customStyleElement.innerHTML = '#whiteboard_team { display: none; }';
    element.appendChild(customStyleElement);
    }
    // 
    // #whitboard_team

