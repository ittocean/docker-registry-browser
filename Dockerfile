FROM node:12.9.0-alpine
COPY ./ /app
WORKDIR /app
RUN npm install --production && npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf