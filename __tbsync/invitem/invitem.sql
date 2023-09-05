-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `sync_tbinvitem`;


CREATE TABLE IF NOT EXISTS `sync_tbinvitem` (
	`tbinvitem_id` varchar(16) NOT NULL , 
	`region_id` varchar(5)  , 
	`heinv_id` varchar(13)  , 
	`heinvitem_line` int(4) NOT NULL DEFAULT 0, 
	`heinvitem_id` varchar(13)  , 
	`heinvitem_size` varchar(50)  , 
	`heinvitem_colnum` varchar(3)  , 
	`heinvitem_barcode` varchar(30)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `heinvitem_barcode` (`heinvitem_barcode`, `region_id`),
	UNIQUE KEY `heinvitem_id` (`heinv_id`, `heinvitem_line`),
	PRIMARY KEY (`tbinvitem_id`)
) 
ENGINE=InnoDB
COMMENT='Sync TV inv item';


ALTER TABLE `sync_tbinvitem` ADD COLUMN IF NOT EXISTS  `region_id` varchar(5)   AFTER `tbinvitem_id`;
ALTER TABLE `sync_tbinvitem` ADD COLUMN IF NOT EXISTS  `heinv_id` varchar(13)   AFTER `region_id`;
ALTER TABLE `sync_tbinvitem` ADD COLUMN IF NOT EXISTS  `heinvitem_line` int(4) NOT NULL DEFAULT 0 AFTER `heinv_id`;
ALTER TABLE `sync_tbinvitem` ADD COLUMN IF NOT EXISTS  `heinvitem_id` varchar(13)   AFTER `heinvitem_line`;
ALTER TABLE `sync_tbinvitem` ADD COLUMN IF NOT EXISTS  `heinvitem_size` varchar(50)   AFTER `heinvitem_id`;
ALTER TABLE `sync_tbinvitem` ADD COLUMN IF NOT EXISTS  `heinvitem_colnum` varchar(3)   AFTER `heinvitem_size`;
ALTER TABLE `sync_tbinvitem` ADD COLUMN IF NOT EXISTS  `heinvitem_barcode` varchar(30)   AFTER `heinvitem_colnum`;


ALTER TABLE `sync_tbinvitem` MODIFY COLUMN IF EXISTS  `region_id` varchar(5)   AFTER `tbinvitem_id`;
ALTER TABLE `sync_tbinvitem` MODIFY COLUMN IF EXISTS  `heinv_id` varchar(13)   AFTER `region_id`;
ALTER TABLE `sync_tbinvitem` MODIFY COLUMN IF EXISTS  `heinvitem_line` int(4) NOT NULL DEFAULT 0 AFTER `heinv_id`;
ALTER TABLE `sync_tbinvitem` MODIFY COLUMN IF EXISTS  `heinvitem_id` varchar(13)   AFTER `heinvitem_line`;
ALTER TABLE `sync_tbinvitem` MODIFY COLUMN IF EXISTS  `heinvitem_size` varchar(50)   AFTER `heinvitem_id`;
ALTER TABLE `sync_tbinvitem` MODIFY COLUMN IF EXISTS  `heinvitem_colnum` varchar(3)   AFTER `heinvitem_size`;
ALTER TABLE `sync_tbinvitem` MODIFY COLUMN IF EXISTS  `heinvitem_barcode` varchar(30)   AFTER `heinvitem_colnum`;


ALTER TABLE `sync_tbinvitem` ADD CONSTRAINT `heinvitem_barcode` UNIQUE IF NOT EXISTS  (`heinvitem_barcode`, `region_id`);
ALTER TABLE `sync_tbinvitem` ADD CONSTRAINT `heinvitem_id` UNIQUE IF NOT EXISTS  (`heinv_id`, `heinvitem_line`);







