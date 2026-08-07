---
title: Why is try-catch inside a loop called an anti pattern?
description: Let's summarize the background of why try-catch inside a loop became an anti pattern, and how to evaluate it based on modern standards.
contributors: ["dango0812"]
created_at: 2026-08-08
updated_at: 2026-08-08
---

## try-catch inside a loop

We often use `try-catch` for exception handling. However, if you use it inside a loop, a new parameter is created in the current scope of the runtime to allocate the exception object for every iteration.

```javascript
// Bad
const { length } = array;

for (let i = 0; i < length; i += 1) {
  try {
    ...
  } catch (error) {
    ...
  }
}
```

You can see how a new parameter is created through the example code below.

```javascript
// Bad
const errorMsg = new Error("fail");
const arr = [];

for (let i = 0; i < 3; i += 1) {
  try {
    throw errorMsg;
  } catch (error) {
    arr.push(() => error);
    error = i;
  }
}

console.log(arr.map((fn) => fn())); // [0, 1, 2]
```

Even though the exact same exception object is thrown all three times, the result is `[0, 1, 2]`. If there were only one `error` variable, the value would be continuously overwritten, and all three functions should return 2, which is the last value. The fact that the result is different means a new `error` was created on every iteration.

## What is the reason?

This is due to how `Scope` and `Closure` work in JavaScript.

The `catch (error)` statement creates a unique block scope every time it executes. It is as if the `error` parameter sets up a new, independent space during each iteration. And the function `() => error` created inside it becomes a closure that remembers the scope at the time it was declared.

```javascript
// Standard single scope (when the variable keeps getting overwritten)
const singleScopeArr = [];
let sharedError;

for (let i = 0; i < 3; i += 1) {
  sharedError = i;
  singleScopeArr.push(() => sharedError);
}

console.log(singleScopeArr.map((fn) => fn())); // [2, 2, 2]

// --------------------------------------------------------- //

// When a new scope is created for every iteration, identical to a catch block
const blockScopeArr = [];

for (let i = 0; i < 3; i += 1) {
  {
    // This behaves exactly like the block scope internally created by catch(error).
    let scopeError = i;
    blockScopeArr.push(() => scopeError);
  }
}

console.log(blockScopeArr.map((fn) => fn())); // [0, 1, 2]
```

If there is only one scope, the value keeps getting overwritten, leaving only the last value, 2. When divided into block scopes, each function holds onto the scope where it was created, resulting in `[0, 1, 2]`. `catch (error)` operates in the exact same way as the second example.

## How should we handle this?

Rather than using `try-catch` directly inside a loop, it is better to separate it into a function that performs a single task and call that function inside the loop.

```javascript
// Good
const { length } = array;

function doSomething() {
  try {
    ...
  } catch (error) {
    ...
  }
}

for (let i = 0; i < length; i += 1) {
  doSomething();
}
```

The place where `error` is created moves from the loop into the `doSomething` function. No `error` remains in the loop scope, and the exception handling code is gathered neatly in one place within the function.
