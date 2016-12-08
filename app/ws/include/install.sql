CREATE TABLE `account` ( 
	`id` INT(5) UNSIGNED NOT NULL AUTO_INCREMENT ,
	`email` VARCHAR(255) NOT NULL ,
	`password` VARCHAR(255) NOT NULL ,
	`content` LONGTEXT NOT NULL ,
	PRIMARY KEY (`id`),
	UNIQUE `i_email` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `carrier` (
  `id` INT(5) UNSIGNED NOT NULL AUTO_INCREMENT ,
  `content` longtext NOT NULL,
  `account_id` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

CREATE TABLE `loader` (
  `id` INT(5) UNSIGNED NOT NULL AUTO_INCREMENT ,
  `content` longtext NOT NULL,
  `account_id` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;