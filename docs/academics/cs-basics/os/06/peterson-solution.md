---
layout: default
title: Peterson's Solution
parent: 6. Process Synchronization
grand_parent: Operating Systems
nav_order: 3
---

# 🧠 Peterson's Solution

Peterson의 해법은 **두 개의 프로세스 간 상호 배제(Mutual Exclusion)** 를 소프트웨어적으로 보장하는 알고리즘입니다.  
공유 메모리 환경에서 구현되며, busy-waiting을 기반으로 작동합니다.

---

## 🧩 전제 조건

- 두 개의 프로세스: `P0`, `P1`
- 공유 변수:
  - `bool flag[2]` — 프로세스의 의사 표현 (진입 의사)
  - `int turn` — 양보 대상 (상대방에게 먼저 양보하는 구조)

---

## 🧪 알고리즘 구조 (P_i 기준)

```c
flag[i] = true;
turn = j;
while (flag[j] && turn == j);
// critical section
flag[i] = false;
```

- `i`, `j`는 각각 0 또는 1 (P0과 P1)
- `flag[i]`: P_i가 critical section에 들어가고 싶다고 표시
- `turn = j`: 상대방에게 우선권을 양보
- 진입 조건: 상대방이 들어가고 싶어하지 않거나, 내가 우선권을 가진 경우

---

## ✅ 상호 배제 조건 만족

- 두 프로세스가 동시에 critical section에 진입할 수 없음

## ✅ 진행 조건 만족

- 한쪽이 진입하지 않겠다고 표시하거나 양보했으면, 다른 한쪽은 진입 가능

## ✅ 한정 대기 조건 만족

- 상대방이 계속 진입하지 않겠다고 표현한 경우, 일정 횟수 이내에 반드시 진입 가능

---

## 🚫 단점

- 현대 CPU 아키텍처에서는 메모리 접근이 비동기적으로 이루어질 수 있음
- 쉽게 말해 변수 순서가 바뀌는 경우가 발생할 수 있음
- 따라서, 이 알고리즘은 현대 CPU 아키텍처에서는 안전하지 않음
