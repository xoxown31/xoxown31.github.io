# 📚 알고리즘 문제 풀이 템플릿 사용 가이드

알고리즘 문제를 효율적으로 기록하기 위한 템플릿 시스템입니다.

## 🎯 3가지 사용 방법

### 1. 🐍 Python 스크립트 사용 (권장)

가장 편리하고 자동화된 방법입니다.

```bash
cd docs/academics/cs-basics/algorithms
python create_post.py
```

**장점:**
- 대화형 인터페이스로 정보 입력
- nav_order 자동 계산
- UTF-8 인코딩 보장

### 2. 💻 VS Code 스니펫 사용

VS Code에서 바로 사용할 수 있는 스니펫입니다.

1. 새 `.md` 파일 생성
2. `algo-template` 입력 후 Tab 키
3. 각 필드를 Tab으로 이동하며 채우기

**장점:**
- VS Code 내에서 바로 사용
- 빠른 템플릿 적용
- Tab 키로 필드 간 이동

### 3. 🖥️ 배치 스크립트 사용 (Windows)

Windows 환경에서 간단하게 사용할 수 있습니다.

```cmd
cd docs\academics\cs-basics\algorithms
create_post.bat
```

**장점:**
- 추가 프로그램 설치 불필요
- 간단한 명령어 실행

## 📝 템플릿 구조

생성되는 파일은 다음과 같은 구조를 가집니다:

```markdown
---
layout: default
title: [플랫폼] [번호] - [제목]
parent: Algorithms
grand_parent: Computer Science Basics
nav_order: [순서]
---

# 🐦 [플랫폼] [번호] - [제목]

> **문제 링크:** [링크]

## 1. 문제 설명
- 난이도, 키워드, 문제 요약

## 2. 문제 풀이
- 잘못된 접근법 (❌)
- 올바른 접근법 (✅)
- 팁과 핵심 포인트

## 3. 코드
- 실제 구현 코드

### 💡 풀이 요약
- 주요 포인트 정리
```

## 🔧 커스터마이징

### 템플릿 수정
`template.md` 파일을 편집하여 원하는 형태로 템플릿을 수정할 수 있습니다.

### 추가 플랫폼 지원
- BOJ (백준)
- LeetCode
- Programmers (프로그래머스)
- CodeForces
- AtCoder
- 기타 모든 플랫폼

### 언어별 코드 블록
기본은 Python이지만 다른 언어도 지원:
- `python`
- `java`
- `cpp`
- `javascript`
- `go`

## 💡 활용 팁

1. **문제를 풀기 전에** 템플릿을 생성하고 문제 분석 단계부터 기록
2. **틀린 접근법도 기록**하여 학습 효과 증대
3. **시간복잡도와 공간복잡도** 명시
4. **핵심 아이디어와 팁** 정리로 복습 효율성 증대
5. **태그와 키워드**로 나중에 검색하기 쉽게 정리

## 🚀 빠른 시작

1. Python 스크립트 실행:
   ```bash
   python create_post.py
   ```

2. 정보 입력:
   ```
   플랫폼: BOJ
   문제 번호: 1234
   문제 제목: 예제 문제
   링크: https://www.acmicpc.net/problem/1234
   난이도: Gold 3
   키워드: DP, 그래프
   ```

3. 생성된 `boj1234.md` 파일 편집

4. 커밋 및 푸시로 블로그에 반영

이제 매번 템플릿을 복사하거나 새로 작성할 필요 없이, 간단한 명령어로 일관된 형태의 문제 풀이 포스트를 생성할 수 있습니다! 🎉