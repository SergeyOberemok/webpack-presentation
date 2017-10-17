var App = require('../App');

var businessLayer = App.define('App.businessLayer');

var TaskService = function () {
    if (typeof TaskService.instance === 'object') {
        return TaskService.instance;
    }

    TaskService.instance = this;

    this.taskList = null;
    this.urls = App.dataLayer.urls;
};

TaskService.prototype.getTaskList = function () {
    var self = this;
    var deferred = $.Deferred();

    if (this.taskList !== null) {
        deferred.resolve(this.taskList);
    } else {
        $.get(this.urls.toDoList.index,
            function (taskList) {
                self.taskList = taskList;

                deferred.resolve(taskList);
            }
        ).fail(function (response) {
            deferred.reject(response);
        });
    }

    return deferred.promise();
};

TaskService.prototype.storeTask = function (task) {
    return $.post(this.urls.toDoList.store, JSON.stringify(task),
        function (storedTask) {
            task.id = storedTask.id;

            toastr.success('Task stored successfully', 'Response');
        }
    ).fail(function (response) {
        toastr.error('Error', 'Response');

        return response;
    });
};

TaskService.prototype.deleteTask = function (task) {
    var self = this;

    return $.ajax({
        url: this.urls.toDoList.delete.replace('{taskId}', task.id),
        type: 'DELETE',
        success: function (response) {
            self.taskList.splice(self.taskList.indexOf(task), 1);

            toastr.success('Task deleted successfully', 'Response');
        }
    }).fail(function (response) {
        toastr.error('Task isn\'t deleted', 'Error');
    });
};

TaskService.prototype.updateTask = function (task) {
    return $.ajax({
        url: this.urls.toDoList.update.replace('{taskId}', task.id),
        type: 'PUT',
        data: JSON.stringify(task),
        success: function (response) {
            toastr.success('Task updated successfully', 'Response');
        }
    }).fail(function (response) {
        toastr.error('Task isn\'t updated', 'Error');
    });
};

businessLayer.TaskService = TaskService;