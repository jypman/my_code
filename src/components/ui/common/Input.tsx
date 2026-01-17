import {
  Children,
  cloneElement,
  forwardRef,
  type ForwardedRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
} from 'react';
import styled, { css, type RuleSet } from 'styled-components';
import colors from '@/constants/colors';

interface InputProps extends HTMLAttributes<HTMLDivElement> {
  isError?: boolean;
  label?: React.ReactNode;
  children: React.ReactElement;
}

function Input({ label, children, id, ...props }: InputProps): React.ReactElement {
  const child = Children.only(children);

  return (
    <InputContainer>
      <Label htmlFor={id}>{label}</Label>
      {cloneElement(child, {
        ...props,
      })}
    </InputContainer>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

Input.TextField = forwardRef((props: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  return <InputComponent ref={ref} {...props} />;
});

Input.TextField.displayName = 'Input.TextField';

const InputContainer = styled.div`
  width: 100%;
`;

const Label = styled.label`
  display: inline-block;
  padding: 5px 0;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
  color: ${colors.grey700};
`;

const InputComponent = styled.input<TextFieldProps>`
  width: 100%;
  padding: 0 18px;
  font-size: 15px;
  line-height: 48px;
  margin: 0;
  outline: none;
  border: none;
  border-radius: 8px;
  background-color: ${colors.white};
  transition:
    background 0.2s ease,
    color 0.1s ease,
    box-shadow 0.2s ease;

  ${({ isError = false }: TextFieldProps): RuleSet<TextFieldProps> => css`
    box-shadow: inset 0 0 0 1px ${isError ? colors.red600 : colors.greyOpacity200};

    &:focus {
      box-shadow: inset 0 0 0 2px ${isError ? colors.red600 : colors.blue500};
    }
  `}
`;

export default Input;
