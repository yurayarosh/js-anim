import Anim from './main'

class Animator extends Anim {
  constructor(el, options) {
    super(el, options)
  }

  onEnter() {
    console.log(this, 'enter');
  }

  onComplete() {
    console.log(this, 'complete');
  }
}

const els = [...document.querySelectorAll('.js-anim-el')];
  // if (!els.length) return;

  els.forEach((el) => {
    const animator = new Animator(el);
    animator.observe();
    console.log(animator, 'init');
    

    // setTimeout(() => {
    //   animator.unobserve();

    //   console.log(animator, 'destroy');
      
    // }, 3000)
  });



