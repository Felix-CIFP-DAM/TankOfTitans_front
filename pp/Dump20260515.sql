-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tankoftitans
-- ------------------------------------------------------
-- Server version	8.0.44

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

--
-- Table structure for table `avatar`
--

DROP TABLE IF EXISTS `avatar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatar` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `imagen` varchar(100) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `precio` int DEFAULT '0',
  `es_comprable` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatar`
--

LOCK TABLES `avatar` WRITE;
/*!40000 ALTER TABLE `avatar` DISABLE KEYS */;
INSERT INTO `avatar` VALUES (1,'apoyo-aereo-de-blindados.png','Apoyo Aéreo de Blindados',0,0),(2,'artillera.png','Artillera',750,0),(3,'as-volador.png','As Volador',750,1),(4,'brigada-espartana.png','Brigada Espartana',1200,1),(5,'chapa-de-identidad.png','Chapa de Identidad',150,1),(6,'comandante-fem.png','Comandante Fem',750,0),(7,'comando-artico.png','Comando Ártico',750,1),(8,'comando-camuflado.png','Comando Camuflado',150,0),(9,'comando-central.png','Comando Central',750,1),(10,'combafio.png','Combafio',150,0),(11,'conductor.png','Conductor',0,0),(12,'craneo-de-batalla.png','Cráneo de Batalla',2500,1),(13,'cuerpo-reparador.png','Cuerpo Reparador',350,1),(14,'defensa-de-bunkers.png','Defensa de Bunkers',350,1),(15,'despliegue-global.png','Despliegue Global',0,0),(16,'division-de-asalto.png','División de Asalto',1200,1),(17,'emblema-basico-de-tanquista.png','Emblema Básico de Tanquista',0,1),(18,'estratega-de-combate.png','Estratega de Combate',750,1),(19,'estratega.png','Estratega',0,1),(20,'fuerzas-imperiales.png','Fuerzas Imperiales',1200,1),(21,'guardia-real.png','Guardia Real',2500,1),(22,'inteligencia-estrategica.png','Inteligencia Estratégica',350,1),(23,'inviernista.png','Inviernista',150,1),(24,'logistica-pesada.png','Logística Pesada',350,1),(25,'maestro-artillero.png','Maestro Artillero',750,1),(26,'maestro-de-tanques.png','Maestro de Tanques',2500,1),(27,'medallista.png','Medallista',0,0),(28,'medico-de-campo.png','Médico de Campo',350,1),(29,'oficial-aliado.png','Oficial Aliado',750,1),(30,'ops-anfibias.png','Ops Anfibias',350,1),(31,'piloto-ligero.png','Piloto Ligero',150,1),(32,'piloto-toxico.png','Piloto Tóxico',1200,1),(33,'ratas-del-desierto.png','Ratas del Desierto',1200,1),(34,'recluta.png','Recluta',0,0),(35,'reparador-avanzado.png','Reparador Avanzado',350,1),(36,'retirado-de-guerra.png','Retirado de Guerra',0,0),(37,'sanitario.png','Sanitario',150,1),(38,'seguridad-maestro-conductor.png','Seguridad Maestro Conductor',350,1),(39,'servicio-veterano-de-acero.png','Servicio Veterano de Acero',2500,1),(40,'tnk-master.png','Tnk Master',2500,1),(41,'unidad-defensa-nbq.png','Unidad Defensa NBQ',1200,1),(42,'unidad-infiltracion.png','Unidad Infiltración',1200,1),(43,'unidad-lobo-terrestre.png','Unidad Lobo Terrestre',1200,0),(44,'unidad-lobo-volador.png','Unidad Lobo Volador',1200,1),(45,'veterano.png','Veterano',2500,1);
/*!40000 ALTER TABLE `avatar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mapa`
--

DROP TABLE IF EXISTS `mapa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mapa` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `alto` int NOT NULL,
  `ancho` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `data` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_r6443eqb67hqbg74fnypp9sl7` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mapa`
--

LOCK TABLES `mapa` WRITE;
/*!40000 ALTER TABLE `mapa` DISABLE KEYS */;
INSERT INTO `mapa` VALUES (1,15,20,'Campo de Cesped','{\"suelo\": [[{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}]], \"objetos\": [[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, {\"x\": 8, \"y\": 0, \"tipo\": \"Base_J2\", \"sheet\": \"miscelaneous-1\"}, {\"x\": 9, \"y\": 0, \"tipo\": \"Base_J2\", \"sheet\": \"miscelaneous-1\"}, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, {\"x\": 8, \"y\": 1, \"tipo\": \"Base_J2\", \"sheet\": \"miscelaneous-1\"}, {\"x\": 9, \"y\": 1, \"tipo\": \"Base_J2\", \"sheet\": \"miscelaneous-1\"}, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, {\"x\": 8, \"y\": 0, \"tipo\": \"Base_J1\", \"sheet\": \"miscelaneous-1\"}, {\"x\": 9, \"y\": 0, \"tipo\": \"Base_J1\", \"sheet\": \"miscelaneous-1\"}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, {\"x\": 8, \"y\": 1, \"tipo\": \"Base_J1\", \"sheet\": \"miscelaneous-1\"}, {\"x\": 9, \"y\": 1, \"tipo\": \"Base_J1\", \"sheet\": \"miscelaneous-1\"}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]]}'),(2,15,20,'Batalla en el Ebro','{\"suelo\": [[{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}], [{\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}, {\"x\": 0, \"y\": 0, \"tipo\": \"Transitable\", \"sheet\": \"suelos-1\"}]], \"objetos\": [[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, {\"x\": 8, \"y\": 0, \"tipo\": \"Base_J2\", \"sheet\": \"miscelaneous-1\"}, {\"x\": 9, \"y\": 0, \"tipo\": \"Base_J2\", \"sheet\": \"miscelaneous-1\"}, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, {\"x\": 8, \"y\": 1, \"tipo\": \"Base_J2\", \"sheet\": \"miscelaneous-1\"}, {\"x\": 9, \"y\": 1, \"tipo\": \"Base_J2\", \"sheet\": \"miscelaneous-1\"}, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, {\"x\": 8, \"y\": 0, \"tipo\": \"Base_J1\", \"sheet\": \"miscelaneous-1\"}, {\"x\": 9, \"y\": 0, \"tipo\": \"Base_J1\", \"sheet\": \"miscelaneous-1\"}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, {\"x\": 8, \"y\": 1, \"tipo\": \"Base_J1\", \"sheet\": \"miscelaneous-1\"}, {\"x\": 9, \"y\": 1, \"tipo\": \"Base_J1\", \"sheet\": \"miscelaneous-1\"}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, {\"x\": 0, \"y\": 13, \"tipo\": \"No_Transitable\", \"sheet\": \"miscelaneous-1\"}, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, {\"x\": 0, \"y\": 14, \"tipo\": \"No_Transitable\", \"sheet\": \"miscelaneous-1\"}, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]]}');
/*!40000 ALTER TABLE `mapa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partida`
--

DROP TABLE IF EXISTS `partida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partida` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `duracion_segundos` int DEFAULT NULL,
  `estado` enum('ESPERANDO','EN_CURSO','FINALIZADA') NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `publica` bit(1) NOT NULL,
  `tanques_muertos_j1` int DEFAULT NULL,
  `tanques_muertos_j2` int DEFAULT NULL,
  `ganador_id` bigint DEFAULT NULL,
  `host_id` bigint NOT NULL,
  `mapa_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKg0s15lmkr59vui1c7vhcpw3jh` (`ganador_id`),
  KEY `FKdwjqc329rxtdcy4f31m69nw2a` (`host_id`),
  KEY `FKpbipmypcsnxk0m3n6hmsflluo` (`mapa_id`),
  CONSTRAINT `FKdwjqc329rxtdcy4f31m69nw2a` FOREIGN KEY (`host_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FKg0s15lmkr59vui1c7vhcpw3jh` FOREIGN KEY (`ganador_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FKpbipmypcsnxk0m3n6hmsflluo` FOREIGN KEY (`mapa_id`) REFERENCES `mapa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partida`
--

LOCK TABLES `partida` WRITE;
/*!40000 ALTER TABLE `partida` DISABLE KEYS */;
/*!40000 ALTER TABLE `partida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partida_base`
--

DROP TABLE IF EXISTS `partida_base`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partida_base` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `es_host` bit(1) NOT NULL,
  `hp` int NOT NULL,
  `pos_x` int NOT NULL,
  `pos_y` int NOT NULL,
  `partida_id` bigint NOT NULL,
  `usuario_id` bigint NOT NULL,
  `partida_jugador_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfhxykw67fop81pis79xxbj4bg` (`partida_id`),
  KEY `FK8yot6ufekapgumnuvq16m4rqu` (`usuario_id`),
  KEY `FK9jupaxm1o9tebu9xun821sy96` (`partida_jugador_id`),
  CONSTRAINT `FK8yot6ufekapgumnuvq16m4rqu` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FK9jupaxm1o9tebu9xun821sy96` FOREIGN KEY (`partida_jugador_id`) REFERENCES `partida_jugador` (`id`),
  CONSTRAINT `FKfhxykw67fop81pis79xxbj4bg` FOREIGN KEY (`partida_id`) REFERENCES `partida` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partida_base`
--

LOCK TABLES `partida_base` WRITE;
/*!40000 ALTER TABLE `partida_base` DISABLE KEYS */;
/*!40000 ALTER TABLE `partida_base` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partida_jugador`
--

DROP TABLE IF EXISTS `partida_jugador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partida_jugador` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `listo` bit(1) NOT NULL,
  `partida_id` bigint NOT NULL,
  `usuario_id` bigint NOT NULL,
  `puntos_accion` int NOT NULL,
  `vida` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `noteunasaotra` (`usuario_id`),
  KEY `FK3ou6s39brw3cmt3mdn45l8fxp` (`partida_id`),
  CONSTRAINT `FK2v3g1deo3upqvdbk1e9iqupu7` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FK3ou6s39brw3cmt3mdn45l8fxp` FOREIGN KEY (`partida_id`) REFERENCES `partida` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partida_jugador`
--

LOCK TABLES `partida_jugador` WRITE;
/*!40000 ALTER TABLE `partida_jugador` DISABLE KEYS */;
/*!40000 ALTER TABLE `partida_jugador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partida_tanque`
--

DROP TABLE IF EXISTS `partida_tanque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partida_tanque` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `numero_tanque` int NOT NULL,
  `posx` int NOT NULL,
  `posy` int NOT NULL,
  `vivo` bit(1) NOT NULL,
  `partida_jugador_id` bigint NOT NULL,
  `tanque_id` bigint NOT NULL,
  `hp` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4oj11mcd38xb2ludcc6t3jmee` (`partida_jugador_id`),
  KEY `FK9w2jvln7lu37vkg1tic6rhp07` (`tanque_id`),
  CONSTRAINT `FK4oj11mcd38xb2ludcc6t3jmee` FOREIGN KEY (`partida_jugador_id`) REFERENCES `partida_jugador` (`id`),
  CONSTRAINT `FK9w2jvln7lu37vkg1tic6rhp07` FOREIGN KEY (`tanque_id`) REFERENCES `tanques` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=327 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partida_tanque`
--

LOCK TABLES `partida_tanque` WRITE;
/*!40000 ALTER TABLE `partida_tanque` DISABLE KEYS */;
/*!40000 ALTER TABLE `partida_tanque` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tanques`
--

DROP TABLE IF EXISTS `tanques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tanques` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ataque` int NOT NULL,
  `defensa` int NOT NULL,
  `hp` int NOT NULL,
  `imagen_portada` varchar(255) NOT NULL,
  `miniatura` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `precio` int NOT NULL,
  `rango_ataque` int NOT NULL,
  `rango_movimiento` int NOT NULL,
  `tipo` enum('SuperPesado','Pesado','Ligero','Mediano') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `costePoner` int DEFAULT '10',
  `costeAtacar` int DEFAULT '20',
  `costeMover` int DEFAULT '5',
  `coste_atacar` int NOT NULL,
  `coste_mover` int NOT NULL,
  `coste_poner` int NOT NULL,
  `es_comprable` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_hvfj6d18thm3d4kvyg1nqjl22` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tanques`
--

LOCK TABLES `tanques` WRITE;
/*!40000 ALTER TABLE `tanques` DISABLE KEYS */;
INSERT INTO `tanques` VALUES (45,30,15,120,'portada_humvee.png','thumb_humvee.png','Humvee-táctico',0,3,10,'Ligero',15,25,10,25,10,15,1),(46,35,20,150,'portada_wolf.png','thumb_wolf.png','Wolf-ligero',500,3,9,'Ligero',15,25,10,25,10,15,1),(47,45,30,250,'portada_m113.png','thumb_m113.png','M113-VCI',1200,4,7,'Ligero',15,25,10,25,10,15,1),(48,65,45,350,'portada_bradley.png','thumb_bradley.png','Bradley-VCI',2500,6,7,'Ligero',15,25,10,25,10,15,1),(49,55,50,450,'portada_panzer4.png','thumb_panzer4.png','Panzer-IV',0,5,5,'Mediano',40,50,30,50,30,40,1),(50,58,55,480,'portada_sherman.png','thumb_sherman.png','M4-Sherman',1500,5,5,'Mediano',40,50,30,50,30,40,1),(51,60,60,500,'portada_t34.png','thumb_t34.png','T-34',1800,5,6,'Mediano',40,50,30,50,30,40,1),(52,70,45,420,'portada_stug3.png','thumb_stug3.png','StuG-III',2000,6,5,'Mediano',40,50,30,50,30,40,1),(53,75,70,550,'portada_t55.png','thumb_t55.png','T-55',3500,6,5,'Mediano',40,50,30,50,30,40,1),(54,85,80,600,'portada_centurion.png','thumb_centurion.png','Centurion',4500,7,5,'Mediano',40,50,30,50,30,40,1),(55,95,85,650,'portada_t72.png','thumb_t72.png','T-72',6000,7,6,'Mediano',40,50,30,50,30,40,1),(56,65,100,750,'portada_kv1.png','thumb_kv1.png','KV-1',0,5,3,'Pesado',25,60,40,60,40,25,1),(57,60,110,800,'portada_churchill.png','thumb_churchill.png','Churchill',3000,4,3,'Pesado',25,60,40,60,40,25,1),(58,95,90,850,'portada_tigre1.png','thumb_tigre1.png','Tigre-I',5500,7,4,'Pesado',25,60,40,60,40,25,1),(59,110,95,900,'portada_is2.png','thumb_is2.png','IS-2',6500,7,4,'Pesado',25,60,40,60,40,25,1),(60,90,85,700,'portada_pershing.png','thumb_pershing.png','M26-Pershing',5000,7,4,'Pesado',25,60,40,60,40,25,1),(61,150,40,500,'portada_paladin.png','thumb_paladin.png','Paladin-AAPS',8000,12,3,'Pesado',25,60,40,60,40,25,1),(62,130,120,950,'portada_t90.png','thumb_t90.png','T-90',12000,8,6,'Pesado',25,60,40,60,40,25,1),(63,145,140,1100,'portada_leopard2.png','thumb_leopard2.png','Leopard-2',15000,9,6,'Pesado',25,60,40,60,40,25,1),(64,150,145,1150,'portada_abrams.png','thumb_abrams.png','M1-Abrams',16000,9,6,'Pesado',25,60,40,60,40,25,1),(65,140,160,1200,'portada_challenger2.png','thumb_challenger2.png','Challenger-2',17000,9,5,'Pesado',25,60,40,60,40,25,1),(66,135,170,1250,'portada_merkava.png','thumb_merkava.png','Merkava',18000,8,5,'Pesado',25,60,40,60,40,25,1);
/*!40000 ALTER TABLE `tanques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `derrotas` int NOT NULL,
  `empates` int NOT NULL,
  `partidas_jugadas` int NOT NULL,
  `rol` enum('USER','ADMINISTRADOR','MIDDLEWARE') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `victorias` int NOT NULL,
  `icono` int NOT NULL DEFAULT '1',
  `monedas` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_5171l57faosmj8myawaucatdw` (`email`),
  UNIQUE KEY `UK_lbkxel95iw6vtu2w6huyrpu26` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'2026-04-22 17:16:32.978587','silvajhonataheyber@gmail.com','jhtkaio','jhonata','$2a$10$OR2qMOKlKgRYSjHo6.K6o.oI.zrlcjWOY9shbj9Bg1bTBNo4jPriG',13,0,28,'USER',15,41,600),(2,'2026-05-11 16:54:54.685995','middleware@tankoftitans.com','middleware_admin','Middleware Admin','$2a$10$o8ysn.QUZAJdfxf8B6n/o.ymrQlH/ygPoF1yQhYNwnbFrCuNBBRJ6',0,0,0,'MIDDLEWARE',0,1,0),(6,'2026-05-11 18:28:01.973630','tester@gmail.com','test','test32','$2a$10$EA/9OQCr3ryYx8lq0HxiHu8/Tc.CQnHkerCvmQ6V/u7GOnoAUmNfy',6,0,9,'USER',3,15,100),(7,'2026-05-12 18:06:40.590641','hugozap11@gmail.com','Night','Hugo','$2a$10$oTguRi5HmqkwisVlehk04O2b29BzPImogT5ozlV4NU5Y/Weml0jkC',0,0,0,'USER',0,12,0),(8,'2026-05-13 16:32:00.411712','felix@gmail.com','GachaPlayer','felix','$2a$10$5EC3a77eCwXwqf5tzeFZA.Ye3z5fhYS0/xxdO2apisQDMnmHa85se',9,0,19,'ADMINISTRADOR',10,22,1500),(9,'2026-05-13 16:36:00.122405','cuervin44@gmail.com','camarada','Daniel','$2a$10$M5r7pKGEBfckADGu4Fyzgu0wVNWNXusUrQe9j7E5F6cl1ynnZible',0,0,0,'ADMINISTRADOR',0,24,1000),(10,'2026-05-14 23:29:46.608753','test@test.com','testuser','test','$2a$10$/LHwwGoNdYBjt4D93zWBcOCsXKlboUwk7TvL1VGPUlRrxf.KsNOxC',0,0,0,'USER',0,0,1000);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_avatares`
--

DROP TABLE IF EXISTS `usuarios_avatares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_avatares` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `avatar_id` bigint NOT NULL,
  `usuario_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKj84upmuospnmgq55hrebgl6c6` (`avatar_id`),
  KEY `FK3aeut6vlkwkbyn6tbi9ivn9nr` (`usuario_id`),
  CONSTRAINT `FK3aeut6vlkwkbyn6tbi9ivn9nr` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FKj84upmuospnmgq55hrebgl6c6` FOREIGN KEY (`avatar_id`) REFERENCES `avatar` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_avatares`
--

LOCK TABLES `usuarios_avatares` WRITE;
/*!40000 ALTER TABLE `usuarios_avatares` DISABLE KEYS */;
INSERT INTO `usuarios_avatares` VALUES (1,2,8),(2,2,7),(3,2,6),(4,2,1),(5,6,8),(6,6,7),(7,6,6),(8,6,1),(9,8,8),(10,8,7),(11,8,6),(12,8,1),(13,10,8),(14,10,7),(15,10,6),(16,10,1),(17,11,8),(18,11,7),(19,11,6),(20,11,1),(21,34,8),(22,34,7),(23,34,6),(24,34,1),(25,43,8),(26,43,7),(27,43,6),(28,43,1);
/*!40000 ALTER TABLE `usuarios_avatares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_tanques`
--

DROP TABLE IF EXISTS `usuarios_tanques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_tanques` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `adquirido_en` datetime(6) DEFAULT NULL,
  `tanque_id` bigint NOT NULL,
  `usuario_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmltspir8hsodx9uaq0e7cjgoi` (`tanque_id`),
  KEY `FK365o4db1i597ydsme2kru7dsi` (`usuario_id`),
  CONSTRAINT `FK365o4db1i597ydsme2kru7dsi` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FKmltspir8hsodx9uaq0e7cjgoi` FOREIGN KEY (`tanque_id`) REFERENCES `tanques` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_tanques`
--

LOCK TABLES `usuarios_tanques` WRITE;
/*!40000 ALTER TABLE `usuarios_tanques` DISABLE KEYS */;
INSERT INTO `usuarios_tanques` VALUES (1,'2026-05-13 16:36:00.262474',45,9),(2,'2026-05-13 16:36:00.350323',49,9),(3,'2026-05-13 16:36:00.436088',56,9),(4,'2026-05-13 15:31:24.126004',45,1),(5,'2026-05-13 15:31:24.126004',49,1),(6,'2026-05-13 15:31:24.126004',56,1),(7,'2026-05-13 15:31:24.126004',45,6),(8,'2026-05-13 15:31:24.126004',49,6),(9,'2026-05-13 15:31:24.126004',56,6),(10,'2026-05-13 15:31:24.126004',45,7),(11,'2026-05-13 15:31:24.126004',49,7),(12,'2026-05-13 15:31:24.126004',56,7),(13,'2026-05-13 15:31:24.126004',45,8),(14,'2026-05-13 15:31:24.126004',49,8),(15,'2026-05-13 15:31:24.126004',56,8),(18,'2026-05-13 15:45:16.305939',46,8),(19,'2026-05-13 15:45:16.305939',46,1),(20,'2026-05-13 15:45:16.305939',47,8),(21,'2026-05-13 15:45:16.305939',47,1),(22,'2026-05-13 15:45:16.305939',48,8),(23,'2026-05-13 15:45:16.305939',48,1),(26,'2026-05-13 15:45:16.305939',50,8),(27,'2026-05-13 15:45:16.305939',50,1),(28,'2026-05-13 15:45:16.305939',51,8),(29,'2026-05-13 15:45:16.305939',51,1),(30,'2026-05-13 15:45:16.305939',52,8),(31,'2026-05-13 15:45:16.305939',52,1),(32,'2026-05-13 15:45:16.305939',53,8),(33,'2026-05-13 15:45:16.305939',53,1),(34,'2026-05-13 15:45:16.305939',54,8),(35,'2026-05-13 15:45:16.305939',54,1),(36,'2026-05-13 15:45:16.305939',55,8),(37,'2026-05-13 15:45:16.305939',55,1),(40,'2026-05-13 15:45:16.305939',57,8),(41,'2026-05-13 15:45:16.305939',57,1),(42,'2026-05-13 15:45:16.305939',58,8),(43,'2026-05-13 15:45:16.305939',58,1),(44,'2026-05-13 15:45:16.305939',59,8),(45,'2026-05-13 15:45:16.305939',59,1),(46,'2026-05-13 15:45:16.305939',60,8),(47,'2026-05-13 15:45:16.305939',60,1),(48,'2026-05-13 15:45:16.305939',61,8),(49,'2026-05-13 15:45:16.305939',61,1),(50,'2026-05-13 15:45:16.305939',62,8),(51,'2026-05-13 15:45:16.305939',62,1),(52,'2026-05-13 15:45:16.305939',63,8),(53,'2026-05-13 15:45:16.305939',63,1),(54,'2026-05-13 15:45:16.305939',64,8),(55,'2026-05-13 15:45:16.305939',64,1),(56,'2026-05-13 15:45:16.305939',65,8),(57,'2026-05-13 15:45:16.305939',65,1),(58,'2026-05-13 15:45:16.305939',66,8),(59,'2026-05-13 15:45:16.305939',66,1),(60,'2026-05-14 23:29:46.649883',45,10),(61,'2026-05-14 23:29:46.658984',49,10),(62,'2026-05-14 23:29:46.661490',56,10);
/*!40000 ALTER TABLE `usuarios_tanques` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-15 15:37:13
