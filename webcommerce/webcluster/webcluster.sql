CREATE TABLE `web_cluster` (
	`cluster_id` varchar(10) NOT NULL , 
	`cluster_name` varchar(60) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `cluster_name` (`cluster_name`),
	PRIMARY KEY (`cluster_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Cluster';




INSERT INTO web_cluster (`cluster_id`, `cluster_name`, `_createby`, `_createdate`) VALUES ('FLA', 'FURLA', 'root', NOW());
INSERT INTO web_cluster (`cluster_id`, `cluster_name`, `_createby`, `_createdate`) VALUES ('GEX', 'GEOX', 'root', NOW());
INSERT INTO web_cluster (`cluster_id`, `cluster_name`, `_createby`, `_createdate`) VALUES ('HBS', 'HUGOBOSS', 'root', NOW());
INSERT INTO web_cluster (`cluster_id`, `cluster_name`, `_createby`, `_createdate`) VALUES ('FRG', 'FERRAGAMO', 'root', NOW());



CREATE TABLE `web_clusterbrand` (
	`clusterbrand_id` varchar(14) NOT NULL , 
	`brand_id` varchar(10) NOT NULL , 
	`cluster_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`clusterbrand_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar brand yang dimiliki cluster';

ALTER TABLE `web_clusterbrand` ADD KEY `brand_id` (`brand_id`);
ALTER TABLE `web_clusterbrand` ADD KEY `cluster_id` (`cluster_id`);

ALTER TABLE `web_clusterbrand` ADD CONSTRAINT `fk_web_clusterbrand_web_brand` FOREIGN KEY (`brand_id`) REFERENCES `web_brand` (`brand_id`);
ALTER TABLE `web_clusterbrand` ADD CONSTRAINT `fk_web_clusterbrand_web_cluster` FOREIGN KEY (`cluster_id`) REFERENCES `web_cluster` (`cluster_id`);


INSERT INTO web_clusterbrand (`clusterbrand_id`, `brand_id`, `cluster_id`, `_createby`, `_createdate`) VALUES ('FLA01', 'FLA', 'FLA', 'root', NOW());
INSERT INTO web_clusterbrand (`clusterbrand_id`, `brand_id`, `cluster_id`, `_createby`, `_createdate`) VALUES ('GEX01', 'GEX', 'GEX', 'root', NOW());
INSERT INTO web_clusterbrand (`clusterbrand_id`, `brand_id`, `cluster_id`, `_createby`, `_createdate`) VALUES ('HBS01', 'HBS', 'HBS', 'root', NOW());
INSERT INTO web_clusterbrand (`clusterbrand_id`, `brand_id`, `cluster_id`, `_createby`, `_createdate`) VALUES ('FRG01', 'FRG', 'FRG', 'root', NOW());



