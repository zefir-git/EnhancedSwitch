# EnhancedSwitch

[![npm](https://img.shields.io/npm/v/enhanced-switch)](https://www.npmjs.com/package/enhanced-switch)
[![npm downloads](https://img.shields.io/npm/dt/enhanced-switch?label=downloads)](https://www.npmjs.com/package/enhanced-switch)
[![Tests](https://github.com/zefir-git/EnhancedSwitch/actions/workflows/test.yml/badge.svg)](https://github.com/zefir-git/EnhancedSwitch/actions/workflows/test.yml)
[![CodeQL](https://github.com/zefir-git/EnhancedSwitch/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/zefir-git/EnhancedSwitch/actions/workflows/github-code-scanning/codeql)

An enhanced switch, similar to Java.

This library targets Node.js 16, 18 and 20, but can also work in the browser.

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

# Documentation

<details open>
<summary>Table of Contents</summary>

- [Class `EnhancedSwitch<T, U>`](#class-enhancedswitcht-u)
  - [`new EnhancedSwitch(expression: T)`](#new-enhancedswitchexpression-t)
  - [`enhancedSwitch.allowFallthrough`](#enhancedswitchallowfallthrough)
  - [`enhancedSwitch.break()`](#enhancedswitchbreak)
  - [`enhancedSwitch.case(valueN: T | T[], code: U)`](#enhancedswitchcasevaluen-t--t-code-u)
  - [`enhancedSwitch.case(valueN: T | T[], code: (s: EnhancedSwitch<T, U>) => U | void)`](#enhancedswitchcasevaluen-t--t-code-s-enhancedswitcht-u--u--void)
  - [`enhancedSwitch.default(code: U)`](#enhancedswitchdefaultcode-u)
  - [`enhancedSwitch.default(code: (s: EnhancedSwitch<T, U>) => U | void)`](#enhancedswitchdefaultcode-s-enhancedswitcht-u--u--void)
  - [`enhancedSwitch.default(code: U, returnvalueN: true)`](#enhancedswitchdefaultcode-u-returnvaluen-true)
  - [`enhancedSwitch.default(code: (s: EnhancedSwitch<T, U>) => U | void, returnvalueN: true)`](#enhancedswitchdefaultcode-s-enhancedswitcht-u--u--void-returnvaluen-true)
  - [`enhancedSwitch.expression`](#enhancedswitchexpression)
  - [`enhancedSwitch.hasConcluded`](#enhancedswitchhasconcluded)
  - [`enhancedSwitch.value`](#enhancedswitchvalue)

## Class `EnhancedSwitch<T, U>`

The EnhancedSwitch evaluates an expression, matching the expression's value against a series of `case` clauses, and executes the statements after the first `case` clause with a matching value. The `default` clause of an EnhancedSwitch will be jumped to if no case matches the expression's value.

| Template parameter | Description            |
|--------------------|------------------------|
| `T`                | Switch expression type |
| `U`                | Switch return type     |

### `new EnhancedSwitch(expression: T)`

Create a new EnhancedSwitch

| Parameter    | Type | Description                                                       |
|--------------|------|-------------------------------------------------------------------|
| `expression` | `T`  | An expression whose result is matched against each `case` clause. |

### `enhancedSwitch.allowFallthrough`

Whether to allow fallthrough. If true, the switch will continue to execute `case` clauses after the first match until a `break` is encountered. Defaults to false.

Type: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean). Read-only.

### `enhancedSwitch.break()`

Prevent further execution of any subsequent `case` or `default` clauses.

Returns: `this` ([`EnhancedSwitch<T, U>`](#class-enhancedswitcht-u))

### `enhancedSwitch.case(valueN: T | T[], code: U)`

A `case` clause used to match against `expression`. If the `expression` matches the specified `valueN` (which can be any expression), this case clause is executed.

| Parameter | Type | Description                                                                                                    |
|-----------|------|----------------------------------------------------------------------------------------------------------------|
| `valueN`  | `T`  | The `case` clause is executed if the expression matches this value, or at least one value if this is an array. |
| `code`    | `U`  | The value to return if the case matches.                                                                       |

Returns: `this` ([`EnhancedSwitch<T, U>`](#class-enhancedswitcht-u))

### `enhancedSwitch.case(valueN: T | T[], code: (s: EnhancedSwitch<T, U>) => U | void)`

A `case` clause used to match against `expression`. If the `expression` matches the specified `valueN` (which can be any expression), this case clause is executed.

| Parameter | Type                                     | Description                                                                                                    |
|-----------|------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| `valueN`  | `T`                                      | The `case` clause is executed if the expression matches this value, or at least one value if this is an array. |
| `code`    | `(s: EnhancedSwitch<T, U>) => U \| void` | The function to run if the case matches.                                                                       |

Returns: `this` ([`EnhancedSwitch<T, U>`](#class-enhancedswitcht-u))

### `enhancedSwitch.default(code: U)`

A `default` clause; if provided, this clause is executed if the value of `expression` does not match any of the `case` clauses. An EnhancedSwitch can only have one `default` clause.

| Parameter | Type | Description                             |
|-----------|------|-----------------------------------------|
| `code`    | `U`  | The value to return if no case matches. |

Returns: `this` ([`EnhancedSwitch<T, U>`](#class-enhancedswitcht-u))

### `enhancedSwitch.default(code: (s: EnhancedSwitch<T, U>) => U | void)`

A `default` clause; if provided, this clause is executed if the value of `expression` does not match any of the `case` clauses. An EnhancedSwitch can only have one `default` clause.

| Parameter | Type                                     | Description                              |
|-----------|------------------------------------------|------------------------------------------|
| `code`    | `(s: EnhancedSwitch<T, U>) => U \| void` | The function to run if no case matches.  |

Returns: `this` ([`EnhancedSwitch<T, U>`](#class-enhancedswitcht-u))

### `enhancedSwitch.default(code: U, returnvalueN: true)`

A `default` clause; if provided, this clause is executed if the value of `expression` does not match any of the `case` clauses. An EnhancedSwitch can only have one `default` clause.

| Parameter      | Type   | Description                                                             |
|----------------|--------|-------------------------------------------------------------------------|
| `code`         | `U`    | The value to return if no case matches.                                 |
| `returnvalueN` | `true` | If true, the provided value is returned instead of the switch instance. |

Returns: `U`

### `enhancedSwitch.default(code: (s: EnhancedSwitch<T, U>) => U | void, returnvalueN: true)`

A `default` clause; if provided, this clause is executed if the value of `expression` does not match any of the `case` clauses. An EnhancedSwitch can only have one `default` clause.

| Parameter      | Type                                     | Description                                                             |
|----------------|------------------------------------------|-------------------------------------------------------------------------|
| `code`         | `(s: EnhancedSwitch<T, U>) => U \| void` | The function to run if no case matches.                                 |
| `returnvalueN` | `true`                                   | If true, the provided value is returned instead of the switch instance. |

Returns: `U`

### `enhancedSwitch.expression`

An expression whose result is matched against each `case` clause.

Type: `T`. Read-only.

### `enhancedSwitch.hasConcluded`

Whether the switch statement has concluded (no further `case` or `default` will be executed). A switch can be concluded by calling [`enhancedSwitch.break()`](#enhancedswitchbreak) or constructing with `allowFallthrough` set to false.

Type: [`boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean). Read-only.

### `enhancedSwitch.value`

The result of the switch statement.

| Throws                                                                                                    | When                                                                                                                                     |
|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) | If the switch statement has no result, e.g. there is no `default` clause and no `case` clause matches the expression or returns a value. |

Type: `U`. Read-only.
