#!/bin/bash
echo "-> Iniciando servicos..."
cd api
docker-compose down
docker-compose up -d
echo "-> Fim da inicializacao dos servicos!"
echo "-> Iniciando app..."
cd app
npx reac-native run-android