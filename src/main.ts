import { createApp } from 'vue';
import './style.css';
import App from './app.vue';
import 'overlayscrollbars/styles/overlayscrollbars.css';

createApp(App).mount(`#app`);

if (globalThis.chrome !== `undefined` && globalThis.chrome?.extension) {
    document.body.classList.add(`extension`);
    const popupViews = globalThis.chrome.extension.getViews({ type: `popup` });

    if (popupViews.length && popupViews[0] === globalThis)
        document.body.classList.add(`popup`);
    else
        document.body.classList.add(`tab`);
} else
    document.body.classList.add(`website`);
