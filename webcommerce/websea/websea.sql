CREATE TABLE `web_sea` (
	`sea_id` varchar(10) NOT NULL , 
	`sea_name` varchar(60) NOT NULL , 
	`sea_year` int(4) NOT NULL DEFAULT 0, 
	`sea_order` int(4) NOT NULL DEFAULT 0, 
	`seagroup_id` varchar(10) NOT NULL , 
	`sea_map` varchar(3) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `sea_name` (`sea_name`),
	PRIMARY KEY (`sea_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar City';

ALTER TABLE `web_sea` ADD KEY `seagroup_id` (`seagroup_id`);

ALTER TABLE `web_sea` ADD CONSTRAINT `fk_web_sea_web_seagroup` FOREIGN KEY (`seagroup_id`) REFERENCES `web_seagroup` (`seagroup_id`);





