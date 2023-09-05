CREATE TABLE `web_merch` (
	`merch_id` varchar(14) NOT NULL , 
	`merch_name` varchar(90) NOT NULL , 
	`merch_file` varchar(90)  , 
	`cluster_id` varchar(10) NOT NULL , 
	`brand_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merch_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Merchandise';

ALTER TABLE `web_merch` ADD KEY `cluster_id` (`cluster_id`);
ALTER TABLE `web_merch` ADD KEY `brand_id` (`brand_id`);

ALTER TABLE `web_merch` ADD CONSTRAINT `fk_web_merch_web_cluster` FOREIGN KEY (`cluster_id`) REFERENCES `web_cluster` (`cluster_id`);
ALTER TABLE `web_merch` ADD CONSTRAINT `fk_web_merch_web_brand` FOREIGN KEY (`brand_id`) REFERENCES `web_brand` (`brand_id`);





