CREATE TABLE `web_preftype` (
	`preftype_id` varchar(5) NOT NULL , 
	`preftype_name` varchar(90) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `preftype_name` (`preftype_name`),
	PRIMARY KEY (`preftype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Preference';







