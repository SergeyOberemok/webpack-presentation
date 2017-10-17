var App = require('../App');

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

        var taskController = new App.presentationalLayer.TaskController(
            task,
            $taskTemplate.clone().removeClass().addClass('task-list__task')
        );

        if (task.status) {
            this.putTaskToDone(taskController.getElement());
        } else {
            this.putTaskToUndone(taskController.getElement());
        }
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

TaskListController.prototype.removeTask = function (task) {
    var self = this;

    presentationalLayer.TaskListController = TaskListController;
    this.taskService.deleteTask(task).then(
        function () {
            self.$taskList.find('#task_' + task.id).remove();
        }
    );
};

TaskListController.prototype.changeTaskStatus = function (task) {
    var self = this;

    return this.taskService.updateTask(task).then(
        function () {
            var $task = self.$taskList.find('#task_' + task.id).detach();
            if (task.status) {
                self.putTaskToDone($task);
            } else {
                self.putTaskToUndone($task);
            }
        }
    );
}

TaskListController.prototype.putTaskToUndone = function ($task) {
    $task.removeClass('task-list__task--done').addClass('task-list__task--undone');

    var undoneList = this.$taskList.find('.task-list__task--undone');
    if (undoneList.length) {
        undoneList.last().after($task);
    } else {
        this.$taskList.prepend($task);
    }
};

TaskListController.prototype.putTaskToDone = function ($task) {
    $task.removeClass('task-list__task--undone').addClass('task-list__task--done');

    var doneList = this.$taskList.find('.task-list__task--done');
    if (doneList.length) {
        doneList.last().after($task);
    } else {
        this.$taskList.append($task);
    }
};

presentationalLayer.TaskListController = TaskListController;