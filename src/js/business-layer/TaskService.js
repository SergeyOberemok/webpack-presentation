let App = require('../App');

let businessLayer = App.define('App.businessLayer');

let instance = null;

businessLayer.TaskService = class TaskService {

    constructor() {
        if (instance !== null) {
            return instance;
        }
        instance = this;

        this.taskList = null;
        this.urls = App.dataLayer.urls;

        return instance;
    }

    getTaskList() {
        let self = this;
        let deferred = $.Deferred();

        if (this.taskList !== null) {
            deferred.resolve(this.taskList);
        } else {
            $.get(this.urls.toDoList.index,
                (taskList) => {
                    self.taskList = taskList;

                    deferred.resolve(taskList);
                }
            ).fail((response) => {
                deferred.reject(response);
            });
        }

        return deferred.promise();
    }

    storeTask(task) {
        return $.post(this.urls.toDoList.store, JSON.stringify(task),
            (storedTask) => {
                task.id = storedTask.id;

                toastr.success('Task stored successfully', 'Response');
            }
        ).fail((response) => {
            toastr.error('Error', 'Response');

            return response;
        });
    }

    deleteTask(task) {
        let self = this;

        return $.ajax({
            url: this.urls.toDoList.delete.replace('{taskId}', task.id),
            type: 'DELETE',
            success: (response) => {
                self.taskList.splice(self.taskList.indexOf(task), 1);

                toastr.success('Task deleted successfully', 'Response');
            }
        }).fail((response) => {
            toastr.error('Task isn\'t deleted', 'Error');
        });
    }

    updateTask(task) {
        return $.ajax({
            url: this.urls.toDoList.update.replace('{taskId}', task.id),
            type: 'PUT',
            data: JSON.stringify(task),
            success: (response) => {
                toastr.success('Task updated successfully', 'Response');
            }
        }).fail((response) => {
            toastr.error('Task isn\'t updated', 'Error');
        });
    }

};