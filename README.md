# js-anim

### Install

```html
npm i js-anim
```

```html
<div class="box js-anim-el" data-anim-name="slideRight" data-anim-iterations="4" data-anim-ease="cubic-bezier(0.19, 1, 0.22, 1)">
    
</div>
```

```js
import Anim from 'js-anim'

const els = [...document.querySelectorAll('.js-anim-el')];
if (!els.length) return;

els.forEach((el) => {
  const animator = new Anim(el);
  animator.init();    
});
```

### Options

Standart options
```js
{
  observer: {}, // intersectoinobserver options
  infinite: false, // infinite observing
}
```

### Events

```js
animator.onEnter = () => {
  // some callback
};
animator.onComplete = () => {
  // some callback
};
```
