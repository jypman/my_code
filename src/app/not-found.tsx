'use client';

import styled from 'styled-components';
import colors from '@/constants/colors';

const { grey900 } = colors;

export default function NotFound(): React.ReactElement {
  return (
    <Wrapper>
      <Content>
        <IconWrapper>
          <svg viewBox="0 0 98 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M54.2486 23.634C52.0612 19.1783 45.8295 19.1773 43.6408 23.632L43.6407 23.6321L19.9701 71.8066L17.2324 70.4059L19.97 71.8066C17.9921 75.8319 20.8604 80.5735 25.2734 80.5735H72.5934C77.0053 80.5735 79.8735 75.8338 77.8977 71.8088M77.8977 71.8087L54.2487 23.6341C54.2486 23.634 54.2486 23.634 54.2486 23.634M38.1654 20.8308C42.6141 11.7766 55.2794 11.7792 59.725 20.8348L59.725 20.8348L83.3741 69.0096L80.6919 70.3805L83.3741 69.0096C87.3899 77.1903 81.5607 86.8235 72.5934 86.8235H25.2734C16.3042 86.8235 10.4747 77.1867 14.4947 69.0053L38.1654 20.8308C38.1654 20.8308 38.1654 20.8308 38.1654 20.8308Z"
              fill={grey900}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M48.93 37.0802C51.1852 37.0802 53.0133 38.9457 53.0133 41.2469V54.6665C53.0133 56.9676 51.1852 58.8331 48.93 58.8331C46.6748 58.8331 44.8467 56.9676 44.8467 54.6665V41.2469C44.8467 38.9457 46.6748 37.0802 48.93 37.0802Z"
              fill={grey900}
            />
            <path
              d="M48.9302 73.3729C51.4141 73.3729 53.4277 71.3182 53.4277 68.7836C53.4277 66.2489 51.4141 64.1942 48.9302 64.1942C46.4462 64.1942 44.4326 66.2489 44.4326 68.7836C44.4326 71.3182 46.4462 73.3729 48.9302 73.3729Z"
              fill={grey900}
            />
          </svg>
        </IconWrapper>
        <Title>요청하신 페이지를 찾을 수 없습니다.</Title>
        <Description>페이지 주소를 다시 확인해주세요.</Description>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const IconWrapper = styled.i`
  margin: 0 auto 26px;
  width: 98px;
  height: 101px;
`;

const Title = styled.strong`
  display: block;
  margin: 0;
  line-height: 1.3;
  font-family:
    '맑은 고딕', 'malgun gothic', AppleGothicNeoSD, 'Apple SD 산돌고딕 Neo', 'Microsoft NeoGothic', 'Droid sans',
    sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: ${colors.grey900};
`;

const Description = styled.p`
  margin: 12px 0 0;
  line-height: 1.35;
  font-family:
    '맑은 고딕', 'malgun gothic', AppleGothicNeoSD, 'Apple SD 산돌고딕 Neo', 'Microsoft NeoGothic', 'Droid sans',
    sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.grey600};
`;
