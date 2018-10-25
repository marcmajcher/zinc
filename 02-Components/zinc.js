'use strict';

const Zinc = {};

(() => {
    function renderComponent(element, content, userData) {
        console.log(element, content);
    }
    console.log(userData);

    function init() {
        renderComponent('user-item', 'user', userData);
    }

    document.addEventListener('DOMContentLoaded', init);
})();

