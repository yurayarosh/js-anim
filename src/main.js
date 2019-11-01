const defaultParameters = {
  observer: {},
  infinite: false,
};

class Animator {
  constructor(el, options) {
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

  getAnimationOptions() {
    this.animationDuration = +this.el.getAttribute('data-anim-duration') || this.duration;
    this.animationDelay = +this.el.getAttribute('data-anim-delay') || 0;
    this.animationIterations = +this.el.getAttribute('data-anim-iterations') || 1;
    this.animationTimingFunction = this.el.getAttribute('data-anim-ease') || 'ease';
  }

  showElement() {
    this.el.style.visibility = 'visible';
    this.el.classList.add(this.animationName);
    this.el.style.animationDuration = `${this.animationDuration}ms`;
    if (this.animationTimingFunction !== 'ease') {
      this.el.style.animationTimingFunction = this.animationTimingFunction;
    }
  }

  hideElement() {
    this.el.style.visibility = 'hidden';
    this.el.classList.remove(this.animationName);
    this.el.style.animationDuration = '';
    this.el.style.animationTimingFunction = '';
  }

  static animateEls(entries, observer) {
    entries.forEach((entry, i) => {
      const el = entry.target;
      let animator;
      if (this.animators.length < entries.length) {        
        animator = new Animator(el, this.options);
        this.animators.push(animator);
      } else {
        [animator] = this.animators.filter(obj => obj.el === el);
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

        setTimeout(() => {
          animator.showElement();
        }, animator.delay);

        setTimeout(() => {
          animator.state.animating = false;

          if (animator.iteration >= animator.animationIterations
              && !animator.options.infinite) {            
            observer.unobserve(animator.el);
            animator.showElement();
            animator.state.unobserved = true;
            if (this.onComplete) this.onComplete(animator);
          }
        }, animator.duration);

        if (this.onEnter) this.onEnter(animator);
      } else {
        if (((animator.animationIterations > 0 && !animator.state.animating)
            || (animator.options.infinite && !animator.state.animating))
            || (!animator.state.animating && !animator.state.enter)) {
              animator.hideElement();
        }

        if (animator.options.infinite) {
          animator.state.enter = false;
        } else if (!animator.state.animating) {
          animator.state.enter = false;
        } else {
          setTimeout(() => {
            animator.state.enter = false;
            if(!animator.state.unobserved) animator.hideElement();
          }, animator.duration);
        }
      }
    });
  }
}

export default class Anim {
  constructor(els, options) {
    this.els = [...els];
    this.options = { ...defaultParameters, ...options };
    this.animate = Animator.animateEls;
    this.animators = [];
  }

  observe() {
    if(!this.els.length) return;

    this.observer = new IntersectionObserver(this.animate.bind(this), this.options.observer);
    
    this.els.forEach(el => {      
      this.observer.observe(el);
    });
  }

  unobserve() {
    this.els.forEach((el, i) => {
      this.observer.unobserve(el);
      if(this.animators.length > 0) this.animators[i].showElement();
    });

    this.animators = [];
  }
}