# use-popper-placement

A custom [React Hook](https://reactjs.org/docs/hooks-overview.html) that automagically places your popper (dropdown, tooltip, etc.) inline with your desired trigger.

`use-popper-placement` accepts two `refObjects`, a `trigger` and `popper`,
and will automagically align your popper with the trigger.

## Features

⏳ Saves you time by handling all the annoying logic for you

⭐️ Flexibilty to make your own poppers, super light weight (see demos)

## Requirement

To use `use-popper-placement`, you must use `react@16.8.0` or greater which includes Hooks.

## Installation

```sh
$ yarn add use-popper-placement
// or
$ npm i use-popper-placement
```

## Example

```js
import { useRef } from 'react';

const SomeComponent = () => {
  const trigger = useRef(null);
  const popper = useRef(null);
  usePopperPlacement({ trigger, popper });

  return {
    <div ref={trigger}>
      Hello CodeSandbox
      <span ref={popper}>
        Start editing to see some magic happen!
      </span>
    </div>
  };
};

export default SomeComponent;
```

## FULL API

#### `usePopperPlacement({ trigger, popper, direction, margin, resizeOptions }): void`

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
