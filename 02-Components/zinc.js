'use strict';

const Zinc = {};

(() => {
    document.addEventListener('DOMContentLoaded', init)
    
    Zinc.registerComponent = function (elementName, templateFile, dataObject, controller) {
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
            .then ( html => element.insertAdjacentHTML('beforeend',html))
        }
        renderTemplate(templateFile, dataObject); 
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then( (res) => {
                res.results.forEach( (result) => {
                    Zinc.registerComponent('user-item','user',result)
                })
            })
        
    };
    
})();
