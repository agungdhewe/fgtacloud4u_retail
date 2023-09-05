CREATE TABLE `web_editorial` (
	`editorial_id` varchar(14) NOT NULL , 
	`editorial_title` varchar(90) NOT NULL , 
	`editorial_preface` varchar(500)  , 
	`editorial_datestart` date NOT NULL , 
	`editorial_dateend` date NOT NULL , 
	`editorial_isdatelimit` tinyint(1) NOT NULL DEFAULT 0, 
	`editorial_content` varchar(25000)  , 
	`editorial_tags` varchar(255)  , 
	`editorial_keyword` varchar(255)  , 
	`editorial_picture` varchar(90)  , 
	`editorial_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`editorial_commitby` varchar(14)  , 
	`editorial_commitdate` datetime  , 
	`editorial_version` int(4) NOT NULL DEFAULT 0, 
	`editorialtype_id` varchar(7) NOT NULL , 
	`cluster_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`editorial_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Editorial';

ALTER TABLE `web_editorial` ADD KEY `editorialtype_id` (`editorialtype_id`);
ALTER TABLE `web_editorial` ADD KEY `cluster_id` (`cluster_id`);

ALTER TABLE `web_editorial` ADD CONSTRAINT `fk_web_editorial_web_editorialtype` FOREIGN KEY (`editorialtype_id`) REFERENCES `web_editorialtype` (`editorialtype_id`);
ALTER TABLE `web_editorial` ADD CONSTRAINT `fk_web_editorial_web_cluster` FOREIGN KEY (`cluster_id`) REFERENCES `web_cluster` (`cluster_id`);





CREATE TABLE `web_editorialpic` (
	`editorialpic_id` varchar(14) NOT NULL , 
	`editorialpic_name` varchar(90) NOT NULL , 
	`editorialpic_descr` varchar(255)  , 
	`editorialpic_order` int(4) NOT NULL DEFAULT 0, 
	`editorialpic_file` varchar(90)  , 
	`editorial_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `editorialpic_name` (`editorial_id`, `editorialpic_name`),
	PRIMARY KEY (`editorialpic_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Picture dari Editorial';

ALTER TABLE `web_editorialpic` ADD KEY `editorial_id` (`editorial_id`);

ALTER TABLE `web_editorialpic` ADD CONSTRAINT `fk_web_editorialpic_web_editorial` FOREIGN KEY (`editorial_id`) REFERENCES `web_editorial` (`editorial_id`);





CREATE TABLE `web_editorialmerch` (
	`editorialmerch_id` varchar(14) NOT NULL , 
	`merch_id` varchar(14) NOT NULL , 
	`brand_id` varchar(10) NOT NULL , 
	`editorial_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merch_id_pair` (`editorial_id`, `merch_id`),
	PRIMARY KEY (`editorialmerch_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Merchandise yang related ke artikel ini';

ALTER TABLE `web_editorialmerch` ADD KEY `merch_id` (`merch_id`);
ALTER TABLE `web_editorialmerch` ADD KEY `brand_id` (`brand_id`);
ALTER TABLE `web_editorialmerch` ADD KEY `editorial_id` (`editorial_id`);

ALTER TABLE `web_editorialmerch` ADD CONSTRAINT `fk_web_editorialmerch_web_merch` FOREIGN KEY (`merch_id`) REFERENCES `web_merch` (`merch_id`);
ALTER TABLE `web_editorialmerch` ADD CONSTRAINT `fk_web_editorialmerch_web_brand` FOREIGN KEY (`brand_id`) REFERENCES `web_brand` (`brand_id`);
ALTER TABLE `web_editorialmerch` ADD CONSTRAINT `fk_web_editorialmerch_web_editorial` FOREIGN KEY (`editorial_id`) REFERENCES `web_editorial` (`editorial_id`);





