# EnhancedSwitch

[![npm](https://img.shields.io/npm/v/enhanced-switch)](https://www.npmjs.com/package/enhanced-switch)
[![npm downloads](https://img.shields.io/npm/dt/enhanced-switch?label=downloads)](https://www.npmjs.com/package/enhanced-switch)
[![Tests](https://github.com/zefir-git/EnhancedSwitch/actions/workflows/test.yml/badge.svg)](https://github.com/zefir-git/EnhancedSwitch/actions/workflows/test.yml)
[![CodeQL](https://github.com/zefir-git/EnhancedSwitch/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/zefir-git/EnhancedSwitch/actions/workflows/github-code-scanning/codeql)

An enhanced switch, similar to Java.

This library targets Node.js 18 and 20, but can also work in the browser.

## Installation
```sh
npm i enhanced-switch
```

## Usage

### TypeScript

```js
import EnhancedSwitch from "enhanced-switch";

const value = 2;

new EnhancedSwitch(value)
    .case(1, () => console.log("one"))
    .case(2, () => console.log("two"))
    .default(() => console.log("default"));

const result = new EnhancedSwitch<number, string>(value)
    .case(1, () => "one")
    .case(2, () => "two")
    .default(() => "default").value;
```

<details>
<summary>

### JavaScript
</summary>


```js
import EnhancedSwitch from "enhanced-switch";

const value = 2;

new EnhancedSwitch(value)
    .case(1, () => console.log("one"))
    .case(2, () => console.log("two"))
    .default(() => console.log("default"));

const result = new EnhancedSwitch(value)
    .case(1, () => "one")
    .case(2, () => "two")
    .default(() => "default").value;
```
</details>
