'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var defaultParameters = {
  observer: {},
  infinite: false
};

var Animator =
/*#__PURE__*/
function () {
  function Animator(el, options) {
    _classCallCheck(this, Animator);

    this.el = el;
    this.options = options;
    this.iteration = 0;
    this.duration = 1000;
    this.state = {
      enter: false,
      animating: false,
      unobserved: false
    };
  }

  _createClass(Animator, [{
    key: "getAnimationOptions",
    value: function getAnimationOptions() {
      this.animationDuration = +this.el.getAttribute('data-anim-duration') || this.duration;
      this.animationDelay = +this.el.getAttribute('data-anim-delay') || 0;
      this.animationIterations = +this.el.getAttribute('data-anim-iterations') || 1;
      this.animationTimingFunction = this.el.getAttribute('data-anim-ease') || 'ease';
    }
  }, {
    key: "showElement",
    value: function showElement() {
      this.el.style.visibility = 'visible';
      this.el.classList.add(this.animationName);
      this.el.style.animationDuration = "".concat(this.animationDuration, "ms");

      if (this.animationTimingFunction !== 'ease') {
        this.el.style.animationTimingFunction = this.animationTimingFunction;
      }
    }
  }, {
    key: "hideElement",
    value: function hideElement() {
      this.el.style.visibility = 'hidden';
      this.el.classList.remove(this.animationName);
      this.el.style.animationDuration = '';
      this.el.style.animationTimingFunction = '';
    }
  }], [{
    key: "animateEls",
    value: function animateEls(entries, observer) {
      var _this = this;

      entries.forEach(function (entry, i) {
        var el = entry.target;
        var animator;

        if (_this.animators.length < entries.length) {
          animator = new Animator(el, _this.options);

          _this.animators.push(animator);
        } else {
          var _this$animators$filte = _this.animators.filter(function (obj) {
            return obj.el === el;
          });

          var _this$animators$filte2 = _slicedToArray(_this$animators$filte, 1);

          animator = _this$animators$filte2[0];
        }

        animator.animationName = el.getAttribute('data-anim-name');
        if (!animator.animationName) return;
        animator.getAnimationOptions();

        if (!animator.state.enter) {
          animator.hideElement();
        }

        if (entry.isIntersecting && !animator.state.animating) {
          animator.state.enter = true;
          animator.state.animating = true;
          animator.iteration += 1;
          animator.duration = animator.animationDuration + animator.animationDelay;
          animator.delay = animator.animationDelay;
          setTimeout(function () {
            animator.showElement();
          }, animator.delay);
          setTimeout(function () {
            animator.state.animating = false;

            if (animator.iteration >= animator.animationIterations && !animator.options.infinite) {
              observer.unobserve(animator.el);
              animator.showElement();
              animator.state.unobserved = true;
              if (_this.onComplete) _this.onComplete(animator);
            }
          }, animator.duration);
          if (_this.onEnter) _this.onEnter(animator);
        } else {
          if (animator.animationIterations > 0 && !animator.state.animating || animator.options.infinite && !animator.state.animating || !animator.state.animating && !animator.state.enter) {
            animator.hideElement();
          }

          if (animator.options.infinite) {
            animator.state.enter = false;
          } else if (!animator.state.animating) {
            animator.state.enter = false;
          } else {
            setTimeout(function () {
              animator.state.enter = false;
              if (!animator.state.unobserved) animator.hideElement();
            }, animator.duration);
          }
        }
      });
    }
  }]);

  return Animator;
}();

var Anim =
/*#__PURE__*/
function () {
  function Anim(els, options) {
    _classCallCheck(this, Anim);

    this.els = _toConsumableArray(els);
    this.options = _objectSpread2({}, defaultParameters, {}, options);
    this.animate = Animator.animateEls;
    this.animators = [];
  }

  _createClass(Anim, [{
    key: "observe",
    value: function observe() {
      var _this2 = this;

      if (!this.els.length) return;
      this.observer = new IntersectionObserver(this.animate.bind(this), this.options.observer);
      this.els.forEach(function (el) {
        _this2.observer.observe(el);
      });
    }
  }, {
    key: "unobserve",
    value: function unobserve() {
      var _this3 = this;

      this.els.forEach(function (el, i) {
        _this3.observer.unobserve(el);

        if (_this3.animators.length > 0) _this3.animators[i].showElement();
      });
      this.animators = [];
    }
  }]);

  return Anim;
}();

var Animator$1 =
/*#__PURE__*/
function (_Anim) {
  _inherits(Animator, _Anim);

  function Animator(el, options) {
    _classCallCheck(this, Animator);

    return _possibleConstructorReturn(this, _getPrototypeOf(Animator).call(this, el, options));
  }

  _createClass(Animator, [{
    key: "onEnter",
    value: function onEnter(animator) {
      console.log(this, animator, 'enter');
    } // onComplete(animator) {
    //   console.log(animator, 'complete');
    // }

  }]);

  return Animator;
}(Anim);

var els = document.querySelectorAll('.js-anim-el'); // if (!els.length) return;
// els.forEach((el) => {

var animator = new Animator$1(els, {
  observer: {// threshold: 0.5
  }
});
animator.observe(); // console.log(animator, 'init');
// setTimeout(() => {
//   animator.unobserve();
//   console.log(animator, 'destroy');
// }, 2000)
// });
