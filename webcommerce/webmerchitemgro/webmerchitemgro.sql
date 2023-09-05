CREATE TABLE `web_merchitemgro` (
	`merchitemgro_id` varchar(30) NOT NULL , 
	`merchitemgro_name` varchar(90) NOT NULL , 
	`merchitemgro_descr` varchar(255) NOT NULL , 
	`gender_id` varchar(7)  , 
	`cluster_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchitemgro_name` (`cluster_id`, `merchitemgro_name`),
	PRIMARY KEY (`merchitemgro_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Group Merchandise';

ALTER TABLE `web_merchitemgro` ADD KEY `gender_id` (`gender_id`);
ALTER TABLE `web_merchitemgro` ADD KEY `cluster_id` (`cluster_id`);

ALTER TABLE `web_merchitemgro` ADD CONSTRAINT `fk_web_merchitemgro_web_gender` FOREIGN KEY (`gender_id`) REFERENCES `web_gender` (`gender_id`);
ALTER TABLE `web_merchitemgro` ADD CONSTRAINT `fk_web_merchitemgro_web_cluster` FOREIGN KEY (`cluster_id`) REFERENCES `web_cluster` (`cluster_id`);





