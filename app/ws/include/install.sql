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

CREATE TABLE `<?php echo $context->prefix; ?>event_error` (
  `id` INT(16) UNSIGNED NOT NULL,
  `message` longtext NOT NULL,
  `stacktrace` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `<?php echo $context->prefix; ?>user` (
	`id` INT(16) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_t` VARCHAR(255) NOT NULL ,
	`email` VARCHAR(255) NOT NULL ,
	`login` VARCHAR(255) NOT NULL ,
	`phone` VARCHAR(255) NOT NULL ,
	`password` VARCHAR(255) NOT NULL ,
	`content` LONGTEXT NOT NULL ,
	PRIMARY KEY (`id`),
	UNIQUE `i_email` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `<?php echo $context->prefix; ?>user_admin` (
	`id` INT(16) UNSIGNED NOT NULL AUTO_INCREMENT,
	`login` VARCHAR(255) NOT NULL ,
	`password` VARCHAR(255) NOT NULL ,
	PRIMARY KEY (`id`),
	UNIQUE `i_login` (`login`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `<?php echo $context->prefix; ?>carrier` (
  `id` INT(16) UNSIGNED NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `user_id` int(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

CREATE TABLE `<?php echo $context->prefix; ?>loader` (
  `id` INT(16) UNSIGNED NOT NULL,
  `content` longtext NOT NULL,
  `user_id` int(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `<?php echo $context->prefix; ?>proposal` (
  `id` INT(16) UNSIGNED NOT NULL,
  `content` longtext NOT NULL,
  `user_id` int(16) NOT NULL,
  `ad_id` int(16) NOT NULL,
  `ad_user_id` int(16) NOT NULL,
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
