import Anim from './main'

class Animator extends Anim {
  constructor(el, options) {
    super(el, options)
  }

  onEnter(animator) {
    console.log(this, animator, 'enter');
  }

  // onComplete(animator) {
  //   console.log(animator, 'complete');
  // }
}

const els = [...document.querySelectorAll('.js-anim-el')];
  // if (!els.length) return;

  // els.forEach((el) => {
    const animator = new Animator(els);
    animator.observe();
    
    // console.log(animator, 'init');
    

    // setTimeout(() => {
    //   animator.unobserve();

    //   console.log(animator, 'destroy');
      
    // }, 2000)
  // });



