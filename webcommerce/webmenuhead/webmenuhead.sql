CREATE TABLE `web_menuhead` (
	`menuhead_id` varchar(14) NOT NULL , 
	`menuhead_text` varchar(60) NOT NULL , 
	`menuhead_notes` varchar(255)  , 
	`menuhead_url` varchar(255) NOT NULL , 
	`menuhead_order` int(4) NOT NULL DEFAULT 0, 
	`menuhead_target` varchar(30)  , 
	`menuhead_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`menuhead_showindropdown` tinyint(1) NOT NULL DEFAULT 1, 
	`menuhead_showinaccordion` tinyint(1) NOT NULL DEFAULT 1, 
	`menuhead_isparent` tinyint(1) NOT NULL DEFAULT 0, 
	`menuhead_parent` varchar(14)  , 
	`menuvisibility_id` varchar(1) NOT NULL , 
	`cluster_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `menuhead_text` (`menuhead_text`),
	PRIMARY KEY (`menuhead_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Menu yang muncul di header';

ALTER TABLE `web_menuhead` ADD KEY `menuhead_parent` (`menuhead_parent`);
ALTER TABLE `web_menuhead` ADD KEY `menuvisibility_id` (`menuvisibility_id`);
ALTER TABLE `web_menuhead` ADD KEY `cluster_id` (`cluster_id`);

ALTER TABLE `web_menuhead` ADD CONSTRAINT `fk_web_menuhead_web_menuhead` FOREIGN KEY (`menuhead_parent`) REFERENCES `web_menuhead` (`menuhead_id`);
ALTER TABLE `web_menuhead` ADD CONSTRAINT `fk_web_menuhead_web_menuvisibility` FOREIGN KEY (`menuvisibility_id`) REFERENCES `web_menuvisibility` (`menuvisibility_id`);
ALTER TABLE `web_menuhead` ADD CONSTRAINT `fk_web_menuhead_web_cluster` FOREIGN KEY (`cluster_id`) REFERENCES `web_cluster` (`cluster_id`);





