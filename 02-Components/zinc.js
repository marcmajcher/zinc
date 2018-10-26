'use strict';

const userData = {
    picture: {
        thumbnail: 'https://f4.bcbits.com/img/0001142378_10.jpg'
    },
    name: {
        first: 'Jack',
        last: 'Burton'
    },
    location: {
        city: 'San Francisco',
        state: 'CA'
    },
    email: 'jack.burton@example.com'
};

const Zinc = {};

(() => {
    function renderComponent(element, content, userData) {
        console.log('element: ', element, '| content: ',content);
        // element = user-item = the component we need to define/create
        // content = user = the html string
        // userData = userData object (the info)
        // get html string
        // render html using userData
        // append html to parent element

        //get parent element
        document.getElementsByClassName('')
    }
    console.log(userData);

    function init() {
        renderComponent('user-item', 'user', userData);
    }

    document.addEventListener('DOMContentLoaded', init);
})();

// npm install -g lite-server