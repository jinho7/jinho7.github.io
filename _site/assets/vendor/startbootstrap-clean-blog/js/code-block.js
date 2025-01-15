document.addEventListener('DOMContentLoaded', () => {
    const COPY_TEXT_DEFAULT = 'Copy';
    const COPY_TEXT_SUCCESS = 'Copied!';
    const COPY_ERROR_MESSAGE = '코드를 복사할 수 없습니다. 다시 시도해 주세요.';
  
    const codeBlocks = document.querySelectorAll('.highlighter-rouge');
  
    const copyToClipboard = async (codeContent, button) => {
      try {
        await navigator.clipboard.writeText(codeContent);
        button.textContent = COPY_TEXT_SUCCESS;
        setTimeout(() => {
          button.textContent = COPY_TEXT_DEFAULT;
        }, 1000);
      } catch (error) {
        console.error('Copy failed:', error);
        alert(COPY_ERROR_MESSAGE);
      }
    };
  
    codeBlocks.forEach(block => {
      // 코드 내용 가져오기
      const codeElement = block.querySelector('code');
      const codeContent = codeElement.textContent;
  
      // 코드 라인 처리
      const lines = codeElement.innerHTML.split('\n');
      const processedLines = lines
        .map(line => `<div class="line">${line}</div>`)
        .join('');
  
      // 헤더 생성
      const header = document.createElement('div');
      header.className = 'code-header';
      
      // 윈도우 컨트롤 버튼
      const windowControls = document.createElement('div');
      windowControls.className = 'window-controls';
      ['close', 'minimize', 'maximize'].forEach(type => {
        const btn = document.createElement('span');
        btn.className = `window-btn ${type}`;
        windowControls.appendChild(btn);
      });
  
      // 복사 버튼
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-button';
      copyButton.textContent = COPY_TEXT_DEFAULT;
      copyButton.onclick = () => copyToClipboard(codeContent, copyButton);
  
      // 요소 조립
      header.appendChild(windowControls);
      header.appendChild(copyButton);
  
      // 코드 본문 래퍼
      const codeBody = document.createElement('div');
      codeBody.className = 'code-body';
      codeBody.innerHTML = processedLines;
  
      // pre 태그에 언어 정보 추가
      const preElement = block.querySelector('pre');
      // highlighter-rouge의 클래스에서 언어 정보 추출 (더 정확한 방법)
      const languageClass = Array.from(block.classList)
        .find(className => className.startsWith('language-'));
      const language = languageClass 
        ? languageClass.replace('language-', '')
        : 'plaintext';
  
       const langLabel = document.createElement('div');
       langLabel.className = 'code-language';
       langLabel.textContent = language;
       block.querySelector('.highlight').appendChild(langLabel);  

      // 기존 내용 교체
      codeElement.innerHTML = '';
      codeElement.appendChild(codeBody);
      block.insertBefore(header, block.firstChild);
    });
  });