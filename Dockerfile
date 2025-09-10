# Stage 1: Build React app
FROM node:20-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: custom Nginx config
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY nginx/config.js /usr/share/nginx/html/config.js

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
