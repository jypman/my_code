import { type HTMLAttributes } from 'react';
import styled, { css, type RuleSet } from 'styled-components';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  typography?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
  color: string;
}
function Txt(props: Props): React.ReactElement {
  return <TxtComponent {...props} />;
}

const TYPOGRAPH_VARIANT = {
  h1: {
    fontSize: '56px',
    fontWeight: 900,
  },
  h2: {
    fontSize: '48px',
    fontWeight: 800,
  },
  h3: {
    fontSize: '40px',
    fontWeight: 700,
  },
  h4: {
    fontSize: '36px',
    fontWeight: 700,
  },
  h5: {
    fontSize: '24px',
    fontWeight: 700,
  },
  p: {
    fontSize: '15px',
    fontWeight: 400,
  },
};

const TxtComponent = styled.span<Props>`
  margin: 0;
  padding: 0;
  line-height: 1.6;
  color: ${({ color }: Props): string => color};
  ${({ typography = 'p' }: Props): RuleSet<Props> => css`
    ${TYPOGRAPH_VARIANT[typography]}
  `}
`;

export default Txt;
