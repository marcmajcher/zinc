'use strict';

const Zinc = {};

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

(() => {
    function renderComponent(element, content, userData) {
        console.log('element: ', element, '| content: ',content);
        // get parent element
        element = document.querySelector(element);

        function renderTemplate (templateFile, userData) {
            //get template
            return fetch (templateFile+'.html')
            .then ( res => res.text())
            //render template using data
            .then ((template) => {
                return template.replace(/\{\{\s*(.*?)\s*\}\}/g, (match, p1) => {
                    //UnNest data-String from user
                    return p1.split('.').reduce((acc, curr) => {
                        return acc[curr];
                    }, userData)
                })
            })
            //append template to parent element
            .then ( html => element.innerHTML = html)
        }

        renderTemplate(content, userData);
        
        
        
    }


    function init() {
        renderComponent('user-item', 'user', userData);

    }

    document.addEventListener('DOMContentLoaded', init);
})();
