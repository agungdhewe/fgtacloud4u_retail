-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_merchrv`;
-- drop table if exists `trn_merchrvitem`;


CREATE TABLE IF NOT EXISTS `trn_merchrv` (
	`merchrv_id` varchar(30) NOT NULL , 
	`unit_id` varchar(30)  , 
	`merchship_id` varchar(30)  , 
	`merchrv_ref` varchar(30)  , 
	`merchrv_date` date NOT NULL , 
	`merchrv_descr` varchar(255)  , 
	`periodemo_id` varchar(6) NOT NULL , 
	`merchrv_version` int(4) NOT NULL DEFAULT 0, 
	`merchrv_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`merchrv_commitby` varchar(14)  , 
	`merchrv_commitdate` datetime  , 
	`merchrv_ispost` tinyint(1) NOT NULL DEFAULT 0, 
	`merchrv_postby` varchar(14)  , 
	`merchrv_postdate` datetime  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchrv_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Receiving Dokumen';


ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(30)   AFTER `merchrv_id`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchship_id` varchar(30)   AFTER `unit_id`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_ref` varchar(30)   AFTER `merchship_id`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_date` date NOT NULL  AFTER `merchrv_ref`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_descr` varchar(255)   AFTER `merchrv_date`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `periodemo_id` varchar(6) NOT NULL  AFTER `merchrv_descr`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_version` int(4) NOT NULL DEFAULT 0 AFTER `periodemo_id`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchrv_version`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_commitby` varchar(14)   AFTER `merchrv_iscommit`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_commitdate` datetime   AFTER `merchrv_commitby`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_ispost` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchrv_commitdate`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_postby` varchar(14)   AFTER `merchrv_ispost`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_postdate` datetime   AFTER `merchrv_postby`;


ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `unit_id` varchar(30)    AFTER `merchrv_id`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchship_id` varchar(30)    AFTER `unit_id`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_ref` varchar(30)    AFTER `merchship_id`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_date` date NOT NULL   AFTER `merchrv_ref`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_descr` varchar(255)    AFTER `merchrv_date`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `periodemo_id` varchar(6) NOT NULL   AFTER `merchrv_descr`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_version` int(4) NOT NULL DEFAULT 0  AFTER `periodemo_id`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_iscommit` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchrv_version`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_commitby` varchar(14)    AFTER `merchrv_iscommit`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_commitdate` datetime    AFTER `merchrv_commitby`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_ispost` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchrv_commitdate`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_postby` varchar(14)    AFTER `merchrv_ispost`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_postdate` datetime    AFTER `merchrv_postby`;



ALTER TABLE `trn_merchrv` ADD KEY IF NOT EXISTS `unit_id` (`unit_id`);
ALTER TABLE `trn_merchrv` ADD KEY IF NOT EXISTS `merchship_id` (`merchship_id`);
ALTER TABLE `trn_merchrv` ADD KEY IF NOT EXISTS `periodemo_id` (`periodemo_id`);

ALTER TABLE `trn_merchrv` ADD CONSTRAINT `fk_trn_merchrv_mst_unit` FOREIGN KEY IF NOT EXISTS  (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `trn_merchrv` ADD CONSTRAINT `fk_trn_merchrv_trn_merchship` FOREIGN KEY IF NOT EXISTS  (`merchship_id`) REFERENCES `trn_merchship` (`merchship_id`);
ALTER TABLE `trn_merchrv` ADD CONSTRAINT `fk_trn_merchrv_mst_periodemo` FOREIGN KEY IF NOT EXISTS  (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);





CREATE TABLE IF NOT EXISTS `trn_merchrvitem` (
	`merchrvitem_id` varchar(14) NOT NULL , 
	`merchitem_id` varchar(14)  , 
	`merchitem_combo` varchar(103)  , 
	`merchitem_name` varchar(255)  , 
	`merchrvitem_qtyinit` int(4) NOT NULL DEFAULT 0, 
	`merchrvitem_qty` int(4) NOT NULL DEFAULT 0, 
	`merchrv_id` varchar(30) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchrvitem_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Item Received';


ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchitem_id` varchar(14)   AFTER `merchrvitem_id`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchitem_combo` varchar(103)   AFTER `merchitem_id`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchitem_name` varchar(255)   AFTER `merchitem_combo`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_qtyinit` int(4) NOT NULL DEFAULT 0 AFTER `merchitem_name`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_qty` int(4) NOT NULL DEFAULT 0 AFTER `merchrvitem_qtyinit`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrv_id` varchar(30) NOT NULL  AFTER `merchrvitem_qty`;


ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchitem_id` varchar(14)    AFTER `merchrvitem_id`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchitem_combo` varchar(103)    AFTER `merchitem_id`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchitem_name` varchar(255)    AFTER `merchitem_combo`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_qtyinit` int(4) NOT NULL DEFAULT 0  AFTER `merchitem_name`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_qty` int(4) NOT NULL DEFAULT 0  AFTER `merchrvitem_qtyinit`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrv_id` varchar(30) NOT NULL   AFTER `merchrvitem_qty`;



ALTER TABLE `trn_merchrvitem` ADD KEY IF NOT EXISTS `merchitem_id` (`merchitem_id`);
ALTER TABLE `trn_merchrvitem` ADD KEY IF NOT EXISTS `merchrv_id` (`merchrv_id`);

ALTER TABLE `trn_merchrvitem` ADD CONSTRAINT `fk_trn_merchrvitem_mst_merchitem` FOREIGN KEY IF NOT EXISTS  (`merchitem_id`) REFERENCES `mst_merchitem` (`merchitem_id`);
ALTER TABLE `trn_merchrvitem` ADD CONSTRAINT `fk_trn_merchrvitem_trn_merchrv` FOREIGN KEY IF NOT EXISTS (`merchrv_id`) REFERENCES `trn_merchrv` (`merchrv_id`);





