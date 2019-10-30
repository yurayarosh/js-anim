const defaultParameters = {
  observer: {},
  infinite: false,
};

export default class Anim {
  constructor(el, options) {
    this.el = el;
    this.options = { ...defaultParameters, ...options };
    this.iteration = 1;
    this.delay = 1000;
    this.state = {
      enter: false,
      animating: false,
    };
  }

  init() {
    this.animate();
  }

  animateEls(entries, observer) {
    entries.forEach((entry) => {
      const el = entry.target;

      this.animationName = el.getAttribute('data-anim-name');
      if (!this.animationName) return;

      this.animationDuration = el.getAttribute('data-anim-duration') || '1s';
      this.animationDelay = el.getAttribute('data-anim-delay') || '0s';
      this.animationIterations = +el.getAttribute('data-anim-iterations');

      if (!this.state.enter) {
        el.style.opacity = '0';
      }

      if (entry.isIntersecting && !this.state.animating) {
        this.state.enter = true;
        this.state.animating = true;

        el.classList.add(this.animationName);
        el.style.animationDuration = this.animationDuration;
        el.style.animationDelay = this.animationDelay;

        this.delay = 1000
         * ((+this.animationDuration.slice(0, -1))
          + (+this.animationDelay.slice(0, -1)));

        setTimeout(() => {
          this.iteration += 1;
          el.style.opacity = '1';

          this.state.animating = false;

          if (this.animationIterations) {
            if (this.state.enter && this.animationIterations === this.iteration - 1) {
              observer.unobserve(el);
            }
          } else if (this.state.enter && !this.options.infinite) {
            observer.unobserve(el);
          }
        }, this.delay);

        if (this.onEnter) {
          this.onEnter();
        }
      } else {
        if (((this.animationIterations > 0 && !this.state.animating)
            || (this.options.infinite && !this.state.animating))
            || (!this.state.animating && !this.state.enter)) {
          el.classList.remove(this.animationName);
          el.style.animationDuration = '';
          el.style.animationDelay = '';
          el.style.opacity = '0';
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