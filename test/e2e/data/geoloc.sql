-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:8889
-- Généré le :  Jeu 08 Juin 2017 à 16:02
-- Version du serveur :  5.6.33
-- Version de PHP :  7.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `logistic`
--

-- --------------------------------------------------------

--
-- Structure de la table `xx_geoloc`
--

CREATE TABLE `xx_geoloc` (
  `id` int(16) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL,
  `key` varchar(1024) NOT NULL,
  `content` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `xx_geoloc`
--

INSERT INTO `xx_geoloc` (`id`, `type`, `key`, `content`) VALUES
(1, 'city', 'Abi+Youcef+Tizi+Ouzou+Algérie', '{"place_id":"173856628","licence":"Data \\u00a9 OpenStreetMap contributors, ODbL 1.0. http:\\/\\/www.openstreetmap.org\\/copyright","osm_type":"relation","osm_id":"4279944","boundingbox":["36.4861828","36.5620121","4.3113954","4.357678"],"lat":"36.52429225","lon":"4.34427039749823","display_name":"Abi Youcef, Da\\u00efra A\\u00efn El Hammam, Tizi Ouzou, \\u2d4d\\u2d63\\u2d63\\u2d30\\u2d62\\u2d3b\\u2d54 \\u0627\\u0644\\u062c\\u0632\\u0627\\u0626\\u0631","class":"boundary","type":"administrative","importance":0.577147308297,"icon":"http:\\/\\/nominatim.openstreetmap.org\\/images\\/mapicons\\/poi_boundary_administrative.p.20.png"}'),
(2, 'city', 'Abalessa+Tamanrasset+Algérie', '{"place_id":"149404531","licence":"Data \\u00a9 OpenStreetMap contributors, ODbL 1.0. http:\\/\\/www.openstreetmap.org\\/copyright","osm_type":"way","osm_id":"362488910","boundingbox":["22.8256401","22.9492577","4.4836005","4.9784611"],"lat":"22.8565096","lon":"4.7157656","display_name":"Abalessa, Da\\u00efra d\'Abalessa, Tamanrasset, \\u2d4d\\u2d63\\u2d63\\u2d30\\u2d62\\u2d3b\\u2d54 \\u0627\\u0644\\u062c\\u0632\\u0627\\u0626\\u0631","class":"waterway","type":"river","importance":0.545}'),
(3, 'city', 'Abdelmalek+Ramdane+Mostaganem+Algérie', '{"place_id":"174061170","licence":"Data \\u00a9 OpenStreetMap contributors, ODbL 1.0. http:\\/\\/www.openstreetmap.org\\/copyright","osm_type":"relation","osm_id":"6660562","boundingbox":["36.0255046","36.1328231","0.1329254","0.3072283"],"lat":"36.07915875","lon":"0.244465008589314","display_name":"Abdelmalek Ramdane, da\\u00efra Sidi Lakhdar, Mostaganem - \\u0645\\u0633\\u062a\\u063a\\u0627\\u0646\\u0645, \\u2d4d\\u2d63\\u2d63\\u2d30\\u2d62\\u2d3b\\u2d54 \\u0627\\u0644\\u062c\\u0632\\u0627\\u0626\\u0631","class":"boundary","type":"administrative","importance":0.454561534822,"icon":"http:\\/\\/nominatim.openstreetmap.org\\/images\\/mapicons\\/poi_boundary_administrative.p.20.png"}'),
(4, 'route', '4.34427039749823,36.52429225;0.244465008589314,36.07915875', '{"duration":23512,"distance":482393}'),
(5, 'city', 'Abou+El+Hassen+Chlef+Algérie', '{"place_id":"173902862","licence":"Data \\u00a9 OpenStreetMap contributors, ODbL 1.0. http:\\/\\/www.openstreetmap.org\\/copyright","osm_type":"relation","osm_id":"4844288","boundingbox":["36.3488056","36.4680796","1.1121635","1.2647991"],"lat":"36.4164372","lon":"1.1961148","display_name":"Abou El Hassen, da\\u00efra Abou El Hassen, Chlef - \\u0627\\u0644\\u0634\\u0644\\u0641\\u200e, \\u2d4d\\u2d63\\u2d63\\u2d30\\u2d62\\u2d3b\\u2d54 \\u0627\\u0644\\u062c\\u0632\\u0627\\u0626\\u0631","class":"boundary","type":"administrative","importance":0.650891901723,"icon":"http:\\/\\/nominatim.openstreetmap.org\\/images\\/mapicons\\/poi_boundary_administrative.p.20.png"}'),
(6, 'route', '4.34427039749823,36.52429225;1.1961148,36.4164372', '{"duration":20552,"distance":402822}'),
(7, 'city', 'Adekar+Béjaïa+Algérie', '{"place_id":"173689001","licence":"Data \\u00a9 OpenStreetMap contributors, ODbL 1.0. http:\\/\\/www.openstreetmap.org\\/copyright","osm_type":"relation","osm_id":"4067907","boundingbox":["36.6755438","36.7911876","4.5173508","4.7049291"],"lat":"36.7333674","lon":"4.56454914765421","display_name":"Adekar, Da\\u00efra Adekar, B\\u00e9ja\\u00efa, 06021, \\u2d4d\\u2d63\\u2d63\\u2d30\\u2d62\\u2d3b\\u2d54 \\u0627\\u0644\\u062c\\u0632\\u0627\\u0626\\u0631","class":"boundary","type":"administrative","importance":0.577308224895,"icon":"http:\\/\\/nominatim.openstreetmap.org\\/images\\/mapicons\\/poi_boundary_administrative.p.20.png"}'),
(8, 'route', '4.34427039749823,36.52429225;4.56454914765421,36.7333674', '{"duration":8032,"distance":90350}'),
(9, 'city', 'Oran+Oran+Algérie', '{"place_id":"173239637","licence":"Data \\u00a9 OpenStreetMap contributors, ODbL 1.0. http:\\/\\/www.openstreetmap.org\\/copyright","osm_type":"relation","osm_id":"1259562","boundingbox":["35.6452843","35.7695075","-0.7296348","-0.5513975"],"lat":"35.7032751","lon":"-0.6492976","display_name":"Oran, Da\\u00efra Oran, Oran - \\u0648\\u0647\\u0631\\u0627\\u0646, \\u2d4d\\u2d63\\u2d63\\u2d30\\u2d62\\u2d3b\\u2d54 \\u0627\\u0644\\u062c\\u0632\\u0627\\u0626\\u0631","class":"place","type":"city","importance":0.788063097587,"icon":"http:\\/\\/nominatim.openstreetmap.org\\/images\\/mapicons\\/poi_place_city.p.20.png"}'),
(10, 'route', '-0.6492976,35.7032751;4.56454914765421,36.7333674', '{"duration":24426,"distance":585995}'),
(11, 'city', 'Alger+Centre+Alger+Algérie', '{"place_id":"173412344","licence":"Data \\u00a9 OpenStreetMap contributors, ODbL 1.0. http:\\/\\/www.openstreetmap.org\\/copyright","osm_type":"relation","osm_id":"157183","boundingbox":["36.7522081","36.7831904","3.0388503","3.0825472"],"lat":"36.7763022","lon":"3.0584856","display_name":"Alger Centre, Da\\u00efra Sidi M\'Hamed, Alger - \\u0627\\u0644\\u062c\\u0632\\u0627\\u0626\\u0631, \\u2d4d\\u2d63\\u2d63\\u2d30\\u2d62\\u2d3b\\u2d54 \\u0627\\u0644\\u062c\\u0632\\u0627\\u0626\\u0631","class":"boundary","type":"administrative","importance":0.611755768709,"icon":"http:\\/\\/nominatim.openstreetmap.org\\/images\\/mapicons\\/poi_boundary_administrative.p.20.png"}'),
(12, 'route', '-0.6492976,35.7032751;3.0584856,36.7763022', '{"duration":16120,"distance":416746}'),
(13, 'city', 'Adrar+Adrar+Algérie', '{"place_id":"173699970","licence":"Data \\u00a9 OpenStreetMap contributors, ODbL 1.0. http:\\/\\/www.openstreetmap.org\\/copyright","osm_type":"relation","osm_id":"4171602","boundingbox":["27.767485","28.16506","-0.3336882","-0.04751"],"lat":"27.8733807","lon":"-0.2874884","display_name":"Adrar, Da\\u00efra d\'Adrar, Adrar, \\u2d4d\\u2d63\\u2d63\\u2d30\\u2d62\\u2d3b\\u2d54 \\u0627\\u0644\\u062c\\u0632\\u0627\\u0626\\u0631","class":"boundary","type":"administrative","importance":0.571139325579,"icon":"http:\\/\\/nominatim.openstreetmap.org\\/images\\/mapicons\\/poi_boundary_administrative.p.20.png"}'),
(14, 'route', '4.56454914765421,36.7333674;-0.2874884,27.8733807', '{"duration":69170,"distance":1469973}'),
(15, 'route', '0.244465008589314,36.07915875;4.34427039749823,36.52429225', '{"duration":23397,"distance":483640}');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `xx_geoloc`
--
ALTER TABLE `xx_geoloc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_key` (`key`(255),`type`);