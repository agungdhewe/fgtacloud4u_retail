CREATE TABLE `web_merchformat` (
	`merchformat_id` varchar(10) NOT NULL , 
	`merchformat_name` varchar(90) NOT NULL , 
	`brand_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchformat_name` (`merchformat_name`),
	PRIMARY KEY (`merchformat_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Format Merchandise';

ALTER TABLE `web_merchformat` ADD KEY `brand_id` (`brand_id`);

ALTER TABLE `web_merchformat` ADD CONSTRAINT `fk_web_merchformat_web_brand` FOREIGN KEY (`brand_id`) REFERENCES `web_brand` (`brand_id`);





