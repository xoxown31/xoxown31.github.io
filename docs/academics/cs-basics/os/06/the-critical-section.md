---
layout: default
title: The Critical-Section Problem
parent: 6. Process Synchronization
grand_parent: Operating Systems
nav_order: 2
---

# 🚧 The Critical-Section Problem

프로세스가 공유 데이터를 사용할 때 충돌을 방지하기 위한 **프로토콜 설계 문제**입니다.  
n개의 프로세스(P0 ~ Pn-1)가 동시에 실행 중이며, 모두 공유 자원에 접근하고자 할 수 있습니다.

---

## 🧩 프로세스 구조

각 프로세스는 다음과 같은 섹션으로 구성됩니다:

- **Entry Section**: 크리티컬 섹션 진입을 요청하는 코드
- **Critical Section**: 공유 자원을 접근하거나 수정하는 코드 영역 (동시에 하나만 허용)
- **Exit Section**: 크리티컬 섹션 종료를 알리는 코드
- **Remainder Section**: 공유 자원과 무관한 나머지 코드

```c
do {
    entry section
    critical section
    exit section
    remainder section
} while (TRUE);
```

여기서 동기화 문제는 **Critical Section**에 접근하는 프로세스 간의 충돌을 방지하는 것입니다.

---

## ✅ 해결 조건 (Requirements)

1. **Mutual Exclusion (상호 배제)**  
   - 한 시점에 하나의 프로세스만 critical section에 있어야 함

2. **Progress (진행 보장)**  
   - 어떤 프로세스도 크리티컬 섹션에 없는 경우, 진입하려는 프로세스들 중 하나가 반드시 진입하도록 보장

3. **Bounded Waiting (한정 대기)**  
   - 어떤 프로세스가 진입 요청을 했을 때, 무한정 기다리는 일이 없도록 다른 프로세스들의 진입 횟수에 상한을 둠

위 세 조건의 개념이 이해가 안될 수 있습니다.
상호 배제는 당연한 것 같고, 진행 보장과 한정 대기는 무슨 차이인지 잘 모르겠죠?
예를 들어 봅시다.
진행 보장은 "진입 요청을 한 프로세스들 중 하나가 반드시 진입할 수 있도록 보장"하는 것입니다.
그런데 만약 한정 대기가 없다면, 어떤 프로세스가 진입 요청을 했을 때 다른 프로세스들이 계속 진입할 수 있습니다.
이런 경우, 요청한 프로세스는 무한정 기다릴 수 있습니다.
한정 대기는 이런 상황을 방지하기 위한 조건입니다.
즉, 한정 대기는 "진입 요청을 한 프로세스가 무한정 기다리지 않도록 보장"하는 것입니다.
진행 보장과 한정 대기는 비슷한 개념이지만, 진행 보장은 "진입 요청을 한 프로세스들 중 하나가 반드시 진입할 수 있도록 보장"하는 것이고, 한정 대기는 "진입 요청을 한 프로세스가 무한정 기다리지 않도록 보장"하는 것입니다.

---

## 💡 예시: 커널

운영체제의 커널도 대표적인 크리티컬 섹션 문제를 가집니다.

- 커널 내부의 자료구조(예: 열린 파일 목록 등)는 공유됨
- **Non-preemptive kernel**: 커널 코드 실행 중에는 context switching 불가 → race condition 없음  
  - 예: Windows 2000, XP, 초기 UNIX, Linux 2.6 이전
- **Preemptive kernel**: 병행성은 높지만 크리티컬 섹션 문제 해결 필요  
  - 예: Linux 2.6 이상, Solaris, IRIX
