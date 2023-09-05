CREATE TABLE `web_menuvisibility` (
	`menuvisibility_id` varchar(1) NOT NULL , 
	`menuvisibility_name` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `menuvisibility_name` (`menuvisibility_name`),
	PRIMARY KEY (`menuvisibility_id`)
) 
ENGINE=InnoDB
COMMENT='Visibility Menu';




INSERT INTO web_menuvisibility (`menuvisibility_id`, `menuvisibility_name`, `_createby`, `_createdate`) VALUES ('A', 'ALWAYS', 'root', NOW());
INSERT INTO web_menuvisibility (`menuvisibility_id`, `menuvisibility_name`, `_createby`, `_createdate`) VALUES ('I', 'AFTER SIGNIN', 'root', NOW());
INSERT INTO web_menuvisibility (`menuvisibility_id`, `menuvisibility_name`, `_createby`, `_createdate`) VALUES ('O', 'BEFORE SIGNIN', 'root', NOW());



