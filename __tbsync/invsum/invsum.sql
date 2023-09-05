-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `sync_tbinvsum`;


CREATE TABLE IF NOT EXISTS `sync_tbinvsum` (
	`tbinvsum_id` varchar(16) NOT NULL , 
	`block` varchar(5)  , 
	`dt` date NOT NULL , 
	`region_id` varchar(5)  , 
	`branch_id` varchar(7)  , 
	`heinv_id` varchar(13)  , 
	`heinv_art` varchar(30)  , 
	`heinv_mat` varchar(30)  , 
	`heinv_col` varchar(30)  , 
	`heinv_iskonsinyasi` tinyint(1) NOT NULL DEFAULT 0, 
	`heinv_priceori` decimal(18, 0) NOT NULL DEFAULT 0, 
	`heinv_priceadj` decimal(18, 0) NOT NULL DEFAULT 0, 
	`heinv_pricegross` decimal(18, 0) NOT NULL DEFAULT 0, 
	`heinv_price` decimal(18, 0) NOT NULL DEFAULT 0, 
	`heinv_pricedisc` decimal(3, 0) NOT NULL DEFAULT 0, 
	`heinv_pricenett` decimal(18, 0) NOT NULL DEFAULT 0, 
	`gtype` varchar(1)  , 
	`season_group` varchar(10)  , 
	`season_id` varchar(10)  , 
	`rvid` varchar(30)  , 
	`rvdt` date NOT NULL , 
	`rvqty` int(4) NOT NULL DEFAULT 0, 
	`age` int(4) NOT NULL DEFAULT 0, 
	`heinvctg_id` varchar(10)  , 
	`heinvctg_name` varchar(50)  , 
	`heinvctg_class` varchar(30)  , 
	`heinvctg_gender` varchar(1)  , 
	`heinvctg_sizetag` varchar(5)  , 
	`heinvgro_id` varchar(10)  , 
	`heinv_group1` varchar(60)  , 
	`heinv_group2` varchar(60)  , 
	`heinv_gender` varchar(1)  , 
	`heinv_color1` varchar(30)  , 
	`heinv_color2` varchar(30)  , 
	`heinv_color3` varchar(30)  , 
	`heinv_hscode_ship` varchar(30)  , 
	`heinv_hscode_ina` varchar(30)  , 
	`heinv_plbname` varchar(100)  , 
	`ref_id` varchar(30)  , 
	`invcls_id` varchar(8)  , 
	`heinv_isweb` tinyint(1) NOT NULL DEFAULT 0, 
	`heinv_weight` decimal(5, 2) NOT NULL DEFAULT 0, 
	`heinv_length` decimal(5, 2) NOT NULL DEFAULT 0, 
	`heinv_width` decimal(5, 2) NOT NULL DEFAULT 0, 
	`heinv_height` decimal(5, 2) NOT NULL DEFAULT 0, 
	`heinv_webdescr` varchar(255)  , 
	`heinv_other1` varchar(50)  , 
	`heinv_other2` varchar(50)  , 
	`heinv_other3` varchar(50)  , 
	`heinv_other4` varchar(50)  , 
	`heinv_other5` varchar(50)  , 
	`heinv_produk` varchar(50)  , 
	`heinv_bahan` varchar(70)  , 
	`heinv_pemeliharaan` varchar(100)  , 
	`heinv_logo` varchar(30)  , 
	`heinv_dibuatdi` varchar(30)  , 
	`heinv_modifydate` varchar(30)  , 
	`lastcost` decimal(18, 0) NOT NULL DEFAULT 0, 
	`lastcostid` varchar(30)  , 
	`lastcostdt` date NOT NULL , 
	`lastpriceid` varchar(30)  , 
	`lastpricedt` date NOT NULL , 
	`beg` int(4) NOT NULL DEFAULT 0, 
	`rv` int(4) NOT NULL DEFAULT 0, 
	`tin` int(4) NOT NULL DEFAULT 0, 
	`tout` int(4) NOT NULL DEFAULT 0, 
	`sl` int(4) NOT NULL DEFAULT 0, 
	`do` int(4) NOT NULL DEFAULT 0, 
	`aj` int(4) NOT NULL DEFAULT 0, 
	`end` int(4) NOT NULL DEFAULT 0, 
	`tts` int(4) NOT NULL DEFAULT 0, 
	`C01` int(4) NOT NULL DEFAULT 0, 
	`C02` int(4) NOT NULL DEFAULT 0, 
	`C03` int(4) NOT NULL DEFAULT 0, 
	`C04` int(4) NOT NULL DEFAULT 0, 
	`C05` int(4) NOT NULL DEFAULT 0, 
	`C06` int(4) NOT NULL DEFAULT 0, 
	`C07` int(4) NOT NULL DEFAULT 0, 
	`C08` int(4) NOT NULL DEFAULT 0, 
	`C09` int(4) NOT NULL DEFAULT 0, 
	`C10` int(4) NOT NULL DEFAULT 0, 
	`C11` int(4) NOT NULL DEFAULT 0, 
	`C12` int(4) NOT NULL DEFAULT 0, 
	`C13` int(4) NOT NULL DEFAULT 0, 
	`C14` int(4) NOT NULL DEFAULT 0, 
	`C15` int(4) NOT NULL DEFAULT 0, 
	`C16` int(4) NOT NULL DEFAULT 0, 
	`C17` int(4) NOT NULL DEFAULT 0, 
	`C18` int(4) NOT NULL DEFAULT 0, 
	`C19` int(4) NOT NULL DEFAULT 0, 
	`C20` int(4) NOT NULL DEFAULT 0, 
	`C21` int(4) NOT NULL DEFAULT 0, 
	`C22` int(4) NOT NULL DEFAULT 0, 
	`C23` int(4) NOT NULL DEFAULT 0, 
	`C24` int(4) NOT NULL DEFAULT 0, 
	`C25` int(4) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `tbinvsum_pair` (`block`, `dt`, `region_id`, `branch_id`, `heinv_id`),
	PRIMARY KEY (`tbinvsum_id`)
) 
ENGINE=InnoDB
COMMENT='Sync TV InvSum';


ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `block` varchar(5)   AFTER `tbinvsum_id`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `dt` date NOT NULL  AFTER `block`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `region_id` varchar(5)   AFTER `dt`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `branch_id` varchar(7)   AFTER `region_id`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_id` varchar(13)   AFTER `branch_id`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_art` varchar(30)   AFTER `heinv_id`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_mat` varchar(30)   AFTER `heinv_art`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_col` varchar(30)   AFTER `heinv_mat`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_iskonsinyasi` tinyint(1) NOT NULL DEFAULT 0 AFTER `heinv_col`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_priceori` decimal(18, 0) NOT NULL DEFAULT 0 AFTER `heinv_iskonsinyasi`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_priceadj` decimal(18, 0) NOT NULL DEFAULT 0 AFTER `heinv_priceori`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_pricegross` decimal(18, 0) NOT NULL DEFAULT 0 AFTER `heinv_priceadj`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_price` decimal(18, 0) NOT NULL DEFAULT 0 AFTER `heinv_pricegross`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_pricedisc` decimal(3, 0) NOT NULL DEFAULT 0 AFTER `heinv_price`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_pricenett` decimal(18, 0) NOT NULL DEFAULT 0 AFTER `heinv_pricedisc`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `gtype` varchar(1)   AFTER `heinv_pricenett`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `season_group` varchar(10)   AFTER `gtype`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `season_id` varchar(10)   AFTER `season_group`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `rvid` varchar(30)   AFTER `season_id`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `rvdt` date NOT NULL  AFTER `rvid`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `rvqty` int(4) NOT NULL DEFAULT 0 AFTER `rvdt`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `age` int(4) NOT NULL DEFAULT 0 AFTER `rvqty`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinvctg_id` varchar(10)   AFTER `age`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinvctg_name` varchar(50)   AFTER `heinvctg_id`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinvctg_class` varchar(30)   AFTER `heinvctg_name`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinvctg_gender` varchar(1)   AFTER `heinvctg_class`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinvctg_sizetag` varchar(5)   AFTER `heinvctg_gender`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinvgro_id` varchar(10)   AFTER `heinvctg_sizetag`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_group1` varchar(60)   AFTER `heinvgro_id`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_group2` varchar(60)   AFTER `heinv_group1`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_gender` varchar(1)   AFTER `heinv_group2`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_color1` varchar(30)   AFTER `heinv_gender`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_color2` varchar(30)   AFTER `heinv_color1`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_color3` varchar(30)   AFTER `heinv_color2`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_hscode_ship` varchar(30)   AFTER `heinv_color3`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_hscode_ina` varchar(30)   AFTER `heinv_hscode_ship`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_plbname` varchar(100)   AFTER `heinv_hscode_ina`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `ref_id` varchar(30)   AFTER `heinv_plbname`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `invcls_id` varchar(8)   AFTER `ref_id`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_isweb` tinyint(1) NOT NULL DEFAULT 0 AFTER `invcls_id`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_weight` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `heinv_isweb`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_length` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `heinv_weight`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_width` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `heinv_length`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_height` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `heinv_width`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_webdescr` varchar(255)   AFTER `heinv_height`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_other1` varchar(50)   AFTER `heinv_webdescr`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_other2` varchar(50)   AFTER `heinv_other1`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_other3` varchar(50)   AFTER `heinv_other2`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_other4` varchar(50)   AFTER `heinv_other3`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_other5` varchar(50)   AFTER `heinv_other4`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_produk` varchar(50)   AFTER `heinv_other5`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_bahan` varchar(70)   AFTER `heinv_produk`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_pemeliharaan` varchar(100)   AFTER `heinv_bahan`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_logo` varchar(30)   AFTER `heinv_pemeliharaan`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_dibuatdi` varchar(30)   AFTER `heinv_logo`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `heinv_modifydate` varchar(30)   AFTER `heinv_dibuatdi`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `lastcost` decimal(18, 0) NOT NULL DEFAULT 0 AFTER `heinv_modifydate`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `lastcostid` varchar(30)   AFTER `lastcost`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `lastcostdt` date NOT NULL  AFTER `lastcostid`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `lastpriceid` varchar(30)   AFTER `lastcostdt`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `lastpricedt` date NOT NULL  AFTER `lastpriceid`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `beg` int(4) NOT NULL DEFAULT 0 AFTER `lastpricedt`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `rv` int(4) NOT NULL DEFAULT 0 AFTER `beg`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `tin` int(4) NOT NULL DEFAULT 0 AFTER `rv`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `tout` int(4) NOT NULL DEFAULT 0 AFTER `tin`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `sl` int(4) NOT NULL DEFAULT 0 AFTER `tout`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `do` int(4) NOT NULL DEFAULT 0 AFTER `sl`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `aj` int(4) NOT NULL DEFAULT 0 AFTER `do`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `end` int(4) NOT NULL DEFAULT 0 AFTER `aj`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `tts` int(4) NOT NULL DEFAULT 0 AFTER `end`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C01` int(4) NOT NULL DEFAULT 0 AFTER `tts`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C02` int(4) NOT NULL DEFAULT 0 AFTER `C01`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C03` int(4) NOT NULL DEFAULT 0 AFTER `C02`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C04` int(4) NOT NULL DEFAULT 0 AFTER `C03`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C05` int(4) NOT NULL DEFAULT 0 AFTER `C04`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C06` int(4) NOT NULL DEFAULT 0 AFTER `C05`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C07` int(4) NOT NULL DEFAULT 0 AFTER `C06`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C08` int(4) NOT NULL DEFAULT 0 AFTER `C07`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C09` int(4) NOT NULL DEFAULT 0 AFTER `C08`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C10` int(4) NOT NULL DEFAULT 0 AFTER `C09`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C11` int(4) NOT NULL DEFAULT 0 AFTER `C10`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C12` int(4) NOT NULL DEFAULT 0 AFTER `C11`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C13` int(4) NOT NULL DEFAULT 0 AFTER `C12`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C14` int(4) NOT NULL DEFAULT 0 AFTER `C13`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C15` int(4) NOT NULL DEFAULT 0 AFTER `C14`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C16` int(4) NOT NULL DEFAULT 0 AFTER `C15`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C17` int(4) NOT NULL DEFAULT 0 AFTER `C16`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C18` int(4) NOT NULL DEFAULT 0 AFTER `C17`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C19` int(4) NOT NULL DEFAULT 0 AFTER `C18`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C20` int(4) NOT NULL DEFAULT 0 AFTER `C19`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C21` int(4) NOT NULL DEFAULT 0 AFTER `C20`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C22` int(4) NOT NULL DEFAULT 0 AFTER `C21`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C23` int(4) NOT NULL DEFAULT 0 AFTER `C22`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C24` int(4) NOT NULL DEFAULT 0 AFTER `C23`;
ALTER TABLE `sync_tbinvsum` ADD COLUMN IF NOT EXISTS  `C25` int(4) NOT NULL DEFAULT 0 AFTER `C24`;


ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `block` varchar(5)   AFTER `tbinvsum_id`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `dt` date NOT NULL  AFTER `block`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `region_id` varchar(5)   AFTER `dt`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `branch_id` varchar(7)   AFTER `region_id`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_id` varchar(13)   AFTER `branch_id`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_art` varchar(30)   AFTER `heinv_id`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_mat` varchar(30)   AFTER `heinv_art`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_col` varchar(30)   AFTER `heinv_mat`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_iskonsinyasi` tinyint(1) NOT NULL DEFAULT 0 AFTER `heinv_col`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_priceori` decimal(18, 0) NOT NULL DEFAULT 0 AFTER `heinv_iskonsinyasi`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_priceadj` decimal(18, 0) NOT NULL DEFAULT 0 AFTER `heinv_priceori`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_pricegross` decimal(18, 0) NOT NULL DEFAULT 0 AFTER `heinv_priceadj`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_price` decimal(18, 0) NOT NULL DEFAULT 0 AFTER `heinv_pricegross`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_pricedisc` decimal(3, 0) NOT NULL DEFAULT 0 AFTER `heinv_price`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_pricenett` decimal(18, 0) NOT NULL DEFAULT 0 AFTER `heinv_pricedisc`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `gtype` varchar(1)   AFTER `heinv_pricenett`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `season_group` varchar(10)   AFTER `gtype`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `season_id` varchar(10)   AFTER `season_group`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `rvid` varchar(30)   AFTER `season_id`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `rvdt` date NOT NULL  AFTER `rvid`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `rvqty` int(4) NOT NULL DEFAULT 0 AFTER `rvdt`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `age` int(4) NOT NULL DEFAULT 0 AFTER `rvqty`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinvctg_id` varchar(10)   AFTER `age`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinvctg_name` varchar(50)   AFTER `heinvctg_id`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinvctg_class` varchar(30)   AFTER `heinvctg_name`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinvctg_gender` varchar(1)   AFTER `heinvctg_class`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinvctg_sizetag` varchar(5)   AFTER `heinvctg_gender`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinvgro_id` varchar(10)   AFTER `heinvctg_sizetag`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_group1` varchar(60)   AFTER `heinvgro_id`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_group2` varchar(60)   AFTER `heinv_group1`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_gender` varchar(1)   AFTER `heinv_group2`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_color1` varchar(30)   AFTER `heinv_gender`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_color2` varchar(30)   AFTER `heinv_color1`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_color3` varchar(30)   AFTER `heinv_color2`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_hscode_ship` varchar(30)   AFTER `heinv_color3`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_hscode_ina` varchar(30)   AFTER `heinv_hscode_ship`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_plbname` varchar(100)   AFTER `heinv_hscode_ina`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `ref_id` varchar(30)   AFTER `heinv_plbname`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `invcls_id` varchar(8)   AFTER `ref_id`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_isweb` tinyint(1) NOT NULL DEFAULT 0 AFTER `invcls_id`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_weight` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `heinv_isweb`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_length` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `heinv_weight`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_width` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `heinv_length`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_height` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `heinv_width`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_webdescr` varchar(255)   AFTER `heinv_height`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_other1` varchar(50)   AFTER `heinv_webdescr`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_other2` varchar(50)   AFTER `heinv_other1`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_other3` varchar(50)   AFTER `heinv_other2`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_other4` varchar(50)   AFTER `heinv_other3`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_other5` varchar(50)   AFTER `heinv_other4`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_produk` varchar(50)   AFTER `heinv_other5`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_bahan` varchar(70)   AFTER `heinv_produk`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_pemeliharaan` varchar(100)   AFTER `heinv_bahan`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_logo` varchar(30)   AFTER `heinv_pemeliharaan`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_dibuatdi` varchar(30)   AFTER `heinv_logo`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `heinv_modifydate` varchar(30)   AFTER `heinv_dibuatdi`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `lastcost` decimal(18, 0) NOT NULL DEFAULT 0 AFTER `heinv_modifydate`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `lastcostid` varchar(30)   AFTER `lastcost`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `lastcostdt` date NOT NULL  AFTER `lastcostid`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `lastpriceid` varchar(30)   AFTER `lastcostdt`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `lastpricedt` date NOT NULL  AFTER `lastpriceid`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `beg` int(4) NOT NULL DEFAULT 0 AFTER `lastpricedt`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `rv` int(4) NOT NULL DEFAULT 0 AFTER `beg`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `tin` int(4) NOT NULL DEFAULT 0 AFTER `rv`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `tout` int(4) NOT NULL DEFAULT 0 AFTER `tin`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `sl` int(4) NOT NULL DEFAULT 0 AFTER `tout`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `do` int(4) NOT NULL DEFAULT 0 AFTER `sl`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `aj` int(4) NOT NULL DEFAULT 0 AFTER `do`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `end` int(4) NOT NULL DEFAULT 0 AFTER `aj`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `tts` int(4) NOT NULL DEFAULT 0 AFTER `end`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C01` int(4) NOT NULL DEFAULT 0 AFTER `tts`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C02` int(4) NOT NULL DEFAULT 0 AFTER `C01`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C03` int(4) NOT NULL DEFAULT 0 AFTER `C02`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C04` int(4) NOT NULL DEFAULT 0 AFTER `C03`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C05` int(4) NOT NULL DEFAULT 0 AFTER `C04`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C06` int(4) NOT NULL DEFAULT 0 AFTER `C05`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C07` int(4) NOT NULL DEFAULT 0 AFTER `C06`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C08` int(4) NOT NULL DEFAULT 0 AFTER `C07`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C09` int(4) NOT NULL DEFAULT 0 AFTER `C08`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C10` int(4) NOT NULL DEFAULT 0 AFTER `C09`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C11` int(4) NOT NULL DEFAULT 0 AFTER `C10`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C12` int(4) NOT NULL DEFAULT 0 AFTER `C11`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C13` int(4) NOT NULL DEFAULT 0 AFTER `C12`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C14` int(4) NOT NULL DEFAULT 0 AFTER `C13`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C15` int(4) NOT NULL DEFAULT 0 AFTER `C14`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C16` int(4) NOT NULL DEFAULT 0 AFTER `C15`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C17` int(4) NOT NULL DEFAULT 0 AFTER `C16`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C18` int(4) NOT NULL DEFAULT 0 AFTER `C17`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C19` int(4) NOT NULL DEFAULT 0 AFTER `C18`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C20` int(4) NOT NULL DEFAULT 0 AFTER `C19`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C21` int(4) NOT NULL DEFAULT 0 AFTER `C20`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C22` int(4) NOT NULL DEFAULT 0 AFTER `C21`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C23` int(4) NOT NULL DEFAULT 0 AFTER `C22`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C24` int(4) NOT NULL DEFAULT 0 AFTER `C23`;
ALTER TABLE `sync_tbinvsum` MODIFY COLUMN IF EXISTS  `C25` int(4) NOT NULL DEFAULT 0 AFTER `C24`;


ALTER TABLE `sync_tbinvsum` ADD CONSTRAINT `tbinvsum_pair` UNIQUE IF NOT EXISTS  (`block`, `dt`, `region_id`, `branch_id`, `heinv_id`);







