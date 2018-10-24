'use strict';


(() => {
    function populateList(results) {
        console.log(results);

        //This temporary to pass data to test template//
            const myUser = {
                photo: results[0].picture.thumbnail,
                firstName: results[0].name.first,
                lastName: results[0].name.last,
                city: results[0].location.city,
                state: results[0].location.state,
                email: results[0].email }
        //end of temporary object
        console.log(myUser);

        let container = document.getElementsByClassName('container')[0];
        let userList = document.createElement('ul');
        container.appendChild(userList);
        userList.setAttribute('class','user-list');
        userList.setAttribute('id','z-user-list');
        
        function renderTemplate(templateString, data) {
            return templateString.replace(/\{\{\s*(.*?)\s*\}\}/g,(match,p1) => data[p1]);            
        }            
            const userLi = renderTemplate(
            `<li class="user">
            <img class="user-photo" src="{{ photo }}" alt="Photo of {{ firstName }} {{ lastName }}">
            <div class="user-name">{{ firstName }} {{ lastName }}</div>
            <div class="user-location">{{ city }}, {{ state }}</div>
            <div class="user-email">{{ email }}</div>
            </li>`, myUser);

        userList.insertAdjacentHTML("afterbegin", userLi);
        
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }
    
    document.addEventListener('DOMContentLoaded', init);
})();
