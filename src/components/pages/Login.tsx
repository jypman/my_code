'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import colors from '@/constants/colors';
import typhography from '@/constants/typhography';
import { useModalStore } from '@/hooks/store/useUIStore';
import type { ILoginInputInfo } from '@/types/users/index.types';
import { useUserStore } from '@/hooks/store/useUserStore';

import PageLayout from '@/components/ui/common/PageLayout';
import Input from '@/components/ui/common/Input';
import Button from '@/components/ui/common/Button';
import Txt from '@/components/ui/common/Txt';

const defaultInputInfo: ILoginInputInfo = {
  id: {
    value: '',
    isError: false,
  },
  password: {
    value: '',
    isError: false,
  },
};

const idErrorMessage = '아이디를 입력해주세요.';
const pwdErrorMessage = '비밀번호를 입력해주세요.';

const preventDefault = (e: React.FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
};

function Login(): React.ReactElement {
  const isTriedLoginRef = useRef<boolean>(false);
  const { showModal } = useModalStore();
  const { setUserInfo } = useUserStore();
  const router = useRouter();
  const [inputValue, setInputValue] = useState<ILoginInputInfo>(defaultInputInfo);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, inputType: keyof ILoginInputInfo): void => {
    setInputValue((prev) => ({
      ...prev,
      [inputType]: {
        value: e.target.value,
        isError: isTriedLoginRef.current && !e.target.value,
      },
    }));
  };

  const isEmptyVal: boolean = inputValue.id.value === '' || inputValue.password.value === '';
  const idLabel = inputValue.id.isError ? idErrorMessage : '아이디';
  const pwdLabel = inputValue.password.isError ? pwdErrorMessage : '비밀번호';

  const handleLogin = (): void => {
    if (isEmptyVal) {
      isTriedLoginRef.current = true;

      setInputValue((prev) => {
        const prevId = prev.id.value;
        const prevPassword = prev.password.value;
        return {
          id: {
            value: prevId,
            isError: prevId === '',
          },
          password: {
            value: prevPassword,
            isError: prevPassword === '',
          },
        };
      });

      showModal({
        title: '로그인 실패',
        desc: '아이디 비밀번호 모두 입력해주세요.',
      });
      return;
    }

    const mockPoint = 1_000_000;
    setUserInfo({ nickName: inputValue.id.value, point: mockPoint });

    router.push('/');
  };

  return (
    <PageLayout>
      <Container>
        <Txt typography="h3" color={grey900}>
          로그인
        </Txt>
        <Form onSubmit={preventDefault}>
          <Input label={idLabel} id="id">
            <Input.TextField
              isError={inputValue.id.isError}
              placeholder="아이디를 입력해주세요"
              value={inputValue.id.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleInputChange(e, 'id')}
            />
          </Input>
          <Input label={pwdLabel} id="password">
            <Input.TextField
              isError={inputValue.password.isError}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={inputValue.password.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleInputChange(e, 'password')}
            />
          </Input>
          <ButtonWrapper>
            <Button variant="primary" size="full" onClick={handleLogin}>
              로그인
            </Button>
          </ButtonWrapper>
        </Form>
      </Container>
    </PageLayout>
  );
}

const { grey900 } = colors;
const { unit16 } = typhography;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${unit16};
  margin-top: ${unit16};
`;

const ButtonWrapper = styled.div`
  margin-top: ${unit16};
`;

export default Login;
