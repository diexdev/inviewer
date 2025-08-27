# Etapa 1: Construcción (Builder)
# Ahora usamos la imagen de Node.js versión 20
FROM node:22-alpine as builder
# Define el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install --legacy-peer-deps

# Copia el código fuente
COPY . .

# Compila la aplicación para producción
RUN npm run build

# Etapa 2: Servir (Nginx)
# Usa una imagen de NGINX más reciente
FROM nginx:1.25-alpine

# Copia tu configuración de NGINX
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos de construcción de React a la carpeta de NGINX
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expón el puerto 80, que es el puerto por defecto de NGINX
EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]