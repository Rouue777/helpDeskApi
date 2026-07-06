
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

RUN chmod +x start.sh

CMD ["sh", "./start.sh"]


