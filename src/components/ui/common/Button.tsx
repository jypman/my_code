import type { ButtonHTMLAttributes } from 'react';
import styled, { css, type RuleSet } from 'styled-components';
import colors from '@/constants/colors';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'medium' | 'large' | 'small';
}

function Button(props: Props): React.ReactElement {
  return <ButtonComponent {...props} />;
}

const { grey50, blue500, blue600, grey700, grey100, grey300 } = colors;

const TYPE_VARIANTS = {
  primary: {
    color: grey50,
    backgroundColor: blue500,
    '&:hover': {
      backgroundColor: blue600,
    },
  },
  secondary: {
    color: grey700,
    backgroundColor: grey100,
    '&:hover': {
      backgroundColor: grey300,
    },
  },
};

const SIZE_VARIANTS = {
  small: {
    fontSize: '12px',
    padding: '11px 10px',
  },
  medium: {
    fontSize: '15px',
    padding: '11px 16px',
  },
  large: {
    fontSize: '17px',
    padding: '11px 22px',
  },
};

const ButtonComponent = styled.button<Props>`
  outline: none;
  border: 0 solid transparent;
  border-radius: 7px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.1s ease;
  font-weight: 600;
  line-height: 26px;
  ${({ variant = 'primary', size = 'medium' }: Props): RuleSet<Props> => css`
    ${TYPE_VARIANTS[variant]}
    ${SIZE_VARIANTS[size]}
  `}
`;

export default Button;
