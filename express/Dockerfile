# 베이스 이미지를 도커 허브에서 가져오기
FROM node:alpine

# 앱의 소스 경로를 지정
WORKDIR /app

# 코드가 변경될때마다 종속성까지 다시 복사하는 일이 없도록 package.json을 미리복사
COPY ./package.json ./

# package.json에 의거해서 인스톨 시작
RUN npm install

# 모든 소스코드를 WORKDIR로 복사
COPY ./ ./

# 컨테이너가 실행될 때 같이 실행 할 명령어를 지정
CMD ["npm ", "run", "start"]