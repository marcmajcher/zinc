'use strict';

const Zinc = {
    _components: {}
};

(() => {
    const domParser = new DOMParser();
    Zinc._components = {};
    document.addEventListener('DOMContentLoaded', init)
    
    // i want to pass register component the details and have it register, saving all the data.
    // render Template will be performed given the registered component key-values 
    //then i want to go through each of the components and render each one given those values. 
    
    function renderTemplate (templateFile, data) {
        console.log('3. renderTemplate is called')
        return fetch (templateFile+'.html')
        .then ( res => res.text())
        .then (html => html.replace(/\{\{\s*(.*?)\s*\}\}/g, (match, variable) => 
                variable.split('.').reduce((acc, curr) => acc[curr],data)))
    }

    function renderComponent (componentName) {
        console.log('2. render Component is called')
        const component = Zinc._components[componentName];
        const nodeList = document.querySelectorAll(componentName);
        nodeList.forEach( (node) => {
            renderTemplate(component.templateFile, component.data)
            .then ((html) => {
                const doc = domParser.parseFromString(html, 'text/html');
                const elem = node.insertAdjacentElement('beforeend', doc.firstChild.children[1].firstChild);
                elem._state = {};
                if (component.controller) {
                    elem.controller = component.controller;
                    elem.controller();
                };
                Zinc._components[componentName].element = elem;
            });
        });
    }
    
    function renderComponents() {
        console.log('renderComponents is called');
        Object.values(Zinc._components).forEach((component) => {
            renderComponent(component.componentName);
        });
    }
    
    //this function will now take one config object instead of 4 arguments
    Zinc.registerComponent = function (componentName, templateFile, data, controller) {
        console.log('1. registerComponent is called');
        Zinc._components[componentName] = {
            componentName: componentName,
            templateFile,
            data,
            controller
        };
        renderComponent (componentName);
    }

    function init() {
        renderComponents();
    };   
})();
