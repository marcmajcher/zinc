'use strict';

/* eslint-env browser */
/* globals Zinc */

(() => {
    function onClick() {
        this.addEventListener('click', () => {
            this.classList.toggle('hilight');
            this.$state.hilight = !this.$state.hilitght;
        });
    }

    function populateList(users) {
        const myComponents = ['user-one', 'user-two', 'user-three', 'user-four', 'user-five'];
        for (let i = 0; i < users.length; i++) {
            //Zinc.register will now take the config object
            Zinc.registerComponent(myComponents[i], 'user', users[i], onClick);
        }
    }

    fetch('https://randomuser.me/api/?results=5')
        .then(res => res.json())
        .then(json => populateList(json.results));
})();