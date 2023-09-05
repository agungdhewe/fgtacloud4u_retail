CREATE TABLE `web_brand` (
	`brand_id` varchar(10) NOT NULL , 
	`brand_name` varchar(60) NOT NULL , 
	`brand_descr` varchar(90)  , 
	`brand_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `brand_name` (`brand_name`),
	PRIMARY KEY (`brand_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Brand';




INSERT INTO web_brand (`brand_id`, `brand_name`, `_createby`, `_createdate`) VALUES ('HBS', 'HUGOBOSS', 'root', NOW());
INSERT INTO web_brand (`brand_id`, `brand_name`, `_createby`, `_createdate`) VALUES ('CAN', 'CANALI', 'root', NOW());
INSERT INTO web_brand (`brand_id`, `brand_name`, `_createby`, `_createdate`) VALUES ('GEX', 'GEOX', 'root', NOW());
INSERT INTO web_brand (`brand_id`, `brand_name`, `_createby`, `_createdate`) VALUES ('EAG', 'AIGNER', 'root', NOW());
INSERT INTO web_brand (`brand_id`, `brand_name`, `_createby`, `_createdate`) VALUES ('FLA', 'FURLA', 'root', NOW());
INSERT INTO web_brand (`brand_id`, `brand_name`, `_createby`, `_createdate`) VALUES ('FRG', 'FERRAGAMO', 'root', NOW());
INSERT INTO web_brand (`brand_id`, `brand_name`, `_createby`, `_createdate`) VALUES ('FKP', 'FIND KAPOOR', 'root', NOW());
INSERT INTO web_brand (`brand_id`, `brand_name`, `_createby`, `_createdate`) VALUES ('TOD', 'TODS', 'root', NOW());



