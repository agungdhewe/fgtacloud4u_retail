CREATE TABLE `web_feedback` (
	`feedback_id` varchar(14) NOT NULL , 
	`feedback_name` varchar(90)  , 
	`feedback_email` varchar(90)  , 
	`feedback_phone` varchar(90)  , 
	`feedback_message` varchar(1000)  , 
	`feedback_browsername` varchar(90)  , 
	`feedback_browserversion` varchar(90)  , 
	`feedback_browseros` varchar(90)  , 
	`feedback_continent` varchar(120)  , 
	`feedback_continentcode` varchar(120)  , 
	`feedback_country` varchar(120)  , 
	`feedback_countrycode` varchar(120)  , 
	`feedback_state` varchar(120)  , 
	`feedback_statecode` varchar(120)  , 
	`feedback_city` varchar(120)  , 
	`feedback_postalcode` varchar(120)  , 
	`feedback_metrocode` varchar(120)  , 
	`feedback_latitude` varchar(120)  , 
	`feedback_longitude` varchar(120)  , 
	`feedback_timezone` varchar(120)  , 
	`feedback_datetime` varchar(120)  , 
	`cluster_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`feedback_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Feedback';

ALTER TABLE `web_feedback` ADD KEY `cluster_id` (`cluster_id`);

ALTER TABLE `web_feedback` ADD CONSTRAINT `fk_web_feedback_web_cluster` FOREIGN KEY (`cluster_id`) REFERENCES `web_cluster` (`cluster_id`);





