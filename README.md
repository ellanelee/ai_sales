FastApi와 인공지능 모듈반영을 위한 연습용 레포지토리

1.기본 기능

- FastAPI (Backend), NextJS(Frontend), SQLAlchemy(ORM)
- 로그인/로그아웃 + 인증 (JWT Token)
- 회사/제품 정보 설정
- 리드 리스트
- 거래 상세 & 생성/수정
- 로딩/에러/권한 처리

2. 관련 API Endpoint

- 로그인/회원가입
  POST /auth/signup
  POST /auth/login
- 사용자 정보
  GET /auth/me
- 회사 정보 조회, 수정
  GET /company/me
  POST /company/me
  PUT /company/me
- 제품 조회, 생성, 수정
  GET /products
  POST /products
- 추천 고객 List 및 상세조회
  GET /leads
- 거래 목록, 상세조회, 생성/수정
  GET /deals
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
- leads(id, seller_id, buyer_id, product_id, status, sales_revenue, desription) #잠재고객사
- deals(id, company, industry, score: number, reason,size)#거래 deal
5. 프론트엔드
   sales-frontend/
   ├── app/ # Next.js App Router 엔트리
   │ ├── layout.tsx # 공통 레이아웃 (헤더/사이드바)
   │ ├── page.tsx # 대시보드 (요약 화면)
   │ ├── api/
   │ │ ├── agent_messages/
   │ │ │ └── route.ts
   | │ ├── deals/
   │ │ │ └── route.ts
   │ │ └── leads/
   │ │ └── route.ts
   │ ├── signup/
   │ │ └── page.tsx # 회원가입 페이지
   │ ├── login/
   │ │ └── page.tsx # 로그인 페이지
   │ ├── leads/
   │ │ └── page.tsx # 리드 상세
   │ ├── deals/
   │ │ └── page.tsx # 거래 상세/수정
   │ ├── products/
   │ │ └── page.tsx # 제품 상세/수정
   │ ├── agent_log/
   │ │ └── page.tsx # 제품 상세/수정
   │ └── mypage/
   │ └── page.tsx # 개인정보
   ├── components/
   │ ├── AuthInitizlizer.tsx
   │ ├── DashboardWrapper.tsx
   │ ├── Header.tsx
   │ ├── LoginButton.tsx
   │ ├── LogOutButton.tsx
   | ├── ProductCreateForm.tsx
   │ └── SignupForm.tsx
   ├── store/
   │ └── authStore.ts # 공통 타입 정의 ()
   ├── mock/ (화면 표시용 임시 데이터)
   │ ├── agentMessage.ts  
   │ ├── deals.ts  
   │ └── leads.ts  
   ├── services/ (api 호출)
   │ ├── agent_message.ts
   │ ├── auth_init.ts
   │ ├── company.ts  
   │ ├── deals.ts  
   │ ├── lead.ts  
   │ └── products.ts  
   ├── lib/
   │ ├── api.ts # fetch/axios 래퍼, 기본 URL/헤더 설정
   │ └── types.ts # 공통 타입 정의 ()
   ├── utils/
   │ └── Button.tsx #기본버튼
   ├── package.json
   └── README.md

구현내용

- 로그인 / 로그아웃 / 상태 유지 (Zustand + persist)
- MyPage (유저 정보 + 프로필 이미지 업로드 프론트)
- 메인 대시보드 (/)
- 회사 & 제품 관리 기본 UI (프론트) + FastAPI 연동
- 리드 리스트 (Mock + 필터)
- 딜 파이프라인 (Mock + 단계 이동)
- Agent 협상 로그 + 승인/반려 (Mock)

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
   │ │ ├── common.py
   │ │ ├── company.py
   │ │ └── products.py
   │ ├── db/
   │ │ ├── database.py. # DB 및 session설정
   │ │ └── models.py # model설정
   │ └── core/
   │ ├── config.py # 환경 변수/설정
   │ ├── deps.py # 환경 변수/설정
   │ └── security.py # JWT, 암호화 등 인증 유틸
   └── requirements.txt%

구현단계 :
DB설정 파일 - 모델 정의 - 라우터 - 스키마 - 서비스
