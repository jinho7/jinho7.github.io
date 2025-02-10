---
layout: post
title: "Packet Tracer로 네트워크 이해하기"
subtitle: "LAN 토폴로지, 스위치, 라우터, 방화벽"
date: 2025-02-11 14:30:00 +0900
background: '/img/posts/network_topology.jpeg'
tags: [Network, PacketTracer, LAN, Switch, Router, Firewall, VLAN, Topology]
toc: true
toc_sticky: true
---

# LAN 토폴로지와 스위치

---

## Packet Tracer에 들어가기 전

먼저 네트워크의 기본 구성 요소부터 이해해보자.

**라우터, 스위치, 엔드 디바이스(PC, 서버 등)가 어떻게 상호 작용**하는지 알아보자.

-   가장 기본적인 두 대의 디바이스(`PC`)가 있다고 가정해보자.
-   두 PC를 연결하고, IP 주소 설정, 서브넷 마스크 설정을 하고 ping 테스트를 통해 연결.
    -   이 과정에서 TCP/IP의 기본 개념을 이해해보자.
-   그 다음 단계로 `스위치`를 추가하여 여러 대의 `PC`를 연결.
    -   L2 통신의 개념과 MAC 주소의 역할을 이해해보자.
-   마지막으로 `라우터`를 추가하여 서로 다른 네트워크 간의 통신을 구현.
    -   라우팅 테이블, 게이트웨이 등의 개념을 학습해보자.

## 사용법

## PC

[#_Image|kage@tdMGa/btsMchWsAbo/pXUJ5sc1Jn5zlePiDz1mrK/img.png|CDM|1.3|{"originWidth":1280,"originHeight":264,"style":"alignCenter"}_#]

-   장치 타입 → End Devices → PC / LAPTOP 등 Drag & Drop

## Switch

[#_Image|kage@bdJ1mb/btsMedLRoGJ/cpMkbVJahG5gP3qwnew9Uk/img.png|CDM|1.3|{"originWidth":194,"originHeight":256,"style":"alignCenter"}_#]

## Router

[#_Image|kage@A02nQ/btsMeKJcj9q/usIeZ7q3BDrYQHVk4TpOuk/img.png|CDM|1.3|{"originWidth":208,"originHeight":276,"style":"alignCenter"}_#]

## Connection

[#_Image|kage@rOlnO/btsMdkEVmv0/U1xgvAbp826OCElZjbp2Sk/img.png|CDM|1.3|{"originWidth":1280,"originHeight":280,"style":"alignCenter"}_#]

-   실선은 Copper Straight \[PC - Switch/Router\]
-   점선은 Copper Cross - Over \[Switch/Router … Switch/Router\]
-   번개 모양은 Automatic

## 기본 사용 방법

[#_Image|kage@mamWH/btsMdM8WmZV/J6Eve21yZP8cKJkdv8KQrK/img.png|CDM|1.3|{"originWidth":666,"originHeight":558,"style":"alignCenter"}_#]

-   장치(PC 와 Laptop)들을 놓는다.
-   각 디바이스 개수만큼 연결한 스위치 추가
-   실선과 점선으로 연결
-   스위치 0 → 메뉴에서 FastEthernet0/1 선택
-   PC 0 → 메뉴에서 FastEthernet0 선택
-   (나머지도 동일하게 연결)
-   왼쪽 스위치 : `FastEthernet0/2` 오른쪽 스위치 : `FastEthernet0/3`
-   PC 클릭 → Desktop → IP Configuration → IP Address에 `198.168.0.1`  
    Subnet Mask에 `255.255.255.0`
    -   나머지 장치는 IP 주소 ~0.2, ~0.3 순으로 입력

[#_Image|kage@dhy2rZ/btsMczo0VIn/LHz5KS8UijOguFkFqLdSSk/img.png|CDM|1.3|{"originWidth":1280,"originHeight":338,"style":"alignCenter","width":780,"height":206}_#]

-   Desktop → Command Prompt로 ping 테스트
-   작업 공간에서 Simulation 가능 \[실제 이동 경로 & 헤더 정보 등을 볼 수 있다.\]

## LAN Topology

-   같은 로컬 에이리어 네트워크 (LAN) 내에서 네트워크 장비와 디바이스들이 어떻게 물리적 혹은 논리적으로 연결되어 있는지 나타내는 구조

## LAN과 WAN

-   **LAN (로컬 영역 네트워크)**:
    -   제한된 지역 내에서 연결된 네트워크
    -   **스위치**는 MAC 주소를 사용하여 네트워크 내 장치들 간에 데이터를 전달합니다. 스위치는 **MAC 주소 테이블**을 사용해 데이터를 해당 장치로 정확하게 전달
-   **WAN (광역 네트워크)**:
    -   더 넓은 지역, 심지어 전 세계적으로 연결된 네트워크
        -   인터넷이 대표적인 WAN 예시
    -   WAN에서는 서로 MAC 주소를 알 수 없음
    -   WAN에서 라우터는 **IP 주소**를 기반으로 데이터를 전달하는데, 각 네트워크 간의 경로를 찾기 위해 **라우팅 테이블**을 사용
        -   NAT / PAT

[#_Image|kage@cyma1b/btsMcdGGX7j/3HjkxSXXuguLBaXiMCtKp1/img.png|CDM|1.3|{"originWidth":1280,"originHeight":933,"style":"alignCenter","width":757,"height":552}_#]

## 1) Bus 형

-   하나의 메인 케이블(백본)에 모든 노드가 연결되는 구조
-   장점 :
    -   구조가 단순하고 설치 비용이 저렴
    -   노드 추가/제거가 쉽고 유연함
    -   케이블 길이가 짧아 경제적
    -   소규모 네트워크에 적합
-   단점 :
    -   트래픽 증가 시 성능 저하
    -   메인 케이블 장애 시 전체 영향
    -   데이터 충돌 발생 가능
    -   보안 취약점 존재

[#_Image|kage@cdwQWE/btsMctoZGjP/YoLinRs4T7sWM3Iv3xCkfK/img.png|CDM|1.3|{"originWidth":1138,"originHeight":650,"style":"alignCenter","width":690,"height":394}_#][#_Image|kage@XghRi/btsMc2doIc4/cDKKGHIAwzkFizYIthmvX1/img.png|CDM|1.3|{"originWidth":978,"originHeight":456,"style":"alignCenter","width":620,"height":289}_#]

-   `ping 192.168.0.4`

## 2) Ring 형

-   각 노드가 양옆의 두 노드와 연결되어 원형을 이루는 구조
-   자동선택 기능을 사용한 링
-   장점 :
    -   데이터 흐름이 일정하고 예측 가능
    -   충돌이 적고 전송이 안정적
    -   각 노드가 리피터 역할 수행
    -   장거리 전송에 유리
-   단점 :
    -   단일 노드 장애가 전체에 영향
    -   네트워크 확장이 제한적
    -   설치/제거 시 네트워크 중단
    -   양방향 링 구성 시 비용 증가

[#_Image|kage@lYUdr/btsMetVb0e8/23KtOkSs1PeRKuNml0S2AK/img.png|CDM|1.3|{"originWidth":1108,"originHeight":642,"style":"alignCenter","width":598,"height":346}_#][#_Image|kage@rYlFs/btsMeKWHZEC/wFs32hn23rG7rKA9WFyKxK/img.png|CDM|1.3|{"originWidth":982,"originHeight":460,"style":"alignCenter","width":621,"height":291}_#]

-   `ping 192.168.0.4`

## 3) Star 형

-   중앙에 허브가 있고 모든 노드가 이 허브에 직접 연결되는 구조
-   장점 :
    -   구현과 유지보수가 단순하고 직관적
    -   개별 노드 장애가 다른 노드에 영향 없음
    -   높은 성능과 데이터 전송 속도
    -   중앙 집중적 보안 관리 용이
-   단점 :
    -   중앙 허브 장애 시 전체 네트워크 마비 - 단일 장애 지점 (SPOF)
    -   허브에 과부하 발생 가능
    -   케이블 설치 비용이 높음
    -   허브 용량에 따른 확장성 제한

[#_Image|kage@NJ0T7/btsMdF26Hzf/aEmXKMDwoG1TwsmUekA04K/img.png|CDM|1.3|{"originWidth":1088,"originHeight":678,"style":"alignCenter","width":627,"height":391}_#][#_Image|kage@vFDga/btsMcTgvpqn/IDhAPb27H9xt3kN9pDOB7k/img.png|CDM|1.3|{"originWidth":964,"originHeight":456,"style":"alignCenter","width":585,"height":277}_#]

-   `ping 192.168.0.4`

## 4) Mesh 형

-   모든 노드가 서로 직접 연결되는 구조
-   장점 :
    -   높은 안정성과 이중화 구성
    -   효율적인 트래픽 분산
    -   우회 경로 확보로 신뢰성 높음
    -   뛰어난 보안성
-   단점 :
    -   설치/유지보수 비용이 매우 높음
    -   구현과 설정이 매우 복잡
    -   케이블 연결 관리가 어려움
    -   노드 수 증가에 따른 복잡도 급증

[#_Image|kage@bb9BX4/btsMeahgXHL/gVJ4LgKjyCG8M1I6DkkbP0/img.png|CDM|1.3|{"originWidth":1070,"originHeight":674,"style":"alignCenter","width":628,"height":396}_#][#_Image|kage@ovOWb/btsMb2rFLwg/Qi0orK06gCRkfnrkBXhvyK/img.png|CDM|1.3|{"originWidth":964,"originHeight":432,"style":"alignCenter","width":677,"height":303}_#]

-   `ping 192.168.0.4`

## 5) Tree 형

-   계층적 구조로, 상위 노드에서 하위 노드로 분기되는 형태
-   장점 :
    -   네트워크 확장이 용이
    -   체계적인 계층 구조 관리
    -   하위 네트워크 독립성
    -   효율적인 트래픽 관리
-   단점 :
    -   루트 노드 장애 시 전체 영향
    -   계층 증가에 따른 관리 복잡성
    -   상위 노드 병목 현상 가능
    -   깊이가 깊어질수록 지연 증가

[#_Image|kage@wounf/btsMcywRCH9/2KnaYgagHLQKp4cBdcumy0/img.png|CDM|1.3|{"originWidth":1280,"originHeight":985,"style":"alignCenter","width":765,"height":589}_#][#_Image|kage@dI6An5/btsMd4hh7vI/Gxr1Nv7uKXeDV0vrZs1qT0/img.png|CDM|1.3|{"originWidth":960,"originHeight":458,"style":"alignCenter","width":642,"height":306}_#]

-   192.168.0.1 to 192.168.0.12

## VLAN(Virtual LAN) (case 1 : Switch 1개)

## VLAN이란?

“**논리적인 구조의 속임수로 같은 물리적 공간에 있는 네트워크를 다른 네트워크에 있는 것처럼 속이는 기술**”

-   먼저, 물리적인 LAN을 먼저 생각해보면, 같은 건물이나 같은 층에 있는 컴퓨터들이 하나의 네트워크로 연결되어 있는 구조이다.
-   그런데 예를 들면, 마케팅팀과 개발팀이 다른 네트워크에 있어야 한다고 가정해보자.
    -   전통적인 방식이라면 물리적으로 별도의 네트워크 장비와 케이블을 설치해야 했다.
    -   하지만, VLAN은 이런 물리적 제약을 소프트웨어적으로 해결한다.
-   하나의 물리적인 스위치를 마치 여러 개의 독립된 스위치처럼 동작하게 만드는 기술이다.
-   예를 들어, 같은 스위치에 연결된 컴퓨터라도 서로 다른 VLAN에 속하면 마치 다른 네트워크에 있는 것처럼 통신이 분리된다.

## 초기 default VLAN 설정

-   show vlan으로 확인해보자.

[#_Image|kage@bTHrGF/btsMea2FcPL/VagNQtcNTnfvH7OWzcKevk/img.png|CDM|1.3|{"originWidth":1250,"originHeight":974,"style":"alignCenter","width":670,"height":522}_#]

-   처음 VLAN 1은 ‘기본 VLAN’이다.
-   모든 스위치 포트는 처음에 이 VLAN 1에 속하도록 설정되어 있다.
    -   그래서 별다른 설정 없이는 같은 물리적인 공간에 있다면 한 네트워크에 속하도록 설정이 된다.
-   그리고 VLAN 1002부터 1005까지는 특별한 목적으로 예약된 VLAN이다. (사용 불가)
    -   FDDI, 토큰링 등으로 고정되어 있다.
-   우리가 새로운 VLAN을 할당하려고 하면 “2 ~ 1001” 의 VLAN을 사용해서 나누면 된다.

## VLAN 구성하기

-   먼저 VLAN 2개를 생성한다.

```
Switch#enable
Switch#config terminal
Enter configuration commands, one per line.  End with CNTL/Z.
Switch(config)#vlan 2
Switch(config-if)#name VLAN_2
Switch(config-if)#exit
```

-   enable : 관리자 모드 진입
-   config terminal : 글로벌 모드 진입
-   vlan 2 : vlan 모드 진입
-   name <이름> : 진입되어 있는 vlan의 이름 설정

[#_Image|kage@dsQlbd/btsMdqdX0ps/kPhix6BIWT0KDKtVJzq3NK/img.png|CDM|1.3|{"originWidth":1185,"originHeight":1000,"style":"alignCenter","width":734,"height":619}_#]

결과

-   그리고, `VLAN_2`엔 `Fa0/1` 과 `Fa0/2`, `VLAN_3`엔 `Fa0/3` 과 `Fa0/4` 포트를 배정시킨다.

```
Switch#enable
Switch#config terminal
Enter configuration commands, one per line.  End with CNTL/Z.
Switch(config)#interface fa0/1
Switch(config-if)#switchport mode access
Switch(config-if)#switchport access vlan 2
```

-   inteface fa0/1 : 인터페이스 모드 진입
-   switchport mode access : 해당 포트를 VLAN 전용으로 사용함을 선언
-   switchport access vlan 2 : 해당 포트가 속한 VLAN 번호 설정

[#_Image|kage@GEPhJ/btsMcd0ZUA9/NJfHXH7fr603Pozrp0XUN1/img.png|CDM|1.3|{"originWidth":1280,"originHeight":779,"style":"alignCenter","width":697,"height":424,"caption":"결과"}_#][#_Image|kage@ZktHy/btsMceFDArB/GmkkKk7xrFmJK5XI7GNxS1/img.png|CDM|1.3|{"originWidth":1280,"originHeight":975,"style":"alignCenter","width":686,"height":523}_#]

## VLAN 통신 테스트

1.  `192.168.0.1` to `192.168.0.2`
    -   같은 VLAN 내에서는 통신 가능

[#_Image|kage@BqqF9/btsMceevW1X/38cHtm9y7VtBM8yRsEMKb1/img.png|CDM|1.3|{"originWidth":742,"originHeight":340,"style":"alignCenter","width":653,"height":299}_#]

1.  `192.168.0.1` to `192.168.0.2`

-   다른 VLAN 끼리는 통신 불가능

[#_Image|kage@905VT/btsMcKD1XhO/HVQpVtHJXEQCpfTAUkHWYk/img.png|CDM|1.3|{"originWidth":1060,"originHeight":502,"style":"alignCenter","width":668,"height":316}_#]

## VLAN(Virtual LAN) (case 2 : Switch 여러 개)

-   그렇다면 네트워크를 확장하고 좀 더 현실적인 아키텍쳐로 바뀌면 어떨까?
-   먼저 Switch를 하나 더 두어보자.
-   _들어가기전_
    -   VLAN 설정 자체는 IP 주소를 직접 변경하지 않는다.
        -   VLAN은 Layer 2(데이터 링크 계층)에서 작동하는 반면,  
            IP 주소는 Layer 3(네트워크 계층)에서 작동하기 때문.
    -   그러나, 실제 네트워크 운영에서는 일반적으로 각 VLAN마다 서로 다른 IP 대역을 할당한다.
        -   네트워크 관리와 보안을 위한 설계
    -   그러므로 VLAN 별로 다른 대역을 할당해보자.
        -   VLAN 2: 203.237.20.nnn
        -   VLAN 3: 203.237.30.nnn

[#_Image|kage@pcw1H/btsMc0NoTlz/v9c56wkkpb2qWxKk6BEsq0/img.png|CDM|1.3|{"originWidth":1031,"originHeight":1000,"style":"alignCenter","width":680,"height":660}_#]

-   Switch 0 설정

[#_Image|kage@d5TDWZ/btsMekcZbAx/1meC8Kjg2Niht4JKNpWjE1/img.png|CDM|1.3|{"originWidth":1280,"originHeight":325,"style":"alignCenter","width":757,"height":192}_#]

-   Switch 1 설정

[#_Image|kage@bxI7Ez/btsMcsXSPgC/McV65YvUN8ELGhZbpqxaEK/img.png|CDM|1.3|{"originWidth":1280,"originHeight":336,"style":"alignCenter","width":750,"height":197}_#]

여기서 이런 궁금증이 든다.

-   🤔 과연 PC2는 PC0과 통신이 가능할까?
    -   결과를 보면, PC1과는 통신이 가능하지만, 다른 스위치로 넘어가면서 통신이 불가능해진다

[#_Image|kage@cdqmkw/btsMeSmNMeI/jnvpXenhi6dV8W4U8oGWaK/img.png|CDM|1.3|{"originWidth":994,"originHeight":806,"style":"alignCenter","width":664,"height":538}_#]

-   이런 논리적인 흐름의 질문이 든다.
    1.  오히려 VLAN 설정하기 전에 그냥 여러 스위치를 건너 뛰어도 통신이 됐음.
    2.  그리고 같은 VLAN 끼리는 통신이 된다고 했다.
    3.  그런데 갑자기 같은 VLAN에서 여러 스위치를 건너뛰면 왜 통신이 안될까?
-   여기서 **VLAN 태그**라는 개념이 등장한다.
    -   VLAN을 설정하면 각 패킷에는 특별한 VLAN ID가 붙게 된다.
        -   (마치 우편물에 부서명을 적는 것과 같다.)
    -   일반적인 스위치의 Port(Access Port)는 VLAN 태그를 처리하는 방법에 대해 1가지 밖에 모른다.
        -   PACKET 들어올 때 : 자신의 VLAN 번호를 태그로 붙인다.
        -   PACKET 나갈 때 : 태그를 제거하고 보낸다.
    -   그럼 여기서 문제가 발생한다.
        -   PC2에서 나온 패킷
            -   Switch 0으로 들어올 때 : fa0/2에서 VLAN 2 태그를 붙임
        -   이 패킷이 fa0/5로 가면서 VLAN 1의 통신으로 취급됨 \[VLAN 2 태그가 떨어짐\]
        -   다른 스위치의 fa0/3에 도착했을 때도 VLAN 1의 통신으로 인식됨
        -   결과적으로 원래의 VLAN 2 통신이 의도대로 전달되지 못함.
    -   \[즉, **Switch0의 fa0/와 Switch1의 fa0/3이 VLAN 1이기 때문**\]

→ **스위치 간 VLAN 전용 통로가 필요하다!**

## 트렁크(Trunk)

\[먼저 PC2가 PC0과 통신이 가능하도록 해결해보자\]

-   Switch0과 Switch1간에 VLAN 2,3 전용 포트 따로 설정!
-   switch0의 fa0/5, fa0/6을 각각 VLAN 2,3 전용으로 설정
-   switch1의 fa0/3, fa0/4를 각각 VLAN 2,3 전용으로 설정
-   Switch 0 포트의 VLAN 상태

[#_Image|kage@b3x84T/btsMei0AEyD/DYcMw88NkSnY9eQ8B22zcK/img.png|CDM|1.3|{"originWidth":1154,"originHeight":64,"style":"alignCenter","width":699,"height":39}_#]

-   Switch 1 포트의 VLAN 상태

[#_Image|kage@URbjM/btsMdIyMTr2/uZ7hOtRQPSYbugPuyZe3s1/img.png|CDM|1.3|{"originWidth":1064,"originHeight":74,"style":"alignCenter","width":731,"height":51}_#]

-   PC2에서 PC0로 통신이 가능하다.

[#_Image|kage@AcI9Y/btsMeveoKpG/MRkQDsbDHXP76MV9pLzZR0/img.png|CDM|1.3|{"originWidth":956,"originHeight":432,"style":"alignCenter","width":727,"height":329}_#][#_Image|kage@cav9Br/btsMdpMVs7n/kO9tRv5kLVsRKP9bNXqDuK/img.png|CDM|1.3|{"originWidth":714,"originHeight":510,"style":"alignCenter"}_#]

그런데 또 이런 궁금증이 든다.

-   🤔 과연 VLAN 별 통신 라인 추가가 바람직한 해결인가?
    -   만약 VLAN이 수백개라면..?
    -   일일이 연결해줄 수 없다
    -   또한 추가 가능한 VLAN ID는 1000개.
        -   → **Trunk** 가 해결책

## 트렁크란?

-   **트렁크는 모든 VLAN 패킷을 하나의 포트로 통과시키는 것**
-   스위치 간 프레임 전달에 하나의 물리적 연결(포트)를 공유하는 것.
-   VLAN 트렁킹된 스위치들 간에 여러 VLAN에서 나온 프레임들을 이 트렁크를 통해 전달한다.
-   즉, 스위치와 스위치 간 프레임 전달 시 하나의 포트에 다수의 VLAN이 지나갈 수 있도록하는 링크.

```
Switch(config)#interface fa0/5
Switch(config-if)#switchport mode trunk

Switch(config-if)#
%LINEPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/5, changed state to down

%LINEPROTO-5-UPDOWN: Line protocol on Interface FastEthernet0/5, changed state to up
exit
Switch(config)#exit
Switch#
%SYS-5-CONFIG_I: Configured from console by console
show interface trunk
Port        Mode         Encapsulation  Status        Native vlan
Fa0/5       on           802.1q         trunking      1

Port        Vlans allowed on trunk
Fa0/5       1-1005

Port        Vlans allowed and active in management domain
Fa0/5       1,2,3

Port        Vlans in spanning tree forwarding state and not pruned
Fa0/5       none
```

[#_Image|kage@cj9Kft/btsMcrLrqjC/NZkK8P615yIbq5LWFeBswk/img.png|CDM|1.3|{"originWidth":1280,"originHeight":839,"style":"alignCenter","caption":"Switch0의 Fa0/5 포트 Trunk 설정"}_#]

1.  Fa0/5가 트렁크 포트로 on (강제로 트렁크 모드로 설정) 되었다.
2.  1~1005는 이론적으로 모든 VLAN 범위가 통과 가능하다.
3.  실제 현재 사용 중인 VLAN : 1, 2, 3이 현재 활성화되어 있다.
4.  Vlans in spanning tree forwarding state and not pruned : None  
    (활성화된 VLAN들이 여기 나타나야 한다. - 없다.)

-   Fa0/5 포트는 Native VLAN이 1로 설정됨
-   반대편 Fa0/3 포트는 Native VLAN이 2로 설정됨
    -   Switch1의 Fa0/3 포트도 Trunk로 설정해준다.

[#_Image|kage@kzW3S/btsMec7cVIK/IBXxcLCh7BYeCYd9J2nScK/img.png|CDM|1.3|{"originWidth":1136,"originHeight":414,"style":"alignCenter","width":654,"height":238}_#]

-   물론 PC2에서 PC0로 통신이 가능해졌다.

[#_Image|kage@bryfWp/btsMcPE65aP/UGX9KHYfm1QMvME24buAtk/img.png|CDM|1.3|{"originWidth":956,"originHeight":428,"style":"alignCenter","width":706,"height":316}_#]

## Inter-VLAN

-   놓치면 안되는 것의 “**기술의 도입에 대한 목적**”이다.
    -   VLAN의 목적은 가상의 LAN으로서 관리의 편리성 추구이며,  
        다른 VLAN과의 통신 제한이 아니다.
-   그럼, 서로 다른 VLAN 간의 통신이 가능하도록 하는 방법은 없을까?
-   VLAN 간 통신을 하려면 라우터(게이트웨이)가 있어야 한다.
    -   라우터를 경유하여 마치 다른 LAN으로 통신하는 것처럼 동작한다.
-   \[다른 네트워크 영역은 라우터가 필요!!!\]

## 서브 인터페이스

-   단순히 생각하면 이런 생각이 든다.
-   전통적인 라우터 방식: 각 VLAN마다 라우터의 물리적 인터페이스를 하나씩 사용
-   그러나 이런 생각의 전환을 해본다.
    -   **하나의 물리적 라우터 인터페이스에 여러 개의 논리적 인터페이스를 생성하여 각각 다른 VLAN을 처리할 수 있도록 할 수 있다면?**
    -   그런데, Fa0/0이라는 물리적 라우터 인터페이스에 어떻게 여러 개의 논리적 인터페이스를 생성할까?

[#_Image|kage@Y1VKx/btsMeSUECM4/0Qz0wbAb4G4UBmT0SLhXYk/img.png|CDM|1.3|{"originWidth":260,"originHeight":298,"style":"alignCenter","width":167,"height":191}_#]

-   서브 인터페이스: 하나의 인터페이스에 여러 VLAN들의 인터페이스를 논리적으로 나누는 것
-   2811 모델을 추가해준다!
    -   참고 :
    -   _2811 라우터는 Cisco의 중급 라우터로, Inter-VLAN 라우팅을 위한 서브인터페이스 구성을 지원합니다. 서브인터페이스란 하나의 물리적 인터페이스를 여러 개의 논리적 인터페이스로 나누어 사용할 수 있게 해주는 기능입니다. 이는 마치 하나의 도로를 여러 개의 차선으로 나누어 서로 다른 목적지로 가는 차들을 효율적으로 처리하는 것과 비슷합니다._

1\. fa0/0 활성화

[#_Image|kage@dysMoj/btsMcdzWje7/FkpECQDsjzhv7gtsA3SGI1/img.png|CDM|1.3|{"originWidth":846,"originHeight":200,"style":"alignCenter"}_#]

2\. fa0/0.2 생성, VLAN2 연결, IP주소 할당 & fa0/0.3 생성, VLAN3 연결, IP주소 할당

[#_Image|kage@b2QZaS/btsMb1M28tD/PwRCtfFGc9U9WdizCjU6pk/img.png|CDM|1.3|{"originWidth":1280,"originHeight":691,"style":"alignCenter","width":790,"height":426}_#]

3\. switch1 fa0/4를 트렁크 모드로 설정

[#_Image|kage@bGoCk8/btsMdHT860Z/dwqr98u0ihaJDerscGQ7j1/img.png|CDM|1.3|{"originWidth":1248,"originHeight":546,"style":"alignCenter","width":718,"height":314}_#]

4\. Router의 서브 인터페이스 상태 확인

[#_Image|kage@bnyTgA/btsMevrWYog/pDkKHGHiWCNLKzR85a7Qn1/img.png|CDM|1.3|{"originWidth":1280,"originHeight":219,"style":"alignCenter","width":819,"height":140}_#]

5\. 게이트웨이 설정

\- VLAN 2 (PC0, 1, 2) → 203.237.20.254

[#_Image|kage@bjr2GX/btsMey9WnrP/zNHfPdHwYlhyUSeIwsz6n0/img.png|CDM|1.3|{"originWidth":1280,"originHeight":384,"style":"alignCenter","width":767,"height":230}_#]

\- VLAN 3 (Laptop0, 1, 2) → 203.237.30.254

[#_Image|kage@9Pp8f/btsMcxY6pxv/toN6xYeoWLuqsvp1xIlJ90/img.png|CDM|1.3|{"originWidth":1280,"originHeight":606,"style":"alignCenter","width":773,"height":366}_#]

# 스위치

---

## 스위치의 동작 원리

## MAC 주소 테이블 동작 원리

-   스위치와 노드들이 **ARP**를 통해 MAC 주소 정보를 지속적으로 교환한다.
    -   ARP 프로토콜에 포함된 MAC 주소 정보를 기반으로 스위치의 MAC 주소 테이블이 구축된다.
    -   실제 데이터 전송 (ping 등)이 발생하면, 이 MAC 주소 테이블을 참조하여 패킷을 적절한 포트로 전달
-   MAC 주소 테이블은 네트워크 토폴리지 변화를 반영하기 위해 일정 주기로 초기화되며, 최신 정보로 동적 갱신된다.

## ARP란?

-   IP 네트워크에서 IP 주소를 물리적인 MAC 주소로 변환하는 핵심 프로토콜
-   컴퓨터가 같은 네트워크 상의 다른 장치와 통신하려면 반드시 상대방의 MAC 주소를 알아야 하는데,  
    ARP가 이 주소 변환 과정을 자동으로 처리해준다.

## ARP를 활용한 동작 원리

_PC0에서 Laptop0으로 ping을 보낸다고 가정_

[#_Image|kage@cDoPQ4/btsMdLhTSuP/NdTWBqnwp8pAXYoKUrWZrK/img.png|CDM|1.3|{"originWidth":988,"originHeight":436,"style":"alignCenter","width":742,"height":327}_#]

1.  ARP Request (PC0 → Switch0)
    -   PC0이 Laptop0의 MAC 주소를 알아내기 위해 ARP 요청 패킷 전송
    -   패킷 내용:
        -   출발지: PC0의 IP 주소와 MAC 주소
        -   목적지: Laptop0의 IP 주소 (MAC 주소는 미확인 상태)
2.  스위치 **브로드캐스트** (Switch0 → 모든 노드)
    -   Switch0은 PC0의 **MAC 주소를 자신의 테이블에 기록**
    -   수신한 ARP 요청 패킷을 모든 포트로 브로드캐스트
3.  ARP reply (Laptop0 → Switch0)
    -   Laptop0이 자신의 IP 주소를 확인하고 ARP 응답 패킷 생성
    -   패킷 내용:
        -   출발지: Laptop0의 IP 주소와 MAC 주소
        -   목적지: PC0의 IP 주소와 MAC 주소
    -   Laptop0은 PC0의 MAC 주소를 자신의 ARP 캐시에 저장
4.  스위치 전달 단계 (Switch0 → PC0)
    -   Switch0은 수신한 응답 패킷을 PC0에게 전달
    -   PC0과 Laptop0의 MAC 주소 정보를 MAC 주소 테이블에 저장
5.  통신 시작
    -   PC0이 Laptop0의 MAC 주소를 획득하여 실제 데이터 통신 가능

## 시뮬레이션

-   시뮬레이션을 눌러서 이벤트 목록창을 볼 수 있다.
-   편지봉투 모양의 \[Add Simple PDU\] → ICMP 패킷 전송 시뮬레이션
-   송신노드와 수신 노드를 클릭하고 Show All/None 클릭 후 ARP, ICMP 패킷만 클릭한다.
-   _PC0에서 Laptop0으로 편지를 보낸다._
-   ARP - ICMP 순으로 통신이 이루어진다.

## 1) ARP 패킷 분석

1\. PC0 → Switch0 ARP Request

[#_Image|kage@cwVj4Z/btsMcHN0AZ1/QtiRKPTAkw5cwMHngIJq5K/img.png|CDM|1.3|{"originWidth":900,"originHeight":1158,"style":"alignCenter","width":522,"height":672}_#]

-   ARP
    -   Source MAC  
        \= PC0 의 MAC 주소
    -   Source IP  
        \= PC0의 IP 주소
    -   Target MAC  
        \= Laptop 의 MAC 주소 \[모르는 주소\]
    -   Target IP  
        \= Laptop0의 IP주소

2\. Switch0 → 모든 노드 (브로드캐스트)

[#_Image|kage@dvlpX3/btsMdr43c4X/YNHxFWmjmqgayudoXkG1l0/img.png|CDM|1.3|{"originWidth":818,"originHeight":124,"style":"alignCenter","width":594,"height":90}_#]

-   Switch0은 수신한 ARP Request를 모든 포트로 전달
-   Switch0의 MAC 주소 테이블에 PC0의 정보 기록
    -   포트 번호와 PC0의 MAC 주소 매핑

3\. Laptop0→ Switch0 ARP Reply

[#_Image|kage@K4KvV/btsMcdUawiw/VpUysCPR5W9T4yYTKTcqJK/img.png|CDM|1.3|{"originWidth":1002,"originHeight":1242,"style":"alignCenter","width":627,"height":777}_#]

-   ARP
    -   Source MAC  
        \= Laptop0 의 MAC 주소
    -   Source IP  
        \= Laptop0의 IP 주소
    -   Target MAC  
        \= PC0 의 MAC 주소
    -   Target IP  
        \= Laptop0의 IP주소

## 2\. ICMP 패킷 분석

1.  PC → Laptop

[#_Image|kage@6AWAV/btsMdMA4Jmh/dd2ilCfmHRbqRt9DFVNWhK/img.png|CDM|1.3|{"originWidth":2056,"originHeight":1186,"style":"alignCenter","width":690,"height":398}_#]

-   SRC ADDR = PC0의 MAC 주소
-   DEST ADDR = Laptop0의 MAC 주소

## 3) Switch0의 MAC 주소 테이블 변화

[#_Image|kage@dEbxME/btsMdnn7IXG/koFfWfejqCW9bxxbzaYPb0/img.png|CDM|1.3|{"originWidth":1080,"originHeight":611,"style":"alignCenter","width":747,"height":423}_#][#_Image|kage@WjEAg/btsMdmbIixx/in3AqgZZ7OkLwPpGkcb270/img.png|CDM|1.3|{"originWidth":1080,"originHeight":734,"style":"alignCenter","width":727,"height":494}_#]

-   위를 보니 Fa0/1 Fa0/4에 연결된 PC0과 Laptop0의 MAC 주소가 테이블에 기재되었다.

🤔 갑자기 이런 궁금증이 든다.

-   Switch0 → 모든 노드로 BroadCast할 때 각자의 MAC 주소 받아오면 되는거 아닌가?
-   해답은 ARP를 이용해 MAC 주소 테이블이 어떻게 유지하는지의 방법에 있다.
    -   스위치의 MAC 주소 학습은 '출발지(Source) MAC 주소'만을 대상으로 한다.
        -   PC0이 ARP Request를 보낼 때
        -   Laptop0이 ARP Reply를 보낼 때
    -   모든 노드로 전달된 ARP-Request 패킷에 대해 수신 노드가 아니면 응답하지 않는다.
    -   PC1과 Laptop1은 Swtich0이 전달한 ARP-Request에 대해 Reply 하지 않는다.

그런데 이런 ‘고민’도 떠오른다.

1.효율성

-   ARP는 매우 짧은 시간 간격으로 반복 실행한다.
    -   노드들이 많은 네트워크에서는 통신량으로 부하 가중
    -   특히 스위치가 모든 노드에게 BroadCast하는 ARP-Request에서

2\. 보안상의 문제

-   Laptop1이 악의적인 공격자라고 가정해보자.
    -   ARP Reply가 실제로 해당 IP 주소를 가진 정당한 장치에서 온 것인지 확인하지 않는다. (보안 X)
    -   이 때 Laptop0의 IP에 Laptop1 MAC 주소를 실어서 Reply한다면?
    -   테이블이 제대로 갱신되기 전까지 PC0은 Laptop0인 줄 알고 모든 패킷을 보낸다.

## VLAN을 통한 해결

-   MAC 주소를 이용한 라우팅
    -   동일한 네트워크(LAN)에서 스위치를 통해서만 발생한다.
    -   라우터를 통한 외부 네트워크로의 통신에는 사용되지 않는다.
        -   ARP 패킷은 하나의 네트워크에서만 송수신한다.
        -   LAN을 논리적으로 분리된 가상의 VLAN으로 관리한다.

# 라우터

---

## 라우터란?

-   라우터는 서로 다른 네트워크를 연결하는 3계층 장비.
-   IP 주소를 기반으로 패킷의 최적 경로를 결정하고 전달한다.
    -   스위치가 같은 네트워크 내에서 MAC 주소를 기반으로 통신을 담당한다면,
    -   라우터는 서로 다른 네트워크 간의 통신을 가능하게 만드는 일종의 '네트워크 간의 다리' 역할을 한다.

## 라우터의 Mode

-   **사용자 모드(User EXEC Mode)**
    -   기본적인 정보 조회만 가능, 설정 변경 불가
    -   \> 로 표시

-   **관리자 모드(Privileged EXEC Mode)**
    -   라우터 설정을 변경할 순 없지만 시스템 정보 상세조회 가능
    -   \# 으로 표시
-   **글로벌 모드(Global Configuration Mode)**
    -   라우터 설정(이름, 보안, 인터페이스 등)을 변경
    -   (config)# 로 표시
    -   **라인 모드(Line Configuration Mode)**
        -   콘솔, 원격 접속(Telnet, SSH 등) 관련 설정 변경
        -   (config-line)# 로 표시
    -   **인터페이스 모드(Interface Configuration Mode)**
        -   라우터의 네트워크 인터페이스(이더넷, 시리얼 등) 설정을 변경
        -   라우터의 인터페이스에 IP 주소를 설정하고 활성화/비활성화
        -   (config-if)# 로 표시

## 목표 네트워크 구성

[#_Image|kage@FrASQ/btsMeLVCXVC/1wKsZjYPW9BikRxL7DFtC1/img.png|CDM|1.3|{"originWidth":813,"originHeight":495,"style":"alignCenter"}_#]

## 기본 설정

-   라우터 3대: \[Network Devices\] → \[Routers\] → \[2811\]
-   스위치 1대 : \[Network Devices\] → \[Switches\] → \[2960\]
-   PC 3대, 노트북 1대, 서버 1대 : \[End Devices\] → \[PC\], \[Laptop\], \[Server\]

## 라우터 - 시리얼 인터페이스 장착

[#_Image|kage@zgPDU/btsMd3bDPMR/E6TXH94lrMz3OrUR6TF5hK/img.png|CDM|1.3|{"originWidth":1280,"originHeight":1293,"style":"alignCenter"}_#]

-   PC와 달리 두 라우터 간에 데이터를 주고받기 위한 동기화가 필요
-   FastEthernet이 아닌 Serial 인터페이스를 사용하므로 모듈을 추가해야 한다.
    -   HWIC-2T 추가

## 노드 간 연결하기

-   Laptop0은 통신용이 아니라 Router0을 설정하기 위한 콘솔
    -   FastEthernet 케이블이 아닌 RS232(하늘색) 케이블로 연결
-   라우더들끼리 Serial DCE 연결
    -   먼저 클릭한 쪽에 시계 모양 - 두 라우터 간 데이터를 주고받기 위한 동기화가 필요
    -   Serial DCE(Data Communication Equipment): 시간 동기화를 주도하는 노드 (시계 있는 쪽)
    -   Serial DTE(Data Terminal Equipment): 그에 따라 동기화하는 노드 (시계 없는 쪽)

[#_Image|kage@evpmpX/btsMdMnzPql/PLX7aieEhAKMJ6N99C2j5K/img.png|CDM|1.3|{"originWidth":2184,"originHeight":1246,"style":"alignCenter"}_#]

## IP 설정

-   컴퓨터들은 203.237.nnn.nnn/24 사용(C클래스)
    -   1번부터 시작
-   원격 관리가 필요한 스위치나 서버는 100번 부터
-   라우터는 광역의 랜들을 연결하므로 A클래스 IP 사용
    -   규모가 작아 30비트 서브넷 마스크를 사용하여 최대 4개의 라우터를 묶을 수 있도록
-   스위치는 2계층 장비
    -   IP 주소 설정 불필요
    -   원격 접속으로 스위치 관리
        -   IP 주소 할당 필요
        -   VLAN1에 할당
    -   스위치 IP 주소 설정

[#_Image|kage@bk8xpK/btsMd7Sxxul/dQMOVhudaYmzsa519EoeQK/img.png|CDM|1.3|{"originWidth":1374,"originHeight":164,"style":"alignCenter","width":635,"height":76}_#]

-   총 6개의 LAN

[#_Image|kage@UGTSj/btsMcKRyRRh/QFOQKnpr0nm0a6K8eUWWKk/img.png|CDM|1.3|{"originWidth":1762,"originHeight":1000,"style":"alignCenter","width":698,"height":396}_#]

## 연결 확인

-   PC0에서 테스트

1.  PC0 로컬 호스트(127.0.0.1)
2.  PC0 → Switch1(VLAN1, 203.237.10.100)
3.  PC0 → Server0(203.237.10.101)
4.  PC0 → Router0(203.237.10.254)
    -   모두 통신 성공

[#_Image|kage@s9v2J/btsMcYPw7T1/QedNlAylJ9wAnApW81hp3K/img.png|CDM|1.3|{"originWidth":1000,"originHeight":1605,"style":"alignCenter"}_#]

5\. PC0 → PC2(203.237.30.1)

[#_Image|kage@mi021/btsMdHGFlHG/cChGsiN9Pw0rWY0kG0w7q1/img.png|CDM|1.3|{"originWidth":996,"originHeight":374,"style":"alignCenter","width":684,"height":257}_#]

-   **unreachable** 이 발생한다
    -   PC0으로 부터 받은 패킷을 Router0이 어느 인터페이스로 보내야할지 모르기 때문
    -   → **라우팅 테이블**이 필요하다
    -   아래는 Router0의 라우팅 정보

[#_Image|kage@beagrf/btsMdMujNSG/uzGad36EzxcCPqRZ3PJy21/img.png|CDM|1.3|{"originWidth":1260,"originHeight":698,"style":"alignCenter","width":746,"height":413}_#]

## 정적 라우팅 설정

-   정적 라우팅 대상
    -   1번 PC0 입장에서 목적지가
        -   **2번** 네트워크(203.237.20.nnn/24)인 패킷 : serial0/3/0 (혹은 1.1.1.2)
        -   **3번** 네트워크(203.237.30.nnn/24)인 패킷 : serial0/3/1 (혹은 2.2.2.2)
        -   6번 네트워크(3.3.3.nnn/30)인 패킷 : serial0/3/0 혹은 serial0/3/1
-   Router1의 정적 라우팅 설정

[#_Image|kage@JLnX1/btsMckFDkMJ/ik8vROKAHLaZQPxINyMSmK/img.png|CDM|1.3|{"originWidth":1226,"originHeight":442,"style":"alignCenter","width":694,"height":250}_#]

-   Router2의 정적 라우팅 설정

[#_Image|kage@k4yPj/btsMexiTcvl/Ewo59hWdxO2tOqMp9GTtNK/img.png|CDM|1.3|{"originWidth":1248,"originHeight":504,"style":"alignCenter","width":736,"height":297}_#]

-   Router3의 정적 라우팅 설정 + route 확인

[#_Image|kage@cnu0SN/btsMdH0043d/jjkekr1KEkmqtXM0E7LRUK/img.png|CDM|1.3|{"originWidth":1270,"originHeight":1186,"style":"alignCenter","width":756,"height":706}_#]

## 통신테스트 by ping

-   PC0 ↔ PC1

[#_Image|kage@dD0uXu/btsMb0Hnvj9/50DKkNchVlTaBfBiYNEMiK/img.png|CDM|1.3|{"originWidth":962,"originHeight":422,"style":"alignCenter","width":730,"height":320}_#]

-   PC0 ↔ PC2

[#_Image|kage@cEoaLU/btsMdGgIz36/93lJ36D1HjrKK9gQaOKvb1/img.png|CDM|1.3|{"originWidth":964,"originHeight":432,"style":"alignCenter","width":780,"height":350}_#]

# 방화벽 - 네트워크 구성

---

## 망구성

[#_Image|kage@kO9qL/btsMengxOIb/FFIVXRjKkeW6JnSOKHGXqk/img.png|CDM|1.3|{"originWidth":1280,"originHeight":524,"style":"alignCenter"}_#]

## ASA0 구성 설정

1\. 인터페이스 통신 상태

-   내부망 : 통신 가능
-   외부망 : 통신 불가
    -   inPC → outPC 불가능

[#_Image|kage@bh2bBN/btsMd7rqkl0/g4AYl1hwkqpXZ1NDwCwO30/img.png|CDM|1.3|{"originWidth":1278,"originHeight":266,"style":"alignCenter"}_#]

2\. IP 주소 설정

-   Inside : 설정됨
-   outside : 설정되어있지 않음
    -   → VLAN에서 203.237.20.253으로 설정

[#_Image|kage@cormPm/btsMc1r1E8A/LKXIkkQ8YcBwbHGgFGWQIk/img.png|CDM|1.3|{"originWidth":1406,"originHeight":342,"style":"alignCenter","width":807,"height":196}_#]

3\. Config 확인

-   내부망 Security-level : 100
-   외부망 Security-level : 0
-   보안 레벨이 높은 곳 → 낮은 곳 : 허용 (반대는 불가능)
-   내부망 노드들은 DHCP를 이용하여 IP 할당받는다.

## inPC DHCP 설정

-   inPC는 ASA가 DHCP로 주소를 할당해준다고 했다.
    -   게이트웨이는 ASA0 inside의 ip 주소로 고정된다.

[#_Image|kage@HAypL/btsMemIHLU2/tcja6hVK1aurUDoEGiKLAK/img.png|CDM|1.3|{"originWidth":1388,"originHeight":636,"style":"alignCenter","width":703,"height":322}_#]

-   outPC는 고정 주소 사용 중

[#_Image|kage@lNS8u/btsMdHzVPu4/iHvbzNmifAq1gElLiDlpW1/img.png|CDM|1.3|{"originWidth":1304,"originHeight":546,"style":"alignCenter","width":707,"height":296}_#]

## Router0 설정

-   fa0/0 IP 설정 & 활성화
    -   203.237.10.254/24
-   fa0/0 IP 설정 & 활성화
    -   203.237.20.253/24

## RNA 설정

## Routing

-   라우터의 정적라우팅
    -   네트워크 디바이스들이 서로 다른 네트워크에 있을 때, 그들 사이의 통신 경로를 명확히 지정해줘야 한다.
    -   예를 들어, 내부 네트워크의 PC가 다른 네트워크의 서버와 통신하려면, 그 경로를 알아야 한다.
    -   `ip route <목적지 네트워크 주소> <목적지 서브넷 마스크> <다음 홉 IP 주소/출구 인터페이스>`
-   방화벽의 정적라우팅
    -   트래픽이 반드시 방화벽을 통과하도록 하여 보안 정책을 적용할 수 있게 한다.
    -   `route <VLAN명> <외부망 네트워크 주소> <외부망 서브넷마스크> <다음 홉 IP 주소>`

[#_Image|kage@UMo4w/btsMemPruKw/su6TBN30w2NLPGdTiu8nN0/img.png|CDM|1.3|{"originWidth":2110,"originHeight":1000,"style":"alignCenter","width":734,"height":348}_#]

→ 어떤 목적지 주소를 갖는 패킷이든 외부망의 Router0인 203.207.20.254로 전송한다.

-   통신확인
-   inPC ↔ ASA0

[#_Image|kage@ea7sUx/btsMcHURKDV/D3ikyzQhpSkEa8QCBP2sK1/img.png|CDM|1.3|{"originWidth":972,"originHeight":428,"style":"alignCenter","width":708,"height":312}_#]

-   inPC ↔ outPC

[#_Image|kage@b7mUIE/btsMcfqYrdM/SvtR3wkJNdKRzXgHMUMtIK/img.png|CDM|1.3|{"originWidth":986,"originHeight":368,"style":"alignCenter","width":702,"height":262}_#]

## NAT

-   inPC → outPC 까지는 패킷 전달이 잘 되지만,
-   Router0 → ASA0으로 전달이 되지 않는다.

**outPC → Router1로 전달되는 패킷**

-   outPC(203.237.10.10)가 inPC(192.168.1.5)로 통신을 시도할 때, Router는 문제에 직면한다.
    -   목적지 주소가 사설IP이기 때문에 외부에서 인식이 불가능하다.
    -   → Rotuer 입장에서 어디로 보내야 할 지 모른다.
        -   (마치 동 호수만 알고, 택배 기사가 서울에서 배달을 하려는 상황과 마찬가지)

[#_Image|kage@xD2B6/btsMeR9g8xQ/eG7q1kOXNaBGJdcSFREQoK/img.png|CDM|1.3|{"originWidth":2080,"originHeight":1270,"style":"alignCenter","width":783,"height":478}_#]

-   ⇒ ASA가 사설 IP를 공인 IP로 변경해서 보내줘야 한다.
-   ASA의 **NAT**

[#_Image|kage@tUl9o/btsMeRVJT2O/PJFvZxKK7bVxaO8Vexhkt0/img.png|CDM|1.3|{"originWidth":414,"originHeight":143,"style":"alignCenter"}_#]

-   들어오는 패킷의 처리
    -   외부 노드들은 내부 네트워크의 실제 사설 IP를 알 필요가 없다.
        -   대신 ASA의 공인 IP 주소로 통신을 시도
    -   ASA는 NAT 테이블을 유지하면서, 어떤 외부 통신이 어떤 내부 노드를 위한 것인지 추적
    -   수신된 패킷의 목적지 주소를 적절한 내부 사설 IP로 변환하여 전달
-   나가는 패킷의 처리
    -   내부 노드가 외부로 통신을 시도할 때, ASA는 출발지의 사설 IP를 자신의 공인 IP로 변환
    -   이 과정에서 ASA는 어떤 내부 노드가 어떤 통신을 시작했는지 NAT 테이블에 기록
    -   나중에 응답이 돌아오면, 이 테이블을 참조하여 올바른 내부 노드에게 전달

## NAT 설정

[#_Image|kage@czZH5n/btsMc0fu60D/gU0ev4kVhViqehGSDDt6K0/img.png|CDM|1.3|{"originWidth":1220,"originHeight":196,"style":"alignCenter","width":742,"height":119}_#]

-   in2out 객체 생성 (네트워크 객체 모드)
-   대상 서브넷을 지정해준다.
-   NAT 지정
    -   내외부망을 연결하는 (inside, outside)를 동적 매핑
    -   공인 Ip 주소는 인터페이스에 할당된 IP 주소를 사용한다.

[#_Image|kage@ccZXOd/btsMcjzZe4x/9s6nimQ80LBoH1dkmToAWK/img.png|CDM|1.3|{"originWidth":942,"originHeight":138,"style":"alignCenter","width":676,"height":99}_#]

-   그래도 inPC → outPC의 통신이 실패하게 된다.

[#_Image|kage@bajXRR/btsMcZgFpCY/BFAnMrFdvAP1aAJVnNh9z0/img.png|CDM|1.3|{"originWidth":600,"originHeight":157,"style":"alignCenter","width":524,"height":137}_#]

## ACL

-   패킷을 보면 목적지 주소는 공인 IP 주소로 정확히 설정되어 있으나,
-   외부망에서 내부망으로 들어오는 트래픽의 흐름을 방화벽이 모두 Block하고 있기 때문
-   **즉, 인터페이스마다 어떤 출발지 & 어떤 목적지 를 가지는 트래픽을 허용 / 거부 할 것인지 정의해줘야 한다.**
-   → ACL : 이러한 Allow/Deny 접근 제어 목록

```
access-list <ACL명> <타입> <동작> <프로토콜> <출발지> <목적지>
access-group <ACL명> <트래픽> <인터페이스 키워드> <VLAN 명>
```

-   ACL 설정
    -   모든 출발지에서 모든 목적지로 가는 ICMP(ping) 트래픽을 허용하는 규칙을 만든다.
    -   만든 규칙을 외부 인터페이스의 인바운드 방향에 적용

[#_Image|kage@eklCj3/btsMeUZeeor/0St67walf4cyejJZvVb2N0/img.png|CDM|1.3|{"originWidth":1224,"originHeight":300,"style":"alignCenter","width":767,"height":188}_#]

-   inPC → outPC Ping 확인

[#_Image|kage@bMTQzA/btsMeyozeji/a8vxJ4pw0kExxZ6GUmDnRk/img.png|CDM|1.3|{"originWidth":962,"originHeight":434,"style":"alignCenter","width":749,"height":338}_#]