-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_merchquotout`;
-- drop table if exists `trn_merchquotoutitem`;
-- drop table if exists `trn_merchquotoutterm`;
-- drop table if exists `trn_merchquotoutappr`;


CREATE TABLE IF NOT EXISTS `trn_merchquotout` (
	`merchquotout_id` varchar(30) NOT NULL , 
	`unit_id` varchar(10)  , 
	`merchquotout_descr` varchar(90)  , 
	`merchquotout_dt` date NOT NULL , 
	`merchquotout_dtvalid` date NOT NULL , 
	`orderintype_id` varchar(10)  , 
	`partner_id` varchar(30)  , 
	`ae_empl_id` varchar(14)  , 
	`project_id` varchar(30)  , 
	`sales_dept_id` varchar(30) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`orderin_ishasdp` tinyint(1) NOT NULL DEFAULT 0, 
	`orderin_dpvalue` decimal(4, 2) NOT NULL DEFAULT 0, 
	`ppn_taxtype_id` varchar(10)  , 
	`ppn_taxvalue` decimal(4, 2) NOT NULL DEFAULT 0, 
	`ppn_include` tinyint(1) NOT NULL DEFAULT 0, 
	`merchquotout_totalitem` int(5) NOT NULL DEFAULT 0, 
	`merchquotout_totalqty` int(5) NOT NULL DEFAULT 0, 
	`merchquotout_salesgross` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchquotout_discount` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchquotout_subtotal` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchquotout_nett` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchquotout_ppn` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchquotout_total` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchquotout_totaladdcost` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchquotout_payment` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchquotoutitem_estgp` decimal(14, 0) NOT NULL DEFAULT 0, 
	`merchquotoutitem_estgppercent` decimal(5, 2) NOT NULL DEFAULT 0, 
	`doc_id` varchar(30) NOT NULL , 
	`merchquotout_version` int(4) NOT NULL DEFAULT 0, 
	`merchquotout_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`merchquotout_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`merchquotout_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`merchquotout_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`merchquotout_commitby` varchar(14)  , 
	`merchquotout_commitdate` datetime  , 
	`merchquotout_approveby` varchar(14)  , 
	`merchquotout_approvedate` datetime  , 
	`merchquotout_declineby` varchar(14)  , 
	`merchquotout_declinedate` datetime  , 
	`merchquotout_isclose` tinyint(1) NOT NULL DEFAULT 0, 
	`merchquotout_closeby` varchar(14)  , 
	`merchquotout_closedate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchquotout_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Quotation item merchandise';


ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(10)   AFTER `merchquotout_id`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_descr` varchar(90)   AFTER `unit_id`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_dt` date NOT NULL  AFTER `merchquotout_descr`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_dtvalid` date NOT NULL  AFTER `merchquotout_dt`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `orderintype_id` varchar(10)   AFTER `merchquotout_dtvalid`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(30)   AFTER `orderintype_id`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `ae_empl_id` varchar(14)   AFTER `partner_id`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `project_id` varchar(30)   AFTER `ae_empl_id`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `sales_dept_id` varchar(30) NOT NULL  AFTER `project_id`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `sales_dept_id`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `orderin_ishasdp` tinyint(1) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `orderin_dpvalue` decimal(4, 2) NOT NULL DEFAULT 0 AFTER `orderin_ishasdp`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `ppn_taxtype_id` varchar(10)   AFTER `orderin_dpvalue`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `ppn_taxvalue` decimal(4, 2) NOT NULL DEFAULT 0 AFTER `ppn_taxtype_id`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `ppn_include` tinyint(1) NOT NULL DEFAULT 0 AFTER `ppn_taxvalue`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_totalitem` int(5) NOT NULL DEFAULT 0 AFTER `ppn_include`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_totalqty` int(5) NOT NULL DEFAULT 0 AFTER `merchquotout_totalitem`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_salesgross` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_totalqty`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_discount` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_salesgross`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_subtotal` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_discount`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_nett` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_subtotal`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_ppn` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_nett`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_total` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_ppn`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_totaladdcost` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_total`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_payment` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_totaladdcost`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_estgp` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_payment`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_estgppercent` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_estgp`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `doc_id` varchar(30) NOT NULL  AFTER `merchquotoutitem_estgppercent`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_version` int(4) NOT NULL DEFAULT 0 AFTER `doc_id`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotout_version`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotout_iscommit`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotout_isapprovalprogress`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotout_isapproved`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_commitby` varchar(14)   AFTER `merchquotout_isdeclined`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_commitdate` datetime   AFTER `merchquotout_commitby`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_approveby` varchar(14)   AFTER `merchquotout_commitdate`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_approvedate` datetime   AFTER `merchquotout_approveby`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_declineby` varchar(14)   AFTER `merchquotout_approvedate`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_declinedate` datetime   AFTER `merchquotout_declineby`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_isclose` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotout_declinedate`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_closeby` varchar(14)   AFTER `merchquotout_isclose`;
ALTER TABLE `trn_merchquotout` ADD COLUMN IF NOT EXISTS  `merchquotout_closedate` datetime   AFTER `merchquotout_closeby`;


ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `unit_id` varchar(10)   AFTER `merchquotout_id`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_descr` varchar(90)   AFTER `unit_id`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_dt` date NOT NULL  AFTER `merchquotout_descr`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_dtvalid` date NOT NULL  AFTER `merchquotout_dt`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `orderintype_id` varchar(10)   AFTER `merchquotout_dtvalid`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `partner_id` varchar(30)   AFTER `orderintype_id`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `ae_empl_id` varchar(14)   AFTER `partner_id`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `project_id` varchar(30)   AFTER `ae_empl_id`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `sales_dept_id` varchar(30) NOT NULL  AFTER `project_id`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `sales_dept_id`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `orderin_ishasdp` tinyint(1) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `orderin_dpvalue` decimal(4, 2) NOT NULL DEFAULT 0 AFTER `orderin_ishasdp`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `ppn_taxtype_id` varchar(10)   AFTER `orderin_dpvalue`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `ppn_taxvalue` decimal(4, 2) NOT NULL DEFAULT 0 AFTER `ppn_taxtype_id`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `ppn_include` tinyint(1) NOT NULL DEFAULT 0 AFTER `ppn_taxvalue`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_totalitem` int(5) NOT NULL DEFAULT 0 AFTER `ppn_include`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_totalqty` int(5) NOT NULL DEFAULT 0 AFTER `merchquotout_totalitem`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_salesgross` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_totalqty`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_discount` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_salesgross`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_subtotal` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_discount`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_nett` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_subtotal`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_ppn` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_nett`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_total` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_ppn`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_totaladdcost` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_total`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_payment` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_totaladdcost`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotoutitem_estgp` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchquotout_payment`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotoutitem_estgppercent` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_estgp`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `doc_id` varchar(30) NOT NULL  AFTER `merchquotoutitem_estgppercent`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_version` int(4) NOT NULL DEFAULT 0 AFTER `doc_id`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotout_version`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotout_iscommit`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotout_isapprovalprogress`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotout_isapproved`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_commitby` varchar(14)   AFTER `merchquotout_isdeclined`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_commitdate` datetime   AFTER `merchquotout_commitby`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_approveby` varchar(14)   AFTER `merchquotout_commitdate`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_approvedate` datetime   AFTER `merchquotout_approveby`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_declineby` varchar(14)   AFTER `merchquotout_approvedate`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_declinedate` datetime   AFTER `merchquotout_declineby`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_isclose` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotout_declinedate`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_closeby` varchar(14)   AFTER `merchquotout_isclose`;
ALTER TABLE `trn_merchquotout` MODIFY COLUMN IF EXISTS  `merchquotout_closedate` datetime   AFTER `merchquotout_closeby`;



ALTER TABLE `trn_merchquotout` ADD KEY IF NOT EXISTS `unit_id` (`unit_id`);
ALTER TABLE `trn_merchquotout` ADD KEY IF NOT EXISTS `orderintype_id` (`orderintype_id`);
ALTER TABLE `trn_merchquotout` ADD KEY IF NOT EXISTS `partner_id` (`partner_id`);
ALTER TABLE `trn_merchquotout` ADD KEY IF NOT EXISTS `ae_empl_id` (`ae_empl_id`);
ALTER TABLE `trn_merchquotout` ADD KEY IF NOT EXISTS `project_id` (`project_id`);
ALTER TABLE `trn_merchquotout` ADD KEY IF NOT EXISTS `sales_dept_id` (`sales_dept_id`);
ALTER TABLE `trn_merchquotout` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `trn_merchquotout` ADD KEY IF NOT EXISTS `ppn_taxtype_id` (`ppn_taxtype_id`);
ALTER TABLE `trn_merchquotout` ADD KEY IF NOT EXISTS `doc_id` (`doc_id`);

ALTER TABLE `trn_merchquotout` ADD CONSTRAINT `fk_trn_merchquotout_mst_unit` FOREIGN KEY IF NOT EXISTS  (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `trn_merchquotout` ADD CONSTRAINT `fk_trn_merchquotout_mst_orderintype` FOREIGN KEY IF NOT EXISTS  (`orderintype_id`) REFERENCES `mst_orderintype` (`orderintype_id`);
ALTER TABLE `trn_merchquotout` ADD CONSTRAINT `fk_trn_merchquotout_mst_partner` FOREIGN KEY IF NOT EXISTS  (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_merchquotout` ADD CONSTRAINT `fk_trn_merchquotout_mst_empl` FOREIGN KEY IF NOT EXISTS  (`ae_empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `trn_merchquotout` ADD CONSTRAINT `fk_trn_merchquotout_mst_project` FOREIGN KEY IF NOT EXISTS  (`project_id`) REFERENCES `mst_project` (`project_id`);
ALTER TABLE `trn_merchquotout` ADD CONSTRAINT `fk_trn_merchquotout_mst_dept` FOREIGN KEY IF NOT EXISTS  (`sales_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_merchquotout` ADD CONSTRAINT `fk_trn_merchquotout_mst_dept_2` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_merchquotout` ADD CONSTRAINT `fk_trn_merchquotout_mst_taxtype` FOREIGN KEY IF NOT EXISTS  (`ppn_taxtype_id`) REFERENCES `mst_taxtype` (`taxtype_id`);
ALTER TABLE `trn_merchquotout` ADD CONSTRAINT `fk_trn_merchquotout_mst_doc` FOREIGN KEY IF NOT EXISTS  (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE IF NOT EXISTS `trn_merchquotoutitem` (
	`merchquotoutitem_id` varchar(14) NOT NULL , 
	`merchitem_id` varchar(14)  , 
	`merchitem_art` varchar(30)  , 
	`merchitem_mat` varchar(30)  , 
	`merchitem_col` varchar(30)  , 
	`merchitem_size` varchar(30)  , 
	`merchitem_name` varchar(255)  , 
	`merchquotoutitem_qty` int(4) NOT NULL DEFAULT 0, 
	`merchquotoutitem_price` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchquotoutitem_pricediscpercent` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchquotoutitem_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0, 
	`merchquotoutitem_pricediscvalue` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchquotoutitem_subtotal` decimal(14, 0) NOT NULL DEFAULT 0, 
	`merchquotoutitem_estgp` decimal(14, 0) NOT NULL DEFAULT 0, 
	`merchquotoutitem_estgppercent` decimal(5, 2) NOT NULL DEFAULT 0, 
	`merchitemctg_id` varchar(30)  , 
	`merchsea_id` varchar(10)  , 
	`brand_id` varchar(14)  , 
	`itemclass_id` varchar(14)  , 
	`merchitem_picture` varchar(90)  , 
	`merchitem_priceori` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchitem_price` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchitem_pricediscpercent` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchitem_pricediscvalue` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchitem_cogs` decimal(14, 0) NOT NULL DEFAULT 0, 
	`merchitem_saldo` int(4) NOT NULL DEFAULT 0, 
	`merchitem_saldodt` date NOT NULL , 
	`merchitem_lastrv` varchar(30)  , 
	`merchitem_lastrvdt` date NOT NULL , 
	`merchquotout_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchquotoutitem_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar item quotation';


ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_id` varchar(14)   AFTER `merchquotoutitem_id`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_art` varchar(30)   AFTER `merchitem_id`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_mat` varchar(30)   AFTER `merchitem_art`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_col` varchar(30)   AFTER `merchitem_mat`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_size` varchar(30)   AFTER `merchitem_col`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_name` varchar(255)   AFTER `merchitem_size`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_qty` int(4) NOT NULL DEFAULT 0 AFTER `merchitem_name`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_price` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_qty`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_pricediscpercent` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_price`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_pricediscpercent`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_pricediscvalue` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_isdiscvalue`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_subtotal` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_pricediscvalue`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_estgp` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_subtotal`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_estgppercent` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_estgp`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchitemctg_id` varchar(30)   AFTER `merchquotoutitem_estgppercent`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchsea_id` varchar(10)   AFTER `merchitemctg_id`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `brand_id` varchar(14)   AFTER `merchsea_id`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `itemclass_id` varchar(14)   AFTER `brand_id`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_picture` varchar(90)   AFTER `itemclass_id`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_priceori` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchitem_picture`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_price` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchitem_priceori`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_pricediscpercent` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchitem_price`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_pricediscvalue` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchitem_pricediscpercent`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_cogs` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchitem_pricediscvalue`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_saldo` int(4) NOT NULL DEFAULT 0 AFTER `merchitem_cogs`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_saldodt` date NOT NULL  AFTER `merchitem_saldo`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_lastrv` varchar(30)   AFTER `merchitem_saldodt`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_lastrvdt` date NOT NULL  AFTER `merchitem_lastrv`;
ALTER TABLE `trn_merchquotoutitem` ADD COLUMN IF NOT EXISTS  `merchquotout_id` varchar(30) NOT NULL  AFTER `merchitem_lastrvdt`;


ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchitem_id` varchar(14)   AFTER `merchquotoutitem_id`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchitem_art` varchar(30)   AFTER `merchitem_id`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchitem_mat` varchar(30)   AFTER `merchitem_art`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchitem_col` varchar(30)   AFTER `merchitem_mat`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchitem_size` varchar(30)   AFTER `merchitem_col`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchitem_name` varchar(255)   AFTER `merchitem_size`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchquotoutitem_qty` int(4) NOT NULL DEFAULT 0 AFTER `merchitem_name`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchquotoutitem_price` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_qty`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchquotoutitem_pricediscpercent` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_price`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchquotoutitem_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_pricediscpercent`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchquotoutitem_pricediscvalue` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_isdiscvalue`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchquotoutitem_subtotal` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_pricediscvalue`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchquotoutitem_estgp` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_subtotal`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchquotoutitem_estgppercent` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_estgp`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchitemctg_id` varchar(30)   AFTER `merchquotoutitem_estgppercent`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchsea_id` varchar(10)   AFTER `merchitemctg_id`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `brand_id` varchar(14)   AFTER `merchsea_id`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `itemclass_id` varchar(14)   AFTER `brand_id`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchitem_picture` varchar(90)   AFTER `itemclass_id`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchitem_priceori` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchitem_picture`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchitem_price` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchitem_priceori`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchitem_pricediscpercent` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchitem_price`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchitem_pricediscvalue` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchitem_pricediscpercent`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchitem_cogs` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchitem_pricediscvalue`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchitem_saldo` int(4) NOT NULL DEFAULT 0 AFTER `merchitem_cogs`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchitem_saldodt` date NOT NULL  AFTER `merchitem_saldo`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchitem_lastrv` varchar(30)   AFTER `merchitem_saldodt`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchitem_lastrvdt` date NOT NULL  AFTER `merchitem_lastrv`;
ALTER TABLE `trn_merchquotoutitem` MODIFY COLUMN IF EXISTS  `merchquotout_id` varchar(30) NOT NULL  AFTER `merchitem_lastrvdt`;



ALTER TABLE `trn_merchquotoutitem` ADD KEY IF NOT EXISTS `merchitem_id` (`merchitem_id`);
ALTER TABLE `trn_merchquotoutitem` ADD KEY IF NOT EXISTS `merchitemctg_id` (`merchitemctg_id`);
ALTER TABLE `trn_merchquotoutitem` ADD KEY IF NOT EXISTS `merchsea_id` (`merchsea_id`);
ALTER TABLE `trn_merchquotoutitem` ADD KEY IF NOT EXISTS `brand_id` (`brand_id`);
ALTER TABLE `trn_merchquotoutitem` ADD KEY IF NOT EXISTS `itemclass_id` (`itemclass_id`);
ALTER TABLE `trn_merchquotoutitem` ADD KEY IF NOT EXISTS `merchquotout_id` (`merchquotout_id`);

ALTER TABLE `trn_merchquotoutitem` ADD CONSTRAINT `fk_trn_merchquotoutitem_mst_merchitem` FOREIGN KEY IF NOT EXISTS  (`merchitem_id`) REFERENCES `mst_merchitem` (`merchitem_id`);
ALTER TABLE `trn_merchquotoutitem` ADD CONSTRAINT `fk_trn_merchquotoutitem_mst_merchitemctg` FOREIGN KEY IF NOT EXISTS  (`merchitemctg_id`) REFERENCES `mst_merchitemctg` (`merchitemctg_id`);
ALTER TABLE `trn_merchquotoutitem` ADD CONSTRAINT `fk_trn_merchquotoutitem_mst_merchsea` FOREIGN KEY IF NOT EXISTS  (`merchsea_id`) REFERENCES `mst_merchsea` (`merchsea_id`);
ALTER TABLE `trn_merchquotoutitem` ADD CONSTRAINT `fk_trn_merchquotoutitem_mst_brand` FOREIGN KEY IF NOT EXISTS  (`brand_id`) REFERENCES `mst_brand` (`brand_id`);
ALTER TABLE `trn_merchquotoutitem` ADD CONSTRAINT `fk_trn_merchquotoutitem_mst_itemclass` FOREIGN KEY IF NOT EXISTS  (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `trn_merchquotoutitem` ADD CONSTRAINT `fk_trn_merchquotoutitem_trn_merchquotout` FOREIGN KEY IF NOT EXISTS (`merchquotout_id`) REFERENCES `trn_merchquotout` (`merchquotout_id`);





CREATE TABLE IF NOT EXISTS `trn_merchquotoutterm` (
	`merchquotoutterm_id` varchar(14) NOT NULL , 
	`merchquotoutterm_descr` varchar(255)  , 
	`merchquotoutterm_days` int(4) NOT NULL DEFAULT 0, 
	`merchquotoutterm_isdp` tinyint(1) NOT NULL DEFAULT 0, 
	`merchquotoutterm_paymentpercent` decimal(3, 0) NOT NULL DEFAULT 0, 
	`merchquotout_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchquotoutterm_id`)
) 
ENGINE=InnoDB
COMMENT='Term permbayaran orderin';


ALTER TABLE `trn_merchquotoutterm` ADD COLUMN IF NOT EXISTS  `merchquotoutterm_descr` varchar(255)   AFTER `merchquotoutterm_id`;
ALTER TABLE `trn_merchquotoutterm` ADD COLUMN IF NOT EXISTS  `merchquotoutterm_days` int(4) NOT NULL DEFAULT 0 AFTER `merchquotoutterm_descr`;
ALTER TABLE `trn_merchquotoutterm` ADD COLUMN IF NOT EXISTS  `merchquotoutterm_isdp` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotoutterm_days`;
ALTER TABLE `trn_merchquotoutterm` ADD COLUMN IF NOT EXISTS  `merchquotoutterm_paymentpercent` decimal(3, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutterm_isdp`;
ALTER TABLE `trn_merchquotoutterm` ADD COLUMN IF NOT EXISTS  `merchquotout_id` varchar(30) NOT NULL  AFTER `merchquotoutterm_paymentpercent`;


ALTER TABLE `trn_merchquotoutterm` MODIFY COLUMN IF EXISTS  `merchquotoutterm_descr` varchar(255)   AFTER `merchquotoutterm_id`;
ALTER TABLE `trn_merchquotoutterm` MODIFY COLUMN IF EXISTS  `merchquotoutterm_days` int(4) NOT NULL DEFAULT 0 AFTER `merchquotoutterm_descr`;
ALTER TABLE `trn_merchquotoutterm` MODIFY COLUMN IF EXISTS  `merchquotoutterm_isdp` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotoutterm_days`;
ALTER TABLE `trn_merchquotoutterm` MODIFY COLUMN IF EXISTS  `merchquotoutterm_paymentpercent` decimal(3, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutterm_isdp`;
ALTER TABLE `trn_merchquotoutterm` MODIFY COLUMN IF EXISTS  `merchquotout_id` varchar(30) NOT NULL  AFTER `merchquotoutterm_paymentpercent`;



ALTER TABLE `trn_merchquotoutterm` ADD KEY IF NOT EXISTS `merchquotout_id` (`merchquotout_id`);

ALTER TABLE `trn_merchquotoutterm` ADD CONSTRAINT `fk_trn_merchquotoutterm_trn_merchquotout` FOREIGN KEY IF NOT EXISTS (`merchquotout_id`) REFERENCES `trn_merchquotout` (`merchquotout_id`);





CREATE TABLE IF NOT EXISTS `trn_merchquotoutappr` (
	`merchquotoutappr_id` varchar(14) NOT NULL , 
	`merchquotoutappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`merchquotoutappr_by` varchar(14)  , 
	`merchquotoutappr_date` datetime  , 
	`merchquotout_version` int(4) NOT NULL DEFAULT 0, 
	`merchquotoutappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`merchquotoutappr_declinedby` varchar(14)  , 
	`merchquotoutappr_declineddate` datetime  , 
	`merchquotoutappr_notes` varchar(255)  , 
	`merchquotout_id` varchar(30) NOT NULL , 
	`docauth_descr` varchar(90)  , 
	`docauth_order` int(4) NOT NULL DEFAULT 0, 
	`docauth_value` int(4) NOT NULL DEFAULT 100, 
	`docauth_min` int(4) NOT NULL DEFAULT 0, 
	`authlevel_id` varchar(10) NOT NULL , 
	`authlevel_name` varchar(60) NOT NULL , 
	`auth_id` varchar(10)  , 
	`auth_name` varchar(60) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchquotout_auth_id` (`merchquotout_id`, `auth_id`),
	PRIMARY KEY (`merchquotoutappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval Quotation';


ALTER TABLE `trn_merchquotoutappr` ADD COLUMN IF NOT EXISTS  `merchquotoutappr_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotoutappr_id`;
ALTER TABLE `trn_merchquotoutappr` ADD COLUMN IF NOT EXISTS  `merchquotoutappr_by` varchar(14)   AFTER `merchquotoutappr_isapproved`;
ALTER TABLE `trn_merchquotoutappr` ADD COLUMN IF NOT EXISTS  `merchquotoutappr_date` datetime   AFTER `merchquotoutappr_by`;
ALTER TABLE `trn_merchquotoutappr` ADD COLUMN IF NOT EXISTS  `merchquotout_version` int(4) NOT NULL DEFAULT 0 AFTER `merchquotoutappr_date`;
ALTER TABLE `trn_merchquotoutappr` ADD COLUMN IF NOT EXISTS  `merchquotoutappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotout_version`;
ALTER TABLE `trn_merchquotoutappr` ADD COLUMN IF NOT EXISTS  `merchquotoutappr_declinedby` varchar(14)   AFTER `merchquotoutappr_isdeclined`;
ALTER TABLE `trn_merchquotoutappr` ADD COLUMN IF NOT EXISTS  `merchquotoutappr_declineddate` datetime   AFTER `merchquotoutappr_declinedby`;
ALTER TABLE `trn_merchquotoutappr` ADD COLUMN IF NOT EXISTS  `merchquotoutappr_notes` varchar(255)   AFTER `merchquotoutappr_declineddate`;
ALTER TABLE `trn_merchquotoutappr` ADD COLUMN IF NOT EXISTS  `merchquotout_id` varchar(30) NOT NULL  AFTER `merchquotoutappr_notes`;
ALTER TABLE `trn_merchquotoutappr` ADD COLUMN IF NOT EXISTS  `docauth_descr` varchar(90)   AFTER `merchquotout_id`;
ALTER TABLE `trn_merchquotoutappr` ADD COLUMN IF NOT EXISTS  `docauth_order` int(4) NOT NULL DEFAULT 0 AFTER `docauth_descr`;
ALTER TABLE `trn_merchquotoutappr` ADD COLUMN IF NOT EXISTS  `docauth_value` int(4) NOT NULL DEFAULT 100 AFTER `docauth_order`;
ALTER TABLE `trn_merchquotoutappr` ADD COLUMN IF NOT EXISTS  `docauth_min` int(4) NOT NULL DEFAULT 0 AFTER `docauth_value`;
ALTER TABLE `trn_merchquotoutappr` ADD COLUMN IF NOT EXISTS  `authlevel_id` varchar(10) NOT NULL  AFTER `docauth_min`;
ALTER TABLE `trn_merchquotoutappr` ADD COLUMN IF NOT EXISTS  `authlevel_name` varchar(60) NOT NULL  AFTER `authlevel_id`;
ALTER TABLE `trn_merchquotoutappr` ADD COLUMN IF NOT EXISTS  `auth_id` varchar(10)   AFTER `authlevel_name`;
ALTER TABLE `trn_merchquotoutappr` ADD COLUMN IF NOT EXISTS  `auth_name` varchar(60) NOT NULL  AFTER `auth_id`;


ALTER TABLE `trn_merchquotoutappr` MODIFY COLUMN IF EXISTS  `merchquotoutappr_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotoutappr_id`;
ALTER TABLE `trn_merchquotoutappr` MODIFY COLUMN IF EXISTS  `merchquotoutappr_by` varchar(14)   AFTER `merchquotoutappr_isapproved`;
ALTER TABLE `trn_merchquotoutappr` MODIFY COLUMN IF EXISTS  `merchquotoutappr_date` datetime   AFTER `merchquotoutappr_by`;
ALTER TABLE `trn_merchquotoutappr` MODIFY COLUMN IF EXISTS  `merchquotout_version` int(4) NOT NULL DEFAULT 0 AFTER `merchquotoutappr_date`;
ALTER TABLE `trn_merchquotoutappr` MODIFY COLUMN IF EXISTS  `merchquotoutappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotout_version`;
ALTER TABLE `trn_merchquotoutappr` MODIFY COLUMN IF EXISTS  `merchquotoutappr_declinedby` varchar(14)   AFTER `merchquotoutappr_isdeclined`;
ALTER TABLE `trn_merchquotoutappr` MODIFY COLUMN IF EXISTS  `merchquotoutappr_declineddate` datetime   AFTER `merchquotoutappr_declinedby`;
ALTER TABLE `trn_merchquotoutappr` MODIFY COLUMN IF EXISTS  `merchquotoutappr_notes` varchar(255)   AFTER `merchquotoutappr_declineddate`;
ALTER TABLE `trn_merchquotoutappr` MODIFY COLUMN IF EXISTS  `merchquotout_id` varchar(30) NOT NULL  AFTER `merchquotoutappr_notes`;
ALTER TABLE `trn_merchquotoutappr` MODIFY COLUMN IF EXISTS  `docauth_descr` varchar(90)   AFTER `merchquotout_id`;
ALTER TABLE `trn_merchquotoutappr` MODIFY COLUMN IF EXISTS  `docauth_order` int(4) NOT NULL DEFAULT 0 AFTER `docauth_descr`;
ALTER TABLE `trn_merchquotoutappr` MODIFY COLUMN IF EXISTS  `docauth_value` int(4) NOT NULL DEFAULT 100 AFTER `docauth_order`;
ALTER TABLE `trn_merchquotoutappr` MODIFY COLUMN IF EXISTS  `docauth_min` int(4) NOT NULL DEFAULT 0 AFTER `docauth_value`;
ALTER TABLE `trn_merchquotoutappr` MODIFY COLUMN IF EXISTS  `authlevel_id` varchar(10) NOT NULL  AFTER `docauth_min`;
ALTER TABLE `trn_merchquotoutappr` MODIFY COLUMN IF EXISTS  `authlevel_name` varchar(60) NOT NULL  AFTER `authlevel_id`;
ALTER TABLE `trn_merchquotoutappr` MODIFY COLUMN IF EXISTS  `auth_id` varchar(10)   AFTER `authlevel_name`;
ALTER TABLE `trn_merchquotoutappr` MODIFY COLUMN IF EXISTS  `auth_name` varchar(60) NOT NULL  AFTER `auth_id`;


ALTER TABLE `trn_merchquotoutappr` ADD CONSTRAINT `merchquotout_auth_id` UNIQUE IF NOT EXISTS  (`merchquotout_id`, `auth_id`);

ALTER TABLE `trn_merchquotoutappr` ADD KEY IF NOT EXISTS `merchquotout_id` (`merchquotout_id`);

ALTER TABLE `trn_merchquotoutappr` ADD CONSTRAINT `fk_trn_merchquotoutappr_trn_merchquotout` FOREIGN KEY IF NOT EXISTS (`merchquotout_id`) REFERENCES `trn_merchquotout` (`merchquotout_id`);





