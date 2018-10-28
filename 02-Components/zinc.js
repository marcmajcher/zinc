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

    Zinc.registerComponent = function (elementName, templateFile, dataObject) {
        let element = document.querySelector(elementName);
        function renderTemplate (templateFile, dataObject) {
            return fetch (templateFile+'.html')
            .then ( res => res.text())
            .then ((template) => {
                return template.replace(/\{\{\s*(.*?)\s*\}\}/g, (match, p1) => {
                    return p1.split('.').reduce((acc, curr) => {
                        return acc[curr];
                    }, dataObject)
                })
            })
            .then ( html => element.innerHTML = html)
        }
        renderTemplate(templateFile, dataObject); 
    }

    function init() {
        Zinc.registerComponent('user-item', 'user', userData);

    }

    document.addEventListener('DOMContentLoaded', init);
})();
