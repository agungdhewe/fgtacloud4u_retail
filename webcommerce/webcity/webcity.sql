CREATE TABLE `web_city` (
	`city_id` varchar(30) NOT NULL , 
	`city_name` varchar(60) NOT NULL , 
	`city_order` int(4) NOT NULL DEFAULT 0, 
	`city_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`cluster_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `city_name` (`city_name`),
	PRIMARY KEY (`city_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar City';

ALTER TABLE `web_city` ADD KEY `cluster_id` (`cluster_id`);

ALTER TABLE `web_city` ADD CONSTRAINT `fk_web_city_web_cluster` FOREIGN KEY (`cluster_id`) REFERENCES `web_cluster` (`cluster_id`);


INSERT INTO web_city (`city_id`, `city_name`, `city_order`, `cluster_id`, `_createby`, `_createdate`) VALUES ('JKT', 'JAKARTA', '10', 'FLA', 'root', NOW());
INSERT INTO web_city (`city_id`, `city_name`, `city_order`, `cluster_id`, `_createby`, `_createdate`) VALUES ('BDG', 'BANDUNG', '20', 'FLA', 'root', NOW());
INSERT INTO web_city (`city_id`, `city_name`, `city_order`, `cluster_id`, `_createby`, `_createdate`) VALUES ('SBY', 'SURABAYA', '30', 'FLA', 'root', NOW());
INSERT INTO web_city (`city_id`, `city_name`, `city_order`, `cluster_id`, `_createby`, `_createdate`) VALUES ('MKS', 'MAKASSAR', '40', 'FLA', 'root', NOW());



