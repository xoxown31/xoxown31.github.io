---
layout: default
title: Background
parent: 6. Process Synchronization
grand_parent: Operating Systems
nav_order: 1
---

# 🔄 배경

- 프로세스 간 통신 방법
  - 메시지 전달
  - 공유 메모리 → 충돌(confliction)이 발생할 수 있음!!

- 생산자-소비자 문제
  - 공유 메모리를 통한 통신의 예시

```
버퍼 (공유 메모리)
생산자 → 정보 → 소비자
순환 큐로 구현됨
```

---

## 공유 데이터의 동시 접근

**생산자**
```c
while (true) {
  while (counter == BUFFER_SIZE);
  buffer[in] = nextProduced;
  in = (in + 1) % BUFFER_SIZE;
  counter++;
}
```

**`counter++`의 구현**
```
register1 = counter
register1 = register1 + 1
counter = register1
```

**소비자**
```c
while (true) {
  while (counter == 0);
  nextConsumed = buffer[out];
  out = (out + 1) % BUFFER_SIZE;
  counter--;
}
```

**`counter--`의 구현**
```
register2 = counter
register2 = register2 - 1
counter = register2
```

> 수정 작업 중 스위칭이 발생할 수 있음!

---

## 동기화 문제

**문제가 되는 상황:**
- `counter`의 초기값 = 5
- 생산자는 증가, 소비자는 감소를 동시에 수행
- 이상적으로: `counter = 5`  
- 실제로는: `counter = 4` 또는 `counter = 6`이 될 수 있음

**동시 실행 예시**
```
생산자:    소비자:
reg1 = 5     reg2 = 5
reg1 = 6     reg2 = 4
counter = 6  counter = 4
```

→ 경쟁 상태(Race condition) 발생 가능
