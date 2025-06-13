/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import 'overlayscrollbars/styles/overlayscrollbars.css';
import { createApp } from 'vue';
import App from './app.vue';
import './style.css';

createApp(App).mount(`#app`);

if (globalThis.chrome && globalThis.chrome?.extension) {
    document.body.classList.add(`extension`);
    const popupViews = globalThis.chrome.extension.getViews({ type: `popup` });

    if (
        popupViews.length
        // @ts-ignore
        && popupViews[0] === globalThis
    )
        document.body.classList.add(`popup`);
    else
        document.body.classList.add(`tab`);
} else
    document.body.classList.add(`website`);
