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
    this.iteration = 1;
    this.delay = 1000;
    this.state = {
      enter: false,
      animating: false
    };
  }

  _createClass(Anim, [{
    key: "init",
    value: function init() {
      this.animate();
    }
  }, {
    key: "animateEls",
    value: function animateEls(entries, observer) {
      var _this = this;

      entries.forEach(function (entry) {
        var el = entry.target;
        _this.animationName = el.getAttribute('data-anim-name');
        if (!_this.animationName) return;
        _this.animationDuration = el.getAttribute('data-anim-duration') || '1s';
        _this.animationDelay = el.getAttribute('data-anim-delay') || '0s';
        _this.animationIterations = +el.getAttribute('data-anim-iterations');

        if (!_this.state.enter) {
          el.style.opacity = '0';
        }

        if (entry.isIntersecting && !_this.state.animating) {
          _this.state.enter = true;
          _this.state.animating = true;
          el.classList.add(_this.animationName);
          el.style.animationDuration = _this.animationDuration;
          el.style.animationDelay = _this.animationDelay;
          _this.delay = 1000 * (+_this.animationDuration.slice(0, -1) + +_this.animationDelay.slice(0, -1));
          setTimeout(function () {
            _this.iteration += 1;
            el.style.opacity = '1';
            _this.state.animating = false;

            if (_this.animationIterations) {
              if (_this.state.enter && _this.animationIterations === _this.iteration - 1) {
                observer.unobserve(el);
              }
            } else if (_this.state.enter && !_this.options.infinite) {
              observer.unobserve(el);
            }
          }, _this.delay);

          if (_this.onEnter) {
            _this.onEnter();
          }
        } else {
          if (_this.animationIterations > 0 && !_this.state.animating || _this.options.infinite && !_this.state.animating || !_this.state.animating && !_this.state.enter) {
            el.classList.remove(_this.animationName);
            el.style.animationDuration = '';
            el.style.animationDelay = '';
            el.style.opacity = '0';
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
            }, _this.delay);
          }
        }
      });
    }
  }, {
    key: "animate",
    value: function animate() {
      this.observer = new IntersectionObserver(this.animateEls.bind(this), this.options.observer);
      this.observer.observe(this.el);
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
  }]);

  return Animator;
}(Anim);

var els = _toConsumableArray(document.querySelectorAll('.js-anim-el')); // if (!els.length) return;


els.forEach(function (el) {
  var animator = new Animator(el);
  animator.init();
});
