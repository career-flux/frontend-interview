---
title: 반복문 안의 try-catch는 왜 안티패턴으로 불릴까 ?
description: 반복문 안의 try-catch가 안티패턴으로 불리게 된 배경과, 지금 기준으로 어떻게 판단하면 되는지 정리해요.
contributors: ["dango0812"]
created_at: 2026-08-08
updated_at: 2026-08-08
---

## 반복문 안의 try-catch

흔히 예외 처리를 위해 `try-catch`를 사용해요. 하지만 반복문 안에서 사용하면, 순회가 반복될 때마다 런타임의 현재 스코프에서 예외 **객체 할당을 위한 새로운 매개변수가 생성**돼요.

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

새로운 매개변수가 생성되는 코드 예시는 아래 코드를 통해 확인 할 수 있어요.

```javascript
// Bad
const errorMsg = new Error("실패");
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

**세 번 모두 같은 예외 객체**를 던졌는데도 결과가 `[0, 1, 2]`로 나와요. `error`가 하나뿐이었다면 값이 계속 덮어씌워져서 세 함수 모두 마지막 값인 2를 반환해야 해요. 결과가 다르다는 건 순회할 때마다 `error`가 새로 만들어졌다는 뜻이에요.

## 이유가 무엇일까 ?

자바스크립트의 `스코프(Scope)`와 `클로저(Closure)` 동작 방식 때문이에요.

`catch (error)` 구문은 실행될 때마다 매번 고유한 블록 스코프를 만들어내요. 순회할 때마다 `error` 매개변수가 독립된 공간을 새로 차리는 셈이죠, 그리고 그 안에서 만든 함수 `() => error`는 **선언될 당시의 스코프를 기억하는 클로저**가 돼요.

```javascript
// 일반적인 단일 스코프 (변수가 계속 덮어씌워지는 경우)
const singleScopeArr = [];
let sharedError;

for (let i = 0; i < 3; i += 1) {
  sharedError = i;
  singleScopeArr.push(() => sharedError);
}

console.log(singleScopeArr.map((fn) => fn())); // [2, 2, 2]

// --------------------------------------------------------- //

// catch 블록과 동일하게 매 순회마다 새로운 스코프가 생기는 경우
const blockScopeArr = [];

for (let i = 0; i < 3; i += 1) {
  {
    // catch(error)가 내부적으로 만드는 블록 스코프와 똑같이 동작해요.
    let scopeError = i;
    blockScopeArr.push(() => scopeError);
  }
}

console.log(blockScopeArr.map((fn) => fn())); // [0, 1, 2]
```

스코프가 하나면 값이 계속 덮어씌워져서 마지막 값인 2만 남아요. 블록 스코프로 나뉘면 각 함수가 자기가 만들어진 스코프를 붙잡고 있어서 `[0, 1, 2]`가 나와요. `catch (error)`도 두 번째 예시와 같은 방식으로 동작해요.

## 어떻게 처리해야 좋을까

반복문 안에서 `try-catch`를 직접 쓰기보다, **단일 작업을 수행하는 함수로 분리**하고 반복문에서는 그 함수를 호출하는 것이 좋아요.

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

`error`가 만들어지는 자리가 반복문에서 `doSomething` 안으로 옮겨가요. 반복문 스코프에는 `error`가 남지 않고, 예외 처리 코드는 함수 한 곳에 모여요.
