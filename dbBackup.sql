-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server Version:               10.6.16-MariaDB - mariadb.org binary distribution
-- Server Betriebssystem:        Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Exportiere Datenbank Struktur für db0815
CREATE DATABASE IF NOT EXISTS `db0815` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci */;
USE `db0815`;

-- Exportiere Struktur von Tabelle db0815.content
CREATE TABLE IF NOT EXISTS `content` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `page` text NOT NULL,
  `type` tinytext NOT NULL,
  `content` text NOT NULL,
  `description` text NOT NULL,
  `created` datetime DEFAULT current_timestamp(),
  `updated` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Exportiere Daten aus Tabelle db0815.content: ~1 rows (ungefähr)
INSERT INTO `content` (`id`, `page`, `type`, `content`, `description`, `created`, `updated`) VALUES
	('6da6bfd1-afeb-11ee-b248-8cc681cfc0aa', 'start', 'article-big', '<div><strong>Header</strong></div>', 'asdasds', '2024-01-01 20:06:58', '2024-01-12 19:41:12');

-- Exportiere Struktur von Tabelle db0815.meta
CREATE TABLE IF NOT EXISTS `meta` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `page` text NOT NULL,
  `title` text DEFAULT NULL,
  `keywords` text DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Exportiere Daten aus Tabelle db0815.meta: ~9 rows (ungefähr)
INSERT INTO `meta` (`id`, `page`, `title`, `keywords`, `description`) VALUES
	('5f72814c-af31-11ee-b187-8cc681cfc0aa', 'news', 'Aktuelles - MCH-Hülben e.V.', 'presse, pressemitteilungen, SWP, GA, Südwest, General, Anzeiger, Reutlingen, albmagazin, alb, magazin, ausflüge, ausstellungen, gemeinde, termine, donnerstag, öffnungszeiten, besuchszeiten, treffpunkt, anmeldung', 'Aktuelles - Hier finden sie alle aktuellen Termine und Pressemitteilungen vom Modellbahnclub Hülben e.V.'),
	('a775aa33-af31-11ee-b187-8cc681cfc0aa', 'about', 'Unser Vereinsheim - MCH-Hülben e.V.', 'H0, HO, LGB, Spur 1, gemeinde, termine, donnerstag, öffnungszeiten, besuchszeiten, treffpunkt, ausflüge, ausstellungen, mitglieder, über, uns, wer, wir, sind, anlagen, standort, vereinssitz, vereinsheim', 'Hier findet ihr Informationen zu unserem Vereinsheim'),
	('c8cec17c-af31-11ee-b187-8cc681cfc0aa', 'club', 'Unser Vereinsheim - MCH-Hülben e.V.', 'Unser Vereinsheim - MCH-Hülben e.V.', 'Unser Vereinsheim - MCH-Hülben e.V.'),
	('e8d75d7f-af3b-11ee-b187-8cc681cfc0aa', 'impressum', 'Impressum - MCH-Hülben e.V.', 'Impressum, Haftungsausschluss', 'Das Impressum des MCH'),
	('126c81ba-af3c-11ee-b187-8cc681cfc0aa', 'datenschutz', 'Datenschutz - MCH-H&uuml;lben e.V.', 'Datenschutz, Datenschutzerklärung', 'Die Datenschutzerklärung des MCH'),
	('42b51eb8-af3c-11ee-b187-8cc681cfc0aa', 'contact', 'Kontaktformular - MCH-Hülben e.V.', 'Kontakt, formular, email', 'Nehmen Sie Kontakt mit uns auf'),
	('5aa7c12c-af3c-11ee-b187-8cc681cfc0aa', 'links', 'Links - MCH-Hülben e.V.', 'Links, Vereine, Partner, Freunde', 'Hier findet ihr Links zu unseren Freunden, Partnern und Vereinen'),
	('6f1ff443-af3c-11ee-b187-8cc681cfc0aa', 'gallery', 'Bildergalerie - MCH-Hülben e.V.', 'Bilder, Galerie, Archiv, Ausflüge, Anlagen, Ausstellugen, 2005, 2006, 2008, 2009, 2010, 2011, 2013, 2014', 'Hier findet ihr Bilder zu unseren Events, Austellugen, Ausflügen und Anlagen'),
	('7b44d468-af3e-11ee-b187-8cc681cfc0aa', 'start', 'Startseite - MCH-Hülben e.V.', 'H0, HO, LGB, Spur 1, gemeinde, termine, bilder, donnerstag, öffnungszeiten, besuchszeiten, startseite, treffpunkt, Ausstellung, Modelleisenbahnausstellung', 'Startseite - Hier finden sie alle Infos, Bilder und Termine zum Modellbahnclub Hülben e.V.');

-- Exportiere Struktur von Tabelle db0815.tabelle
CREATE TABLE IF NOT EXISTS `tabelle` (
  `Spalte 1` varchar(36) NOT NULL DEFAULT uuid(),
  `Spalte 2` text NOT NULL,
  `Spalte 3` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Exportiere Daten aus Tabelle db0815.tabelle: ~2 rows (ungefähr)
INSERT INTO `tabelle` (`Spalte 1`, `Spalte 2`, `Spalte 3`) VALUES
	('6d259658-aed4-11ee-b187-8cc681cfc0aa', '1', NULL),
	('955ee67b-aed4-11ee-b187-8cc681cfc0aa', '2', NULL),
	('699386fc-aee5-11ee-b187-8cc681cfc0aa', '3', '2024-01-09 12:51:24');

-- Exportiere Struktur von Tabelle db0815.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `name` tinytext NOT NULL,
  `email` tinytext NOT NULL,
  `role` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Exportiere Daten aus Tabelle db0815.users: ~0 rows (ungefähr)
INSERT INTO `users` (`id`, `name`, `email`, `role`) VALUES
	('e5e4671b-e32a-4626-bac6-fe9e3950b3f3', 'Admin', 'webmaster@mch-huelben.de', 'admin');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
