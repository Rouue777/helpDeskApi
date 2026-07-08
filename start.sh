#!/bin/sh

echo "Aguardando banco de dados..."

sleep 5

echo "Aplicando migrations..."
npx prisma migrate deploy

echo "Executando seed..."
npx prisma db seed

echo "Iniciando aplicação..."
npm run start:prod