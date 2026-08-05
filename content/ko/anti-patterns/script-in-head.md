---
title: <script>는 왜 문서 하단에 포함해야 할까?
description: body 문서 하단에 script를 왜 넣어야 하는지, 그리고 지금은 왜 defer가 더 나은 선택인지 파싱과 과정을 따라가며 정리해요.
contributors: ["dango0812"]
created_at: 2026-08-05
updated_at: 2026-08-05
---

## script 태그는 어디에 넣어야 할까 ?

CSS나 자바스크립트 같은 외부 파일을 `<head>` 태그 안에 모아놓는 경우가 많은데 이는 좋은 방법이 아니에요. 브라우저는 페이지를 렌더링하는 과정에서 스크립트를 만나면 렌더링을 멈추고 이 요소들을 내려받고 분석 및 컴파일하는 과정이 일어나기 때문에 렌더링이 지연돼요.

## 브라우저가 HTML을 읽는 순서

브라우저는 HTML을 아래로 한 줄씩 읽으면서 화면에 그릴 준비를 해요. 그러다 `<script>`를 만나면 하던 일을 멈추게 돼요.

```
HTML 읽는 중 → <script> 발견 → 멈춤
  → 파일 다운로드 → 코드 분석 → 실행 → 다시 HTML 읽기
```

이렇게 멈추는 이유는 스크립트가 `document.write()`로 HTML 요소를 추가하거나 DOM을 바꿀 수 있기 때문이고, 브라우저 입장에선 스크립트가 뭘 할지 모르니 기다릴 수밖에 없는 거예요.

문제는 이 시간 동안 사용자가 빈 화면을 보고 있게 된다는 점이에요. 스크립트 파일이 클수록, 네트워크가 느릴수록 이 시간이 길어지면서 렌더링이 지연돼요.

## body 태그 하단에 넣는 이유

HTML 문서를 다 읽고 나서 스크립트를 만나게 하려고 `<body> 태그 직전`에 넣는 거예요.

```
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="../css/style.css" />
  </head>
  <body>
    <div id="app">...</div>

    <script src="../js/jquery-3.3.1.min.js"></script>
    <script src="../js/common.js"></script>
    <script src="../js/applicationMain.js"></script>
  </body>
</html>
```

이렇게 배치하면 **화면에 보여야 할 내용이 먼저 그려지고 스크립트는 그 뒤에 실행**돼요. `<head>`에 넣었을 때보다 사용자가 화면을 훨씬 빨리 보게 되는 거예요.

하지만 `<body>` 태그 하단에 넣었을 때 부족한 점은 브라우저가 **스크립트의 존재를 너무 늦게 알게되는 것**이에요. HTML을 끝까지 다 읽어야 비로소 받아야 할 파일이 있다는 걸 알게 되니까, 문서가 길수록 다운로드 시작 시점도 그만큼 밀려요. 이러한 문제를 개선하기 위해 `defer` 속성을 붙이는 방법이 있어요.

## defer 속성 사용

`defer` 속성이 붙게되면 HTML을 읽는 동안 동시에 진행돼서 파싱이 멈추지 않아요.

```
<head>
  <link rel="stylesheet" href="../css/style.css" />

  <script defer src="../js/jquery-3.3.1.min.js"></script>
  <script defer src="../js/common.js"></script>
  <script defer src="../js/applicationMain.js"></script>
</head>
```

- **실행은 HTML을 모두 읽은 뒤**에 일어나요.
- 여러 개를 붙여도 **작성한 순서대로 실행**돼요.

## defer / async 차이

`async`는 `defer`와 다르게 **먼저 받아진 파일이 실행돼요. 그렇기에 순서가 보장되지 않아요.**
파일 크기와 네트워크 상황에 따라 순서가 매번 달라지기 때문에, 다른 코드와 상관없이 혼자 동작하는 스크립트에만 사용해요. 분석 도구나 광고 스크립트를 넣을 때 주로 사용해요.

## CSS는 head 태그에 위치해야 해요

자바스크립트와 달리 CSS는 `<head>` 태그에 위치해야 해요.

그 이유는 브라우저가 두 리소스를 다루는 방식이 다르기 때문이에요.  
CSS는 HTML 파싱을 막지 않고 화면에 그리는 단계만 기다리게 해요. 그러나, 자바스크립트는 HTML 파싱이 멈추게 돼요.

CSS를 아래쪽에 두면 **스타일이 적용되지 않은 화면**이 잠깐 보였다가 바뀌는 현상이 생겨요. 이걸 **FOUC(Flash of Unstyled Content)** 라고 불러요.

```
<head>
  <link rel="stylesheet" href="style.css" />   <!-- CSS는 위에 -->
  <script defer src="main.js"></script>        <!-- JS는 defer로 -->
</head>
```

## 면접에서는 이렇게 나와요

<details>
    <summary>
        <b>Q. 자바스크립트를 불러올 때 script 요소를 body 요소가 끝나기 전에 배치하는 이유는 무엇인가요?</b>
    </summary>

HTML 파싱 중 `<script>` 태그를 만나면 파싱이 멈추고, 스크립트 다운로드와 실행이 끝나야 다시 진행됩니다. 스크립트가 DOM을 바꿀 수 있어 브라우저가 이후 내용을 미리 처리할 수 없기 때문입니다.

`</body>` 직전에 두면 이 중단이 문서를 다 읽은 뒤에 일어나므로, 화면에 보여야 할 요소가 먼저 그려집니다. 파싱이 끝난 상태라 스크립트가 DOM에 접근할 때도 안전합니다.

</details>

<details>
    <summary>
        <b>Q. defer와 async 속성의 차이를 설명해 주세요.</b>
    </summary>

`defer`는 HTML 파싱이 모두 끝난 뒤, 작성된 순서대로 실행됩니다.

반대로 `async`는 다운로드가 완료되는 즉시 실행되므로 파일 크기와 네트워크 상황에 따라 실행 순서가 보장되지 않습니다.

따라서 의존 관계가 있으면 `defer` 속성을 사용하고, 분석 도구나 광고 등 독립적 스크립트에는 `async` 속성을 사용합니다.

</details>
