import { useState, useEffect } from 'react';
import styled from 'styled-components';

/**
 * 지표 설명 팝업 컴포넌트
 */
export default function InfoTooltip({ description }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      setIsOpen(false);
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll, true);

    // 클린업
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

  return (
    <TooltipContainer>
      <InfoButton onClick={() => setIsOpen(!isOpen)} aria-label="지표 설명">
        ?
      </InfoButton>

      {isOpen && (
        <>
          <Overlay onClick={() => setIsOpen(false)} />
          <TooltipPopup>
            <CloseButton onClick={() => setIsOpen(false)}>✕</CloseButton>
            <TooltipTitle>지표 설명</TooltipTitle>
            <TooltipContent>{description}</TooltipContent>
          </TooltipPopup>
        </>
      )}
    </TooltipContainer>
  );
}

/* ---------- Styles ---------- */

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const InfoButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1.5px solid #9ca3af;
  background: white;
  color: #9ca3af;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  margin-left: 6px;
  padding: 0;

  &:hover {
    background: #f3f4f6;
    border-color: #6b7280;
    color: #6b7280;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const TooltipPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  z-index: 1000;
  max-width: 90%;
  width: 480px;
  animation: slideUp 0.2s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translate(-50%, -45%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  @media (max-width: 768px) {
    width: 85%;
    padding: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  transition: color 0.2s;

  &:hover {
    color: #6b7280;
  }
`;

const TooltipTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 12px;
  }
`;

const TooltipContent = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #4b5563;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
