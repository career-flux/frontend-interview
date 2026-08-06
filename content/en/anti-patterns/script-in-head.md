---
title: Why should <script> go at the bottom of the document?
description: Why script tags belong near the end of the body, and why defer is the better choice today traced through how the browser parses a page.
contributors: ["dango0812"]
created_at: 2026-08-05
updated_at: 2026-08-05
---

## Where should the script tag go?

It's common to gather external files like CSS and JavaScript inside the `<head>` tag, but that isn't a good approach. When the browser hits a script while rendering the page, it stops, downloads the file, and goes through parsing and compiling which delays rendering.

## How the browser reads HTML

The browser reads HTML line by line from the top, preparing to paint as it goes. When it runs into a `<script>`, it stops what it was doing.

```
Reading HTML → <script> found → paused
  → download file → parse code → execute → resume reading HTML
```

It pauses because the script might insert elements with `document.write()` or modify the DOM. The browser has no way of knowing what the script will do, so it has no choice but to wait.

The problem is that the user is staring at a blank screen the whole time. The larger the script file and the slower the network, the longer this lasts and the more rendering is delayed.

## Why we put it at the bottom of the body

Placing it right before the closing `</body>` tag means the browser reaches the script only after it has read the whole document.

```html
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

With this layout, **the content that needs to be visible is painted first, and the scripts run afterward.** The user sees the screen far sooner than they would if the scripts sat in the `<head>`.

There's still a downside, though: **the browser finds out about the scripts too late.** It only learns which files it needs to fetch after reading all the way to the end, so the longer the document, the later the download starts. The `defer` attribute solves exactly this.

## Using the defer attribute

With `defer`, the download runs alongside HTML parsing, so parsing never stops.

```html
<head>
  <link rel="stylesheet" href="../css/style.css" />

  <script defer src="../js/jquery-3.3.1.min.js"></script>
  <script defer src="../js/common.js"></script>
  <script defer src="../js/applicationMain.js"></script>
</head>
```

- **Execution happens after the HTML has been fully read.**
- Even with several scripts, they run **in the order they're written.**

## defer vs async

Unlike `defer`, `async` **runs whichever file finishes downloading first, so the order isn't guaranteed.**
Because the order shifts with file size and network conditions, use it only for scripts that stand on their own. Analytics and advertising scripts are the usual case.

## CSS belongs in the head

Unlike JavaScript, CSS should stay in the `<head>`.

The reason is that the browser treats the two resources differently.
CSS doesn't block HTML parsing it only holds back the painting step. JavaScript, on the other hand, halts parsing itself.

Putting CSS near the bottom causes **an unstyled screen** to flash briefly before the styles kick in. This is called **FOUC (Flash of Unstyled Content).**

```html
<head>
  <link rel="stylesheet" href="style.css" />
  <!-- CSS goes up here -->
  <script defer src="main.js"></script>
  <!-- JS uses defer -->
</head>
```

## Common interview questions

<details>
    <summary>
        <b>Q. Why do we place the script element just before the closing body tag?</b>
    </summary>

When HTML parsing reaches a `<script>` tag, parsing stops and resumes only after the script has been downloaded and executed. This happens because the script may modify the DOM, so the browser cannot process what comes next ahead of time.

Placing it right before `</body>` pushes that interruption to the point where the document has already been read, so the elements that need to be visible are painted first. Since parsing is complete by then, the script can also access the DOM safely.

</details>

<details>
    <summary>
        <b>Q. What is the difference between the defer and async attributes?</b>
    </summary>

`defer` runs after HTML parsing has fully finished, in the order the scripts are written.

`async`, by contrast, runs as soon as the download completes, so execution order is not guaranteed and shifts with file size and network conditions.

For that reason, `defer` is the right choice when there are dependencies between scripts, while `async` suits independent ones such as analytics or advertising.

</details>
