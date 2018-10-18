CREATE TABLE `extended_profile` (
	`uname` VARCHAR(100) NOT NULL,
	`contact` VARCHAR(256) NULL DEFAULT NULL,
	`notes` VARCHAR(4000) NULL DEFAULT NULL,
	`flag1` INT(10) UNSIGNED NULL DEFAULT NULL,
	`flag2` INT(10) UNSIGNED NULL DEFAULT NULL,
	`flag3` INT(10) UNSIGNED NULL DEFAULT NULL,
	`avatarType` TINYINT(3) UNSIGNED NULL DEFAULT NULL COMMENT '0 - no avatar, 1 - built-in, 2 - custom',
	`avatarName` VARCHAR(256) NULL DEFAULT NULL,
	PRIMARY KEY (`uname`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;
