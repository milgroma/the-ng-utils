angular.module('the-utils').directive('statefulClick', function (Falter) {
  return {
    restrict: 'A',
    /* Doesn't actually care about isolated scope, but these are
    useful to know:
    scope: { statefulClick: '&', statefulClass: '@'
    },*/
    link: function (scope, elem, attrs) {
      function onClick(event) {
        var cl = attrs.statefulClass || 'active';
        elem.addClass(cl);
        var ret = scope.$eval(attrs.statefulClick, { $event: event });

        if (ret && ret.then) {
          ret.then(function (res) {
            elem.removeClass(cl);
          }, function (err) {

            Falter.error(err);
            elem.removeClass(cl);
          });
        } else {
          elem.removeClass(cl);
        }
      }

      elem.on('click', onClick);

      scope.$on('$destroy', function () {
        elem.off('click', onClick);
      });
    },
  };
});
