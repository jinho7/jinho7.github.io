---
layout: post
title: "동기/비동기와 블로킹/논블로킹에 대해 깊이 파헤치기"
subtitle: "Java/SpringBoot에서의 비동기 처리"
date: 2025-01-12 12:00:00 +0900
background: '/img/posts/sync-async-concept.jpeg'
tags: [Java, Spring-Boot, Backend, Sync, Async, Concurrency, Blocking, NonBlocking]
toc: true
toc_sticky: true
---

# 1. 개념적 이해

비동기 처리에 대해 이야기하기 앞서, 과연 "동기"란 어떤 것인지부터 바로 잡고 가려고한다.

왜냐하면 **비(非)동기**란 동기가 아니다라는 의미이기 때문에 동기가 무엇인지부터 정확히 하고 싶었다.

또한 나는 처음에 '동기=블로킹, 비동기=논블로킹'이라고 단순하게 이해하고 있었다.

하지만 실제로는 두 개념이 분류 기준이 전혀 다른 독립적인 개념이라는 것을 알게 되었다.

이렇듯 서로 혼동되어 쓰이는 각 명칭은 어떤 의미인지 알아보려고 한다.

이에 대해 자세히 알아보자.

<br>

# 2. 동기와 비동기

![](https://velog.velcdn.com/images/jinho7/post/a47f1973-3895-4438-a47f-80dd80245e41/image.png){: width="100%" height="100%" .center}

> 동기와 비동기는 "작업의 처리 방식"을 나타내는 개념이다.   
결론부터 말하자면, 이둘의 주요한 차이점은 "작업 순서 처리 차이"이다.

## 2-1. 동기: 순차적으로 실행
필자는 이전에 동기를 **겹치지 않고 순차적으로 작업을 진행하는 것** 정도로 이해하고 있었다.

영어 사전을 참고해보자.

> synchronous
adjective
happening or done at the same time or speed:

**Synchronous** 는 동시에 발생하는 두 개 이상의 사건이나 프로세스가 동일한 시간에서 진행되는 것을 의미하는 형용사이다.

중요한 워딩은 [동일한 시간에 여러 개의 사건이 진행] 된다는 것이다.

'순차적'과 '동시'라는 단어가 서로 상충된다고 생각할 수 있다.

여기서 오해하면 안되는 것이 이는 **병렬적인 작업방식을 말하는 것이 아니다.**

"어떠한 일정 시점에 현재 작업의 Response과 다음 작업의 Request이 함께 진행되는 것"

위의 그림을 참고하면 이해가 쉽다.
작업 A가 끝나는 시간과 작업 B가 시작하는 시간이 동기화된다고 이해하면 좋을 것 같다.

이는 **작업이 순차적으로 처리되며, 이전 작업이 완료될 때까지는 다음 작업이 시작되지 않음을 나타낸다.**

즉, **작업들이 서로 시간적 의존성을 가지고 실행된다**는 뜻이다.

동기 방식은 실행 순서가 보장되며 예측 가능하다는 장점이 있지만,   
앞선 작업이 오래 걸리면 전체 작업이 지연된다는 단점도 있다.

## 2-2. 비동기: 독립적으로 실행
그렇다면 비동기 방식은 무엇일까?

반대의 경우를 생각하면 된다.

위의 그림을 참고하면 작업들이 병렬적으로 일어나고 있음을 알 수 있다.

동기와 반대로 **"요청을 보냈을 때 응답 상태와 상관없이 다른 동작을 수행할 수 있다."**는 점이다.

![다운로드](https://github.com/user-attachments/assets/0a188e4a-b35f-41aa-9953-94504330dd9f){: width="68%" height="50%" .center}
*파일 다운로드가 동기 방식이라면?*{: .image-caption}

만약에 파일 다운로드를 동기적으로 처리한다고 해보자.

아마 파일이 다운로드될 때까지 아무런 작업도 수행할 수 없을 것이고,
파일이 완전히 다운로드된 후에 다음 작업을 진행할 수 있을 것이다. 😅

매우 비효율적인 방식이다...

그러나 비동기적인 방식을 활용한다면, 파일 다운로드 작업을 시작시켜놓고, 다른 작업을 수행할 수 있다.

파일이 다운로드되면 특정 콜백 함수를 호출하여, 다운로드된 파일을 처리하거나 결과를 반환받을 수 있다.

콜백 뿐만이 아니고, 그 결과는 콜백 함수, Promise, 이벤트 등을 통해 전달받을 수 있다. 

마치 택배를 주문하고 배송 알림을 받는 것과 비슷하다고 할 수 있다.

### 비동기 동작 방식에 대한 오해
많은 개발자들이 **비동기 = 멀티 쓰레드**라고 이해하고 있다.

단순히 생각해보아도, 여러 작업이 동시에 처리되는 비동기 동작을 구현하기 위해서는 당연히 여러 개의 쓰레드가 필요할 것 같기 때문이다.

또한, 특히나 대부분의 Java 개발자들이 비동기 프로그래밍을 접할 때 아래와 같은 코드를 통해 배우기 때문이다.
~~~java
 CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    // 여기서 실제로 별도의 스레드에서 실행됨
    return heavyTask();
});
~~~

우리는 Java에서 비동기 처리에 대해 다룰 때, ExecutorService나 CompletableFuture와 같은 도구들을 함께 배운다.

이들은 내부적으로 **스레드 풀**을 사용하기 때문에, 자연스럽게 비동기 처리와 멀티 쓰레드를 동일시하게 된다.

실제로 Spring Framework의 @Async 어노테이션도 비동기 처리를 위해 기본적으로 스레드 풀을 사용한다.

하지만 비동기 처리의 본질은 **"작업의 완료를 기다리지 않고 다른 작업을 수행할 수 있는 것"**이다.

이는 반드시 멀티스레드로만 구현되어야 하는 것이 아니며, Node.js가 좋은 예시다.

Node.js는 싱글 스레드 기반의 이벤트 루프를 사용하여 비동기 처리를 구현한다.

이벤트 루프는 OS의 비동기 I/O 기능을 활용하여 실제 I/O 작업을 커널 레벨에서 처리하고,

작업이 완료되면 이벤트를 통해 알림을 받는 방식으로 동작한다.

~~~javascript
// Node.js의 비동기 처리 (싱글스레드)
fs.readFile('file.txt', (err, data) => {
    console.log('파일 읽기 완료');
});
console.log('다음 작업 실행');  // 파일 읽기를 기다리지 않고 실행
~~~
이러한 이벤트 루프 기반의 비동기 처리는 멀티스레드 없이도 효율적인 비동기 처리를 가능하게 한다.
OS의 비동기 I/O 기능을 활용하여, 실제 I/O 작업은 커널 레벨에서 처리되고, 완료되면 이벤트를 통해 알림을 받는 방식이다.
_정확히는 JavaScript 엔진이 싱글 스레드 기반이다_
_해당 내용에 대해 더 자세히 알고 싶다면 [해당 블로그](https://puleugo.tistory.com/133)를 참고하자_

<br>

# 3. 블로킹과 논블로킹
> 블로킹과 논블로킹은 "제어권의 이동" 관점에서 바라보는 개념이다.   

결국 "호출한 함수가 다른 일을 할 수 있는가?"의 여부를 의미한다.

## 3-1. 제어권(Control Flow)의 의미
여기서 **제어권**이란 어떤 의미를 갖는지 먼저 보자.
OS적인 관점에서 보자면, **현재 작업을 진행하고 있는 함수가 CPU를 점유하는 것**을 의미한다.
쉽게 말해 "코드를 실행시킬 수 있는 권한" 정도로 말할 수 있다.

동기 와 비동기는 Jobs 들이 순서대로 혹은 독립적으로 처리되는가에 관한 이야기라면,
이번에는 호출한 함수가 별개의 일을 할 수 있는지의 이야기이다.

## 3-2. 블로킹: 제어권을 넘겨주는 방식
마치 시험지를 넘겨주는 방식을 생각하면 편할 것 같다.
![image](https://github.com/user-attachments/assets/6eb36e86-150c-4144-86ce-6080ef86bece){: width="60%" height="100%" .center}
*출처 : https://www.veritas-a.com/news/articleView.html?idxno=156699*{: .image-caption}

내가 뒷 사람에게 시험지를 넘겨줄 때,
나는 아무런 행동도 하지 않고 **뒷 사람(호출된 함수)가 시험지를 가져가는(자신의 작업을 완료)할 때 까지** 나는 손에 시험지를 쥐고 뒷사람을 바라보고 대기할 수 밖에 없다.

![image](https://github.com/user-attachments/assets/d799e31b-9406-44f3-8dcc-9df15b8f8a79){: width="60%" height="60%" .center}

둘 간의 구분 방법은 제어권이 누구에게 있는지로 결정된다.

블로킹에서는 함수 A가 함수 B를 호출할 때 제어권이 B로 넘어간다.

제어권을 넘겨준 A는 B의 작업이 완료될 때까지 아무 작업도 수행할 수 없는 상태, 즉 블로킹 상태가 된다.

즉, 위의 사진에서 A함수는 B함수에게 제어권을 넘겨줌과 동시에 함수 실행이 일시 정지된다. = Blocking

## 3-3. 논블로킹: 제어권을 유지하는 방식
하지만 시험지를 그냥 뒷 사람 책상에 올려 놓는다면 어떨까.

나는 실제 뒷 사람이 받는 것을 대기할 필요없이, 바로 나의 다른 작업을 할 수 있다.

즉, 뒷 사람(호출된 함수)이 나에 대한 제어권을 바로 반환해줌으로, 호출한 쪽(나)에서는 계속 다른 작업을 할 수 있는 것이다.

같은 "읽기" 작업이어도 동기와 비동기 처리에 따라 어떻게 다르게 동작하는지 보자.

```java
// 블로킹: 제어권을 넘겨줌
String content = readFile("file.txt");  // 파일 읽을 때까지 다른 일 못함
doNextWork();                          // 파일 다 읽고 나서야 실행

// 논블로킹: 제어권을 유지
Future future = readFileAsync("file.txt");  // 요청만 하고
doNextWork();                               // 바로 다른 일 할 수 있음
```
![image](https://github.com/user-attachments/assets/4a59addb-b12d-4eaa-90c9-fe783a7556e0){: width="60%" height="60%" .center}

반면 논블로킹에서는 A함수가 B함수를 호출하더라도 제어권을 계속 유지한다.

따라서 B함수가 실행되는 동안에도, A함수는 제어권을 가지고 있기 때문에 다른 작업을 수행할 수 있다.

이렇게 호출자(caller)인 A함수는 B함수의 작업 완료 여부와 관계없이 자신의 작업을 계속 수행할 수 있다.

<br>

# 4. 네 가지 조합의 동작 방식

가끔 동기 처리에서는 무조건적으로 블로킹이 일어나고, 비동기에서는 논블로킹이 일어난다고 오해하는 경우가 많다.

하지만 두 쌍의 개념은 서로 다른 관점에서 바라보는 개념이라는 것을 확실하게 하고 넘어가자.

> 동기/비동기 : 작업들의 시간적 관계성   
블로킹/논블로킹 : 제어권의 소재

하지만 이 개념들이 오해가 잦은 이유는 실제 구현에서 [동기/볼로킹 & 비동기/논블로킹]이 **자주 함께 사용**되기 때문이다.

다음 그림을 보고 4가지 조합에 대해 천천히 살펴보자.

![image](https://github.com/user-attachments/assets/b894be55-d296-424d-913f-ee989233eb60){: width="100%" .center}

먼저 흔히 쓰이는 [동기/볼로킹 & 비동기/논블로킹] 에 대해 보자.

## 4-1. 동기 + 블로킹

작업의 흐름이 순차적으로 진행되는 것이 보장된다. (**동기**)

제어권을 함수 B에게 넘겨준 후 함수 A는 대기하게 된다. (**블로킹**)

함수 B가 실행을 완료하여 리턴값과 제어권을 돌려줄 때까지 함수 A는 기다리는 것이다.

> 이러한 조합은 **작업이 완료될 때까지 기다려야 하는 경우**에 사용된다.   
예를 들면, 파일을 읽은 후 이를 처리하는 코드를 생각해보자.   
파일을 처리하는 과정은 **필연적으로 파일을 모두 읽은 후에 작업이 가능**하기 때문이다.   
또한, 일반적으로 작업이 간단하거나 작업량이 적은 경우에 사용된다.   
작업량이 많거나 오래 걸리는 작업을 해당 방식으로 처리하면 **전체 프로그램이 멈춘 것 처럼 보여** 사용자 경험 측면에서 나빠질 수 있다.

## 4-2. 비동기 + 논블로킹

비동기 + 논블로킹 방식도 비교적 이해가 쉽다.

함수 A가 함수 B를 호출할 때, 함수 A는 함수 B의 작업이 완료되길 기다리지 않고 제어권을 즉시 반환 받는다. (**논블로킹**)

다른 작업의 결과를 바로 처리하지 않아 작업 순서가 지켜지지 않는 방식이다. (**동기**)

함수 B를 호출 할 때, 콜백 함수를 함께 줌으로써, 함수 B는 자신의 작업이 끝났을 때 **함수 A에게 준 콜백 함수를 실행시켜 자신의 작업이 끝났음**을 알려준다.

작업 A는 함수 B의 종료 여부에는 일단 관심이 없다.

B 함수가 자신의 실행을 완료했다면, A 함수의 어깨를 톡톡 쳐서 알려주면 되는 것이다.

> 다른 작업의 결과가 자신의 작업에 영향을 주지 않는 경우에 활용할 수 있다.   
또한, 대용량의 데이터를 처리하는 서비스에서 흔히 사용된다.   
가장 큰 특징은 호출 함수에 콜백 함수를 넣었다는 점이다.   

## 4-3. 동기 + 논블로킹

함수 A가 함수 B를 호출할 때, 함수 A는 함수 B의 작업이 완료되길 기다리지 않고 제어권을 즉시 반환 받는다.

이후 바로 자신의 코드를 실행한다. (**논블로킹**)

즉, 다른 작업이 진행되는 동안에도 자신의 작업을 별개로 처리할 수 있다.

조심할 것이 함수 A는 함수 B의 Return 값을 필요로 하는 것은 변함이 없다는 점이다.

A 함수는 B 함수의 리턴값이 필요하기 때문에, 중간중간 B 함수에게 함수 실행을 완료했는지 물어본다.

즉, A 함수(caller)가 B 함수(callee)의 실행이 종료되었는지 계속 예의 주시해야 한다. (순서 보장을 위해)

이로써 작업을 순차대로 수행할 수 있는 것이다. (**동기**)

여기서 조금 더 깊게 생각해보자.

어떻게 동기적으로 진행되면서 메인 쓰레드가 논블로킹이 될 수 있을까?

이 조합의 특징은 "작업 완료는 비동기로 처리하지만, 호출자는 필요할 때 결과를 동기적으로 받는다."로 정리할 수 있다.

즉, **순서를 유지하면서 결과를 사용해야 할 때 동기적으로 기다릴 수 있다.**

결국 **동기적** 이라는 말은 **호출자의 결과가 필요한 시점에서 순서를 보장**하며 작업을 진행한다는 것이다.

다음 JAVA 코드의 예시를 봐보자.

~~~java
public class SimpleDownloader {
    public static void main(String[] args) {
        int downloadProgress = 0;  // 다운로드 진행률
        
        // 다운로드 시작
        System.out.println("파일 다운로드를 시작합니다.");
        
        // 진행률 확인하면서 다른 작업 수행 (논블로킹)
        while (downloadProgress < 100) {  // 동기적: 순서 보장
            System.out.println("진행률: " + downloadProgress + "%");
            System.out.println("다른 작업을 할 수 있어요!");
            
            // 진행률이 증가한다고 가정
            downloadProgress += 20;
            
            try {
                Thread.sleep(1000);  // 1초 대기
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        
        System.out.println("다운로드 완료!");
    }
}
~~~
_🚨 주의: 이 예시 코드는 Thread를 사용하고 있다.   
Thread는 기본적으로 작업을 병렬적으로 처리하기 위한 도구이다.   
비동기 프로그래밍에서는 이러한 Thread의 병렬 처리 능력을 활용하여 비동기 작업을 구현하는 것이 일반적이다.   
하지만 이 예시의 주된 목적은 작업이 어떻게 논블로킹하면서도 동기적으로 처리될 수 있는지를 시각적으로 보여주는 것이다.   
Thread를 사용한 것은 개념을 쉽게 설명하기 위한 것이다._

이 코드의 결과는 다음과 같을 것이다.
~~~css
[메인 스레드] 나는 다른 작업을 진행할게.
[작업 스레드] 실행 시작!
[작업 스레드] 0번째 작업 수행 중...
[메인 스레드] 작업 스레드야, 작업 끝났니? = No
[메인 스레드] 작업 스레드야, 작업 끝났니? = No
[작업 스레드] 1번째 작업 수행 중...
[메인 스레드] 작업 스레드야, 작업 끝났니? = No
[메인 스레드] 작업 스레드야, 작업 끝났니? = No
[작업 스레드] 2번째 작업 수행 중...
...
[메인 스레드] 작업 스레드야, 작업 끝났니? = No
[작업 스레드] 실행 완료!
[메인 스레드] 작업 스레드 종료 확인!
[메인 스레드] 모든 작업 완료.
~~~


물론, 논블로킹 메서드로 비동기 작업을 시작하더라도, 결과를 기다려야 하는 시점에서는 블로킹처럼 동작할 수 있다.   
왜냐하면 메인 스레드가 결과를 받아야만 다음 작업을 진행할 수 있기 때문에, 그 시점에서는 블로킹이 되는 것이다.

![image](https://github.com/user-attachments/assets/b43ec8c4-9783-4fbf-9f7a-3736dff051bb){: width="80%" .center}


사실 이러한 방식의 구현은 흔치 않다.   
하지만, 몇 가지 활용 예를 알아보자면 **게임 로딩화면 구성** 등에 활용될 수 있다.   
보통 게임에서 패치나 다운로드를 할 때, 사용자에게 ProgressBar나 게임 Tip등을 띄워줘야 할 때가 있다.   
이 때는 Load 하는 동작이 완료될 때 까지 (작업 순서는 보장 = Sync)   
다른 작업이 진행될 수 있다. (Non-Blocking)
즉, 사용자 경험 측면에서 유용하게 활용될 수 있다.

> 언어 간에는 구현 방식에 차이가 있을 수 있다.   
이는 각 언어의 특성과 제공되는 라이브러리나 기술에 따라 달라질 수 있다.   
예를 들어, JavaScript는 단일 스레드 기반으로 동작하며, 콜백 함수, 프로미스(Promise), async/await 등의 메커니즘을 사용해 동기와 논블로킹 처리를 구현할 수 있다.   
기본적으로 Promise.then 방식은 비동기적이고 논블로킹 방식으로 처리된다.   
그러나 async/await 키워드를 사용하면, 비동기 작업의 순서를 지정할 수 있다.  
중요한 점은, async 함수가 내부적으로 비동기적으로 동작하며, 메인 콜 스택이 모두 비워져야 실행된다는 것이다.   
이로 인해 async/await도 내부적으로는 여전히 비동기적이고 논블로킹 방식으로 동작한다는 점을 유의해야 한다.
(동기적인 코드 흐름처럼 보이게 하는 트릭)

## 4-4. 비동기 + 블로킹

이러한 방식은 사실 실무에서 마주치기 더더욱 흔치 않다.

개념만 간단히 설명하자면,

다른 작업이 진행되는 동안 자신의 작업을 멈추고 기다린다. (**블로킹**)

다른 작업의 결과를 바로 처리하지 않고, 콜백함수를 보낸 후 기다린다.

이로써 작업 완료의 순서는 보장되지 않을 수 있다. (**비동기**)

**즉, 함수 A는 자신과 관련없는 함수 B의 작업이 끝날 때까지 기다려야 한다.**
_매우 비효율적인 로직..._

1 작업 중에 2 작업을 해야지 Async의 이점을 살릴 수 있는 것인데,
이것을 다시 Blocking 방식을 사용함여 대기시킴으로써 이점을 제거해버린 것이다...😅
대부분의 경우 비동기+논블로킹 모델이 더 효율적인 선택이 될 것이다.

<br>

# 5. 현대 프로그래밍에서 이러한 개념이 왜 중요한가?

이러한 이해는 현대 소프트웨어 개발에서 매우 중요하다. 오늘날의 애플리케이션들은 수많은 동시다발적인 작업을 처리해야 한다. 사용자는 파일을 다운로드하면서 동시에 문서를 편집하길 원하고, 데이터가 백그라운드에서 처리되는 동안에도 끊김 없는 인터페이스 사용을 기대한다.

더군다나 클라우드 컴퓨팅과 마이크로서비스 아키텍처가 보편화된 현대 개발 환경에서는, 네트워크를 통한 수많은 비동기 작업들이 동시에 발생한다. 이때 각 작업을 어떻게 처리할지, 작업 간의 의존성은 어떻게 관리할지를 결정하는 것은 시스템의 성능과 사용자 경험을 좌우하는 핵심 요소가 된다.

결국 이러한 개념들의 이해는 단순히 기술적인 지식을 넘어서, 현대 소프트웨어가 직면한 복잡성과 사용자 경험의 요구사항을 어떻게 조화롭게 해결할 수 있을지에 대한 통찰을 제공한다. 이는 우리가 더 효율적이고, 반응성 높은, 그리고 사용자 친화적인 소프트웨어를 설계하고 구현하는 데 있어 필수적인 기반이 될 것이다.

# 6. 마무리
그렇다면 Java에서는 이러한 비동기 처리를 어떻게 구현할 수 있을까?

Java의 비동기 프로그래밍은 Thread를 시작으로, 현대적인 CompletableFuture까지 꾸준히 발전해왔다.

이제 각각의 방식을 자세히 살펴보겠다.