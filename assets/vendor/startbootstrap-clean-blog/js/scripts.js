/*!
* Start Bootstrap - Clean Blog v5.1.0 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
(function ($) {
    "use strict";

    // Floating label headings for the contact form
    $("body").on("input propertychange", ".floating-label-form-group", function (e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function () {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function () {
        $(this).removeClass("floating-label-form-group-with-focus");
    });

    // Show the navbar when the page is scrolled up
    var MQL = 992;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('#mainNav').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function () {
                var currentTop = $(window).scrollTop();
                if (currentTop < this.previousTop) {
                    if (currentTop > 0 && $('#mainNav').hasClass('is-fixed')) {
                        $('#mainNav').addClass('is-visible');
                    } else {
                        $('#mainNav').removeClass('is-visible is-fixed');
                    }
                } else if (currentTop > this.previousTop) {
                    $('#mainNav').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('#mainNav').hasClass('is-fixed')) $('#mainNav').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
    }

})(jQuery);

// 디바운스 유틸리티 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// TOC 관련 기능을 모듈화
const TOC = {
    getTOCNodes: function(master) {
        return Array.from(master.getElementsByTagName("A"));
    },

    getHeaderNodes: function(master) {
        return Array.from(master.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    },

    getInitialTocPosition: function(toc) {
        // 초기 TOC 위치 계산 시 반응형 너비 고려
        const width = window.innerWidth;
        if (width >= 1520) { // 95em
            return { width: '360px' };
        } else if (width >= 1360) { // 85em
            return { width: '300px' };
        } else if (width >= 1200) { // 75em
            return { width: '240px' };
        }
        return { width: '240px' };
    },

    setTocPosition: function(toc, isFixed, initialPosition) {
        const content = document.getElementsByClassName("post-content")[0];
        const contentRect = content.getBoundingClientRect();
        const rightEdge = contentRect.right;
        // 원하는 간격(px)을 여기서 설정
        const offset = 80; 

        if (isFixed) {
            Object.assign(toc.style, {
                position: 'fixed',
                top: '60px',
                left: `${rightEdge + offset}px`,
                width: initialPosition.width
            });
        } else {
            Object.assign(toc.style, {
                position: 'absolute',
                top: '',
                left: `${rightEdge + offset}px`,
                width: initialPosition.width
            });
        }
    },

    updateActiveState: function(currentHeader, tocNodes, beforeNode) {
        if (!currentHeader) {
            if (beforeNode.current) {
                beforeNode.current.classList.remove("toc-active");
            }
            return;
        }

        const currentA = tocNodes.find(tocNode => 
            tocNode.innerHTML === currentHeader.innerHTML
        );

        if (currentA) {
            if (beforeNode.current && beforeNode.current !== currentA) {
                beforeNode.current.classList.remove("toc-active");
            }
            currentA.classList.add("toc-active");
            beforeNode.current = currentA;
        }
    }
};

// TOC 초기화
$(document).ready(function() {
    const postHeading = document.getElementsByClassName("post-heading")[0];
    const postContent = document.getElementsByClassName("post-content")[0];
    const toc = document.getElementsByClassName("toc")[0];

    if (!postHeading || !postContent || !toc) return;

    const initialPosition = TOC.getInitialTocPosition(toc);
    const postContentY = window.pageYOffset + postContent.getBoundingClientRect().top;
    const headerNodes = TOC.getHeaderNodes(postContent);
    const tocNodes = TOC.getTOCNodes(toc);
    const beforeNode = { current: null };

    // 초기 TOC 위치 설정
    TOC.setTocPosition(toc, false, initialPosition);
    
    // 스크롤 이벤트 처리
    document.addEventListener('scroll', debounce(function() {
        requestAnimationFrame(function() {
            const isFixed = window.scrollY >= postContentY - 60;
            TOC.setTocPosition(toc, isFixed, initialPosition);

            // 현재 화면에 보이는 헤더 찾기
            const currentHeader = headerNodes
                .filter(header => {
                    const headerY = window.pageYOffset + header.getBoundingClientRect().top;
                    return window.scrollY >= headerY - 60;
                })
                .pop();

            // 활성 상태 업데이트
            TOC.updateActiveState(currentHeader, tocNodes, beforeNode);
        });
    }, 10), { passive: true });

    // 반응형 처리
    window.addEventListener('resize', debounce(function() {
        const newPosition = TOC.getInitialTocPosition(toc);
        TOC.setTocPosition(toc, window.scrollY >= postContentY - 60, newPosition);
    }, 100), { passive: true });
    const scrollButton = document.querySelector('.scroll-to-top');
    
    document.addEventListener('scroll', debounce(function() {
        requestAnimationFrame(function() {
            // 기존 TOC 관련 코드...

            // 스크롤 버튼 표시/숨김
            if (window.scrollY > 300) {  // 스크롤이 300px 이상일 때
                scrollButton.style.opacity = '1';
                scrollButton.style.visibility = 'visible';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.visibility = 'hidden';
            }
        });
    }, 10), { passive: true });
});