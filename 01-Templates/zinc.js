'use strict';

(() => {
    function populateList(results) {
        console.log(results);

        let container = document.getElementsByClassName('container')[0];
        let userList = document.createElement('ul');
        container.appendChild(userList);
        userList.setAttribute('class', 'user-list');
        userList.setAttribute('id', 'z-user-list');

        function renderTemplate(templateFile, user) {
            //fetch template string 
            return fetch(templateFile + '.html')
                .then((response) => response.text())
                // passed 1 user, fill in template with data, then instert HTML
                // we will need to unNest the data from each user result
                .then((templateString) => {
                    return templateString.replace(/\{\{\s*(.*?)\s*\}\}/g, (match, p1) => {
                        //UnNest data-String from user
                        return p1.split('.').reduce((acc, curr) => {
                            return acc[curr];
                        }, user)
                    })
                })
                .then((ui) => userList.insertAdjacentHTML('beforeend', ui))
        }
        
        results.forEach((user) => {
            renderTemplate('user', user)
        })
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();