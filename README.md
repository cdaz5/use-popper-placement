# use-popper-placement

A custom [React Hook](https://reactjs.org/docs/hooks-overview.html) that automagically places your popper (dropdown, tooltip, etc.) inline with your desired trigger (top, bottom, left, or right).

`use-popper-placement` accepts two `refObjects`, a `trigger` and `popper`,
and will automagically align your popper with the trigger. See [DEMO](https://codesandbox.io/s/use-popper-placement-demo-oslzc?file=/src/App.js) for custom tooltip and dropdown examples).

## Features

⏳ Saves you time by handling all the annoying positioning logic for you.

⭐️ Flexibility to make your own custom tooltips, dropdowns, etc.

## Requirement

To use `use-popper-placement`, you must use `react@16.8.0` or greater which includes Hooks.

## Installation

```sh
$ yarn add use-popper-placement
// or
$ npm i use-popper-placement
```

## Example

_NOTE:_ it's important to set the popper's `position` to `fixed` (see [DEMO's](https://codesandbox.io/s/use-popper-placement-demo-oslzc?file=/src/App.js) for custom tooltip and dropdown examples).

```js
import { useRef } from 'react';

const SomeComponent = () => {
  const trigger = useRef(null);
  const popper = useRef(null);
  usePopperPlacement({ trigger, popper });

  return {
    <div ref={trigger}>
      I'm a trigger
      <span ref={popper} style={{ position: 'fixed' }}>
        I'm a popper!
      </span>
    </div>
  };
};

export default SomeComponent;
```

## FULL API

#### `usePopperPlacement({ trigger, popper, direction, margin, resizeOptions }): { placePopper: () => void; }`

### `placePopper: () => void;`

- if for any reason your popper can move around, using the `placePopper` function (returned from the `usePopperPlacement` hook) will give you the ability to trigger recomputing it's placement on the fly.
- **use-case**: you have an element(s) that has a tooltip inside a container that can scroll, the original dimensions/placement will be incorrect as the user scrolls. In order to account for this you could put a `scroll` listener on the container and create a debounced `placePopper` as the callback (don't forget to remove the listener on unmount!).

### `trigger: RefObject`

- a ref to the trigger element.

### `popper: RefObject`

- a ref to the popper element.

### `direction: 'top' | 'bottom' | 'left' | 'right'`

- defaults to `'top'`.

### `margin: number`

- distance (in `px`) the popper will appear from the trigger.
- defaults to `8`.

### `resizeOptions: { handleResize: boolean; debounce: number }`

- if you would like to update the placement on window resize use this option.
- defaults to `{ handleResize: false, debounce: 500 }`.

## License

**[MIT](LICENSE)** Licensed

## Contributors

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
