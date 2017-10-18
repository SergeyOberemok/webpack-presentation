$.ajaxSetup({
    contentType: 'application/json'
});

require('./data-layer/data-layer');
require('./business-layer/business-layer');
require('./presentational-layer/presentational-layer');

let App = require('./App');

let appService = new App.businessLayer.AppService();

appService.taskListController = new App.presentationalLayer.TaskListController($('.task-list'));
appService.addTaskController = new App.presentationalLayer.AddTaskController($('.add-task'));

require('../css/index.css');