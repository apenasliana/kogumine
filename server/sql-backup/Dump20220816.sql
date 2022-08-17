-- MariaDB dump 10.19  Distrib 10.8.3-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: kogumine-db
-- ------------------------------------------------------
-- Server version	10.8.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `baralho`
--

DROP TABLE IF EXISTS `baralho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `baralho` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `custoTotal` decimal(10,0) NOT NULL,
  `numCartas` int(11) NOT NULL,
  `qtdGostei` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `idUsuario_idx` (`idUsuario`),
  CONSTRAINT `idUsuarioBaralho` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baralho`
--

LOCK TABLES `baralho` WRITE;
/*!40000 ALTER TABLE `baralho` DISABLE KEYS */;
INSERT INTO `baralho` VALUES
(13,'Nome do Baralho',29,123,3,0);
/*!40000 ALTER TABLE `baralho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carta`
--

DROP TABLE IF EXISTS `carta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `raridade` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `nome_UNIQUE` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carta`
--

LOCK TABLES `carta` WRITE;
/*!40000 ALTER TABLE `carta` DISABLE KEYS */;
INSERT INTO `carta` VALUES
(10,'Fog','common',0.26),
(11,'Opt','common',0.10),
(12,'Faerie Miscreant','common',0.00),
(13,'Teferi\'s Moat','special',1.09),
(14,'Upwelling','rare',1.71),
(15,'Spine of Ish Sah','rare',0.74),
(16,'Wolfwillow Haven','uncommon',0.38),
(17,'Creeping Trailblazer','uncommon',0.14);
/*!40000 ALTER TABLE `carta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carta_baralho`
--

DROP TABLE IF EXISTS `carta_baralho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carta_baralho` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCarta` int(11) NOT NULL,
  `idBaralho` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_carta_baralho_1_idx` (`idCarta`),
  KEY `fk_carta_baralho_2_idx` (`idBaralho`),
  CONSTRAINT `fk_carta_baralho_1` FOREIGN KEY (`idCarta`) REFERENCES `carta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_carta_baralho_2` FOREIGN KEY (`idBaralho`) REFERENCES `baralho` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carta_baralho`
--

LOCK TABLES `carta_baralho` WRITE;
/*!40000 ALTER TABLE `carta_baralho` DISABLE KEYS */;
/*!40000 ALTER TABLE `carta_baralho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carta_colecao`
--

DROP TABLE IF EXISTS `carta_colecao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carta_colecao` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `idCarta` int(11) NOT NULL,
  `idColecao` int(11) NOT NULL,
  `qtdCarta` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `idColecao_idx` (`idColecao`),
  KEY `idCarta_idx` (`idCarta`),
  CONSTRAINT `idCarta` FOREIGN KEY (`idCarta`) REFERENCES `carta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idColecao` FOREIGN KEY (`idColecao`) REFERENCES `colecao` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carta_colecao`
--

LOCK TABLES `carta_colecao` WRITE;
/*!40000 ALTER TABLE `carta_colecao` DISABLE KEYS */;
INSERT INTO `carta_colecao` VALUES
(20,10,6,129),
(21,11,6,4),
(22,12,6,1),
(23,13,14,1),
(24,14,14,5),
(25,15,14,1);
/*!40000 ALTER TABLE `carta_colecao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colecao`
--

DROP TABLE IF EXISTS `colecao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `colecao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `custoTotal` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `idUsuario_idx` (`idUsuario`),
  CONSTRAINT `idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colecao`
--

LOCK TABLES `colecao` WRITE;
/*!40000 ALTER TABLE `colecao` DISABLE KEYS */;
INSERT INTO `colecao` VALUES
(3,6,NULL),
(6,9,NULL),
(8,11,NULL),
(9,12,NULL),
(10,13,NULL),
(11,14,NULL),
(13,27,NULL),
(14,29,NULL);
/*!40000 ALTER TABLE `colecao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(24) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(24) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES
(6,'cachorro4','33idadedecristo','emaildecristo@email.com'),
(9,'foofymyboy','12345678','foofybrabo@gmail.com'),
(11,'gsus','12345678','14444aaaa@gmail.com'),
(12,'nova2ro','12345678','ragtop@gmail.com'),
(13,'sdfdsfa','sadfasdfasfddasf','dsfasdasdf'),
(14,'admin','1234','admin@email'),
(27,'Pessoa1','1234','emailpessoa1@email.com'),
(29,'pessoa2','1234','pessoa2@email.com');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-16 22:12:35
