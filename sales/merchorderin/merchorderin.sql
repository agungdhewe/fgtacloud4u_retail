-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_merchorderin`;
-- drop table if exists `trn_merchorderinitem`;
-- drop table if exists `trn_merchorderinterm`;
-- drop table if exists `trn_merchorderinappr`;


CREATE TABLE IF NOT EXISTS `trn_merchorderin` (
	`merchorderin_id` varchar(30) NOT NULL , 
	`unit_id` varchar(10)  , 
	`owner_dept_id` varchar(30) NOT NULL , 
	`partner_id` varchar(30)  , 
	`merchquotout_id` varchar(30)  , 
	`orderin_isunreferenced` tinyint(1) NOT NULL DEFAULT 0, 
	`orderintype_id` varchar(10)  , 
	`merchorderin_ref` varchar(90)  , 
	`merchorderin_descr` varchar(255)  , 
	`merchorderin_dt` date NOT NULL , 
	`merchorderin_dteta` date NOT NULL , 
	`ae_empl_id` varchar(14)  , 
	`project_id` varchar(30)  , 
	`merchorderin_totalqty` int(5) NOT NULL DEFAULT 0, 
	`merchorderin_total` decimal(16, 0) NOT NULL DEFAULT 0, 
	`orderin_ishasdp` tinyint(1) NOT NULL DEFAULT 0, 
	`orderin_dpvalue` decimal(4, 2) NOT NULL DEFAULT 0, 
	`ppn_taxtype_id` varchar(10)  , 
	`ppn_taxvalue` decimal(4, 2) NOT NULL DEFAULT 0, 
	`ppn_include` tinyint(1) NOT NULL DEFAULT 0, 
	`arunbill_coa_id` varchar(17) NOT NULL , 
	`ar_coa_id` varchar(17) NOT NULL , 
	`dp_coa_id` varchar(17) NOT NULL , 
	`sales_coa_id` varchar(10) NOT NULL , 
	`salesdisc_coa_id` varchar(10)  , 
	`ppn_coa_id` varchar(10)  , 
	`ppnsubsidi_coa_id` varchar(10)  , 
	`merchorderin_totalitem` int(5) NOT NULL DEFAULT 0, 
	`merchorderin_salesgross` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchorderin_discount` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchorderin_subtotal` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchorderin_pph` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchorderin_nett` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchorderin_ppn` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchorderin_totaladdcost` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchorderin_payment` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchorderin_estgp` decimal(14, 0) NOT NULL DEFAULT 0, 
	`merchorderin_estgppercent` decimal(5, 2) NOT NULL DEFAULT 0, 
	`dept_id` varchar(30) NOT NULL , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`doc_id` varchar(30) NOT NULL , 
	`merchorderin_version` int(4) NOT NULL DEFAULT 0, 
	`merchorderin_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`merchorderin_commitby` varchar(14)  , 
	`merchorderin_commitdate` datetime  , 
	`merchorderin_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`merchorderin_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`merchorderin_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`merchorderin_approveby` varchar(14)  , 
	`merchorderin_approvedate` datetime  , 
	`merchorderin_declineby` varchar(14)  , 
	`merchorderin_declinedate` datetime  , 
	`merchorderin_isclose` tinyint(1) NOT NULL DEFAULT 0, 
	`merchorderin_closeby` varchar(14)  , 
	`merchorderin_closedate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchorderin_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Order Masuk Merchandise';


ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(10)   AFTER `merchorderin_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `owner_dept_id` varchar(30) NOT NULL  AFTER `unit_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(30)   AFTER `owner_dept_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchquotout_id` varchar(30)   AFTER `partner_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `orderin_isunreferenced` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotout_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `orderintype_id` varchar(10)   AFTER `orderin_isunreferenced`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_ref` varchar(90)   AFTER `orderintype_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_descr` varchar(255)   AFTER `merchorderin_ref`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_dt` date NOT NULL  AFTER `merchorderin_descr`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_dteta` date NOT NULL  AFTER `merchorderin_dt`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `ae_empl_id` varchar(14)   AFTER `merchorderin_dteta`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `project_id` varchar(30)   AFTER `ae_empl_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_totalqty` int(5) NOT NULL DEFAULT 0 AFTER `project_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_total` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_totalqty`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `orderin_ishasdp` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderin_total`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `orderin_dpvalue` decimal(4, 2) NOT NULL DEFAULT 0 AFTER `orderin_ishasdp`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `ppn_taxtype_id` varchar(10)   AFTER `orderin_dpvalue`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `ppn_taxvalue` decimal(4, 2) NOT NULL DEFAULT 0 AFTER `ppn_taxtype_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `ppn_include` tinyint(1) NOT NULL DEFAULT 0 AFTER `ppn_taxvalue`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `arunbill_coa_id` varchar(17) NOT NULL  AFTER `ppn_include`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `ar_coa_id` varchar(17) NOT NULL  AFTER `arunbill_coa_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `dp_coa_id` varchar(17) NOT NULL  AFTER `ar_coa_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `sales_coa_id` varchar(10) NOT NULL  AFTER `dp_coa_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `salesdisc_coa_id` varchar(10)   AFTER `sales_coa_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `ppn_coa_id` varchar(10)   AFTER `salesdisc_coa_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `ppnsubsidi_coa_id` varchar(10)   AFTER `ppn_coa_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_totalitem` int(5) NOT NULL DEFAULT 0 AFTER `ppnsubsidi_coa_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_salesgross` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_totalitem`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_discount` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_salesgross`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_subtotal` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_discount`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_pph` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_subtotal`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_nett` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_pph`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_ppn` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_nett`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_totaladdcost` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_ppn`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_payment` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_totaladdcost`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_estgp` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_payment`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_estgppercent` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `merchorderin_estgp`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `merchorderin_estgppercent`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `trxmodel_id` varchar(10) NOT NULL  AFTER `dept_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `doc_id` varchar(30) NOT NULL  AFTER `trxmodel_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_version` int(4) NOT NULL DEFAULT 0 AFTER `doc_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderin_version`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_commitby` varchar(14)   AFTER `merchorderin_iscommit`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_commitdate` datetime   AFTER `merchorderin_commitby`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderin_commitdate`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderin_isapprovalprogress`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderin_isapproved`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_approveby` varchar(14)   AFTER `merchorderin_isdeclined`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_approvedate` datetime   AFTER `merchorderin_approveby`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_declineby` varchar(14)   AFTER `merchorderin_approvedate`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_declinedate` datetime   AFTER `merchorderin_declineby`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_isclose` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderin_declinedate`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_closeby` varchar(14)   AFTER `merchorderin_isclose`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_closedate` datetime   AFTER `merchorderin_closeby`;


ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `unit_id` varchar(10)   AFTER `merchorderin_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `owner_dept_id` varchar(30) NOT NULL  AFTER `unit_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `partner_id` varchar(30)   AFTER `owner_dept_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchquotout_id` varchar(30)   AFTER `partner_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `orderin_isunreferenced` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotout_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `orderintype_id` varchar(10)   AFTER `orderin_isunreferenced`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_ref` varchar(90)   AFTER `orderintype_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_descr` varchar(255)   AFTER `merchorderin_ref`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_dt` date NOT NULL  AFTER `merchorderin_descr`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_dteta` date NOT NULL  AFTER `merchorderin_dt`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `ae_empl_id` varchar(14)   AFTER `merchorderin_dteta`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `project_id` varchar(30)   AFTER `ae_empl_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_totalqty` int(5) NOT NULL DEFAULT 0 AFTER `project_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_total` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_totalqty`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `orderin_ishasdp` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderin_total`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `orderin_dpvalue` decimal(4, 2) NOT NULL DEFAULT 0 AFTER `orderin_ishasdp`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `ppn_taxtype_id` varchar(10)   AFTER `orderin_dpvalue`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `ppn_taxvalue` decimal(4, 2) NOT NULL DEFAULT 0 AFTER `ppn_taxtype_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `ppn_include` tinyint(1) NOT NULL DEFAULT 0 AFTER `ppn_taxvalue`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `arunbill_coa_id` varchar(17) NOT NULL  AFTER `ppn_include`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `ar_coa_id` varchar(17) NOT NULL  AFTER `arunbill_coa_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `dp_coa_id` varchar(17) NOT NULL  AFTER `ar_coa_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `sales_coa_id` varchar(10) NOT NULL  AFTER `dp_coa_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `salesdisc_coa_id` varchar(10)   AFTER `sales_coa_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `ppn_coa_id` varchar(10)   AFTER `salesdisc_coa_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `ppnsubsidi_coa_id` varchar(10)   AFTER `ppn_coa_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_totalitem` int(5) NOT NULL DEFAULT 0 AFTER `ppnsubsidi_coa_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_salesgross` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_totalitem`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_discount` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_salesgross`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_subtotal` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_discount`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_pph` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_subtotal`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_nett` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_pph`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_ppn` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_nett`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_totaladdcost` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_ppn`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_payment` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_totaladdcost`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_estgp` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchorderin_payment`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_estgppercent` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `merchorderin_estgp`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `merchorderin_estgppercent`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `trxmodel_id` varchar(10) NOT NULL  AFTER `dept_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `doc_id` varchar(30) NOT NULL  AFTER `trxmodel_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_version` int(4) NOT NULL DEFAULT 0 AFTER `doc_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderin_version`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_commitby` varchar(14)   AFTER `merchorderin_iscommit`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_commitdate` datetime   AFTER `merchorderin_commitby`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderin_commitdate`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderin_isapprovalprogress`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderin_isapproved`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_approveby` varchar(14)   AFTER `merchorderin_isdeclined`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_approvedate` datetime   AFTER `merchorderin_approveby`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_declineby` varchar(14)   AFTER `merchorderin_approvedate`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_declinedate` datetime   AFTER `merchorderin_declineby`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_isclose` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderin_declinedate`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_closeby` varchar(14)   AFTER `merchorderin_isclose`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_closedate` datetime   AFTER `merchorderin_closeby`;



ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `unit_id` (`unit_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `owner_dept_id` (`owner_dept_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `partner_id` (`partner_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `merchquotout_id` (`merchquotout_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `orderintype_id` (`orderintype_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `ae_empl_id` (`ae_empl_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `project_id` (`project_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `ppn_taxtype_id` (`ppn_taxtype_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `arunbill_coa_id` (`arunbill_coa_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `ar_coa_id` (`ar_coa_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `dp_coa_id` (`dp_coa_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `sales_coa_id` (`sales_coa_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `salesdisc_coa_id` (`salesdisc_coa_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `ppn_coa_id` (`ppn_coa_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `ppnsubsidi_coa_id` (`ppnsubsidi_coa_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `trxmodel_id` (`trxmodel_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `doc_id` (`doc_id`);

ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_unit` FOREIGN KEY IF NOT EXISTS  (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_dept` FOREIGN KEY IF NOT EXISTS  (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_partner` FOREIGN KEY IF NOT EXISTS  (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_trn_merchquotout` FOREIGN KEY IF NOT EXISTS  (`merchquotout_id`) REFERENCES `trn_merchquotout` (`merchquotout_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_orderintype` FOREIGN KEY IF NOT EXISTS  (`orderintype_id`) REFERENCES `mst_orderintype` (`orderintype_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_empl` FOREIGN KEY IF NOT EXISTS  (`ae_empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_project` FOREIGN KEY IF NOT EXISTS  (`project_id`) REFERENCES `mst_project` (`project_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_taxtype` FOREIGN KEY IF NOT EXISTS  (`ppn_taxtype_id`) REFERENCES `mst_taxtype` (`taxtype_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_coa` FOREIGN KEY IF NOT EXISTS  (`arunbill_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_coa_2` FOREIGN KEY IF NOT EXISTS  (`ar_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_coa_3` FOREIGN KEY IF NOT EXISTS  (`dp_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_coa_4` FOREIGN KEY IF NOT EXISTS  (`sales_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_coa_5` FOREIGN KEY IF NOT EXISTS  (`salesdisc_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_coa_6` FOREIGN KEY IF NOT EXISTS  (`ppn_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_coa_7` FOREIGN KEY IF NOT EXISTS  (`ppnsubsidi_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_dept_2` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_trxmodel` FOREIGN KEY IF NOT EXISTS  (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_doc` FOREIGN KEY IF NOT EXISTS  (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE IF NOT EXISTS `trn_merchorderinitem` (
	`merchorderinitem_id` varchar(14) NOT NULL , 
	`merchitem_id` varchar(14)  , 
	`merchitem_art` varchar(30)  , 
	`merchitem_mat` varchar(30)  , 
	`merchitem_col` varchar(30)  , 
	`merchitem_size` varchar(30)  , 
	`merchitem_name` varchar(255)  , 
	`merchorderinitem_qty` int(4) NOT NULL DEFAULT 0, 
	`merchorderinitem_price` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchorderinitem_pricediscpercent` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchorderinitem_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0, 
	`merchorderinitem_pricediscvalue` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchorderinitem_subtotal` decimal(14, 0) NOT NULL DEFAULT 0, 
	`merchorderinitem_estgp` decimal(14, 0) NOT NULL DEFAULT 0, 
	`merchorderinitem_estgppercent` decimal(5, 2) NOT NULL DEFAULT 0, 
	`merchitemctg_id` varchar(30)  , 
	`merchsea_id` varchar(10)  , 
	`brand_id` varchar(14)  , 
	`itemclass_id` varchar(14)  , 
	`accbudget_id` varchar(20)  , 
	`coa_id` varchar(17)  , 
	`merchitem_picture` varchar(90)  , 
	`merchitem_priceori` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchitem_price` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchitem_pricediscpercent` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchitem_pricediscvalue` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchitem_cogs` decimal(14, 0) NOT NULL DEFAULT 0, 
	`merchquotoutitem_qty` int(4) NOT NULL DEFAULT 0, 
	`merchquotoutitem_price` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchquotoutitem_pricediscpercent` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchquotoutitem_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0, 
	`merchquotoutitem_pricediscvalue` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchquotoutitem_subtotal` decimal(14, 0) NOT NULL DEFAULT 0, 
	`merchquotoutitem_estgp` decimal(14, 0) NOT NULL DEFAULT 0, 
	`merchquotoutitem_estgppercent` decimal(5, 2) NOT NULL DEFAULT 0, 
	`merchitem_saldo` int(4) NOT NULL DEFAULT 0, 
	`merchitem_saldodt` date NOT NULL , 
	`merchitem_lastrv` varchar(30)  , 
	`merchitem_lastrvdt` date NOT NULL , 
	`merchorderin_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchorderinitem_id`)
) 
ENGINE=InnoDB
COMMENT='Item yang di request';


ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_id` varchar(14)   AFTER `merchorderinitem_id`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_art` varchar(30)   AFTER `merchitem_id`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_mat` varchar(30)   AFTER `merchitem_art`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_col` varchar(30)   AFTER `merchitem_mat`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_size` varchar(30)   AFTER `merchitem_col`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_name` varchar(255)   AFTER `merchitem_size`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchorderinitem_qty` int(4) NOT NULL DEFAULT 0 AFTER `merchitem_name`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchorderinitem_price` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchorderinitem_qty`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchorderinitem_pricediscpercent` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchorderinitem_price`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchorderinitem_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderinitem_pricediscpercent`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchorderinitem_pricediscvalue` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchorderinitem_isdiscvalue`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchorderinitem_subtotal` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchorderinitem_pricediscvalue`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchorderinitem_estgp` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchorderinitem_subtotal`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchorderinitem_estgppercent` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `merchorderinitem_estgp`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitemctg_id` varchar(30)   AFTER `merchorderinitem_estgppercent`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchsea_id` varchar(10)   AFTER `merchitemctg_id`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `brand_id` varchar(14)   AFTER `merchsea_id`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `itemclass_id` varchar(14)   AFTER `brand_id`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `accbudget_id` varchar(20)   AFTER `itemclass_id`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `coa_id` varchar(17)   AFTER `accbudget_id`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_picture` varchar(90)   AFTER `coa_id`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_priceori` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchitem_picture`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_price` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchitem_priceori`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_pricediscpercent` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchitem_price`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_pricediscvalue` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchitem_pricediscpercent`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_cogs` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchitem_pricediscvalue`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_qty` int(4) NOT NULL DEFAULT 0 AFTER `merchitem_cogs`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_price` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_qty`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_pricediscpercent` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_price`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_pricediscpercent`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_pricediscvalue` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_isdiscvalue`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_subtotal` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_pricediscvalue`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_estgp` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_subtotal`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchquotoutitem_estgppercent` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_estgp`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_saldo` int(4) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_estgppercent`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_saldodt` date NOT NULL  AFTER `merchitem_saldo`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_lastrv` varchar(30)   AFTER `merchitem_saldodt`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_lastrvdt` date NOT NULL  AFTER `merchitem_lastrv`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchorderin_id` varchar(30) NOT NULL  AFTER `merchitem_lastrvdt`;


ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_id` varchar(14)   AFTER `merchorderinitem_id`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_art` varchar(30)   AFTER `merchitem_id`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_mat` varchar(30)   AFTER `merchitem_art`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_col` varchar(30)   AFTER `merchitem_mat`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_size` varchar(30)   AFTER `merchitem_col`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_name` varchar(255)   AFTER `merchitem_size`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchorderinitem_qty` int(4) NOT NULL DEFAULT 0 AFTER `merchitem_name`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchorderinitem_price` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchorderinitem_qty`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchorderinitem_pricediscpercent` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchorderinitem_price`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchorderinitem_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderinitem_pricediscpercent`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchorderinitem_pricediscvalue` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchorderinitem_isdiscvalue`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchorderinitem_subtotal` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchorderinitem_pricediscvalue`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchorderinitem_estgp` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchorderinitem_subtotal`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchorderinitem_estgppercent` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `merchorderinitem_estgp`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitemctg_id` varchar(30)   AFTER `merchorderinitem_estgppercent`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchsea_id` varchar(10)   AFTER `merchitemctg_id`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `brand_id` varchar(14)   AFTER `merchsea_id`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `itemclass_id` varchar(14)   AFTER `brand_id`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `accbudget_id` varchar(20)   AFTER `itemclass_id`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `coa_id` varchar(17)   AFTER `accbudget_id`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_picture` varchar(90)   AFTER `coa_id`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_priceori` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchitem_picture`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_price` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchitem_priceori`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_pricediscpercent` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchitem_price`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_pricediscvalue` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchitem_pricediscpercent`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_cogs` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchitem_pricediscvalue`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchquotoutitem_qty` int(4) NOT NULL DEFAULT 0 AFTER `merchitem_cogs`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchquotoutitem_price` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_qty`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchquotoutitem_pricediscpercent` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_price`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchquotoutitem_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_pricediscpercent`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchquotoutitem_pricediscvalue` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_isdiscvalue`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchquotoutitem_subtotal` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_pricediscvalue`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchquotoutitem_estgp` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_subtotal`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchquotoutitem_estgppercent` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_estgp`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_saldo` int(4) NOT NULL DEFAULT 0 AFTER `merchquotoutitem_estgppercent`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_saldodt` date NOT NULL  AFTER `merchitem_saldo`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_lastrv` varchar(30)   AFTER `merchitem_saldodt`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_lastrvdt` date NOT NULL  AFTER `merchitem_lastrv`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchorderin_id` varchar(30) NOT NULL  AFTER `merchitem_lastrvdt`;



ALTER TABLE `trn_merchorderinitem` ADD KEY IF NOT EXISTS `merchitem_id` (`merchitem_id`);
ALTER TABLE `trn_merchorderinitem` ADD KEY IF NOT EXISTS `merchitemctg_id` (`merchitemctg_id`);
ALTER TABLE `trn_merchorderinitem` ADD KEY IF NOT EXISTS `merchsea_id` (`merchsea_id`);
ALTER TABLE `trn_merchorderinitem` ADD KEY IF NOT EXISTS `brand_id` (`brand_id`);
ALTER TABLE `trn_merchorderinitem` ADD KEY IF NOT EXISTS `itemclass_id` (`itemclass_id`);
ALTER TABLE `trn_merchorderinitem` ADD KEY IF NOT EXISTS `accbudget_id` (`accbudget_id`);
ALTER TABLE `trn_merchorderinitem` ADD KEY IF NOT EXISTS `coa_id` (`coa_id`);
ALTER TABLE `trn_merchorderinitem` ADD KEY IF NOT EXISTS `merchorderin_id` (`merchorderin_id`);

ALTER TABLE `trn_merchorderinitem` ADD CONSTRAINT `fk_trn_merchorderinitem_mst_merchitem` FOREIGN KEY IF NOT EXISTS  (`merchitem_id`) REFERENCES `mst_merchitem` (`merchitem_id`);
ALTER TABLE `trn_merchorderinitem` ADD CONSTRAINT `fk_trn_merchorderinitem_mst_merchitemctg` FOREIGN KEY IF NOT EXISTS  (`merchitemctg_id`) REFERENCES `mst_merchitemctg` (`merchitemctg_id`);
ALTER TABLE `trn_merchorderinitem` ADD CONSTRAINT `fk_trn_merchorderinitem_mst_merchsea` FOREIGN KEY IF NOT EXISTS  (`merchsea_id`) REFERENCES `mst_merchsea` (`merchsea_id`);
ALTER TABLE `trn_merchorderinitem` ADD CONSTRAINT `fk_trn_merchorderinitem_mst_brand` FOREIGN KEY IF NOT EXISTS  (`brand_id`) REFERENCES `mst_brand` (`brand_id`);
ALTER TABLE `trn_merchorderinitem` ADD CONSTRAINT `fk_trn_merchorderinitem_mst_itemclass` FOREIGN KEY IF NOT EXISTS  (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `trn_merchorderinitem` ADD CONSTRAINT `fk_trn_merchorderinitem_mst_accbudget` FOREIGN KEY IF NOT EXISTS  (`accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `trn_merchorderinitem` ADD CONSTRAINT `fk_trn_merchorderinitem_mst_coa` FOREIGN KEY IF NOT EXISTS  (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_merchorderinitem` ADD CONSTRAINT `fk_trn_merchorderinitem_trn_merchorderin` FOREIGN KEY IF NOT EXISTS (`merchorderin_id`) REFERENCES `trn_merchorderin` (`merchorderin_id`);





CREATE TABLE IF NOT EXISTS `trn_merchorderinterm` (
	`merchorderinterm_id` varchar(14) NOT NULL , 
	`orderintermtype_id` varchar(17)  , 
	`merchorderinterm_descr` varchar(255)  , 
	`merchorderinterm_days` int(4) NOT NULL DEFAULT 0, 
	`merchorderinterm_dtfrometa` date NOT NULL , 
	`merchorderinterm_dt` date NOT NULL , 
	`merchorderinterm_isdp` tinyint(1) NOT NULL DEFAULT 0, 
	`merchorderinterm_paymentpercent` decimal(3, 0) NOT NULL DEFAULT 0, 
	`merchorderinterm_payment` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchorderin_totalpayment` decimal(16, 0) NOT NULL DEFAULT 0, 
	`merchorderin_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `orderintermtype_id` (`merchorderin_id`, `orderintermtype_id`),
	PRIMARY KEY (`merchorderinterm_id`)
) 
ENGINE=InnoDB
COMMENT='Term permbayaran orderin';


ALTER TABLE `trn_merchorderinterm` ADD COLUMN IF NOT EXISTS  `orderintermtype_id` varchar(17)   AFTER `merchorderinterm_id`;
ALTER TABLE `trn_merchorderinterm` ADD COLUMN IF NOT EXISTS  `merchorderinterm_descr` varchar(255)   AFTER `orderintermtype_id`;
ALTER TABLE `trn_merchorderinterm` ADD COLUMN IF NOT EXISTS  `merchorderinterm_days` int(4) NOT NULL DEFAULT 0 AFTER `merchorderinterm_descr`;
ALTER TABLE `trn_merchorderinterm` ADD COLUMN IF NOT EXISTS  `merchorderinterm_dtfrometa` date NOT NULL  AFTER `merchorderinterm_days`;
ALTER TABLE `trn_merchorderinterm` ADD COLUMN IF NOT EXISTS  `merchorderinterm_dt` date NOT NULL  AFTER `merchorderinterm_dtfrometa`;
ALTER TABLE `trn_merchorderinterm` ADD COLUMN IF NOT EXISTS  `merchorderinterm_isdp` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderinterm_dt`;
ALTER TABLE `trn_merchorderinterm` ADD COLUMN IF NOT EXISTS  `merchorderinterm_paymentpercent` decimal(3, 0) NOT NULL DEFAULT 0 AFTER `merchorderinterm_isdp`;
ALTER TABLE `trn_merchorderinterm` ADD COLUMN IF NOT EXISTS  `merchorderinterm_payment` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderinterm_paymentpercent`;
ALTER TABLE `trn_merchorderinterm` ADD COLUMN IF NOT EXISTS  `merchorderin_totalpayment` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderinterm_payment`;
ALTER TABLE `trn_merchorderinterm` ADD COLUMN IF NOT EXISTS  `merchorderin_id` varchar(30) NOT NULL  AFTER `merchorderin_totalpayment`;


ALTER TABLE `trn_merchorderinterm` MODIFY COLUMN IF EXISTS  `orderintermtype_id` varchar(17)   AFTER `merchorderinterm_id`;
ALTER TABLE `trn_merchorderinterm` MODIFY COLUMN IF EXISTS  `merchorderinterm_descr` varchar(255)   AFTER `orderintermtype_id`;
ALTER TABLE `trn_merchorderinterm` MODIFY COLUMN IF EXISTS  `merchorderinterm_days` int(4) NOT NULL DEFAULT 0 AFTER `merchorderinterm_descr`;
ALTER TABLE `trn_merchorderinterm` MODIFY COLUMN IF EXISTS  `merchorderinterm_dtfrometa` date NOT NULL  AFTER `merchorderinterm_days`;
ALTER TABLE `trn_merchorderinterm` MODIFY COLUMN IF EXISTS  `merchorderinterm_dt` date NOT NULL  AFTER `merchorderinterm_dtfrometa`;
ALTER TABLE `trn_merchorderinterm` MODIFY COLUMN IF EXISTS  `merchorderinterm_isdp` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderinterm_dt`;
ALTER TABLE `trn_merchorderinterm` MODIFY COLUMN IF EXISTS  `merchorderinterm_paymentpercent` decimal(3, 0) NOT NULL DEFAULT 0 AFTER `merchorderinterm_isdp`;
ALTER TABLE `trn_merchorderinterm` MODIFY COLUMN IF EXISTS  `merchorderinterm_payment` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderinterm_paymentpercent`;
ALTER TABLE `trn_merchorderinterm` MODIFY COLUMN IF EXISTS  `merchorderin_totalpayment` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `merchorderinterm_payment`;
ALTER TABLE `trn_merchorderinterm` MODIFY COLUMN IF EXISTS  `merchorderin_id` varchar(30) NOT NULL  AFTER `merchorderin_totalpayment`;


ALTER TABLE `trn_merchorderinterm` ADD CONSTRAINT `orderintermtype_id` UNIQUE IF NOT EXISTS  (`merchorderin_id`, `orderintermtype_id`);

ALTER TABLE `trn_merchorderinterm` ADD KEY IF NOT EXISTS `orderintermtype_id` (`orderintermtype_id`);
ALTER TABLE `trn_merchorderinterm` ADD KEY IF NOT EXISTS `merchorderin_id` (`merchorderin_id`);

ALTER TABLE `trn_merchorderinterm` ADD CONSTRAINT `fk_trn_merchorderinterm_mst_orderintermtype` FOREIGN KEY IF NOT EXISTS  (`orderintermtype_id`) REFERENCES `mst_orderintermtype` (`orderintermtype_id`);
ALTER TABLE `trn_merchorderinterm` ADD CONSTRAINT `fk_trn_merchorderinterm_trn_merchorderin` FOREIGN KEY IF NOT EXISTS (`merchorderin_id`) REFERENCES `trn_merchorderin` (`merchorderin_id`);





CREATE TABLE IF NOT EXISTS `trn_merchorderinappr` (
	`merchorderinappr_id` varchar(14) NOT NULL , 
	`merchorderinappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`merchorderinappr_by` varchar(14)  , 
	`merchorderinappr_date` datetime  , 
	`merchorderin_version` int(4) NOT NULL DEFAULT 0, 
	`merchorderinappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`merchorderinappr_declinedby` varchar(14)  , 
	`merchorderinappr_declineddate` datetime  , 
	`merchorderinappr_notes` varchar(255)  , 
	`merchorderin_id` varchar(30) NOT NULL , 
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
	UNIQUE KEY `merchorderin_auth_id` (`merchorderin_id`, `auth_id`),
	PRIMARY KEY (`merchorderinappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval Order';


ALTER TABLE `trn_merchorderinappr` ADD COLUMN IF NOT EXISTS  `merchorderinappr_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderinappr_id`;
ALTER TABLE `trn_merchorderinappr` ADD COLUMN IF NOT EXISTS  `merchorderinappr_by` varchar(14)   AFTER `merchorderinappr_isapproved`;
ALTER TABLE `trn_merchorderinappr` ADD COLUMN IF NOT EXISTS  `merchorderinappr_date` datetime   AFTER `merchorderinappr_by`;
ALTER TABLE `trn_merchorderinappr` ADD COLUMN IF NOT EXISTS  `merchorderin_version` int(4) NOT NULL DEFAULT 0 AFTER `merchorderinappr_date`;
ALTER TABLE `trn_merchorderinappr` ADD COLUMN IF NOT EXISTS  `merchorderinappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderin_version`;
ALTER TABLE `trn_merchorderinappr` ADD COLUMN IF NOT EXISTS  `merchorderinappr_declinedby` varchar(14)   AFTER `merchorderinappr_isdeclined`;
ALTER TABLE `trn_merchorderinappr` ADD COLUMN IF NOT EXISTS  `merchorderinappr_declineddate` datetime   AFTER `merchorderinappr_declinedby`;
ALTER TABLE `trn_merchorderinappr` ADD COLUMN IF NOT EXISTS  `merchorderinappr_notes` varchar(255)   AFTER `merchorderinappr_declineddate`;
ALTER TABLE `trn_merchorderinappr` ADD COLUMN IF NOT EXISTS  `merchorderin_id` varchar(30) NOT NULL  AFTER `merchorderinappr_notes`;
ALTER TABLE `trn_merchorderinappr` ADD COLUMN IF NOT EXISTS  `docauth_descr` varchar(90)   AFTER `merchorderin_id`;
ALTER TABLE `trn_merchorderinappr` ADD COLUMN IF NOT EXISTS  `docauth_order` int(4) NOT NULL DEFAULT 0 AFTER `docauth_descr`;
ALTER TABLE `trn_merchorderinappr` ADD COLUMN IF NOT EXISTS  `docauth_value` int(4) NOT NULL DEFAULT 100 AFTER `docauth_order`;
ALTER TABLE `trn_merchorderinappr` ADD COLUMN IF NOT EXISTS  `docauth_min` int(4) NOT NULL DEFAULT 0 AFTER `docauth_value`;
ALTER TABLE `trn_merchorderinappr` ADD COLUMN IF NOT EXISTS  `authlevel_id` varchar(10) NOT NULL  AFTER `docauth_min`;
ALTER TABLE `trn_merchorderinappr` ADD COLUMN IF NOT EXISTS  `authlevel_name` varchar(60) NOT NULL  AFTER `authlevel_id`;
ALTER TABLE `trn_merchorderinappr` ADD COLUMN IF NOT EXISTS  `auth_id` varchar(10)   AFTER `authlevel_name`;
ALTER TABLE `trn_merchorderinappr` ADD COLUMN IF NOT EXISTS  `auth_name` varchar(60) NOT NULL  AFTER `auth_id`;


ALTER TABLE `trn_merchorderinappr` MODIFY COLUMN IF EXISTS  `merchorderinappr_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderinappr_id`;
ALTER TABLE `trn_merchorderinappr` MODIFY COLUMN IF EXISTS  `merchorderinappr_by` varchar(14)   AFTER `merchorderinappr_isapproved`;
ALTER TABLE `trn_merchorderinappr` MODIFY COLUMN IF EXISTS  `merchorderinappr_date` datetime   AFTER `merchorderinappr_by`;
ALTER TABLE `trn_merchorderinappr` MODIFY COLUMN IF EXISTS  `merchorderin_version` int(4) NOT NULL DEFAULT 0 AFTER `merchorderinappr_date`;
ALTER TABLE `trn_merchorderinappr` MODIFY COLUMN IF EXISTS  `merchorderinappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderin_version`;
ALTER TABLE `trn_merchorderinappr` MODIFY COLUMN IF EXISTS  `merchorderinappr_declinedby` varchar(14)   AFTER `merchorderinappr_isdeclined`;
ALTER TABLE `trn_merchorderinappr` MODIFY COLUMN IF EXISTS  `merchorderinappr_declineddate` datetime   AFTER `merchorderinappr_declinedby`;
ALTER TABLE `trn_merchorderinappr` MODIFY COLUMN IF EXISTS  `merchorderinappr_notes` varchar(255)   AFTER `merchorderinappr_declineddate`;
ALTER TABLE `trn_merchorderinappr` MODIFY COLUMN IF EXISTS  `merchorderin_id` varchar(30) NOT NULL  AFTER `merchorderinappr_notes`;
ALTER TABLE `trn_merchorderinappr` MODIFY COLUMN IF EXISTS  `docauth_descr` varchar(90)   AFTER `merchorderin_id`;
ALTER TABLE `trn_merchorderinappr` MODIFY COLUMN IF EXISTS  `docauth_order` int(4) NOT NULL DEFAULT 0 AFTER `docauth_descr`;
ALTER TABLE `trn_merchorderinappr` MODIFY COLUMN IF EXISTS  `docauth_value` int(4) NOT NULL DEFAULT 100 AFTER `docauth_order`;
ALTER TABLE `trn_merchorderinappr` MODIFY COLUMN IF EXISTS  `docauth_min` int(4) NOT NULL DEFAULT 0 AFTER `docauth_value`;
ALTER TABLE `trn_merchorderinappr` MODIFY COLUMN IF EXISTS  `authlevel_id` varchar(10) NOT NULL  AFTER `docauth_min`;
ALTER TABLE `trn_merchorderinappr` MODIFY COLUMN IF EXISTS  `authlevel_name` varchar(60) NOT NULL  AFTER `authlevel_id`;
ALTER TABLE `trn_merchorderinappr` MODIFY COLUMN IF EXISTS  `auth_id` varchar(10)   AFTER `authlevel_name`;
ALTER TABLE `trn_merchorderinappr` MODIFY COLUMN IF EXISTS  `auth_name` varchar(60) NOT NULL  AFTER `auth_id`;


ALTER TABLE `trn_merchorderinappr` ADD CONSTRAINT `merchorderin_auth_id` UNIQUE IF NOT EXISTS  (`merchorderin_id`, `auth_id`);

ALTER TABLE `trn_merchorderinappr` ADD KEY IF NOT EXISTS `merchorderin_id` (`merchorderin_id`);

ALTER TABLE `trn_merchorderinappr` ADD CONSTRAINT `fk_trn_merchorderinappr_trn_merchorderin` FOREIGN KEY IF NOT EXISTS (`merchorderin_id`) REFERENCES `trn_merchorderin` (`merchorderin_id`);





