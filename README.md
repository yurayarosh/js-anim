# animjs

### Install

```html
npm i animjs
```

```html
<div class="js-anim-el" data-anim-name="fadeIn" data-anim-iterations="4" data-anim-delay="1s">
    
</div>
```

```js
import Anim from 'animjs'

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
```
