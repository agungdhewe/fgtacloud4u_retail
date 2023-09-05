CREATE TABLE `web_site` (
	`site_id` varchar(30) NOT NULL , 
	`site_name` varchar(90) NOT NULL , 
	`site_address1` varchar(250) NOT NULL , 
	`site_address2` varchar(250) NOT NULL , 
	`site_address3` varchar(250) NOT NULL , 
	`site_phone` varchar(30) NOT NULL , 
	`site_contact` varchar(150) NOT NULL , 
	`site_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`site_geoloc` varchar(30) NOT NULL DEFAULT '', 
	`site_order` int(4) NOT NULL DEFAULT 0, 
	`site_mainpic` varchar(90)  , 
	`city_id` varchar(30) NOT NULL , 
	`cluster_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `site_name` (`cluster_id`, `site_name`),
	PRIMARY KEY (`site_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Site';

ALTER TABLE `web_site` ADD KEY `city_id` (`city_id`);
ALTER TABLE `web_site` ADD KEY `cluster_id` (`cluster_id`);

ALTER TABLE `web_site` ADD CONSTRAINT `fk_web_site_web_city` FOREIGN KEY (`city_id`) REFERENCES `web_city` (`city_id`);
ALTER TABLE `web_site` ADD CONSTRAINT `fk_web_site_web_cluster` FOREIGN KEY (`cluster_id`) REFERENCES `web_cluster` (`cluster_id`);





CREATE TABLE `web_sitepic` (
	`sitepic_id` varchar(14) NOT NULL , 
	`sitepic_descr` varchar(90) NOT NULL , 
	`sitepic_order` int(4) NOT NULL DEFAULT 0, 
	`sitepic_file` varchar(90)  , 
	`site_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`sitepic_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Picture';

ALTER TABLE `web_sitepic` ADD KEY `site_id` (`site_id`);

ALTER TABLE `web_sitepic` ADD CONSTRAINT `fk_web_sitepic_web_site` FOREIGN KEY (`site_id`) REFERENCES `web_site` (`site_id`);





