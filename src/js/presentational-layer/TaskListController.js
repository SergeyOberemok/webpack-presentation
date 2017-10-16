(function (App) {
    'use strict';

    var presentationalLayer = App.define('App.presentationalLayer');

    var TaskListController = function ($taskList) {
        this.$taskList = $taskList;
        this.taskList = null;
        this.taskService = new App.businessLayer.TaskService();

        this.taskService.getTaskList().then(this.setTaskList.bind(this));
    };

    TaskListController.prototype.setTaskList = function (taskList) {
        this.taskList = taskList;

        this.renderTaskList();
    };

    TaskListController.prototype.renderTaskList = function () {
        for (var i = 0; i < this.taskList.length; i++) {
            var task = this.taskList[i];

            this.renderTask(task);
        }
    };

    TaskListController.prototype.renderTask = (function () {
        var $taskTemplateClone = null;
        var $taskTemplate = null;

        return function (task) {
            if ($taskTemplate === null) {
                $taskTemplate = this.$taskList.find('.task-list__template');
            }

            this.$taskList.append((new App.presentationalLayer.TaskController(
                task,
                $taskTemplate.clone().removeClass().addClass('task-list__task')
            )).getElement());
        };
    })();

    TaskListController.prototype.removeTask = function (task) {
        var self = this;
        
        this.taskService.deleteTask(task).then(
            function () {
                self.$taskList.find('#task_' + task.id).remove();
            }
        );
    };

    presentationalLayer.TaskListController = TaskListController;

})(App);