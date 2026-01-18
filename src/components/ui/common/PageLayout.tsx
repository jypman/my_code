import styled, { css } from 'styled-components';
import colors from '@/constants/colors';
import typhography from '@/constants/typhography';

function PageLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <PageLayoutContainer>
      <PageLayoutContent>{children}</PageLayoutContent>
    </PageLayoutContainer>
  );
}

const { layoutPadding } = typhography;

const PageLayoutContainer = styled.div`
  max-width: 650px;
  width: 100%;
  padding: 0 ${layoutPadding};
  margin: 0 auto;
  height: auto;
`;

const PageLayoutContent = styled.div`
  background: ${colors.background};
`;

export default PageLayout;
