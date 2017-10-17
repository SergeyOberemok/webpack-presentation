var App = require('../App');

var businessLayer = App.define('App.businessLayer');

var AppService = function () {
    if (typeof AppService.instance === 'object') {
        return AppService.instance;
    }

    AppService.instance = this;
};

businessLayer.AppService = AppService;