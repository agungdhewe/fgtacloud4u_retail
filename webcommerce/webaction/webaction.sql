CREATE TABLE `web_action` (
	`action_id` varchar(10) NOT NULL , 
	`action_name` varchar(90) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `action_name` (`action_name`),
	PRIMARY KEY (`action_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Action';







