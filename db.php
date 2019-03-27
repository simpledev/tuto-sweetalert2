<?php

try{
	$db = new PDO('mysql:host=localhost;dbname=sweetalert', 'root', 'root', [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_PERSISTENT => true,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
	]);
}
catch(Exception $e){
	echo 'Erreur : '.$e->getMessage();exit;
}