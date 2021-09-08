<?php

use CRUD\Read;

require __DIR__ . "/../config.php";

$postData = filter_input_array(INPUT_POST, FILTER_DEFAULT);
$action = $postData['action'];
unset($postData['action']);
$postData = array_map('strip_tags', $postData);
$postData = (object) array_map('trim', $postData);
switch ($action) {
    case 'validate_email':
        $users = new Read;
        $users->read("users", "where user_email ='{$postData->user_email}'");
        $result =$users->getResult();
        if($result){
            foreach ($result as $value) {
                $user = (object) $value;
                // var_dump($user->user_name);
            }
            $json['validate_email']=true;
            $json['user_name']= $user->user_name;
            $json['user_photo']= $user->user_photo;
        }else{
            $json['validate_email']=false;
        }
        break;
    
    default:
        # code...
        break;
}

echo json_encode($json);