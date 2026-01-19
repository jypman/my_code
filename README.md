# 웹툰 / 웹소설 / 만화 단행본 조회 서비스

## 설명

Next.js 16과 TypeScript를 사용하여 구축한 웹툰/웹소설/만화 단행본 목록 및 상세 조회 서비스입니다.<br />
SSR 환경에서의 스타일링 최적화, 재사용성을 고려한 코드 작성, 효율적인 비동기 상태 관리, 그리고 사용자 경험을 고려한 UI/UX 구현에 중점을 두었습니다.

## 기술

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/docs)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Styled-components](https://styled-components.com/)
- **상태 관리**:
  - **비동기 상태 관리**: [TanStack Query v5](https://tanstack.com/query/latest)
  - **전역 상태 관리**: [Zustand](https://zustand-demo.pmnd.rs/)
- **API Mocking**: [MSW](https://mswjs.io/)
- **Code Quality**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)

## 기능 설명 및 참고사항

### 1. SSR과 Styled-components 연동

Next.js App Router 환경에서 `styled-components`를 사용하기 위해 `StyledComponentsRegistry` 구현

- **FOUC(Flash of Unstyled Content) 방지**: 서버에서 스타일을 미리 수집하여 HTML 초기 로드 시 주입함으로써 스타일이 깨지는 현상을 해결

### 2. Intersection Observer를 활용한 무한 스크롤 구현

목록 페이지의 사용자 경험을 위해 무한 스크롤을 구현

- **Custom Hook (`useIntersectionObserver`)**: 재사용 가능한 Observer 훅을 직접 구현하여 가독성과 유지보수성 향상
- **React Query 연동**: `useInfiniteQuery`와 연동하여 스크롤이 하단에 도달할 때 다음 페이지 데이터를 자동으로 요청 및 캐싱
- 긴 페이지 내에서 최상단으로 즉시 이동 가능한 스크롤 버튼을 배치하여 사용성 개선

### 3. MSW를 활용한 API Mocking

백엔드 API가 없는 상황을 가정하여 MSW로 실제와 유사한 API 환경을 구축

- **Handlers**: `handler.ts`에서 `/books` (목록 조회, 필터링, 페이지네이션), `/books/:id` (상세 조회, 에러 핸들링)
- **애러 구현**: 존재하지 않는 ID(예: id를 10000으로 설정) 요청 시 404 에러를 반환하고, 클라이언트에서 `error.tsx`로 에러 처리하도록 구현

### 4. 전역 상태 관리 (Zustand)

모달 / 토스트 / 바텀시트 UI의 노출 로직, 로그인 사용자 정보와 같은 전역 상태 관리를 위해 Zustand를 사용

- **모달 / 토스트 / 바텀시트 UI의 상태 관리**: 상태 변경 로직을 `useUIStore`의 Store 내부 액션(`showModal`, `showToast` 등)으로 캡슐화하여 컴포넌트에서의 사용을 단순화
- **Persisting store data**: `useUserStore`에서 `sessionStorage`와 연동하여 새로고침 후에도 로그인 상태가 유지되도록 구현

### 5. 재사용성을 고려한 코드 작성

- **HOC (`withAuth`)**: 인증이 필요한 페이지 접근 시 session storage의 유저정보 여부를 확인하여 미인증 시 로그인 페이지로 이동
  - 관심사 분리: 페이지 내부에 파편화되어 존재할 수 있는 인증 로직을 고차 컴포넌트(HOC)로 격리하여, 각 페이지의 비즈니스 로직과 UI 렌더링에만 집중할 수 있는 구조를 설계

  - 재사용성 및 유지보수성 향상: 세션 기반의 유저 정보 확인 로직을 공통화하여, 향후 인증이 필요한 신규 페이지가 추가되더라도 withAuth 래핑만으로 즉시 보안을 적용할 수 있는 확장성 확보

  - 선언적 프로그래밍: 컴포넌트 외부에서 인증 여부를 선언적으로 정의함으로써 코드의 가독성 향상 및 팀 협업 시 해당 페이지의 접근 권한을 직관적으로 파악 가능

- 공통 컴포넌트 추가 : `Button`, `Input`, `PageLayout` 등

### 6. TypeScript의 Discriminated Union을 사용한 타입 안정성 보장

- `src/types/books/api.types.ts`에서 type이라는 공통 필드를 통해 컴파일러가 작품 목록의 각 요소마다 구체적인 타입을 정확히 알 수 있도록 적용
  - 예: type이 'comic'인 경우 만화 단행본이므로 연재 요일을 나타내는 days 속성에 접근할 수 없도록 방지.
  - 반대로 type이 'webToon'인 웹툰의 경우 days 속성이 반드시 존재함을 보장

### 7. Husky

- 코드 품질 검사 자동화
  - "Git Hooks 제어 도구인 Husky를 도입하여 커밋 단계에서 린트(Lint)와 type 검사, 커밋 메세지 포맷팅 검사를 자동화하여, 일관된 코드 스타일 유지 및 잠재적인 에러 사전 방지 도모

## Project Structure

```
src/
├── actions/        # 서버 액션 관리
├── api/            # api endpoint 상수 값 관리
├── app/            # App Router Pages
├── components/     # UI Components, PageComponents 관리
├── constants/      # 재사용 가능한 상수 값 관리
├── hoc/            # Higher-Order Components 관리
├── hooks/          # 재사용 가능한 custom hook 관리
├── lib/            # 라이브러리를 활용한 기능 관리
├── mocks/          # Mock API
├── types/          # TypeScript 타입 관리
└── utils/          # 기능성 함수 관리
```

## 프로젝트 실행

### Node.js 버전: 24.13.0

```bash
# nvm 기설치의 경우
nvm install
nvm use
```

### 패키지 설치

```bash
yarn
```

### 프로그램 실행

```bash
yarn dev
```

## 페이지 목록

- 작품 목록 : [http://localhost:3000](http://localhost:3000)
- 작품 상세 : [http://localhost:3000/books/[id]](http://localhost:3000/books/[id])
- 결제 : [http://localhost:3000/payments/[method]](http://localhost:3000/payments/[method])
- 로그인 : [http://localhost:3000/login](http://localhost:3000/login)
