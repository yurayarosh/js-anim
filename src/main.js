const defaultParameters = {
  observer: {},
  infinite: false,
};

export default class Anim {
  constructor(el, options) {
    this.el = el;
    this.options = { ...defaultParameters, ...options };
    this.iteration = 0;
    this.delay = 1000;
    this.state = {
      enter: false,
      animating: false,
    };
  }

  init() {
    this.animate();
  }

  getAnimationOptions() {
    this.animationDuration = this.el.getAttribute('data-anim-duration') || '1s';
    this.animationDelay = this.el.getAttribute('data-anim-delay') || '0s';
    this.animationIterations = +this.el.getAttribute('data-anim-iterations') || 1;
    this.animationTimingFunction = this.el.getAttribute('data-anim-ease') || 'ease';
  }

  showElement() {
    this.el.style.visibility = 'visible';
    this.el.classList.add(this.animationName);
    this.el.style.animationDuration = this.animationDuration;
    this.el.style.animationDelay = this.animationDelay;
    this.el.style.animationTimingFunction = this.animationTimingFunction;
  }

  hideElement() {
    this.el.style.visibility = 'hidden';
    this.el.classList.remove(this.animationName);
    this.el.style.animationDuration = '';
    this.el.style.animationDelay = '';
    this.el.style.animationTimingFunction = '';
  }

  animateEls(entries, observer) {
    entries.forEach((entry) => {
      this.animationName = this.el.getAttribute('data-anim-name');
      if (!this.animationName) return;
      this.getAnimationOptions();

      if (!this.state.enter) {
        this.hideElement();
      }

      if (entry.isIntersecting && !this.state.animating) {
        this.state.enter = true;
        this.state.animating = true;
        this.iteration += 1;

        this.showElement()

        this.delay = 1000
         * ((+this.animationDuration.slice(0, -1))
          + (+this.animationDelay.slice(0, -1)));

        setTimeout(() => {
          this.state.animating = false;

          if (this.iteration >= this.animationIterations
              && !this.options.infinite) {
            if (this.onComplete) this.onComplete();
            observer.unobserve(this.el);
            this.showElement();
          }
        }, this.delay);

        if (this.onEnter) this.onEnter();
      } else {
        if (((this.animationIterations > 0 && !this.state.animating)
            || (this.options.infinite && !this.state.animating))
            || (!this.state.animating && !this.state.enter)) {
          this.hideElement();
        }

        // if (this.onExit
        //   && this.state.enter
        //   // && !el.classList.contains(IS_ANIMATING)
        // ) {
        //   this.onExit();
        // }

        if (this.options.infinite) {
          this.state.enter = false;
        } else if (!this.state.animating) {
          this.state.enter = false;
        } else {
          setTimeout(() => {
            this.state.enter = false;
          }, this.delay);
        }
      }
    });
  }

  animate() {
    this.observer = new IntersectionObserver(this.animateEls.bind(this), this.options.observer);
    this.observer.observe(this.el);
  }
}