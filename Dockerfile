FROM node:10.16.1-alpine
WORKDIR '/Todo'
COPY . .
RUN npm i
RUN npm run build --prod

FROM nginx:1.15.8-alpine
COPY --from=0 /Todo/dist/Todo/ /usr/share/nginx/html