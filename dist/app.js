/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var App = {
    define: _define
};

function _define(namespace) {
    var parts = namespace.split('.');
    var parent = App;

    if (parts[0] === 'App') {
        parts = parts.slice(1);
    }

    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];

        if (typeof parent[part] === 'undefined') {
            parent[part] = {};
        }

        parent = parent[part];
    }

    return parent;
}

module.exports = App;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

$.ajaxSetup({
    contentType: 'application/json'
});

__webpack_require__(4);
__webpack_require__(7);
__webpack_require__(10);

var App = __webpack_require__(0);

var appService = new App.businessLayer.AppService();

appService.taskListController = new App.presentationalLayer.TaskListController($('.task-list'));
appService.addTaskController = new App.presentationalLayer.AddTaskController($('.add-task'));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
__webpack_require__(6);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var App = __webpack_require__(0);

var dataLayer = App.define('App.dataLayer');

dataLayer.urls = {
    toDoList: {
        index: '/to-do-list',
        store: '/to-do-list',
        delete: '/to-do-list/{taskId}',
        update: '/to-do-list/{taskId}'
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var App = __webpack_require__(0);

var dataLayer = App.define('App.dataLayer');

dataLayer.task = {
    id: 0,
    title: '',
    deadline: '',
    priority: '',
    status: false
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(8);
__webpack_require__(9);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var App = __webpack_require__(0);

var businessLayer = App.define('App.businessLayer');

var AppService = function () {
    if (typeof AppService.instance === 'object') {
        return AppService.instance;
    }

    AppService.instance = this;
};

businessLayer.AppService = AppService;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var App = __webpack_require__(0);

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
        deferred.resolve(taskList);
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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11);
__webpack_require__(12);
__webpack_require__(13);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var App = __webpack_require__(0);

var presentationalLayer = App.define('App.presentationalLayer');

var TaskController = function (task, $template) {
    this.task = task;
    this.$template = $template;
    this.appService = new App.businessLayer.AppService();
    this.taskService = new App.businessLayer.TaskService();

    this.$template.attr('id', 'task_' + task.id);
    this.$template.find('.task-list__task-title').text(task.title);
    this.$template.find('.task-list__task-deadline').text(task.deadline);
    this.setPriority(this.$template, this.task.priority);
    this.$template.addClass(task.status ? 'task-list__task--done' : 'task-list__task--undone');
    this.$template.find('.task-list__task-status').prop('checked', task.status);

    this.$template.on('click', '.task-list__task-delete', this.removeTask.bind(this));
    this.$template.find('.task-list__priority-list-item').on('click', this.priorityChanged.bind(this));
    this.$template.find('.task-list__task-status').on('click', this.statusChanged.bind(this));
};

TaskController.prototype.getElement = function () {
    return this.$template;
};

TaskController.prototype.removeTask = function (event) {
    this.appService.taskListController.removeTask(this.task);
};

TaskController.prototype.priorityChanged = function (event) {
    var $a = $(event.target);
    if (!$a.is('a')) {
        $a = $a.closest('a');
    }

    this.task.priority = $a.data('priority');

    var self = this;
    this.taskService.updateTask(this.task).then(function () {
        self.setPriority($a.closest('.task-list__task'), self.task.priority);
    });
};

TaskController.prototype.statusChanged = function (event) {
    var $status = $(event.target);

    this.task.status = $status.prop('checked');

    $status.toggleClass('disabled');
    this.appService.taskListController.changeTaskStatus(this.task).then(
        function () {
            $status.toggleClass('disabled');
        }
    );
};

TaskController.prototype.getBgClass = function (priority) {
    switch (priority) {
        case 'urgent':
            return 'text-danger';
        case 'high':
            return 'text-warning';
        case 'low':
            return 'text-info';
        default:
            return 'text-primary';
    }
};

TaskController.prototype.setPriority = function ($element, priority) {
    var $priority = $element.find('.task-list__task-priority');
    $priority.removeClass('text-danger text-warning text-primary text-info').addClass(this.getBgClass(priority));
};

presentationalLayer.TaskController = TaskController;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var App = __webpack_require__(0);

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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var App = __webpack_require__(0);

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

/***/ })
/******/ ]);