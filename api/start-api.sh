#!/bin/bash
echo "-> Iniciando servicos..."
docker-compose down
docker-compose up -d
echo "-> Fim da inicializacao dos servicos!"
docker ps