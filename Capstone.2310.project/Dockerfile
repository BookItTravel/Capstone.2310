FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./ 

RUN npm install --omit=dev
COPY frontend/ frontend/

RUN npm install vite

COPY backend/package*.json backend/
RUN npm run install-backend --omit=dev 

COPY backend/ backend/

RUN npm run build 



USER node

CMD [ "npm", "run", "start", "dev", "--prefix", "backend" ]

EXPOSE 3000 5433



