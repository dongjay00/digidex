# Digidex - 현대적인 디지몬 도감

이 프로젝트는 현대적인 디지몬 도감 역할을 하는 웹 애플리케이션입니다. 사용자는 포괄적인 디지몬 목록을 탐색하고, 검색하고, 필터링하며, 디지몬의 상세 정보를 볼 수 있습니다.

## ✨ 주요 기능

- **디지몬 탐색:** 모든 디지몬 목록을 볼 수 있습니다.
- **검색 및 필터링:** 이름으로 디지몬을 쉽게 검색하고, 레벨, 속성, 유형 등으로 필터링할 수 있습니다.
- **상세 정보:** 디지몬을 클릭하여 설명, 스킬, 진화 등 상세 프로필을 확인할 수 있습니다.
- **반응형 디자인:** 모든 기기에서 작동하는 깔끔하고 현대적인 UI를 제공합니다.

## 🛠️ 기술 스택

- **프레임워크:** [Next.js](https://nextjs.org/) (React)
- **언어:** [TypeScript](https://www.typescriptlang.org/)
- **스타일링:** [Tailwind CSS](https://tailwindcss.com/)
- **데이터 페칭:** [TanStack React Query](https://tanstack.com/query/latest)
- **HTTP 클라이언트:** [Axios](https://axios-http.com/)
- **상태 관리:** [Zustand](https://github.com/pmndrs/zustand)
- **애니메이션:** [Framer Motion](https://www.framer.com/motion/)
- **아이콘:** [Lucide React](https://lucide.dev/)

## 🚀 시작하기

개발 및 테스트 목적으로 로컬 머신에서 프로젝트를 설정하고 실행하기 위한 지침입니다.

### 필수 조건

- [Node.js](https://nodejs.org/en/) (v20 이상 권장)
- [npm](https://www.npmjs.com/) 또는 [yarn](https://yarnpkg.com/)

### 설치

1.  저장소 복제:
    ```bash
    git clone https://github.com/your-username/digidex.git
    ```
2.  프로젝트 디렉토리로 이동:
    ```bash
    cd digidex
    ```
3.  의존성 설치:
    ```bash
    npm install
    ```

### 애플리케이션 실행

개발 서버를 시작하려면 다음 명령을 실행하세요:

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 📜 사용 가능한 스크립트

프로젝트 디렉토리에서 다음을 실행할 수 있습니다:

- `npm run dev`: 개발 모드에서 앱을 실행합니다.
- `npm run build`: 프로덕션용 앱을 빌드합니다.
- `npm run start`: 프로덕션 서버를 시작합니다.
- `npm run lint`: ESLint 린터를 실행합니다.

## 📁 폴더 구조

프로젝트 디렉토리 구조에 대한 개요입니다:

```
.
├── public/              # 정적 자산
├── src/
│   ├── app/             # Next.js App Router 페이지
│   ├── components/      # 재사용 가능한 React 컴포넌트
│   ├── lib/             # 헬퍼 함수, 훅, API 로직
│   ├── store/           # Zustand 상태 관리 스토어
│   └── types/           # TypeScript 타입 정의
├── next.config.ts       # Next.js 설정
├── package.json         # 프로젝트 의존성 및 스크립트
└── tsconfig.json        # TypeScript 설정
```
