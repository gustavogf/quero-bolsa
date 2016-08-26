var SLIDER_TEMPLAGE = '<div class="slider"> \
                        <span class="angular-sliderbar"> \
                          <span class="angular-slider-ball" ng-attr-style="left: {{pos}}px"></span> \
                          <span class="angular-slider-min"></span> \
                          <span class="angular-slider-max"></span> \
                          <span class="angular-slider-quantity" ng-attr-style="width:{{pos}}px"></span> \
                        </span> \
                      </div>';

angular.module("angular-iosui", [])
    .service()
    .directive("iosSlider", ["$document", "$timeout", function($document, $timeout){
        return {
            restrict: 'AE',
            replace: true,
            require: "?ngModel",
            template: function(element, attrs) {
                return SLIDER_TEMPLAGE;
            },
            scope: {
                ngModel: '=',
                min: '@',
                max: '@',
                value: '@',
                width: '@',
            },
            link: function(scope, elem, attrs, ngModel){
                var sliderball = elem.find("span").children()[0];
                var sliderbluebar = elem.find("span").children()[3];
                var sliderbar = elem.children()[0];
                var min, max, quantity;
                var unit;

                elem.css("width", scope.width+'px');
                $timeout(function(){
                    min = sliderbluebar.offsetLeft;
                    max = sliderbar.clientWidth-sliderball.clientWidth;
                    quantity = max-min;
                    unit = (max-min)/(scope.max-scope.min)

                    scope.pos=unit*(scope.value-scope.min) +"px";

                    ngModel.$setViewValue(Math.round(scope.value));
                }, 300);

                var quantity = max - min;
                sliderball.addEventListener("mousedown", function(e){
                    e.preventDefault();
                    if (e.touches) e = e.touches[0];
                    var beginX = e.clientX;
                    var currentPos = this.offsetLeft;

                    $document.on("mouseup", function(e){
                        $document.off("mouseup");
                        $document.off("mousemove");
                        //console.log("mouseup");
                    });

                    $document.on("mousemove", function(e){

                        position = currentPos + (e.clientX-beginX);
                        if(position <= min){
                            scope.pos = min;
                            ngModel.$setViewValue(scope.min);
                        }
                        else if(position >= max){
                            scope.pos = max;
                            ngModel.$setViewValue(scope.max);
                        }
                        else if (position > min && position <max) {
                            scope.pos = position;
                            var value = (scope.pos/unit)+parseInt(scope.min);
                            ngModel.$setViewValue(Math.round(value));
                        }
                    });
                });
            }
        }
    }]);