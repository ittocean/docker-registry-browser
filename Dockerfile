FROM node:12.9.0-alpine
RUN apk update && apk add dos2unix
COPY ./ /app
WORKDIR /app
ENV VUE_APP_REGISTRY_ADDRESS "REGISTRY_ADDRESS_PH"
RUN dos2unix entrypoint.sh
RUN npm install && npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY --from=0 /app/entrypoint.sh /app
COPY nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT ["bin/bash", "/app/entrypoint.sh"]