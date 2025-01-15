---
layout: post
title: "Java/SpringBoot에서의 비동기 처리"
subtitle: "효율적인 비동기 처리"
date: 2025-01-15 12:43:00 +0900
background: '/img/posts/asynchronous-processing-in-java-spring.png'
tags: [Java, Spring, SpringBoot, Async, Thread, Runnable, CompletableFuture, ThreadPool, ThreadPoolTaskExecutor, Concurrency, I/O, Performance,  WebFlux]
toc: true
toc_sticky: true
---

# 2. Java에서의 구현과 실제 경험
## 2.1 스레드와 비동기 처리

Javascript에서 callback뿐만이 아니라 Promise, async/await 등의 다양한 방법으로 비동기 처리를 구현할 수 있다.

그렇다면, **Java에서는 어떻게 비동기 처리**를 할 수 있을까?

### Thread와 Runnable

Java에서 비동기 프로그래밍을 처음 접하게 되면 보통 Thread와 Runnable을 마주치게 된다.

가장 기본적인 비동기 처리 방식이며, 비동기 프로그래밍의 핵심 개념을 이해하는 데에 매우 중요하다.

Thread는 **프로그램 내에서 실행되는 독립적인 실행 흐름**을 의미한다.

Java에서 Thread를 생성하는 방식은 크게 2가지가 있다.

- Thread 클래스 상속

~~~ java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread: " + Thread.currentThread().getName());
    }
}

// 사용
MyThread thread = new MyThread();
thread.start();  // 새로운 스레드 시작
~~~

- Runnable 인터페이스 구현

~~~ java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Thread: " + Thread.currentThread().getName());
    }
}

// 사용
Thread thread = new Thread(new MyRunnable());
thread.start();  // 새로운 스레드 시작
~~~

<br>

**🤔 왜 두 가지 방법이 존재할까?**
- Java는 다중 상속을 지원하지 않는다. Thread 클래스를 상속받으면 다른 클래스를 상속받을 수 없게 된다.

_ 또한, 스레드 코드와 비즈니스 로직이 강하게 결합되는 단점도 있다._

반면 Runnable은 인터페이스이기 때문에, 다른 클래스를 상속받으면서도 Runnable을 구현할 수 있다.

이는 Java 설계 철학인 "**상속보다는 구성 (Composition over inheritance)**"를 잘 보여주는 예시인 것 같다.

<br>

### Thread에 대해 이해하기 - 생명주기 & 주의할 점

Thread를 사용하면서 가장 중요한 것은 생명주기를 이해하는 것이다.

**[Thread의 생명주기]**

~~~java
public class ThreadLifecycleDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            try {
                Thread.sleep(1000); // TIMED_WAITING 상태
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        System.out.println("1. 초기 상태: " + thread.getState()); // NEW
        thread.start();
        System.out.println("2. 실행 상태: " + thread.getState()); // RUNNABLE
        Thread.sleep(500);
        System.out.println("3. 대기 상태: " + thread.getState()); // TIMED_WAITING
        thread.join();
        System.out.println("4. 종료 상태: " + thread.getState()); // TERMINATED
    }
}
~~~

1. NEW: 스레드가 생성되었지만, 아직 start()가 호출되지 않은 상태
2. RUNNABLE: 실행 중이거나 실행 가능한 상태
3. BLOCKED: 모니터 락을 기다리는 상태
4. WAITING: 다른 스레드의 특정 동작을 기다리는 상태
5. TIMED_WAITING: 특정 시간 동안 대기하는 상태
6. TERMINATED: 실행이 완료된 상태


**[Thread 사용 시 주의할 점]**

- 동기화 문제

~~~java
public class ThreadSafetyExample {
    private int count = 0;
    
    // 잘못된 구현
    public void incrementWrong() {
        count++; // 스레드 안전하지 않음
    }
    
    // 올바른 구현
    public synchronized void incrementCorrect() {
        count++; // 스레드 안전함
    }
}
~~~

여러 스레드가 동시에 같은 자원에 접근할 때 발생하는 race condition을 방지하기 위해 동기화가 필요하다.  

synchronized 키워드나 volatile 변수, atomic 클래스 등을 활용하여 스레드 안전성을 보장해야 한다.   

특히 공유 자원을 수정하는 작업에서는 반드시 적절한 동기화 메커니즘을 사용해야 한다.

- 데드락 방지

~~~java
public class DeadlockExample {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();
    
    public void method1() {
        synchronized (lock1) {
            synchronized (lock2) {
                // 위험: 다른 스레드가 lock2->lock1 순서로 락을 획득하려 할 경우
                // 데드락 발생 가능
            }
        }
    }
}
~~~

데드락은 두 개 이상의 스레드가 서로가 가진 자원을 기다리며 무한히 대기하는 상태이다.

이를 방지하기 위해서는 락 획득의 순서를 일관되게 유지하고, 가능한 한 여러 락을 동시에 획득하는 것을 피해야 한다.

또한 락 획득에 타임아웃을 설정하는 것도 좋은 방법이다.

- 스레드 인터럽트 처리

~~~java
public class InterruptExample {
    public void longRunningTask() {
        try {
            while (!Thread.currentThread().isInterrupted()) {
                // 작업 수행
            }
        } catch (InterruptedException e) {
            // 인터럽트 발생 시 적절한 처리
            Thread.currentThread().interrupt(); // 인터럽트 상태 복구
        }
    }
}
~~~

스레드 인터럽트는 실행 중인 스레드에게 작업을 중단하라는 신호를 보내는 메커니즘이다.

InterruptedException이 발생했을 때 단순히 예외를 무시하면 안 되며, 적절한 정리 작업을 수행하고 인터럽트 상태를 복구해야 한다.

특히 장시간 실행되는 작업의 경우, 주기적으로 인터럽트 상태를 확인하고 적절히 응답하는 것이 중요하다.

<br>

### Thread와 Runnable의 한계

Thread와 Runnable은 비동기 처리의 기초를 이해하는데 좋지만, 다음과 같은 한계가 있다.

- 스레드 생성과 종료의 오버헤드
- 결과값을 반환하기 어려움
- 예외 처리가 복잡함
- 스레드 풀 관리의 어려움

이러한 한계점들을 보완하기 위해 Java는 더 발전된 형태의 API들을 제공하게 되었다.

**[1. Callable 인터페이스]**

~~~ java
Callable<String> callable = () -> {
    // 작업 수행
    return "작업 결과";  // 결과값 반환 가능
};

ExecutorService executor = Executors.newSingleThreadExecutor();
Future<String> future = executor.submit(callable);
String result = future.get();  // 결과값 받기
~~~

- Callable은 Runnable과 달리 **작업 결과를 반환하고 예외를 throw**할 수 있다.
[Runable은 아무것도 리턴하지 않는다.]
- 이를 통해 비동기 작업에서 **결과값을 다루기 쉬워졌다**.

**[2. ExecutorService]** 

~~~ java
ExecutorService executor = Executors.newFixedThreadPool(3);  // 스레드 풀 생성
executor.submit(() -> {
    // 작업 수행
});
executor.shutdown();  // 작업 완료 후 스레드 풀 정리
~~~

- ExecutorService는 **스레드 생성과 관리의 복잡성을 제거**하고, **스레드 풀을 통해 리소스를 효율적으로 사용**할 수 있도록 도와준다.

이러한 저수준의 Thread 활용은 실무 환경에서 거의 사용되지는 않지만, 비동기 프로그래밍의 기본 개념을 이해하는 데에 매우 중요하다.

이러한 저수준의 Thread 활용은 실무 환경에서 거의 사용되지는 않지만, 비동기 프로그래밍의 기본 개념을 이해하는 데 매우 중요하다.

**[3. Future]**

~~~java
Future<String> future = executor.submit(() -> {
    Thread.sleep(1000);
    return "Future의 결과값";
});

// Future의 주요 메서드 활용
boolean isDone = future.isDone();        // 작업 완료 여부 확인
boolean isCancelled = future.isCancelled(); // 작업 취소 여부 확인
String result = future.get();            // 결과 가져오기 (블로킹)
String result2 = future.get(1, TimeUnit.SECONDS); // 타임아웃 설정
~~~
- Future는 **비동기 작업의 결과를 표현하는 인터페이스**로, 작업의 상태를 확인하고 결과를 받을 수 있다.
- 작업 취소와 타임아웃 설정 등 **비동기 작업의 제어**가 가능하다.

허나 다음과 같은 한계가 존재한다.

- 결국 다른 주체의 작업 결과를 얻어오려면 잠시라도 블로킹 상태에 들어갈 수 밖에 없다.
- 가장 큰 단점은 **작업 완료를 기다리는 동안 블로킹**된다는 점이다.
~~~java
// 블로킹이 발생하는 get() 호출
String result = future.get();  // 작업이 완료될 때까지 현재 스레드는 블로킹됨
~~~

- 또한, 여러 Futrure을 조합하기 어렵다.
- 예외처리가 불편하다.
- 콜백이나 완료 통보 기능이 없다.


> CompletableFuture는 비동기 작업의 흐름 제어와 조합을 더욱 쉽게 처리할 수 있도록 설계된 고수준 API이다.   
이를 통해 비동기 프로그래밍이 실무에서 어떻게 효율적으로 활용되는지 알아보자.

<br>

### CompletableFuture: 비동기 프로그래밍의 진화

앞서 살펴본 Thread, Runnable, 그리고 Callable/Future는 각각의 한계점이 있었다.

특히 Future의 경우, 비동기 작업의 결과를 표현하기는 했지만 결과를 조합하거나 에러를 처리하는 것이 어려웠다

> CompletableFuture는 이러한 문제들을 해결하기 위해 Java 8에서 도입되었다.

CompletableFuture는 Future 인터페이스를 구현하면서, 훨씬 더 구체적인 기능들을 제공한다.

**[1. 비동기 작업 생성]**

~~~java
// 결과가 없는 비동기 작업
CompletableFuture<Void> future1 = CompletableFuture.runAsync(() -> {
    System.out.println("비동기 작업 실행");
});

// 결과를 반환하는 비동기 작업
CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
    return "작업 결과";
});
~~~

**[2. 작업 조합하기]**

여러 비동기 작업을 연결하거나 조합할 수 있다.

~~~ java
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> "Hello")  // 첫 번째 작업
    .thenApply(s -> s + " World")  // 결과를 변환
    .thenCompose(s -> CompletableFuture.supplyAsync(() -> s + "!"));  // 다른 Future와 조합

// 두 작업의 결과 조합
CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> 1);
CompletableFuture<Integer> future2 = CompletableFuture.supplyAsync(() -> 2);
CompletableFuture<Integer> combined = future1
    .thenCombine(future2, (result1, result2) -> result1 + result2);
~~~

**[3. 예외 처리]** 

CompletableFuture는 예외 처리를 위한 다양한 메서드를 제공한다.

**[4. 타임아웃처리]**

타임 아웃에 대한 처리도 가능하다.

**[5. 여러 작업의 병렬 처리]**

~~~ java
List<CompletableFuture<String>> futures = Arrays.asList(
    CompletableFuture.supplyAsync(() -> "작업1"),
    CompletableFuture.supplyAsync(() -> "작업2"),
    CompletableFuture.supplyAsync(() -> "작업3")
);

// 모든 작업이 완료될 때까지 대기
CompletableFuture<Void> allOf = CompletableFuture.allOf(
    futures.toArray(new CompletableFuture[0])
);

// 가장 빨리 완료되는 작업 처리
CompletableFuture<Object> anyOf = CompletableFuture.anyOf(
    futures.toArray(new CompletableFuture[0])
);
~~~

**[실제 활용 예시]**

아래 코드는 사용자 정보를 조회하는 과정에서 데이터베이스 조회와 외부 API 호출을 병렬로 처리하는 실제 서비스 코드이다.

~~~java
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PaymentApiClient paymentApiClient;
    
    public CompletableFuture<UserInfo> getUserInfo(Long userId) {
        CompletableFuture<User> userFuture = CompletableFuture
            .supplyAsync(() -> userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId)));

        CompletableFuture<PaymentInfo> paymentFuture = CompletableFuture
            .supplyAsync(() -> paymentApiClient.getPaymentInfo(userId))
            .exceptionally(ex -> {
                log.warn("Payment info fetch failed", ex);
                return PaymentInfo.getDefaultPaymentInfo();
            });

        return userFuture
            .thenCombine(paymentFuture, (user, payment) -> {
                return new UserInfo(user, payment);
            })
            .orTimeout(5, TimeUnit.SECONDS)  // 타임아웃 설정
            .exceptionally(ex -> {
                log.error("Error fetching user info", ex);
                return UserInfo.getDefaultUserInfo();
            });
    }
}
~~~
<br>

먼저, userFuture와 paymentFuture 객체를 받아올 때 두 작업이 독립적으로 실행되는 것을 알 수 있다.
- 데이터 베이스에서 사용자 정보 조회
- 외부 API에서 결제 정보 조회

> 두 작업이 독립적으로 병렬 실행되어 전체 응답 시간을 단축   
각 작업은 별도의 스레드에서 실행되므로 서로 블로킹하지 않음

또한, **.exceptionally** 을 사용한 예외 처리 전략을 구체화할 수 있다.

- 결제 정보 조회 실패 시 서비스 전체가 실패하지 않도록 기본값 사용
- 각 단계별로 적절한 예외 처리와 폴백(fallback) 전략 구현

또한, **thenCombine**을 사용해 두 비동기 작업의 결과를 하나로 조합할 수 있다.

> 두 작업이 모두 완료되었을 때만 최종 결과 생성

마지막으로, **타임아웃 처리**를 통해 시스템의 응답성 보장을 위한 안전장치를 설정할 수 있다.

<br>

### 스레드 풀의 이해
앞서 살펴본 CompletableFuture의 실제 활용 예시에서, 우리는 여러 비동기 작업을 동시에 처리했습니다. 그러나 무분별한 스레드 생성은 시스템 리소스를 빠르게 고갈시킬 수 있습니다. 이러한 문제를 해결하기 위해 스레드 풀이 등장했습니다.

<br>
<br>

// 수정중

## 2.2 Spring의 비동기 처리

### @Async 사용 경험과 주의점
### ThreadPoolTaskExecutor 설정 최적화

<br>

# 3. 이론적 고찰
## 3.1 언제 비동기를 사용할까?

### I/O 작업이 많은 경우의 선택
### 대용량 데이터 처리시의 고려사항

<br>

## 3.2 트레이드오프

### 디버깅의 어려움
### 리소스 사용량 증가
### 복잡성 vs 성능 개선

# 4. 마무리 : 주니어 개발자의 관점에서 본 비동기 프로그래밍