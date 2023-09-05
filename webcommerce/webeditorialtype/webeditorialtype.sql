CREATE TABLE `web_editorialtype` (
	`editorialtype_id` varchar(7) NOT NULL , 
	`editorialtype_name` varchar(30) NOT NULL , 
	`editorialtype_order` int(4) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `editorialtype_name` (`editorialtype_name`),
	PRIMARY KEY (`editorialtype_id`)
) 
ENGINE=InnoDB
COMMENT='Master Tipe Editorial';




INSERT INTO web_editorialtype (`editorialtype_id`, `editorialtype_name`, `editorialtype_order`, `_createby`, `_createdate`) VALUES ('N', 'NEWS', '2', 'root', NOW());
INSERT INTO web_editorialtype (`editorialtype_id`, `editorialtype_name`, `editorialtype_order`, `_createby`, `_createdate`) VALUES ('C', 'CAMPAIGN', '1', 'root', NOW());
INSERT INTO web_editorialtype (`editorialtype_id`, `editorialtype_name`, `editorialtype_order`, `_createby`, `_createdate`) VALUES ('A', 'ARTICLES', '3', 'root', NOW());



