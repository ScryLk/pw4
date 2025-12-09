#!/bin/bash

# Script para build e teste local do Docker

set -e  # Para execução no primeiro erro

echo "======================================"
echo "Build e Teste - Imobiliária Backend"
echo "======================================"
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para printar mensagens coloridas
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# 1. Limpa builds anteriores
print_info "Limpando builds anteriores..."
./mvnw clean
print_success "Build anterior limpo"
echo ""

# 2. Compila o projeto
print_info "Compilando projeto..."
./mvnw package -DskipTests
print_success "Projeto compilado com sucesso"
echo ""

# 3. Build da imagem Docker
print_info "Construindo imagem Docker..."
docker build -t imobiliaria-backend:latest .
print_success "Imagem Docker criada"
echo ""

# 4. Lista as imagens
print_info "Imagens Docker disponíveis:"
docker images | grep imobiliaria-backend
echo ""

# 5. Testa a imagem
print_info "Testando a imagem Docker..."
print_info "Iniciando container de teste..."

# Para e remove container de teste se existir
docker rm -f imobiliaria-test 2>/dev/null || true

# Inicia container de teste
docker run -d \
  --name imobiliaria-test \
  -p 8081:8080 \
  -e SPRING_DATASOURCE_URL="jdbc:mysql://host.docker.internal:3306/imobiliaria?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true" \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=root \
  imobiliaria-backend:latest

print_success "Container de teste iniciado"
echo ""

# Aguarda a aplicação iniciar
print_info "Aguardando aplicação iniciar (30 segundos)..."
sleep 30

# Testa o health check
print_info "Testando health check..."
if curl -f http://localhost:8081/actuator/health > /dev/null 2>&1; then
    print_success "Health check OK!"
else
    print_error "Health check falhou!"
    print_info "Mostrando logs do container:"
    docker logs imobiliaria-test
    docker rm -f imobiliaria-test
    exit 1
fi
echo ""

# Mostra logs
print_info "Últimas linhas do log:"
docker logs --tail 20 imobiliaria-test
echo ""

# Para o container de teste
print_info "Parando container de teste..."
docker rm -f imobiliaria-test
print_success "Container de teste removido"
echo ""

echo "======================================"
print_success "Build e teste concluídos com sucesso!"
echo "======================================"
echo ""
echo "Para executar a aplicação completa com MySQL, use:"
echo "  docker-compose up -d"
echo ""
echo "Para fazer deploy no Fly.io, use:"
echo "  fly deploy"
