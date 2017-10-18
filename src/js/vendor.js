if (process.env.inProduction) {
    require('bootstrap/dist/css/bootstrap.min.css');
    require('bootstrap/dist/css/bootstrap-theme.min.css');
    require('font-awesome/css/font-awesome.min.css');
    require('jquery-ui/themes/base/all.css');
    require('toastr/build/toastr.min.css');
} else {
    require('bootstrap/dist/css/bootstrap.css');
    require('bootstrap/dist/css/bootstrap-theme.css');
    require('font-awesome/css/font-awesome.css');
    require('jquery-ui/themes/base/all.css');
    require('toastr/build/toastr.css');
}

window.$ = window.jQuery = require('jquery');
require('jquery-ui/ui/widgets/datepicker');

if (process.env.inProduction) {
    require('bootstrap/dist/js/bootstrap.min');
    window.toastr = require('toastr/build/toastr.min');
} else {
    require('bootstrap/dist/js/bootstrap');
    window.toastr = require('toastr');
}