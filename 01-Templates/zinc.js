'use strict';

function unNestData (string, start) {
    return string.split('.').reduce( (acc,curr) => {
        return acc[curr];
    }, start)
}

function renderTemplate (templateString, data) {
    return templateString.replace(/\{\{\s*(.*?)\s*\}\}/g,(match,string) => unNestData(string,data));            
}

(() => {
    function populateList(results) {
        console.log(results);
        
        let container = document.getElementsByClassName('container')[0];
        let userList = document.createElement('ul');
        container.appendChild(userList);
        userList.setAttribute('class','user-list');
        userList.setAttribute('id','z-user-list');
        
        fetch ('user.html')
        .then((response) => {
        return response.text();
        })
        .then((templateString) => {
            let list = results.map((result) => renderTemplate(templateString, result))
            list.forEach( (item) => userList.insertAdjacentHTML("beforeend", item));
        })
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }
    
    document.addEventListener('DOMContentLoaded', init);
})();