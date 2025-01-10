---
layout: post
title: "Jekyll과 Bootstrap SCSS 스타일 문제 해결하기"
subtitle: "GitHub Pages 배포 시 발생하는 스타일 충돌 해결 방법"
background: '/img/posts/06.jpg'
categories: [Web Development]
tags: [jekyll, bootstrap, scss, github-pages]
toc: true
toc_label: "목차"
toc_sticky: true
---

# Jekyll과 Bootstrap SCSS 스타일 문제

로컬 환경에서 Jekyll 블로그를 개발하다 보면 가끔 스타일링 관련 문제가 발생합니다. 특히 Bootstrap SCSS를 사용할 때 이런 문제가 두드러지게 나타납니다.

## 문제 상황

일반적으로 발생하는 문제들은 다음과 같습니다:

### 1. 폰트 크기 오버라이드 문제

Bootstrap의 기본 폰트 크기가 우리가 설정한 스타일을 덮어쓰는 경우가 있습니다.

### 2. 여백과 정렬 문제

마진과 패딩이 로컬 환경과 다르게 적용되는 현상이 발생합니다.

## 해결 방법

### 1. Bootstrap Mixin 활용하기

Bootstrap의 mixin을 활용하면 이런 문제를 해결할 수 있습니다.

### 2. 스타일 우선순위 조정

CSS 선택자의 우선순위를 조정하여 문제를 해결할 수 있습니다.

## 구현 예시

실제 코드로 구현하는 방법을 알아보겠습니다.

### SCSS 파일 구조

프로젝트의 SCSS 파일 구조를 올바르게 설정하는 것이 중요합니다.

### 변수 설정

Bootstrap 변수를 오버라이드하는 방법을 알아봅시다.

## 마무리

이러한 방식으로 스타일 충돌 문제를 해결할 수 있습니다.