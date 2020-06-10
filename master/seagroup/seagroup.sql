CREATE TABLE `mst_seagroup` (
	`seagroup_id` varchar(10) NOT NULL , 
	`seagroup_name` varchar(90) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `seagroup_name` (`seagroup_name`),
	PRIMARY KEY (`seagroup_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Group Season';




INSERT INTO mst_seagroup (`seagroup_id`, `seagroup_name`, `_createby`, `_createdate`) VALUES ('FW', 'FW', 'root', NOW());
INSERT INTO mst_seagroup (`seagroup_id`, `seagroup_name`, `_createby`, `_createdate`) VALUES ('SS', 'SS', 'root', NOW());



