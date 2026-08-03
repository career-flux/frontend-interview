# 기여 가이드

English version is available at [CONTRIBUTING.md](./CONTRIBUTING.md).

프로젝트에 관심을 가져주셔서 감사합니다.  
프로젝트 기여할 수 있는 방법은 두 가지로 분류됩니다.

1. **콘텐츠 추가/개선**
2. **사이트 개발 참여/버그 수정**

## 콘텐츠 추가/개선

콘텐츠는 [content/ko](./content/ko/) [content/en](./content/en/) 경로에 위치되어 있어요.

### 폴더 이름이 카테고리로 사용되고 있어요. (category)

```
📦content
 ┣ 📂ko
 ┃ ┣ 📂javascript
 ┃ ┗ 📂react
```

※ 새 카테고리(예: `example`)를 추가하면 자동으로 목록에 추가돼요.

### 파일명이 URL 경로가 되므로, 내용을 쉽게 파악할 수 있는 `kebab-case`를 사용해 주세요. (slug)

```
📦content
 ┣ 📂ko
 ┃ ┣ 📂javascript
 ┃ ┃ ┗ 📜var-let-const.md
```

※ 위 예시처럼 파일명이 `var-let-const.md`라면, 주소는 `https://.../javascript/var-let-const`가 돼요.

### 번역본 (locale)

콘텐츠는 확장 대비하여 영문, 한국어 두 가지 언어로 관리되고 있어요.  
기여할 때는 `두 가지 버전 모두 작업`이 되어야 해요. (번역기를 사용해도 괜찮아요.)

※ Reddit과 같은 해외 커뮤니티에 공유하여 다른 언어의 버전이 자연스럽게 기여가 진행되도록 하기 위함이에요.

### 콘텐츠 작성

콘텐츠는 기여자가 누구인지 표시하기 위하여 다음과 같은 템플릿을 사용하고 있어요.

```md
---
title: "React 샘플 질문"
description: "React 카테고리의 샘플 질문입니다."
contributors: ["dango0812"]
created_at: "2026-07-23"
updated_at: "2026-07-24"
---
```

※ 콘텐츠 수정 시, 기존 `contributors`는 남겨두고 `기여자의 GitHub ID를 추가`해 주세요.  
Ex: ["dango0812", "dango0912"]  
※ `title`은 `h1` 태그로 사용되고 있어요. 그렇기에 `콘텐츠 작업 시 *#* 태그`를 사용하지 말아주세요.

### 사이트 개발 참여/버그 수정

- 저장소는 [Conventional Commits](https://www.conventionalcommits.org/) 규칙을 따르고 있어요.
- 저장소는 main 브랜치로 작업을 못 하게 설정되어 있어요. 브랜치를 만들어서 진행해 주세요.
- Pull Request를 진행하면 템플릿이 자동으로 채워져요.
- 하나의 PR에는 하나의 주제만 담아주세요. (질문/기능/버그 수정 등)

```sh
$ pnpm install
$ pnpm dev
```
