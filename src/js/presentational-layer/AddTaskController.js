(function (App) {
    'use strict';

    var presentationalLayer = App.define('App.presentationalLayer');

    var AddTaskController = function ($addTask) {
        this.$addTask = $addTask;

        this.appService = new App.businessLayer.AppService();
        this.taskService = new App.businessLayer.TaskService();

        this.$addTask.children('a.add-task__icon').on('click', this.plusIconClicked.bind(this));
        this.$addTask.find('.add-task__form-cancel').on('click', this.cancelClicked.bind(this));
        this.$addTask.find('.add-task__form-add').on('click', this.addClicked.bind(this));
        this.$addTask.find('.add-task__title').on('change', this.titleChanged.bind(this));
        this.$addTask.find('.add-task__deadline-input').datepicker({
            dateFormat: 'yy-mm-dd',
            minDate: 0
        }).on('change', this.deadlineChanged.bind(this));
        this.$addTask.find('.add-task__deadline').on('click', this.deadlineClicked.bind(this));
        this.$addTask.find('.add-task__priority-list').find('a').on('click', this.priorityChanged.bind(this));

        this.task = null;
    };

    AddTaskController.prototype.plusIconClicked = function (event) {
        this.task = $.extend({}, App.dataLayer.task);

        this.$addTask.toggleClass('add-task--active');

        this.$addTask.find('.add-task__form').find('input').focus();
    };

    AddTaskController.prototype.cancelClicked = function (event) {
        this.$addTask.toggleClass('add-task--active');
    };

    AddTaskController.prototype.addClicked = function (event) {
        var self = this;
        var $button = $(event.target);

        if (this.task.title.length) {
            $button.toggleClass('btn-default').toggleClass('btn-warning');

            this.taskService.storeTask(this.task).then(
                function () {
                    self.appService.taskListController.renderTask(self.task);

                    $button.closest('form').get(0).reset();
                    self.task = $.extend({}, App.dataLayer.task);
                    $button.toggleClass('btn-warning').toggleClass('btn-success');
                    setTimeout(function () {
                        $button.toggleClass('btn-success').toggleClass('btn-default');
                    }, 1000);
                },
                function (response) {
                    $button.toggleClass('btn-warning').toggleClass('btn-danger');
                }
            );
        } else {
            toastr.warning('Title is empty');
        }
    };

    AddTaskController.prototype.titleChanged = function (event) {
        var $input = $(event.target);

        this.task.title = $input.val();
    };

    AddTaskController.prototype.deadlineClicked = function (event) {
        this.$addTask.find('.add-task__deadline-input').datepicker('show');
    };

    AddTaskController.prototype.deadlineChanged = function (event) {
        var $input = $(event.target);

        this.task.deadline = $input.val();
    };

    AddTaskController.prototype.priorityChanged = function (event) {
        var $a = $(event.target);
        if (!$a.is('a')) {
            $a = $a.closest('a');
        }

        this.task.priority = $a.data('priority');
    };

    presentationalLayer.AddTaskController = AddTaskController;

})(App);