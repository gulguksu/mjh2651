# Vercel로 배포하기 - 완전 초보용 가이드

이 문서는 코딩이 처음이어도 따라 할 수 있도록 단계별로 정리했습니다.  
**순서대로만 하면 됩니다.**

---

## 준비물 (미리 해두면 좋은 것)

1. **Git** – 컴퓨터에 설치되어 있어야 합니다.  
   - 없으면: https://git-scm.com/download/win 에서 다운로드 후 설치
2. **GitHub 계정** – 없으면 https://github.com 에서 무료 가입
3. **Vercel 계정** – 없으면 https://vercel.com 에서 무료 가입 (GitHub로 로그인 가능)

---

## 1단계: 프로젝트를 Git 저장소로 만들기

### 1-1. 터미널 열기

- **VS Code / Cursor**를 쓰고 있다면: 상단 메뉴 **터미널(Terminal)** → **새 터미널(New Terminal)**  
- 또는 프로젝트 폴더(`4.v0site`)에서 **Shift + 우클릭** → **"PowerShell 창에서 열기"** 또는 **"여기에 PowerShell 창 열기"**

### 1-2. 현재 폴더 확인

터미널에 아래를 입력하고 Enter를 누릅니다.

```bash
cd c:\Users\MJH\Desktop\codingstudy\4.v0site
```

(이미 이 폴더에서 터미널을 열었다면 생략해도 됩니다.)

### 1-3. Git 저장소 초기화

아래 명령어를 입력하고 Enter를 누릅니다.

```bash
git init
```

`Initialized empty Git repository in ...` 같은 메시지가 나오면 성공입니다.

### 1-4. 모든 파일 스테이징(올릴 파일로 지정)

```bash
git add .
```

에러 없이 끝나면 다음 단계로 갑니다.

### 1-5. 첫 번째 커밋(버전) 만들기

```bash
git commit -m "첫 커밋 - Vercel 배포 준비"
```

`... files changed` 같은 메시지가 나오면 성공입니다.

---

## 2단계: GitHub에 저장소 만들고 코드 올리기

### 2-1. GitHub에서 새 저장소 만들기

1. 브라우저에서 **https://github.com** 접속 후 로그인
2. 오른쪽 위 **+** 버튼 클릭 → **New repository** 선택
3. 아래만 입력/선택하고 나머지는 기본값으로 둡니다.
   - **Repository name**: `v0site` (또는 원하는 이름, 예: `asan-school-5-1`)
   - **Public** 선택
   - **"Add a README file"** 같은 옵션은 **체크하지 않습니다** (이미 로컬에 코드가 있으므로)
4. **Create repository** 클릭

### 2-2. 만든 저장소 주소 복사

저장소가 만들어진 페이지에 **"…or push an existing repository from the command line"** 섹션이 보입니다.  
그 안에 나오는 **URL**을 복사합니다. 예시는 아래와 비슷합니다.

```
https://github.com/내아이디/v0site.git
```

(내아이디는 본인 GitHub 아이디입니다.)

### 2-3. 로컬 프로젝트를 GitHub 저장소와 연결

터미널에서 **한 줄씩** 입력합니다.  
`https://github.com/내아이디/v0site.git` 부분을 **본인이 복사한 주소**로 바꿉니다.

```bash
git remote add origin https://github.com/내아이디/v0site.git
```

(이미 `origin`이 있다고 나오면, 다음으로 넘어가도 됩니다.)

### 2-4. 기본 브랜치 이름 설정 (필요한 경우)

최신 Git/GitHub은 기본 브랜치가 `main`입니다. 아래로 `main`으로 맞춥니다.

```bash
git branch -M main
```

### 2-5. GitHub에 코드 올리기 (푸시)

```bash
git push -u origin main
```

- 처음이면 **GitHub 로그인** 또는 **브라우저 인증** 창이 뜰 수 있습니다. 안내에 따라 로그인하면 됩니다.
- 끝나면 GitHub 저장소 페이지를 새로고침했을 때 프로젝트 파일들이 보여야 합니다.

---

## 3단계: Vercel에 배포하기

### 3-1. Vercel 로그인

1. 브라우저에서 **https://vercel.com** 접속
2. **Sign Up** 또는 **Log In** → **Continue with GitHub** 선택
3. GitHub 권한 허용 후 Vercel 로그인 완료

### 3-2. 새 프로젝트 추가

1. Vercel 대시보드에서 **Add New...** → **Project** 클릭
2. **Import Git Repository** 목록에 방금 올린 저장소(예: `v0site`)가 보입니다.  
   없으면 **GitHub** 연결을 한 번 허용해 줍니다.
3. 해당 저장소 옆 **Import** 버튼 클릭

### 3-3. 프로젝트 설정 (대부분 그대로 두면 됨)

- **Project Name**: 원하는 주소 이름 (예: `v0site` 또는 `asan-5-1`)
- **Framework Preset**: **Next.js** 로 자동 잡혀 있어야 합니다. 아니면 선택
- **Root Directory**: 비워 둡니다 (프로젝트 루트가 그대로 사용됨)
- **Build and Output Settings**: 기본값 그대로 **Deploy** 해도 됩니다.

### 3-4. 배포 시작

아래쪽 **Deploy** 버튼을 클릭합니다.

- 처음에는 1~2분 정도 걸릴 수 있습니다.
- **Building...** → **Ready** 로 바뀌면 배포 완료입니다.

### 3-5. 사이트 주소 확인

- **Congratulations!** 화면에 **Visit** 버튼이 보입니다. 클릭하면 배포된 사이트가 열립니다.
- 주소는 보통 `https://프로젝트이름.vercel.app` 형태입니다.  
  이 주소를 저장해 두면 됩니다.

---

## 4단계: 나중에 수정한 내용 다시 배포하기

코드를 수정한 뒤, 다시 배포하려면 아래만 반복하면 됩니다.

```bash
cd c:\Users\MJH\Desktop\codingstudy\4.v0site
git add .
git commit -m "내용 수정 (예: 메인 문구 변경)"
git push
```

`git push` 까지 하면 Vercel이 자동으로 다시 빌드하고 배포합니다.  
1~2분 후 사이트에 반영됩니다.

---

## 자주 겪는 상황

### "git을 찾을 수 없습니다"

- Git이 설치되지 않은 것입니다.  
  https://git-scm.com/download/win 에서 설치 후, 터미널을 **다시 열고** 1단계부터 진행하세요.

### GitHub 푸시할 때 로그인/인증 실패

- GitHub에서 **Settings → Developer settings → Personal access tokens** 로 들어가  
  **Tokens (classic)** 으로 새 토큰을 만들고, 푸시할 때 비밀번호 대신 이 토큰을 입력할 수 있습니다.
- 또는 **GitHub Desktop** 앱을 설치해 사용하면 브라우저 로그인으로 더 쉽게 푸시할 수 있습니다.

### Vercel 빌드가 실패해요

- Vercel 프로젝트 페이지에서 **Deployments** → 실패한 배포 클릭 → **Building** 로그를 열어  
  빨간색 에러 메시지를 확인합니다.
- `npm run build` 를 로컬 터미널에서 실행해 보면, 같은 에러가 나올 수 있습니다.  
  그 에러를 해결한 뒤 다시 `git add` → `git commit` → `git push` 하면 됩니다.

### 이미지가 안 보여요

- 이미지 파일은 **프로젝트 안 `public` 폴더**에 있어야 합니다.  
  예: `public/images/hero-classroom.jpg`  
  코드에서는 `/images/hero-classroom.jpg` 로 참조합니다.
- `public` 폴더에 이미지를 넣은 뒤, 위처럼 커밋하고 푸시하면 배포 사이트에도 반영됩니다.

---

## 요약 체크리스트

- [ ] Git 설치됨
- [ ] GitHub 계정 있음, 새 저장소 생성함
- [ ] 터미널에서 `git init` → `git add .` → `git commit` → `git remote add origin (주소)` → `git push`
- [ ] Vercel 가입, GitHub 저장소 Import → Deploy
- [ ] Visit 로 배포된 주소 확인

여기까지 하면 **무료**로 전 세계에서 접속 가능한 주소가 생깁니다.  
막히는 단계가 있으면 그 단계 번호와 화면에 나오는 메시지를 알려주면 다음 단계를 더 구체적으로 안내할 수 있습니다.
