CREATE TABLE `web_seagroup` (
	`seagroup_id` varchar(2) NOT NULL , 
	`seagroup_name` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `seagroup_name` (`seagroup_name`),
	PRIMARY KEY (`seagroup_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Season Group';




INSERT INTO web_seagroup (`seagroup_id`, `seagroup_name`, `_createby`, `_createdate`) VALUES ('PF', 'PRE FALL', 'root', NOW());
INSERT INTO web_seagroup (`seagroup_id`, `seagroup_name`, `_createby`, `_createdate`) VALUES ('FW', 'FALL WINTER', 'root', NOW());
INSERT INTO web_seagroup (`seagroup_id`, `seagroup_name`, `_createby`, `_createdate`) VALUES ('SS', 'SPRING SUMMER', 'root', NOW());
INSERT INTO web_seagroup (`seagroup_id`, `seagroup_name`, `_createby`, `_createdate`) VALUES ('PS', 'PRE SPRING', 'root', NOW());



