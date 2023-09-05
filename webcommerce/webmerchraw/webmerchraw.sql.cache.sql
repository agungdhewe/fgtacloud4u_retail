DROP TABLE IF EXISTS `tmp_merchraw`;
DROP TABLE IF EXISTS `tmp_merchrawitem`;



CREATE TABLE `tmp_merchraw` (
	`cacheid` varchar(26) NOT NULL ,
	`cacheexpired` timestamp NOT NULL,
	PRIMARY KEY (`cacheid`)
)
ENGINE=MyISAM
COMMENT='Daftar Merchandise';



CREATE TABLE `tmp_merchrawitem` (
	`cacheid` varchar(26) NOT NULL , 
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
	`brand_id` varchar(10) NOT NULL, 
	UNIQUE KEY `merchraw_barcode` (`cacheid`, `brand_id`, `merchraw_barcode`),
	PRIMARY KEY (`cacheid`, `merchraw_id`)
) 
ENGINE=MyISAM
COMMENT='Daftar Merchandise';





