---
layout: default
title: State Pattern
parent: Object-Oriented Programming
grand_parent: Computer Science Basics
---

# 🧱 State Pattern

## 이론

상태 패턴은 객체의 상태에 따라 행동을 변경하는 디자인 패턴입니다.
이 패턴은 객체의 상태를 캡슐화하여, 상태에 따라 다른 행동을 수행할 수 있도록 합니다.
상태 패턴은 주로 다음과 같은 상황에서 사용됩니다.
- 객체의 상태가 여러 개 있고, 상태에 따라 행동이 달라질 때
- 상태가 변경될 때마다 객체의 행동을 변경하고 싶을 때
- 상태 전환이 복잡하고, 이를 관리하기 어려울 때

## 구조

상태 패턴은 다음과 같은 구조를 가집니다:
- **상태 인터페이스**: 상태를 정의하는 인터페이스입니다. 이 인터페이스는 상태에 따라 수행할 행동을 선언합니다.
- **구체적인 상태 클래스**: 상태 인터페이스를 구현하는 클래스들입니다. 각 클래스는 특정 상태에 대한 행동을 정의합니다.
- **컨텍스트 클래스**: 현재 상태를 유지하고, 상태 전환을 관리하는 클래스입니다. 이 클래스는 상태 인터페이스를 사용하여 현재 상태의 행동을 수행합니다.

상태 패턴은 다음과 같은 속성과 메서드를 포함합니다:
- **상태 객체**: 현재 상태를 나타내는 객체입니다. 이 객체는 상태 인터페이스를 구현한 클래스의 인스턴스입니다.
- **상태 전환 메서드**: 현재 상태를 변경하는 메서드입니다. 이 메서드는 새로운 상태 객체를 설정하여 상태를 전환합니다.
- **행동 메서드**: 현재 상태의 행동을 수행하는 메서드입니다. 이 메서드는 현재 상태 객체의 행동을 호출합니다.


## 특징

- **상태 캡슐화**: 상태를 별도의 클래스로 캡슐화하여, 객체의 상태와 행동을 분리합니다.
- **상태 전환**: 객체의 상태가 변경될 때, 상태 객체를 교체하여 행동을 변경합니다.
- **유연성**: 새로운 상태를 추가할 때, 기존 코드를 수정하지 않고 새로운 상태 클래스를 추가하여 확장할 수 있습니다.
- **책임 분리**: 상태의 책임을 별도의 클래스에 분리하여, 객체의 책임을 줄입니다.
- **인터페이스 사용**: 상태를 정의하는 인터페이스를 사용하여, 클라이언트 코드가 상태를 독립적으로 사용할 수 있도록 합니다.

## 예제 코드

자바에서 상태 패턴을 구현하는 예제를 살펴보겠습니다.
예를 들어, 온라인 쇼핑몰에서 주문 상태를 관리하는 기능을 구현한다고 가정해봅시다.

```java
// 주문 상태 인터페이스
public interface OrderState {
    void handleOrder(OrderContext context);
}

// 주문 확인 상태
public class OrderConfirmedState implements OrderState {
    @Override
    public void handleOrder(OrderContext context) {
        System.out.println("주문이 확인되었습니다.");
        context.setState(new OrderShippedState());
    }
}

// 주문 배송 상태
public class OrderShippedState implements OrderState {
    @Override
    public void handleOrder(OrderContext context) {
        System.out.println("주문이 배송 중입니다.");
        context.setState(new OrderDeliveredState());
    }
}

// 주문 배송 완료 상태
public class OrderDeliveredState implements OrderState {
    @Override
    public void handleOrder(OrderContext context) {
        System.out.println("주문이 배송 완료되었습니다.");
    }
}

// 주문 컨텍스트
public class OrderContext {
    private OrderState state;

    public OrderContext() {
        this.state = new OrderPendingState(); // 초기 상태 설정
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public void handleOrder() {
        state.handleOrder(this);
    }
}

// 사용 예제
public class Main {
    public static void main(String[] args) {
        OrderContext order = new OrderContext();
        
        order.handleOrder(); // 주문이 확인되었습니다.
        order.handleOrder(); // 주문이 배송 중입니다.
        order.handleOrder(); // 주문이 배송 완료되었습니다.
    }
}
```

중요한 점은 각 상태가 `OrderContext` 객체의 상태를 변경할 수 있다는 것입니다.
실제 사용 시 어떤 상태인지 알 필요가 없으며, 상태 객체가 상태 전환을 관리합니다.
**상태**가 추상화 되었다는 것은 이를 뜻합니다.

전략 패턴에서는 **전략**을 추상화하여 어떤 알고리즘을 사용하는지 알 필요가 없듯이,
상태 패턴에서도 **상태**를 추상화하여 현재 어떤 상태인지 알 필요가 없습니다.

## 결론

상태 패턴은 객체의 상태에 따라 행동을 변경할 수 있는 유연한 구조를 제공합니다.
또한, 상태 전환을 관리하는 책임을 별도의 상태 객체에 분리하여,
객체의 책임을 줄이고, 코드의 가독성과 유지보수성을 높입니다.
