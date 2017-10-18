let App = require('../App');

let presentationalLayer = App.define('App.presentationalLayer');

presentationalLayer.TaskListController = class TaskListController {

    constructor($taskList) {
        this.$taskList = $taskList;
        this.taskList = null;
        this.taskService = new App.businessLayer.TaskService();
        this.$taskTemplate = null;

        this.taskService.getTaskList().then(this.setTaskList.bind(this));
    }


    setTaskList(taskList) {
        this.taskList = taskList;

        this.renderTaskList();
    }

    renderTaskList() {
        for (let i = 0; i < this.taskList.length; i++) {
            let task = this.taskList[i];

            this.renderTask(task);
        }
    }

    renderTask(task) {
        if (this.$taskTemplate === null) {
            this.$taskTemplate = this.$taskList.find('.task-list__template');
        }

        let taskController = new App.presentationalLayer.TaskController(
            task,
            this.$taskTemplate.clone().removeClass().addClass('task-list__task')
        );

        if (task.status) {
            this.putTaskToDone(taskController.getElement());
        } else {
            this.putTaskToUndone(taskController.getElement());
        }
    }

    removeTask(task) {
        let self = this;

        this.taskService.deleteTask(task).then(
            () => {
                self.$taskList.find('#task_' + task.id).remove();
            }
        );
    }

    changeTaskStatus(task) {
        let self = this;

        return this.taskService.updateTask(task).then(
            () => {
                let $task = self.$taskList.find('#task_' + task.id).detach();
                if (task.status) {
                    self.putTaskToDone($task);
                } else {
                    self.putTaskToUndone($task);
                }
            }
        );
    }

    putTaskToUndone($task) {
        $task.removeClass('task-list__task--done').addClass('task-list__task--undone');

        let undoneList = this.$taskList.find('.task-list__task--undone');
        if (undoneList.length) {
            undoneList.last().after($task);
        } else {
            this.$taskList.prepend($task);
        }
    }

    putTaskToDone($task) {
        $task.removeClass('task-list__task--undone').addClass('task-list__task--done');

        let doneList = this.$taskList.find('.task-list__task--done');
        if (doneList.length) {
            doneList.last().after($task);
        } else {
            this.$taskList.append($task);
        }
    }

};