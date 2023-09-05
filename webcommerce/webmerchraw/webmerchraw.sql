CREATE TABLE `web_merchraw` (
	`merchraw_id` varchar(14) NOT NULL , 
	`merchraw_name` varchar(255)  , 
	`merchraw_gender` varchar(30)  , 
	`merchraw_catcode` varchar(15)  , 
	`merchraw_catname` varchar(100)  , 
	`merchraw_line` varchar(30)  , 
	`merchraw_style` varchar(30)  , 
	`merchraw_stylename` varchar(30)  , 
	`merchraw_tipologymacro` varchar(90)  , 
	`merchraw_tipology` varchar(90)  , 
	`merchraw_weightgross` decimal(7, 2) NOT NULL DEFAULT 0, 
	`merchraw_weightnett` decimal(7, 2) NOT NULL DEFAULT 0, 
	`merchraw_sku` varchar(30)  , 
	`merchraw_skutype` varchar(30)  , 
	`merchraw_serial1` varchar(30)  , 
	`merchraw_serial2` varchar(30)  , 
	`merchraw_colcode` varchar(30)  , 
	`merchraw_colname` varchar(60)  , 
	`merchraw_colnameshort` varchar(60)  , 
	`merchraw_matcode` varchar(30)  , 
	`merchraw_matname` varchar(60)  , 
	`merchraw_matnameshort` varchar(60)  , 
	`merchraw_matcmpst` varchar(255)  , 
	`merchraw_liningcmpst` varchar(255)  , 
	`merchraw_solcmpst1` varchar(255)  , 
	`merchraw_solcmpst2` varchar(255)  , 
	`merchraw_madein` varchar(30)  , 
	`merchraw_widthgroup` varchar(10)  , 
	`merchraw_size` varchar(10)  , 
	`merchraw_dim` varchar(30)  , 
	`merchraw_dimgroup` varchar(30)  , 
	`merchraw_dimlength` decimal(7, 2) NOT NULL DEFAULT 0, 
	`merchraw_dimwidth` decimal(7, 2) NOT NULL DEFAULT 0, 
	`merchraw_dimheight` decimal(7, 2) NOT NULL DEFAULT 0, 
	`merchraw_barcode` varchar(30)  , 
	`brand_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchraw_barcode` (`brand_id`, `merchraw_barcode`),
	PRIMARY KEY (`merchraw_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Merchandise';

ALTER TABLE `web_merchraw` ADD KEY `brand_id` (`brand_id`);

ALTER TABLE `web_merchraw` ADD CONSTRAINT `fk_web_merchraw_web_brand` FOREIGN KEY (`brand_id`) REFERENCES `web_brand` (`brand_id`);





