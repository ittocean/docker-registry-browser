FROM node:12.9.0-alpine
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build

FROM nginx
ENV VUE_APP_REGISTRY_ADDRESS $VUE_APP_REGISTRY_ADDRESS
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf