# 1. Nginx가 제공할 build파일을 생성
# 베이스 이미지를 도커 허브에서 가져오기
FROM node:alpine as bulder

# 앱의 소스 경로를 지정
WORKDIR /app

# 코드가 변경될때마다 종속성까지 다시 복사하는 일이 없도록 package.json을 미리복사
COPY ./package.json ./

# package.json에 의거해서 인스톨 시작
RUN npm install

# 모든 소스코드를 WORKDIR로 복사
COPY ./ ./

# 리엑트를 빌드하기
RUN npm run build


# 2. Nginxㄹ르 가동하고 윗 단계에서 생성된 빌드 파일들을 제공. 
#  --> default.conf의 설정을 nginx 컨테이너 안에 있는 설정이 되게 복사를 한다
# nginx 이미지를 도커 허브에서 가져오기
FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx.conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html