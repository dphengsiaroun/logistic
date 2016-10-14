CREATE TABLE `annonce` (
	`idannonce` int(5) unsigned NOT NULL,
	`titre` varchar(200) NOT NULL,
	`photo` varchar(200) NOT NULL,
	`date_depart` date NOT NULL,
	`lieu_depart` varchar(20) NOT NULL,
	`date_fin` date NOT NULL,
	`lieu_fin` varchar(20) NOT NULL,
	`vehicule` varchar(20) NOT NULL,
	`expiration` date NOT NULL,
	`detail` text NOT NULL,
	`prix` int(5) NOT NULL,
	`idmembre` int(5) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `membre` (
	`idmembre` int(5) unsigned NOT NULL,
	`pseudo` varchar(15) NOT NULL,
	`mdp` varchar(80) NOT NULL,
	`nom` varchar(20) NOT NULL,
	`prenom` varchar(20) NOT NULL,
	`email` varchar(30) NOT NULL,
	`sexe` enum('m','f') NOT NULL,
	`adresse` varchar(30) NOT NULL,
	`cp` int(5) NOT NULL,
	`ville` varchar(20) NOT NULL,
	`pays` varchar(20) NOT NULL,
	`statut` int(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


INSERT INTO `membre` (`idmembre`, `pseudo`, `mdp`, `nom`, `prenom`, `email`, `sexe`, `adresse`, `cp`, `ville`, `pays`, `statut`) VALUES
	(2, 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'test', 'test', 'test@test.com', 'm', '19 rue de paris', 77200, 'TORCY', 'France', 0);

ALTER TABLE `annonce`
	ADD PRIMARY KEY (`idannonce`),
	ADD KEY `fk_annonce_membre1_idx` (`idmembre`);

ALTER TABLE `membre`
	ADD PRIMARY KEY (`idmembre`);

ALTER TABLE `annonce`
	MODIFY `idannonce` int(5) unsigned NOT NULL AUTO_INCREMENT;

ALTER TABLE `membre`
	MODIFY `idmembre` int(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;

ALTER TABLE `annonce`
	ADD CONSTRAINT `annonce_ibfk_1` FOREIGN KEY (`idmembre`) REFERENCES `membre` (`idmembre`) ON DELETE NO ACTION ON UPDATE CASCADE;
