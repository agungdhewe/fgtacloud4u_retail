<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class merchorderin_itemsHandler extends WebAPI  {

	public function DataSavedSuccess($result) {
		// $this->caller->log('save success');

		$merchorderin_id = $result->dataresponse->merchorderin_id;

	

		$sql = "
			select
				sum(merchorderinitem_qty) as merchorderinitem_qty,
				sum(merchorderinitem_subtotal) as merchorderinitem_subtotal
			from trn_merchorderinitem
			where
				merchorderin_id = :merchorderin_id
		";

		$stmt = $this->db->prepare($sql);
		$stmt->execute([':merchorderin_id'=>$merchorderin_id]);
		$row  = $stmt->fetch(\PDO::FETCH_ASSOC);	

		$merchorderinitem_qty = $row['merchorderinitem_qty'];
		$merchorderinitem_subtotal = $row['merchorderinitem_subtotal'];



		try {
			$sql_update = "
				update trn_merchorderin
				set
				merchorderin_totalitem = :merchorderin_totalitem,
				merchorderin_totalqty = :merchorderin_totalitem,
				merchorderin_subtotal = :merchorderin_subtotal,
				merchorderin_total = :merchorderin_subtotal
				where
				merchorderin_id = :merchorderin_id
			";

			$this->log($sql_update);
			$stmt_update = $this->db->prepare($sql_update);

			$param = [
				':merchorderin_id'=>$merchorderin_id,
				':merchorderin_totalitem' => $merchorderinitem_qty,
				':merchorderin_subtotal' => $merchorderinitem_subtotal
			];

			$stmt_update->execute($param);


		} catch (\Exception $ex) {
			throw $ex;
		}

	}	
}		
		
		
		