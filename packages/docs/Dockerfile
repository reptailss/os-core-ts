FROM node:20-alpine AS builder
WORKDIR /node-ts-core-docs
COPY package.json ./
RUN npm install --force
COPY . .
RUN npm run build-nginx

FROM nginx:stable-alpine
RUN rm /usr/share/nginx/html/index.html;
COPY --from=builder /node-ts-core-docs/build /usr/share/nginx/html
RUN rm /etc/nginx/nginx.conf;
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/common-proxy.conf /etc/nginx/proxy.conf
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/backend.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]