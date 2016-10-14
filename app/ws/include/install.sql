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

CREATE TABLE `account` ( 
	`id` INT(5) UNSIGNED NOT NULL AUTO_INCREMENT ,
	`email` VARCHAR(255) NOT NULL ,
	`password` VARCHAR(255) NOT NULL ,
	`content` LONGTEXT NOT NULL ,
	PRIMARY KEY (`id`),
	UNIQUE `i_email` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `annonce`
	ADD PRIMARY KEY (`idannonce`),
	ADD KEY `fk_annonce_membre1_idx` (`idmembre`);

ALTER TABLE `annonce`
	MODIFY `idannonce` int(5) unsigned NOT NULL AUTO_INCREMENT;

ALTER TABLE `annonce`
	ADD CONSTRAINT `annonce_ibfk_1` FOREIGN KEY (`idmembre`) REFERENCES `membre` (`idmembre`) ON DELETE NO ACTION ON UPDATE CASCADE;
