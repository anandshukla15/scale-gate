FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dummy" npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]