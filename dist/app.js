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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(4);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.ajaxSetup({
    contentType: 'application/json'
});

__webpack_require__(9);
__webpack_require__(12);
__webpack_require__(15);

var App = __webpack_require__(1);

var appService = new App.businessLayer.AppService();

appService.taskListController = new App.presentationalLayer.TaskListController($('.task-list'));
appService.addTaskController = new App.presentationalLayer.AddTaskController($('.add-task'));

__webpack_require__(19);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(10);
__webpack_require__(11);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var App = __webpack_require__(1);

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var App = __webpack_require__(1);

var dataLayer = App.define('App.dataLayer');

dataLayer.task = {
    id: 0,
    title: '',
    deadline: '',
    priority: '',
    status: false
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(13);
__webpack_require__(14);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = __webpack_require__(1);

var businessLayer = App.define('App.businessLayer');

var instance = null;

businessLayer.AppService = function AppService() {
    _classCallCheck(this, AppService);

    if (instance !== null) {
        return instance;
    }

    instance = this;

    return instance;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = __webpack_require__(1);

var businessLayer = App.define('App.businessLayer');

var instance = null;

businessLayer.TaskService = function () {
    function TaskService() {
        _classCallCheck(this, TaskService);

        if (instance !== null) {
            return instance;
        }
        instance = this;

        this.taskList = null;
        this.urls = App.dataLayer.urls;

        return instance;
    }

    _createClass(TaskService, [{
        key: 'getTaskList',
        value: function getTaskList() {
            var self = this;
            var deferred = $.Deferred();

            if (this.taskList !== null) {
                deferred.resolve(this.taskList);
            } else {
                $.get(this.urls.toDoList.index, function (taskList) {
                    self.taskList = taskList;

                    deferred.resolve(taskList);
                }).fail(function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise();
        }
    }, {
        key: 'storeTask',
        value: function storeTask(task) {
            return $.post(this.urls.toDoList.store, JSON.stringify(task), function (storedTask) {
                task.id = storedTask.id;

                toastr.success('Task stored successfully', 'Response');
            }).fail(function (response) {
                toastr.error('Error', 'Response');

                return response;
            });
        }
    }, {
        key: 'deleteTask',
        value: function deleteTask(task) {
            var self = this;

            return $.ajax({
                url: this.urls.toDoList.delete.replace('{taskId}', task.id),
                type: 'DELETE',
                success: function success(response) {
                    self.taskList.splice(self.taskList.indexOf(task), 1);

                    toastr.success('Task deleted successfully', 'Response');
                }
            }).fail(function (response) {
                toastr.error('Task isn\'t deleted', 'Error');
            });
        }
    }, {
        key: 'updateTask',
        value: function updateTask(task) {
            return $.ajax({
                url: this.urls.toDoList.update.replace('{taskId}', task.id),
                type: 'PUT',
                data: JSON.stringify(task),
                success: function success(response) {
                    toastr.success('Task updated successfully', 'Response');
                }
            }).fail(function (response) {
                toastr.error('Task isn\'t updated', 'Error');
            });
        }
    }]);

    return TaskService;
}();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(16);
__webpack_require__(17);
__webpack_require__(18);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = __webpack_require__(1);

var presentationalLayer = App.define('App.presentationalLayer');

presentationalLayer.TaskController = function () {
    function TaskController(task, $template) {
        _classCallCheck(this, TaskController);

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
    }

    _createClass(TaskController, [{
        key: 'getElement',
        value: function getElement() {
            return this.$template;
        }
    }, {
        key: 'removeTask',
        value: function removeTask(event) {
            this.appService.taskListController.removeTask(this.task);
        }
    }, {
        key: 'priorityChanged',
        value: function priorityChanged(event) {
            var $a = $(event.target);
            if (!$a.is('a')) {
                $a = $a.closest('a');
            }

            this.task.priority = $a.data('priority');

            var self = this;
            this.taskService.updateTask(this.task).then(function () {
                self.setPriority($a.closest('.task-list__task'), self.task.priority);
            });
        }
    }, {
        key: 'statusChanged',
        value: function statusChanged(event) {
            var $status = $(event.target);

            this.task.status = $status.prop('checked');

            $status.toggleClass('disabled');
            this.appService.taskListController.changeTaskStatus(this.task).then(function () {
                $status.toggleClass('disabled');
            });
        }
    }, {
        key: 'getBgClass',
        value: function getBgClass(priority) {
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
        }
    }, {
        key: 'setPriority',
        value: function setPriority($element, priority) {
            var $priority = $element.find('.task-list__task-priority');
            $priority.removeClass('text-danger text-warning text-primary text-info').addClass(this.getBgClass(priority));
        }
    }]);

    return TaskController;
}();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = __webpack_require__(1);

var presentationalLayer = App.define('App.presentationalLayer');

presentationalLayer.TaskListController = function () {
    function TaskListController($taskList) {
        _classCallCheck(this, TaskListController);

        this.$taskList = $taskList;
        this.taskList = null;
        this.taskService = new App.businessLayer.TaskService();
        this.$taskTemplate = null;

        this.taskService.getTaskList().then(this.setTaskList.bind(this));
    }

    _createClass(TaskListController, [{
        key: 'setTaskList',
        value: function setTaskList(taskList) {
            this.taskList = taskList;

            this.renderTaskList();
        }
    }, {
        key: 'renderTaskList',
        value: function renderTaskList() {
            for (var i = 0; i < this.taskList.length; i++) {
                var task = this.taskList[i];

                this.renderTask(task);
            }
        }
    }, {
        key: 'renderTask',
        value: function renderTask(task) {
            if (this.$taskTemplate === null) {
                this.$taskTemplate = this.$taskList.find('.task-list__template');
            }

            var taskController = new App.presentationalLayer.TaskController(task, this.$taskTemplate.clone().removeClass().addClass('task-list__task'));

            if (task.status) {
                this.putTaskToDone(taskController.getElement());
            } else {
                this.putTaskToUndone(taskController.getElement());
            }
        }
    }, {
        key: 'removeTask',
        value: function removeTask(task) {
            var self = this;

            this.taskService.deleteTask(task).then(function () {
                self.$taskList.find('#task_' + task.id).remove();
            });
        }
    }, {
        key: 'changeTaskStatus',
        value: function changeTaskStatus(task) {
            var self = this;

            return this.taskService.updateTask(task).then(function () {
                var $task = self.$taskList.find('#task_' + task.id).detach();
                if (task.status) {
                    self.putTaskToDone($task);
                } else {
                    self.putTaskToUndone($task);
                }
            });
        }
    }, {
        key: 'putTaskToUndone',
        value: function putTaskToUndone($task) {
            $task.removeClass('task-list__task--done').addClass('task-list__task--undone');

            var undoneList = this.$taskList.find('.task-list__task--undone');
            if (undoneList.length) {
                undoneList.last().after($task);
            } else {
                this.$taskList.prepend($task);
            }
        }
    }, {
        key: 'putTaskToDone',
        value: function putTaskToDone($task) {
            $task.removeClass('task-list__task--undone').addClass('task-list__task--done');

            var doneList = this.$taskList.find('.task-list__task--done');
            if (doneList.length) {
                doneList.last().after($task);
            } else {
                this.$taskList.append($task);
            }
        }
    }]);

    return TaskListController;
}();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = __webpack_require__(1);

var presentationalLayer = App.define('App.presentationalLayer');

presentationalLayer.AddTaskController = function () {
    function AddTaskController($addTask) {
        _classCallCheck(this, AddTaskController);

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
    }

    _createClass(AddTaskController, [{
        key: 'plusIconClicked',
        value: function plusIconClicked(event) {
            this.task = $.extend({}, App.dataLayer.task);

            this.$addTask.toggleClass('add-task--active');

            this.$addTask.find('.add-task__form').find('input').focus();
        }
    }, {
        key: 'cancelClicked',
        value: function cancelClicked(event) {
            this.$addTask.toggleClass('add-task--active');
        }
    }, {
        key: 'addClicked',
        value: function addClicked(event) {
            var self = this;
            var $button = $(event.target);

            if (this.task.title.length) {
                $button.toggleClass('btn-default').toggleClass('btn-warning');

                this.taskService.storeTask(this.task).then(function () {
                    self.appService.taskListController.renderTask(self.task);

                    $button.closest('form').get(0).reset();
                    self.task = $.extend({}, App.dataLayer.task);
                    $button.toggleClass('btn-warning').toggleClass('btn-success');
                    setTimeout(function () {
                        $button.toggleClass('btn-success').toggleClass('btn-default');
                    }, 1000);
                }, function (response) {
                    $button.toggleClass('btn-warning').toggleClass('btn-danger');
                });
            } else {
                toastr.warning('Title is empty');
            }
        }
    }, {
        key: 'titleChanged',
        value: function titleChanged(event) {
            var $input = $(event.target);

            this.task.title = $input.val();
        }
    }, {
        key: 'deadlineClicked',
        value: function deadlineClicked(event) {
            this.$addTask.find('.add-task__deadline-input').datepicker('show');
        }
    }, {
        key: 'deadlineChanged',
        value: function deadlineChanged(event) {
            var $input = $(event.target);

            this.task.deadline = $input.val();
        }
    }, {
        key: 'priorityChanged',
        value: function priorityChanged(event) {
            var $a = $(event.target);
            if (!$a.is('a')) {
                $a = $a.closest('a');
            }

            this.task.priority = $a.data('priority');
        }
    }]);

    return AddTaskController;
}();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./index.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".add-task .add-task__icon {\n    display: inline;\n}\n.add-task.add-task--active .add-task__icon {\n    display: none;\n}\n\n.add-task .add-task__form {\n    display: none;\n}\n.add-task.add-task--active .add-task__form {\n    display: block;\n}\n\n.task-list {\n    margin-bottom: 10px;\n}\n.task-list__task {\n    padding: 5px 0;\n    border-bottom: 1px solid rgb(240, 240, 240);\n}\n.task-list__task a.task-list__task-ellipsis {\n    visibility: hidden;\n}\n.task-list__task:hover {\n    background-color: rgb(245, 245, 245);\n}\n.task-list__task:hover a.task-list__task-ellipsis {\n    visibility: visible;\n}\n\n.add-task__deadline-input {\n    width: 0;\n    max-width: 0;\n    padding: 0;\n    border: none;\n    visibility: hidden;\n}\n\n.task-list__task-state .task-list__task-priority {\n    margin-left: 5px;\n    position: relative;\n    top: -2px;\n}\n.task-list__task-state .task-list__task-priority.text-primary {\n    display: none;\n}\n\n.task-list__task--done {\n    color: rgb(220, 220, 220);\n}\n.task-list__task--done .task-list__task-priority {\n    visibility: hidden;\n}\n.task-list__task--done .task-list__task-title {\n    text-decoration: line-through;\n}\n.task-list__task--done .task-list__priority-list-item {\n    display: none;\n}\n.task-list__task--done .divider {\n    display: none;\n}", ""]);

// exports


/***/ })
/******/ ]);