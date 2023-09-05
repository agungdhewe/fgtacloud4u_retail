CREATE TABLE `web_webproptype` (
	`webproptype_id` varchar(20) NOT NULL , 
	`webproptype_name` varchar(30) NOT NULL , 
	`webproptype_group` varchar(20) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `webproptype_name` (`webproptype_name`),
	PRIMARY KEY (`webproptype_id`)
) 
ENGINE=InnoDB
COMMENT='Master Data Properties Type';







