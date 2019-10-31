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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var defaultParameters = {
  observer: {},
  infinite: false
};

var Anim =
/*#__PURE__*/
function () {
  function Anim(el, options) {
    _classCallCheck(this, Anim);

    this.el = el;
    this.options = _objectSpread2({}, defaultParameters, {}, options);
    this.iteration = 0;
    this.duration = 1000;
    this.state = {
      enter: false,
      animating: false
    };
  }

  _createClass(Anim, [{
    key: "getAnimationOptions",
    value: function getAnimationOptions() {
      this.animationDuration = this.el.getAttribute('data-anim-duration') || '1s';
      this.animationDelay = this.el.getAttribute('data-anim-delay') || '0s';
      this.animationIterations = +this.el.getAttribute('data-anim-iterations') || 1;
      this.animationTimingFunction = this.el.getAttribute('data-anim-ease') || 'ease';
    }
  }, {
    key: "showElement",
    value: function showElement() {
      this.el.style.visibility = 'visible';
      this.el.classList.add(this.animationName);
      this.el.style.animationDuration = this.animationDuration;

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
  }, {
    key: "animateEls",
    value: function animateEls(entries, observer) {
      var _this = this;

      entries.forEach(function (entry) {
        _this.animationName = _this.el.getAttribute('data-anim-name');
        if (!_this.animationName) return;

        _this.getAnimationOptions();

        if (!_this.state.enter) {
          _this.hideElement();
        }

        if (entry.isIntersecting && !_this.state.animating) {
          _this.state.enter = true;
          _this.state.animating = true;
          _this.iteration += 1;
          _this.duration = 1000 * (+_this.animationDuration.slice(0, -1) + +_this.animationDelay.slice(0, -1));
          _this.delay = 1000 * +_this.animationDelay.slice(0, -1);
          setTimeout(function () {
            _this.showElement();
          }, _this.delay);
          setTimeout(function () {
            _this.state.animating = false;

            if (_this.iteration >= _this.animationIterations && !_this.options.infinite) {
              if (_this.onComplete) _this.onComplete();
              observer.unobserve(_this.el);

              _this.showElement();
            }
          }, _this.duration);
          if (_this.onEnter) _this.onEnter();
        } else {
          if (_this.animationIterations > 0 && !_this.state.animating || _this.options.infinite && !_this.state.animating || !_this.state.animating && !_this.state.enter) {
            _this.hideElement();
          } // if (this.onExit
          //   && this.state.enter
          //   // && !el.classList.contains(IS_ANIMATING)
          // ) {
          //   this.onExit();
          // }


          if (_this.options.infinite) {
            _this.state.enter = false;
          } else if (!_this.state.animating) {
            _this.state.enter = false;
          } else {
            setTimeout(function () {
              _this.state.enter = false;
            }, _this.duration);
          }
        }
      });
    }
  }, {
    key: "observe",
    value: function observe() {
      this.observer = new IntersectionObserver(this.animateEls.bind(this), this.options.observer);
      this.observer.observe(this.el);
    }
  }, {
    key: "unobserve",
    value: function unobserve() {
      this.observer.unobserve(this.el);
      this.showElement();
    }
  }]);

  return Anim;
}();

var Animator =
/*#__PURE__*/
function (_Anim) {
  _inherits(Animator, _Anim);

  function Animator(el, options) {
    _classCallCheck(this, Animator);

    return _possibleConstructorReturn(this, _getPrototypeOf(Animator).call(this, el, options));
  }

  _createClass(Animator, [{
    key: "onEnter",
    value: function onEnter() {
      console.log(this, 'enter');
    }
  }, {
    key: "onComplete",
    value: function onComplete() {
      console.log(this, 'complete');
    }
  }]);

  return Animator;
}(Anim);

var els = _toConsumableArray(document.querySelectorAll('.js-anim-el')); // if (!els.length) return;


els.forEach(function (el) {
  var animator = new Animator(el);
  animator.observe();
  console.log(animator, 'init'); // setTimeout(() => {
  //   animator.unobserve();
  //   console.log(animator, 'destroy');
  // }, 3000)
});
