(function (App) {
    'use strict';

    var dataLayer = App.define('App.dataLayer');

    dataLayer.urls = {
        toDoList: {
            index: '/to-do-list',
            store: '/to-do-list',
            delete: '/to-do-list/{taskId}',
            update: '/to-do-list/{taskId}'
        }
    };
    
})(App);