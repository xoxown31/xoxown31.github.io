---
layout: default
title: Decorator Pattern
parent: Object-Oriented Programming
grand_parent: Computer Science Basics
---

# 🧱 Decorator Pattern

## 이론

데코레이터 패턴은 객체에 추가적인 기능을 동적으로 추가할 수 있는 디자인 패턴입니다.
이 패턴은 객체의 구조를 변경하지 않고, 기존 객체에 새로운 기능을 추가할 수 있도록 합니다.
데코레이터 패턴은 주로 다음과 같은 상황에서 사용됩니다.
- 객체에 새로운 기능을 추가하고 싶지만, 기존 클래스를 수정할 수 없을 때
- 객체의 기능을 런타임에 동적으로 변경하고 싶을 때
- 객체의 기능을 조합하여 새로운 기능을 만들고 싶을 때

## 구조

데코레이터 패턴은 다음과 같은 구조를 가집니다:
- **컴포넌트 인터페이스**: 기능을 정의하는 인터페이스입니다. 이 인터페이스는 기본 기능을 선언합니다.
- **구체적인 컴포넌트 클래스**: 컴포넌트 인터페이스를 구현하는 클래스입니다. 이 클래스는 기본 기능을 구현합니다.
- **데코레이터 클래스**: 컴포넌트 인터페이스를 구현하며, 다른 컴포넌트를 포함하여 기능을 확장하는 클래스입니다. 이 클래스는 컴포넌트 인터페이스를 사용하여 기본 기능을 호출하고, 추가적인 기능을 구현합니다.
- **구체적인 데코레이터 클래스**: 데코레이터 클래스를 상속하여, 특정 기능을 추가하는 클래스입니다. 이 클래스는 기본 기능에 새로운 기능을 추가합니다.

데코레이터 패턴은 다음과 같은 속성과 메서드를 포함합니다:
- **컴포넌트 객체**: 현재 기능을 나타내는 객체입니다. 이 객체는 컴포넌트 인터페이스를 구현한 클래스의 인스턴스입니다.
- **기능 추가 메서드**: 현재 컴포넌트 객체에 새로운 기능을 추가하는 메서드입니다. 이 메서드는 새로운 데코레이터 객체를 생성하여 컴포넌트 객체에 추가합니다.
- **기능 실행 메서드**: 현재 컴포넌트 객체의 기능을 실행하는 메서드입니다. 이 메서드는 현재 컴포넌트 객체의 메서드를 호출하여 기본 기능을 수행합니다.

## 특징
- **동적 기능 추가**: 객체에 새로운 기능을 동적으로 추가할 수 있습니다.
- **기존 코드 변경 없음**: 기존 클래스를 수정하지 않고, 새로운 기능을 추가할 수 있습니다.
- **유연성**: 기능을 조합하여 새로운 기능을 만들 수 있어, 다양한 상황에 대응할 수 있습니다.
- **책임 분리**: 기능의 책임을 별도의 클래스에 분리하여, 객체의 책임을 줄입니다.
- **인터페이스 사용**: 기능을 정의하는 인터페이스를 사용하여, 클라이언트 코드가 기능을 독립적으로 사용할 수 있도록 합니다.

## 예제 코드

자바에서 데코레이터 패턴을 구현하는 예제를 살펴보겠습니다.
예를 들어, 커피에 다양한 추가 재료를 추가하는 기능을 구현한다고 가정해봅시다.

```java
// 음료 인터페이스
public interface Beverage {
    String getDescription();
    double cost();
}

// 기본 커피 클래스
public class Coffee implements Beverage {
    @Override
    public String getDescription() {
        return "커피";
    }

    @Override
    public double cost() {
        return 2000;
    }
}

// 데코레이터 클래스
public abstract class BeverageDecorator implements Beverage {
    protected Beverage beverage;

    public BeverageDecorator(Beverage beverage) {
        this.beverage = beverage;
    }

    @Override
    public String getDescription() {
        return beverage.getDescription();
    }

    @Override
    public double cost() {
        return beverage.cost();
    }
}

// 우유 데코레이터 클래스
public class MilkDecorator extends BeverageDecorator {
    public MilkDecorator(Beverage beverage) {
        super(beverage);
    }

    @Override
    public String getDescription() {
        return beverage.getDescription() + ", 우유";
    }

    @Override
    public double cost() {
        return beverage.cost() + 500; // 우유 추가 비용
    }
}

// 시럽 데코레이터 클래스
public class SyrupDecorator extends BeverageDecorator {
    public SyrupDecorator(Beverage beverage) {
        super(beverage);
    }

    @Override
    public String getDescription() {
        return beverage.getDescription() + ", 시럽";
    }

    @Override
    public double cost() {
        return beverage.cost() + 300; // 시럽 추가 비용
    }
}

// 사용 예제
public class Main {
    public static void main(String[] args) {
        Beverage coffee = new Coffee();
        System.out.println(coffee.getDescription() + " - " + coffee.cost() + "원");

        // 우유 추가
        coffee = new MilkDecorator(coffee);
        System.out.println(coffee.getDescription() + " - " + coffee.cost() + "원");

        // 시럽 추가
        coffee = new SyrupDecorator(coffee);
        System.out.println(coffee.getDescription() + " - " + coffee.cost() + "원");
    }
}
```

이 예제에서 `Beverage` 인터페이스는 음료의 기본 기능을 정의합니다.
`Coffee` 클래스는 기본 커피를 구현하며, `BeverageDecorator` 클래스는 데코레이터의 기본 기능을 제공합니다.
`MilkDecorator`와 `SyrupDecorator` 클래스는 각각 우유와 시럽을 추가하는 데코레이터입니다.
이렇게 데코레이터 패턴을 사용하면, 기존 커피 객체에 새로운 기능을 동적으로 추가할 수 있습니다.

## 결론

데코레이터 패턴은 객체에 새로운 기능을 동적으로 추가할 수 있는 유용한 디자인 패턴입니다.
이 패턴은 객체의 구조를 변경하지 않고, 기존 객체에 새로운 기능을 추가할 수 있도록 하여,
유연성과 확장성을 제공합니다.