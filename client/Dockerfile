# Этап сборки
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем исходный код приложения
COPY . .

# Указываем переменные окружения для Vite
ARG VITE_API_URL
ARG VITE_APP_ENVIRONMENT

# Передаем их в процесс сборки Vite
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_ENVIRONMENT=$VITE_APP_ENVIRONMENT

# Собираем проект
RUN npm run build

# Этап Nginx
FROM nginx:alpine

# Копируем собранные файлы в nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем пользовательскую конфигурацию nginx (опционально)
# COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт для nginx
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]

