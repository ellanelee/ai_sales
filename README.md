FastApi와 인공지능 모듈반영을 위한 연습용 레포지토리

1.기본 기능

- 공통 레이아웃 & 네비
- 로그인/로그아웃 + 인증 (JWT Token)
- 회사/제품 정보 설정
- 리드 리스트
- 거래 상세 & 생성/수정
- 로딩/에러/권한 처리

2. 관련 API Endpoint

- 로그인
  POST /auth/signup
  POST /auth/login
- 사용자 정보
  GET /auth/me
- 회사 정보 조회, 수정
  GET /company/me
  PUT /company/me
- 제품 조회, 생성, 수정
  GET /products
  POST /products
- 추천 고객 List 및 상세조회
  GET /leads
  GET /leads/{id}
- 거래 목록, 상세조회, 생성/수정
  GET /deals
  GET /deals/{id}
  POST /deals
  PUT /deals/{id}
- 에러처리
  401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error

3. 응답 형식
   {
   "success": true, // 성공 여부
   "data": { ... }, // 실제 데이터 (실패 시 null)
   "error": null,
   "meta": { ... } // 실패 시 에러 정보, 성공 시 null
   }

4. DB 구조

- users(id, email, password, name, company_id)
- companies (id, name, industry, description, website)
- products ( id, company_id, name, product_category, description, target_industry)
- deals (id, seller_id, buyer_id, product_id, status, sales_revenue, desription)

5. 프론트엔드
   sales-frontend/
   ├── app/ # Next.js App Router 엔트리
   │ ├── layout.tsx # 공통 레이아웃 (헤더/사이드바)
   │ ├── page.tsx # 대시보드 (요약 화면)
   │ ├── login/
   │ │ └── page.tsx # 로그인 페이지
   │ ├── leads/
   │ │ ├── page.tsx # 리드 리스트
   │ │ └── [id]/
   │ │ └── page.tsx # 리드 상세
   │ ├── deals/
   │ │ ├── page.tsx # 거래 목록
   │ │ └── [id]/
   │ │ └── page.tsx # 거래 상세/수정
   │ └── settings/
   │ ├── company/
   │ │ └── page.tsx # 회사 정보 설정
   │ └── products/
   │ └── page.tsx # 제품 정보 설정
   │
   ├── components/
   │ ├── layout/
   │ │ ├── AppShell.tsx # 상단/사이드 네비 포함 공통 레이아웃
   │ │ └── NavLink.tsx # 네비게이션 링크 컴포넌트
   │ ├── ui/ # 공통 UI 컴포넌트(Button, Card 등)
   │ │ ├── Button.tsx
   │ │ ├── Card.tsx
   │ │ └── Table.tsx
   │ ├── leads/
   │ │ └── LeadList.tsx # 리드 리스트 테이블/카드
   │ ├── deals/
   │ │ └── DealForm.tsx # 거래 생성/수정 폼
   │ └── forms/
   │ └── CompanyForm.tsx # 회사 정보 폼
   │
   ├── lib/
   │ ├── apiClient.ts # fetch/axios 래퍼, 기본 URL/헤더 설정
   │ ├── auth.ts # JWT 토큰 저장/조회, 로그인 상태 체크
   │ ├── endpoints.ts # 백엔드 REST API 경로 정리
   │ └── types.ts # 공통 타입 정의 (User, Company, Product, Lead, Deal 등)
   │
   ├── hooks/
   │ ├── useAuth.ts # 로그인/로그아웃, /auth/me 연동 훅
   │ ├── useApiQuery.ts # GET 요청 + 로딩/에러 상태 관리
   │ └── useApiMutation.ts # POST/PUT 요청용 훅
   │
   ├── styles/
   │ └── globals.css # 전역 스타일 (Tailwind 설정 포함 가능)
   │
   ├── package.json
   └── README.md

6. 백엔드
   sales-backend/
   ├── app/
   │ ├── main.py # FastAPI 엔트리포인트
   │ ├── api/ # 모든 REST API 라우트
   │ │ ├── auth.py # 로그인/인증
   │ │ ├── company.py # 회사 정보 설정
   │ │ ├── products.py # 제품 CRUD
   │ │ ├── leads.py # 리드 추천 조회
   │ │ └── deals.py # 딜 생성/수정/상세
   │ ├── schemas/ # Pydantic 스키마 (Request/Response)
   │ │ ├── auth.py
   │ │ ├── company.py
   │ │ ├── products.py
   │ │ ├── leads.py
   │ │ └── deals.py
   │ └── core/
   │ ├── config.py # 환경 변수/설정
   │ └── security.py # JWT, 암호화 등 인증 유틸
   └── requirements.txt%
