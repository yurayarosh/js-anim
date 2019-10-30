import Anim from './main'

class Animator extends Anim {
  constructor(el, options) {
    super(el, options)
  }

  onEnter() {
    console.log(this, 'enter');
  }
}

const els = [...document.querySelectorAll('.js-anim-el')];
  // if (!els.length) return;

  els.forEach((el) => {
    const animator = new Animator(el);
    animator.init();    
  });



