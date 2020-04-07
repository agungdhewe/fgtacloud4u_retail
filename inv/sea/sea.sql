CREATE TABLE `mst_sea` (
	`sea_id` varchar(10) NOT NULL , 
	`sea_name` varchar(90) NOT NULL , 
	`sea_year` int(4) NOT NULL , 
	`sea_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`sea_datestart` date NOT NULL , 
	`sea_dateend` date NOT NULL , 
	`seagroup_id` varchar(2) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`sea_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Season';

ALTER TABLE `mst_sea` ADD KEY `seagroup_id` (`seagroup_id`);

ALTER TABLE `mst_sea` ADD CONSTRAINT `fk_mst_sea_mst_seagroup` FOREIGN KEY (`seagroup_id`) REFERENCES `mst_seagroup` (`seagroup_id`);





