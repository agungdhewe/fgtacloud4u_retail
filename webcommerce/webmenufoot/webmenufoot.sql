CREATE TABLE `web_menufoot` (
	`menufoot_id` varchar(14) NOT NULL , 
	`menufoot_text` varchar(60) NOT NULL , 
	`menufoot_notes` varchar(255)  , 
	`menufoot_url` varchar(255) NOT NULL , 
	`menufoot_order` int(4) NOT NULL DEFAULT 0, 
	`menufoot_target` varchar(30)  , 
	`menufoot_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`menuvisibility_id` varchar(1) NOT NULL , 
	`cluster_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `menufoot_text` (`menufoot_text`),
	PRIMARY KEY (`menufoot_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Menu yang muncul di footer';

ALTER TABLE `web_menufoot` ADD KEY `menuvisibility_id` (`menuvisibility_id`);
ALTER TABLE `web_menufoot` ADD KEY `cluster_id` (`cluster_id`);

ALTER TABLE `web_menufoot` ADD CONSTRAINT `fk_web_menufoot_web_menuvisibility` FOREIGN KEY (`menuvisibility_id`) REFERENCES `web_menuvisibility` (`menuvisibility_id`);
ALTER TABLE `web_menufoot` ADD CONSTRAINT `fk_web_menufoot_web_cluster` FOREIGN KEY (`cluster_id`) REFERENCES `web_cluster` (`cluster_id`);





