---
layout: default
title: Strategy Pattern
parent: Object-Oriented Programming
grand_parent: Computer Science Basics
---

# 🧱 Strategy Pattern

## 이론

전략 패턴은 알고리즘을 정의하고, 이를 캡슐화하여 서로 교환 가능하게 만드는 디자인 패턴입니다.
이 패턴은 알고리즘을 사용하는 클라이언트 코드와 알고리즘 자체를 분리하여,
알고리즘을 런타임에 동적으로 변경할 수 있도록 합니다.

전략 패턴은 주로 다음과 같은 상황에서 사용됩니다.
- 여러 알고리즘을 캡슐화하고, 클라이언트 코드가 이를 선택할 수 있도록 할 때
- 알고리즘을 변경할 때 클라이언트 코드를 수정하지 않고, 새로운 알고리즘 클래스를 추가하여 확장할 수 있을 때
- 알고리즘의 구현을 클라이언트 코드와 분리하여, 코드의 가독성과 유지보수성을 높이고 싶을 때

## 구조

전략 패턴은 다음과 같은 구조를 가집니다:
- **전략 인터페이스**: 알고리즘을 정의하는 인터페이스입니다. 이 인터페이스는 알고리즘을 수행하는 메서드를 선언합니다.
- **구체적인 전략 클래스**: 전략 인터페이스를 구현하는 클래스들입니다. 각 클래스는 특정 알고리즘을 구현합니다.
- **컨텍스트 클래스**: 현재 사용할 전략을 유지하고, 전략을 실행하는 역할을 합니다. 이 클래스는 전략 인터페이스를 사용하여 알고리즘을 수행합니다.

전략 패턴은 다음과 같은 속성과 메서드를 포함합니다:
- **전략 객체**: 현재 사용할 알고리즘을 나타내는 객체입니다. 이 객체는 전략 인터페이스를 구현한 클래스의 인스턴스입니다.
- **전략 설정 메서드**: 현재 사용할 전략 객체를 설정하는 메서드입니다. 이 메서드는 새로운 전략 객체를 받아서 현재 전략을 변경합니다.
- **전략 실행 메서드**: 현재 전략 객체의 알고리즘을 실행하는 메서드입니다. 이 메서드는 현재 전략 객체의 메서드를 호출하여 알고리즘을 수행합니다.

## 특징
- **캡슐화**: 알고리즘을 별도의 클래스로 캡슐화하여, 클라이언트 코드와 분리합니다.
- **유연성**: 런타임에 알고리즘을 변경할 수 있어, 다양한 상황에 대응할 수 있습니다.
- **확장성**: 새로운 알고리즘을 추가할 때, 기존 코드를 수정하지 않고 새로운 클래스를 추가하여 확장할 수 있습니다.
- **책임 분리**: 알고리즘의 책임을 별도의 클래스에 분리하여, 클라이언트 코드의 책임을 줄입니다.
- **인터페이스 사용**: 알고리즘을 정의하는 인터페이스를 사용하여, 클라이언트 코드가 알고리즘을 독립적으로 사용할 수 있도록 합니다.

## 예제 코드

자바에서 전략 패턴을 구현하는 예제를 살펴보겠습니다.
온라인 쇼핑몰에서 결제 방식을 선택하는 기능을 구현한다고 가정해봅시다.

```java
// 결제 전략 인터페이스
public interface PaymentStrategy {
    void pay(int amount);
}

// 신용카드 결제 전략
public class CreditCardPayment implements PaymentStrategy {
    @Override
    public void pay(int amount) {
        System.out.println("신용카드로 " + amount + "원을 결제합니다.");
    }
}

// 페이팔 결제 전략
public class PayPalPayment implements PaymentStrategy {
    @Override
    public void pay(int amount) {
        System.out.println("페이팔로 " + amount + "원을 결제합니다.");
    }
}

// 결제 컨텍스트
public class PaymentContext {
    private PaymentStrategy paymentStrategy;

    public void setPaymentStrategy(PaymentStrategy paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public void executePayment(int amount) {
        if (paymentStrategy == null) {
            throw new IllegalStateException("결제 전략이 설정되지 않았습니다.");
        }
        paymentStrategy.pay(amount);
    }
}

// 사용 예제
public class Main {
    public static void main(String[] args) {
        PaymentContext paymentContext = new PaymentContext();

        // 신용카드 결제
        paymentContext.setPaymentStrategy(new CreditCardPayment());
        paymentContext.executePayment(10000);

        // 페이팔 결제
        paymentContext.setPaymentStrategy(new PayPalPayment());
        paymentContext.executePayment(20000);
    }
}
```

이 예제에서 `PaymentStrategy` 인터페이스는 결제 전략을 정의하고,
`CreditCardPayment`와 `PayPalPayment` 클래스는 각각 신용카드 결제와 페이팔 결제를 구현합니다.
`PaymentContext` 클래스는 결제 전략을 설정하고 실행하는 역할을 합니다.
이렇게 전략 패턴을 사용하면, 결제 방식을 쉽게 확장할 수 있습니다.

## State Pattern과의 차이점

전략 패턴과 상태 패턴은 모두 객체 지향 디자인 패턴이지만, 그 목적과 사용 방식이 다릅니다.

- **전략 패턴**: 알고리즘을 캡슐화하여 서로 교환 가능하게 만드는 패턴입니다. 클라이언트는 런타임에 알고리즘을 선택하고 변경할 수 있습니다.
- **상태 패턴**: 객체의 상태에 따라 행동을 변경하는 패턴입니다. 상태가 변경되면 객체의 행동도 변경됩니다.

여기서 두 패턴의 주요 차이점은 **목적**입니다.
전략 패턴은 알고리즘을 교환 가능하게 만드는 데 중점을 두고,
상태 패턴은 객체의 상태에 따라 행동을 변경하는 데 중점을 둡니다.

쉽게 이해하려면, 전략 패턴은 "무엇을 할 것인가?"에 대한 질문에 답하고, 
상태 패턴은 "어떤 상태에서 할 것인가?"에 대한 질문에 답한다고 생각하면 됩니다.

예를 들어 전략 패턴은 앞서 설명한 결제 방식 선택과 같이
여러 알고리즘을 선택하는 데 사용되며,

상태 패턴은 현재 로그인 상태에 따라 행동을 변경하는 데 사용됩니다.

## 결론

전략 패턴은 알고리즘을 캡슐화하고, 이를 런타임에 동적으로 변경할 수 있는 강력한 디자인 패턴입니다.
이 패턴을 사용하면 코드의 유연성과 확장성을 높일 수 있으며,
유지보수성을 향상시킬 수 있습니다.
이 패턴은 다양한 상황에서 유용하게 사용될 수 있으며,
객체 지향 프로그래밍의 핵심 원칙 중 하나인 **책임 분리**를 잘 보여줍니다.