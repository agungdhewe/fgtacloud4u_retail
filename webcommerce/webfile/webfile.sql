CREATE TABLE `web_file` (
	`file_id` varchar(14) NOT NULL , 
	`file_name` varchar(60) NOT NULL , 
	`file_data` varchar(60)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `file_name` (`file_name`),
	PRIMARY KEY (`file_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar File';







