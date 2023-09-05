<?php

function getParams($dateparam) {
	return [
		':DT' => $dateparam->current_date_end,
		':DT_D' => $dateparam->current_date_end, 
		':DT_W' => $dateparam->current_date_end, 
		':DT_M' => $dateparam->current_date_end, 
		':DT_Y' => $dateparam->current_date_end
	];
}


function salesstat_getbyunit($self, $dateparam) {
	$COLUMNS = getSqlSumColumn();

	try {

		$tablename = GTT_DAILYSALES;
		$sql = "
			select
			UNITGROUP_ID,
			UNIT_ID,
			$COLUMNS
			from $tablename
			where
			DT = :DT
			GROUP BY UNITGROUP_ID, UNIT_ID
			ORDER BY UNITGROUP_ID, UNIT_ID
		";

		$stmt = $self->db->prepare($sql);
		$stmt->execute(getParams($dateparam));
		$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
		return $rows;		

	} catch (Exception $ex) {
		throw $ex;
	}
	

}


function salesstat_getbysite($self, $dateparam) {
	$COLUMNS = getSqlSumColumn();

	try {

		$tablename = GTT_DAILYSALES;
		$sql = "
			select
			CITY_ID,
			LOCATION_ID,
			SITE_ID,
			$COLUMNS
			from $tablename
			where
			DT = :DT
			GROUP BY CITY_ID, LOCATION_ID, SITE_ID
			ORDER BY CITY_ID, LOCATION_ID, SITE_ID
		";

		$stmt = $self->db->prepare($sql);
		$stmt->execute(getParams($dateparam));
		$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
		return $rows;

	} catch (Exception $ex) {
		throw $ex;
	}
}

function salesstat_getbyclassgro($self, $dateparam) {
	$COLUMNS = getSqlSumColumn();

	try {

		$tablename = GTT_DAILYSALES;
		$sql = "
			select
			UNITGROUP_ID,
			UNIT_ID,
			ITEMCLASS_ID,
			$COLUMNS
			from $tablename
			where
			DT = :DT
			GROUP BY UNITGROUP_ID, UNIT_ID, ITEMCLASS_ID
			ORDER BY UNITGROUP_ID, UNIT_ID, ITEMCLASS_ID
		";

		$stmt = $self->db->prepare($sql);
		$stmt->execute(getParams($dateparam));
		$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
		return $rows;

	} catch (Exception $ex) {
		throw $ex;
	}
}


function getSqlSumColumn() {
	$tablename = GTT_DAILYSALES;
	return "
		SUM(D_CURR_CUSTNEW) AS D_CURR_CUSTNEW,
		SUM(D_CURR_CUST) AS D_CURR_CUST,
		SUM(D_CURR_TX) AS D_CURR_TX,
		SUM(D_CURR_TRF) AS D_CURR_TRF,
		SUM(D_CURR_QTY) AS D_CURR_QTY,
		SUM(D_CURR_GROSS) AS D_CURR_GROSS,
		SUM(D_CURR_NETT) AS D_CURR_NETT,
		SUM(D_CURR_NETT_FP) AS D_CURR_NETT_FP,
		SUM(D_CURR_NETT_MD) AS D_CURR_NETT_MD,
		(SELECT SUM(D_CURR_NETT) FROM $tablename WHERE DT = :DT_D) AS D_CURR_NETT_ALL,
		SUM(D_CURR_OLD_QTY) AS D_CURR_OLD_QTY,
		SUM(D_CURR_OLD_NETT) AS D_CURR_OLD_NETT,
		SUM(D_CURR_OLD_GP) AS D_CURR_OLD_GP,
		SUM(D_CURR_COGS) AS D_CURR_COGS,
		SUM(D_CURR_GP) AS D_CURR_GP,
		SUM(W_CURR_CUSTNEW) AS W_CURR_CUSTNEW,
		SUM(W_CURR_CUST) AS W_CURR_CUST,
		SUM(W_CURR_TX) AS W_CURR_TX,
		SUM(W_CURR_TRF) AS W_CURR_TRF,
		SUM(W_CURR_QTY) AS W_CURR_QTY,
		SUM(W_CURR_GROSS) AS W_CURR_GROSS,
		SUM(W_CURR_NETT) AS W_CURR_NETT,
		SUM(W_CURR_NETT_FP) AS W_CURR_NETT_FP,
		SUM(W_CURR_NETT_MD) AS W_CURR_NETT_MD,
		(SELECT SUM(W_CURR_NETT) FROM $tablename WHERE DT = :DT_W) AS W_CURR_NETT_ALL,
		SUM(W_CURR_OLD_QTY) AS W_CURR_OLD_QTY,
		SUM(W_CURR_OLD_NETT) AS W_CURR_OLD_NETT,
		SUM(W_CURR_OLD_GP) AS W_CURR_OLD_GP,		
		SUM(W_CURR_COGS) AS W_CURR_COGS,
		SUM(W_CURR_GP) AS W_CURR_GP,
		SUM(M_CURR_CUSTNEW) AS M_CURR_CUSTNEW,
		SUM(M_CURR_CUST) AS M_CURR_CUST,
		SUM(M_CURR_TX) AS M_CURR_TX,
		SUM(M_CURR_TRF) AS M_CURR_TRF,
		SUM(M_CURR_QTY) AS M_CURR_QTY,
		SUM(M_CURR_GROSS) AS M_CURR_GROSS,
		SUM(M_CURR_NETT) AS M_CURR_NETT,
		SUM(M_CURR_NETT_FP) AS M_CURR_NETT_FP,
		SUM(M_CURR_NETT_MD) AS M_CURR_NETT_MD,
		(SELECT SUM(M_CURR_NETT) FROM $tablename WHERE DT = :DT_M) AS M_CURR_NETT_ALL,
		SUM(M_CURR_OLD_QTY) AS M_CURR_OLD_QTY,
		SUM(M_CURR_OLD_NETT) AS M_CURR_OLD_NETT,
		SUM(M_CURR_OLD_GP) AS M_CURR_OLD_GP,		
		SUM(M_CURR_COGS) AS M_CURR_COGS,
		SUM(M_CURR_GP) AS M_CURR_GP,
		SUM(M_CURR_TARGET_NETT) AS M_CURR_TARGET_NETT,
		SUM(M_CURR_TARGET_NETT_FP) AS M_CURR_TARGET_NETT_FP,
		SUM(M_CURR_TARGET_NETT_MD) AS M_CURR_TARGET_NETT_MD,
		SUM(M_CURR_TARGET_COGS) AS M_CURR_TARGET_COGS,
		SUM(M_CURR_TARGET_GP) AS M_CURR_TARGET_GP,
		SUM(Y_CURR_CUSTNEW) AS Y_CURR_CUSTNEW,
		SUM(Y_CURR_CUST) AS Y_CURR_CUST,
		SUM(Y_CURR_TX) AS Y_CURR_TX,
		SUM(Y_CURR_TRF) AS Y_CURR_TRF,
		SUM(Y_CURR_QTY) AS Y_CURR_QTY,
		SUM(Y_CURR_GROSS) AS Y_CURR_GROSS,
		SUM(Y_CURR_NETT) AS Y_CURR_NETT,
		SUM(Y_CURR_NETT_FP) AS Y_CURR_NETT_FP,
		SUM(Y_CURR_NETT_MD) AS Y_CURR_NETT_MD,
		(SELECT SUM(Y_CURR_NETT) FROM $tablename WHERE DT = :DT_Y) AS Y_CURR_NETT_ALL,
		SUM(Y_CURR_OLD_QTY) AS Y_CURR_OLD_QTY,
		SUM(Y_CURR_OLD_NETT) AS Y_CURR_OLD_NETT,
		SUM(Y_CURR_OLD_GP) AS Y_CURR_OLD_GP,		
		SUM(Y_CURR_COGS) AS Y_CURR_COGS,
		SUM(Y_CURR_GP) AS Y_CURR_GP,
		SUM(Y_CURR_TARGET_GROSS) AS Y_CURR_TARGET_GROSS,
		SUM(Y_CURR_TARGET_NETT) AS Y_CURR_TARGET_NETT,
		SUM(Y_CURR_TARGET_NETT_FP) AS Y_CURR_TARGET_NETT_FP,
		SUM(Y_CURR_TARGET_NETT_MD) AS Y_CURR_TARGET_NETT_MD,
		SUM(Y_CURR_TARGET_COGS) AS Y_CURR_TARGET_COGS,
		SUM(Y_CURR_TARGET_GP) AS Y_CURR_TARGET_GP,
		SUM(D_PREV_CUSTNEW) AS D_PREV_CUSTNEW,
		SUM(D_PREV_CUST) AS D_PREV_CUST,
		SUM(D_PREV_TX) AS D_PREV_TX,
		SUM(D_PREV_TRF) AS D_PREV_TRF,
		SUM(D_PREV_QTY) AS D_PREV_QTY,
		SUM(D_PREV_GROSS) AS D_PREV_GROSS,
		SUM(D_PREV_NETT) AS D_PREV_NETT,
		SUM(D_PREV_NETT_FP) AS D_PREV_NETT_FP,
		SUM(D_PREV_NETT_MD) AS D_PREV_NETT_MD,
		SUM(D_PREV_COGS) AS D_PREV_COGS,
		SUM(D_PREV_GP) AS D_PREV_GP,
		SUM(W_PREV_CUSTNEW) AS W_PREV_CUSTNEW,
		SUM(W_PREV_CUST) AS W_PREV_CUST,
		SUM(W_PREV_TX) AS W_PREV_TX,
		SUM(W_PREV_TRF) AS W_PREV_TRF,
		SUM(W_PREV_QTY) AS W_PREV_QTY,
		SUM(W_PREV_GROSS) AS W_PREV_GROSS,
		SUM(W_PREV_NETT) AS W_PREV_NETT,
		SUM(W_PREV_NETT_FP) AS W_PREV_NETT_FP,
		SUM(W_PREV_NETT_MD) AS W_PREV_NETT_MD,
		SUM(W_PREV_COGS) AS W_PREV_COGS,
		SUM(W_PREV_GP) AS W_PREV_GP,
		SUM(M_PREV_CUSTNEW) AS M_PREV_CUSTNEW,
		SUM(M_PREV_CUST) AS M_PREV_CUST,
		SUM(M_PREV_TX) AS M_PREV_TX,
		SUM(M_PREV_TRF) AS M_PREV_TRF,
		SUM(M_PREV_QTY) AS M_PREV_QTY,
		SUM(M_PREV_GROSS) AS M_PREV_GROSS,
		SUM(M_PREV_NETT) AS M_PREV_NETT,
		SUM(M_PREV_NETT_FP) AS M_PREV_NETT_FP,
		SUM(M_PREV_NETT_MD) AS M_PREV_NETT_MD,
		SUM(M_PREV_COGS) AS M_PREV_COGS,
		SUM(M_PREV_GP) AS M_PREV_GP,
		SUM(Y_PREV_CUSTNEW) AS Y_PREV_CUSTNEW,
		SUM(Y_PREV_CUST) AS Y_PREV_CUST,
		SUM(Y_PREV_TX) AS Y_PREV_TX,
		SUM(Y_PREV_TRF) AS Y_PREV_TRF,
		SUM(Y_PREV_QTY) AS Y_PREV_QTY,
		SUM(Y_PREV_GROSS) AS Y_PREV_GROSS,
		SUM(Y_PREV_NETT) AS Y_PREV_NETT,
		SUM(Y_PREV_NETT_FP) AS Y_PREV_NETT_FP,
		SUM(Y_PREV_NETT_MD) AS Y_PREV_NETT_MD,
		SUM(Y_PREV_COGS) AS Y_PREV_COGS,
		SUM(Y_PREV_GP) AS Y_PREV_GP,
		SUM(INV_QTY) AS INV_QTY,
		SUM(INV_VAL) AS INV_VAL,
		SUM(INV_OLD_QTY) AS INV_OLD_QTY,
		SUM(INV_OLD_VAL) AS INV_OLD_VAL
	";
}