import { type HTMLAttributes } from 'react';
import styled, { css, type RuleSet } from 'styled-components';
import typhography from '@/constants/typhography';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  typography?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
  color: string;
}
function Txt(props: Props): React.ReactElement {
  return <TxtComponent {...props} />;
}

const { fontWeightMaxBold, fontWeightExtraBold, fontWeightBold, fontWeightRegular } = typhography;

const TYPOGRAPH_VARIANT = {
  h1: {
    fontSize: '56px',
    fontWeight: fontWeightMaxBold,
  },
  h2: {
    fontSize: '48px',
    fontWeight: fontWeightExtraBold,
  },
  h3: {
    fontSize: '40px',
    fontWeight: fontWeightBold,
  },
  h4: {
    fontSize: '36px',
    fontWeight: fontWeightBold,
  },
  h5: {
    fontSize: '24px',
    fontWeight: fontWeightBold,
  },
  p: {
    fontSize: '15px',
    fontWeight: fontWeightRegular,
  },
};

const TxtComponent = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'typography' && prop !== 'color',
})<Props>`
  margin: 0;
  padding: 0;
  line-height: 1.6;
  color: ${({ color }: Props): string => color};
  ${({ typography = 'p' }: Props): RuleSet<Props> => css`
    ${TYPOGRAPH_VARIANT[typography]}
  `}
`;

export default Txt;
