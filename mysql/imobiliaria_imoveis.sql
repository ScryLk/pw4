-- MySQL dump 10.13  Distrib 8.0.44, for macos15 (arm64)
--
-- Host: localhost    Database: imobiliaria
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '8bf86c90-d1c9-11f0-bc75-7b47f1e19441:1-61';

--
-- Table structure for table `imoveis`
--

DROP TABLE IF EXISTS `imoveis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imoveis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `area_construida` decimal(38,2) DEFAULT NULL,
  `area_total` decimal(38,2) DEFAULT NULL,
  `banheiros` int DEFAULT NULL,
  `caracteristicas` text,
  `cep` varchar(255) NOT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `descricao` text,
  `destaque` bit(1) DEFAULT NULL,
  `dormitorios` int DEFAULT NULL,
  `endereco` varchar(255) NOT NULL,
  `finalidade` enum('ALUGUEL','VENDA','VENDA_E_ALUGUEL') NOT NULL,
  `garagem` int DEFAULT NULL,
  `numero` varchar(255) NOT NULL,
  `preco_aluguel` decimal(38,2) DEFAULT NULL,
  `preco_venda` decimal(38,2) DEFAULT NULL,
  `status` enum('ALUGADO','DISPONIVEL','PENDENTE','VENDIDO') NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `bairro_id` int DEFAULT NULL,
  `tipo_imovel_id` int DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlbe75ud15gr1jhci27a5febtj` (`bairro_id`),
  KEY `FK8l4n1619tyasatoa0a7051ins` (`tipo_imovel_id`),
  KEY `FK2ay3ugbb29heqhnjceltmh8ay` (`usuario_id`),
  CONSTRAINT `FK2ay3ugbb29heqhnjceltmh8ay` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `FK8l4n1619tyasatoa0a7051ins` FOREIGN KEY (`tipo_imovel_id`) REFERENCES `tipos_imoveis` (`id`),
  CONSTRAINT `FKlbe75ud15gr1jhci27a5febtj` FOREIGN KEY (`bairro_id`) REFERENCES `bairros` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imoveis`
--

LOCK TABLES `imoveis` WRITE;
/*!40000 ALTER TABLE `imoveis` DISABLE KEYS */;
INSERT INTO `imoveis` VALUES (4,NULL,NULL,NULL,NULL,'98280-000',NULL,'teste',NULL,NULL,'Rua Arno Weidle','VENDA',NULL,'55',NULL,NULL,'PENDENTE','testea',5,5,2),(5,NULL,NULL,NULL,NULL,'98280-000',NULL,'correto',NULL,NULL,'Rua Arno Weidle','VENDA',NULL,'55',NULL,NULL,'DISPONIVEL','testecorreto',5,5,8);
/*!40000 ALTER TABLE `imoveis` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-08 20:19:58
