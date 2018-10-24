'use strict';

function renderTemplate(templateString, data) {
    return templateString.replace(/\{\{\s*(.*?)\s*\}\}/g,(match,p1) => data[p1]);            
}

function formatResults (result) {
    let user = {
        photo: result.picture.large,
        firstName: result.name.first,
        lastName: result.name.last,
        city: result.location.city,
        state: result.location.state,
        email: result.email 
    } 
    return user;
}

const templateString = `<li class="user">
<img class="user-photo" src="{{ photo }}" alt="Photo of {{ firstName }} {{ lastName }}">
<div class="user-name">{{ firstName }} {{ lastName }}</div>
<div class="user-location">{{ city }}, {{ state }}</div>
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
        
        let users = results.map( (result) => formatResults(result));
        let list = users.map((user) => renderTemplate(templateString,user));

        list.forEach( (item) => userList.insertAdjacentHTML("beforeend", item));
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }
    
    document.addEventListener('DOMContentLoaded', init);
})();
