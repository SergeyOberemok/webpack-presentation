let App = require('../App');

let dataLayer = App.define('App.dataLayer');

dataLayer.task = {
    id: 0,
    title: '',
    deadline: '',
    priority: '',
    status: false
};