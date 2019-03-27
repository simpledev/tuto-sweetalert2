<?php
require 'db.php';
if(!empty($_GET['id'])){
	$id = (int) $_GET['id'];
	$req = $db->prepare('DELETE FROM tasks WHERE id=:id');
	$req->execute([':id'=>$id]);
	$response = ['success'=>'Tâche supprimée.'];
	echo json_encode($response);exit;
}
?>