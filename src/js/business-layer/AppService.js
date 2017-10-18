let App = require('../App');

let businessLayer = App.define('App.businessLayer');

let instance = null;

businessLayer.AppService = class AppService {

    constructor() {
        if (instance !== null) {
            return instance;
        }

        instance = this;

        return instance;
    }

};