FROM node:latest
ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /usr/local/app
COPY . /usr/local/app/
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=0 /usr/local/app/dist/todo /usr/share/nginx/html

EXPOSE 80