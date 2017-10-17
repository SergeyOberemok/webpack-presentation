$.ajaxSetup({
    contentType: 'application/json'
});

require('./data-layer/data-layer');
require('./business-layer/business-layer');
require('./presentational-layer/presentational-layer');

var App = require('./App');

var appService = new App.businessLayer.AppService();

appService.taskListController = new App.presentationalLayer.TaskListController($('.task-list'));
appService.addTaskController = new App.presentationalLayer.AddTaskController($('.add-task'));

require('../css/index.css');