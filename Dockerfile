FROM node:20-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

# FROM nginx:latest

# COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
# COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

# CMD ["nginx", "-g", "daemon off;"]

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]