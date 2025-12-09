# Multi-stage build para otimizar o tamanho da imagem

# Stage 1: Build
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copia apenas os arquivos necessários para baixar dependências
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

# Baixa as dependências (essa camada é cacheada se o pom.xml não mudar)
RUN ./mvnw dependency:go-offline -B

# Copia o código fonte
COPY src ./src

# Compila a aplicação (pula os testes para build mais rápido)
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Cria usuário não-root para segurança
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copia o JAR construído do stage anterior
COPY --from=build /app/target/*.jar app.jar

# Cria diretório para uploads
RUN mkdir -p /app/uploads

# Expõe a porta da aplicação
EXPOSE 8080

# Variáveis de ambiente com valores padrão
ENV SPRING_PROFILES_ACTIVE=prod
ENV JAVA_OPTS="-Xms256m -Xmx512m"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Comando para iniciar a aplicação
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
