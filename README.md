# js-anim

### Install

```html
npm i js-anim
```

```html
<div class="box js-anim-el" data-anim-name="slideRight" data-anim-iterations="4" data-anim-delay="200" data-anim-duration="750" data-anim-ease="cubic-bezier(0.19, 1, 0.22, 1)">
    
</div>
```

```js
import Anim from 'js-anim'

const els = document.querySelectorAll('.js-anim-el');

const anim = new Anim(els);
anim.observe();
```

### Options

Standart options
```js
{
  observer: {}, // intersectoinobserver options
  infinite: false, // infinite observing
}
```

### Methods

```js
anim.onEnter = (animator) => {
  // some callback
};
anim.onComplete = (animator) => {
  // some callback
};
anim.unobserve();
```
