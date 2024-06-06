## ProgressBlock Component

This is a custom HTML element that renders a circular progress chart.

For use this custom element copy folder 'progressBlock' to project and import file 'progressBlock.js' to script.

The actual progress, animation, and visibility of the chart are controlled by the 'value', 'animate', and 'hide' attributes.

Attributes:

- value (number): The progress value. This should be a number between 0 and 100.
- animate (boolean): Add animation to progress block.
- hide (boolean): Control the visibility of the progress block.

---

_Example usage:_

```html
<progress-block value="60" animate></progress-block>
```
