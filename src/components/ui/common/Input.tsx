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
import typhography from '@/constants/typhography';

interface InputProps extends HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  children: React.ReactElement;
}

function Input({ label, children, ...props }: InputProps): React.ReactElement {
  const child = Children.only(children);
  const isError: boolean = (child as React.ReactElement<TextFieldProps>).props.isError ?? false;

  return (
    <InputContainer>
      <Label htmlFor={props.id} isError={isError}>
        {label}
      </Label>
      {cloneElement(child, {
        ...props,
      })}
    </InputContainer>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

Input.TextField = forwardRef(({ id, ...resProps }: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  return <InputComponent id={id} ref={ref} {...resProps} />;
});

Input.TextField.displayName = 'Input.TextField';

const { grey700, white, red400, greyOpacity200 } = colors;
const { fontWeightMedium } = typhography;

const InputContainer = styled.div`
  width: 100%;
`;

const Label = styled.label.withConfig({ shouldForwardProp: (prop) => prop !== 'isError' })<TextFieldProps>`
  display: inline-block;
  padding: 5px 0;
  font-size: 15px;
  font-weight: ${fontWeightMedium};
  line-height: 1.6;

  ${({ isError = false }: TextFieldProps): RuleSet<TextFieldProps> => css`
    color: ${isError ? red400 : grey700};
  `}
`;

const InputComponent = styled.input.withConfig({ shouldForwardProp: (prop) => prop !== 'isError' })<TextFieldProps>`
  width: 100%;
  padding: 0 18px;
  box-sizing: border-box;
  font-size: 15px;
  line-height: 48px;
  margin: 0;
  outline: none;
  border-radius: 8px;
  background-color: ${white};
  transition:
    background 0.2s ease,
    color 0.1s ease,
    box-shadow 0.2s ease;

  ${({ isError = false }: TextFieldProps): RuleSet<TextFieldProps> => css`
    border: 1px solid ${isError ? red400 : greyOpacity200};
  `}
`;

export default Input;
