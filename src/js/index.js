$(function () {
    'use strict';
    
    $.ajaxSetup({
        contentType: 'application/json'
    });

    var appService = new App.businessLayer.AppService();

    appService.taskListController = new App.presentationalLayer.TaskListController($('.task-list'));
    appService.addTaskController = new App.presentationalLayer.AddTaskController($('.add-task'));
});