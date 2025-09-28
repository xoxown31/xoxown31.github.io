---
layout: default
title: Problem 1
parent: Random Variable Theory
grand_parent: Mathematics
nav_order: 1
---

# Problem 1

## 문제 설명

만약 $$ A \subset B $$ 이고, $$ P(A) = 1/4 $$, $$ P(B) = 1/3 $$ 이라면, $$ P(A \mid B) $$와 $$ P(B \mid A) $$의 값을 구하시오.

## 풀이

먼저, 주어진 정보를 정리해봅시다:
- $$ A \subset B $$: 집합 A가 집합 B의 부분집합임을 의미합니다. 즉, A의 모든 원소는 B에도 속합니다.
- $$ P(A) = 1/4 $$: 사건 A가 발생할 확률이 1/4입니다.
- $$ P(B) = 1/3 $$: 사건 B가 발생할 확률이 1/3입니다.

우리가 구해야 할 값은 다음과 같습니다:
1. $$ P(A \mid B) $$: 사건 B가 발생했을 때 사건 A가 발생할 조건부 확률
2. $$ P(B \mid A) $$: 사건 A가 발생했을 때 사건 B가 발생할 조건부 확률

### 1. $$ P(A \mid B) $$ 구하기
조건부 확률의 정의에 따라, $$ P(A \mid B) $$는 다음과 같이 계산됩니다:
$$ P(A \mid B) = \frac{P(A \cap B)}{P(B)} $$
여기서, $$ A \subset B $$이므로, $$ A \cap B = A $$입니다. 따라서,
$$ P(A \mid B) = \frac{P(A)}{P(B)} = \frac{1/4}{1/3} = \frac{1}{4} \times \frac{3}{1} = \frac{3}{4} $$

### 2. $$ P(B \mid A) $$ 구하기
조건부 확률의 정의에 따라, $$ P(B \mid A) $$는 다음과 같이 계산됩니다:
$$ P(B \mid A) = \frac{P(A \cap B)}{P(A)} $$
여기서, 다시 $$ A \subset B $$이므로, $$ A \cap B = A $$입니다. 따라서,
$$ P(B \mid A) = \frac{P(A)}{P(A)} = \frac{1/4}{1/4} = 1 $$

## 최종 답변
따라서, 최종적으로 구한 값은 다음과 같습니다:
- $$ P(A \mid B) = \frac{3}{4} $$
- $$ P(B \mid A) = 1 $$

### 💡 풀이 요약
- 조건부 확률의 정의를 사용하여 문제를 해결
- $$ A \subset B $$ 관계를 활용하여 교집합을 단순화
- 최종적으로 $$ P(A \mid B) = \frac{3}{4} $$, $$ P(B \mid A) = 1 $$ 도출