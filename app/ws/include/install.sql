CREATE TABLE `<?php echo $context->prefix; ?>event` (
  `id` INT(16) UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` VARCHAR(255) NOT NULL,
  `content` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `<?php echo $context->prefix; ?>event_id` (
  `id` INT(16) UNSIGNED DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `<?php echo $context->prefix; ?>event_id` (id) VALUES (0);

CREATE TABLE `<?php echo $context->prefix; ?>account` (
	`id` INT(16) UNSIGNED NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(255) NOT NULL ,
	`password` VARCHAR(255) NOT NULL ,
	`content` LONGTEXT NOT NULL ,
	PRIMARY KEY (`id`),
	UNIQUE `i_email` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `<?php echo $context->prefix; ?>carrier` (
  `id` INT(16) UNSIGNED NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `account_id` int(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

CREATE TABLE `<?php echo $context->prefix; ?>loader` (
  `id` INT(16) UNSIGNED NOT NULL,
  `content` longtext NOT NULL,
  `account_id` int(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `<?php echo $context->prefix; ?>proposal` (
  `id` INT(16) UNSIGNED NOT NULL,
  `content` longtext NOT NULL,
  `proposal_account_id` int(16) NOT NULL,
  `ad_id` int(16) NOT NULL,
  `ad_account_id` int(16) NOT NULL,
  `ad_type` VARCHAR(40) NOT NULL ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `<?php echo $context->prefix; ?>geoloc` (
  `id` INT(16) UNSIGNED NOT NULL,
  `type` VARCHAR(255) NOT NULL ,
  `key` VARCHAR(1024) NOT NULL ,
  `content` longtext NOT NULL,
  PRIMARY KEY (`id`),
  INDEX type_key (`key`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
