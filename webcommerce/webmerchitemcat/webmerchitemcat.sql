CREATE TABLE `web_merchitemcat` (
	`merchitemcat_id` varchar(30) NOT NULL , 
	`merchitemcat_name` varchar(90) NOT NULL , 
	`merchitemcat_descr` varchar(255) NOT NULL , 
	`merchitemgro_id` varchar(30) NOT NULL , 
	`gender_id` varchar(7) NOT NULL , 
	`cluster_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchitemcat_name` (`cluster_id`, `merchitemcat_name`),
	PRIMARY KEY (`merchitemcat_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Category';

ALTER TABLE `web_merchitemcat` ADD KEY `merchitemgro_id` (`merchitemgro_id`);
ALTER TABLE `web_merchitemcat` ADD KEY `gender_id` (`gender_id`);
ALTER TABLE `web_merchitemcat` ADD KEY `cluster_id` (`cluster_id`);

ALTER TABLE `web_merchitemcat` ADD CONSTRAINT `fk_web_merchitemcat_web_merchitemgro` FOREIGN KEY (`merchitemgro_id`) REFERENCES `web_merchitemgro` (`merchitemgro_id`);
ALTER TABLE `web_merchitemcat` ADD CONSTRAINT `fk_web_merchitemcat_web_gender` FOREIGN KEY (`gender_id`) REFERENCES `web_gender` (`gender_id`);
ALTER TABLE `web_merchitemcat` ADD CONSTRAINT `fk_web_merchitemcat_web_cluster` FOREIGN KEY (`cluster_id`) REFERENCES `web_cluster` (`cluster_id`);





CREATE TABLE `web_merchitemcatpic` (
	`merchitemcatpic_id` varchar(14) NOT NULL , 
	`merchitemcatpic_name` varchar(30) NOT NULL , 
	`merchitemcatpic_descr` varchar(90) NOT NULL , 
	`merchitemcatpic_order` int(4) NOT NULL DEFAULT 0, 
	`merchitemcatpic_file` varchar(90)  , 
	`merchitemcat_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchitemcatpic_name` (`merchitemcat_id`, `merchitemcatpic_name`),
	PRIMARY KEY (`merchitemcatpic_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Picture Category Merch Item';

ALTER TABLE `web_merchitemcatpic` ADD KEY `merchitemcat_id` (`merchitemcat_id`);

ALTER TABLE `web_merchitemcatpic` ADD CONSTRAINT `fk_web_merchitemcatpic_web_merchitemcat` FOREIGN KEY (`merchitemcat_id`) REFERENCES `web_merchitemcat` (`merchitemcat_id`);





CREATE TABLE `web_merchitemcatprop` (
	`merchitemcatprop_id` varchar(14) NOT NULL , 
	`webproptype_id` varchar(20) NOT NULL , 
	`merchitemcatprop_value` varchar(90) NOT NULL , 
	`merchitemcat_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchitemcatprop_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Properties Category Merch Item';

ALTER TABLE `web_merchitemcatprop` ADD KEY `webproptype_id` (`webproptype_id`);
ALTER TABLE `web_merchitemcatprop` ADD KEY `merchitemcat_id` (`merchitemcat_id`);

ALTER TABLE `web_merchitemcatprop` ADD CONSTRAINT `fk_web_merchitemcatprop_web_webproptype` FOREIGN KEY (`webproptype_id`) REFERENCES `web_webproptype` (`webproptype_id`);
ALTER TABLE `web_merchitemcatprop` ADD CONSTRAINT `fk_web_merchitemcatprop_web_merchitemcat` FOREIGN KEY (`merchitemcat_id`) REFERENCES `web_merchitemcat` (`merchitemcat_id`);





