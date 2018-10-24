'use strict';



const templateString = `<li class="user">
<img class="user-photo" src="{{ picture.thumbnail }}" alt="Photo of {{ name.first }} {{ name.last }}">
<div class="user-name">{{ name.first }} {{ name.last }}</div>
<div class="user-location">{{ location.city }}, {{ location.state }}</div>
<div class="user-email">{{ email }}</div>
</li>`;

(() => {
    function populateList(results) {
        console.log(results);
        
        let container = document.getElementsByClassName('container')[0];
        let userList = document.createElement('ul');
        container.appendChild(userList);
        userList.setAttribute('class','user-list');
        userList.setAttribute('id','z-user-list');
        
        function unNest (string, start) {
            return string.split('.').reduce( (acc,curr) => {
                return acc[curr];
            }, start)
        }
        function renderTemplate(templateString, data) {
            return templateString.replace(/\{\{\s*(.*?)\s*\}\}/g,(match,p1) => unNest(p1,data));            
        }
        let list = results.map((result) => renderTemplate(templateString, result));
        console.log(list)
            
        list.forEach( (item) => userList.insertAdjacentHTML("beforeend", item));
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }
    
    document.addEventListener('DOMContentLoaded', init);
})();
