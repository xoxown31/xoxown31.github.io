---
layout: default
title: H/W Support for Synchronization
parent: 6. Process Synchronization
grand_parent: Operating Systems
nav_order: 4
---

# 🛠️ H/W Support for Synchronization

운영체제에서 동기화를 위해 하드웨어 수준의 지원이 필요할 수 있으며, 이는 **성능 향상과 상호 배제(Mutual Exclusion)** 보장을 위한 도구로 사용됩니다.

---

## 🔐 Lock 변수 기반 상호 배제

- 공유 변수 `lock`을 사용
- 초기 값은 false
- 어떤 프로세스가 진입하면 `lock = true`로 설정하여 다른 프로세스의 진입 차단

```c
while (lock);     // 대기 (busy-wait)
lock = true;      // 잠금
// critical section
lock = false;     // 잠금 해제
// remainder section
```

⚠️ 문제점: 체크와 락 설정 사이에 context switching이 발생하면 **race condition 발생**

---

## 🚫 인터럽트 비활성화 방식

- 단일 프로세서 시스템에서는 **인터럽트를 비활성화(disable)** 하여 critical section 문제 해결 가능
- 그러나 다중 프로세서 환경에서는 비효율적이며, 실시간 시스템에서 **타이머 인터럽트 누락 위험** 있음

---

## 🔁 Atomic 명령어

하드웨어가 제공하는 원자적 연산을 통해 race condition을 방지 가능

### ✅ TestAndSet
```c
boolean TestAndSet(boolean *target) {
    boolean rv = *target;
    *target = true;
    return rv;
}
```

### ✅ Swap
```c
void Swap(boolean *a, boolean *b) {
    boolean temp = *a;
    *a = *b;
    *b = temp;
}
```

### ✅ CompareAndSwap (CAS)
```c
int compare_and_swap(int *value, int expected, int new_value) {
    int temp = *value;
    if (*value == expected)
        *value = new_value;
    return temp;
}
```

---

## 🔒 Atomic 연산 기반 상호 배제 예시

### TestAndSet 방식
```c
while (TestAndSet(&lock));
// critical section
lock = false;
```

### Swap 방식
```c
key = true;
while (key == true)
    Swap(&lock, &key);
// critical section
lock = false;
```

### CompareAndSwap 방식
```c
while (compare_and_swap(&lock, 0, 1) != 0);
// critical section
lock = 0;
```

---

## 🔁 Memory Model & Memory Barrier

### Memory Model
- **Strongly Ordered**: 한 프로세서의 메모리 변경이 즉시 다른 프로세서에 반영됨
- **Weakly Ordered**: 즉시 반영되지 않을 수 있음

### Memory Barrier
- 모든 load/store 명령을 강제 순서로 수행하게 만드는 명령
- 멀티코어 환경에서 **메모리 일관성 보장**

---

## 🧵 Bounded Waiting 보장 방식

- waiting 배열을 사용하여 자신보다 먼저 대기한 프로세스에게 양보
- CAS 기반 알고리즘 사용 시도

📌 다중 프로세스 환경에서 공정성 보장을 위한 방식

List
1. TestAndSet 방식: 간단한 원자적 연산으로 상호 배제를 구현
2. Swap 방식: 두 변수의 값을 교환하여 상호 배제를 보장
3. CompareAndSwap (CAS) 방식: 예상 값과 비교 후 조건에 따라 값을 변경
4. Memory Barrier: 멀티코어 환경에서 메모리 일관성을 보장
5. 인터럽트 비활성화: 단일 프로세서 환경에서 간단한 동기화 방법