<?php
ob_start();
session_start();
use CRUD\Read;

require __DIR__ . "/../config.php";

$postData = filter_input_array(INPUT_POST, FILTER_DEFAULT);
$action = $postData['action'];
unset($postData['action']);
$postData = array_map('strip_tags', $postData);
$postData = (object) array_map('trim', $postData);
$users = new Read;
switch ($action) {
    case 'validate_email':
        $users->read("users", "where user_email ='{$postData->user_email}'");
        //$users->read("users", "where user_email =:email","email:{$postData->user_email}"); using parseString
        $result =$users->getResult();
        if($result){
            foreach ($result as $value) {
                $user = (object) $value;
                // var_dump($user->user_name);
            }
            $json['validate_email']=true;
            $json['user_name']= $user->user_name;
            $json['user_photo']= $user->user_photo;
            $_SESSION['user_email']= $user->user_email;
        }else{
            $json['validate_email']=false;
        }
        break;
        case 'validate_password':
           
            $users->read("users", "where user_email ='{$_SESSION['user_email']}' and user_password ='{$postData->user_password}'");
        //$users->read("users", "where user_password =:password","password={$postData->user_password}");

            $result =$users->getResult();
            if($result){
                foreach ($result as $value) {
                    $user = (object) $value;
                    // var_dump($user->user_name);
                }
                $json['validate_password']=true;
                $json['user']= $user;
            }else{
                $json['validate_password']=false;
            }
            break;
    
    default:
        # code...
        break;
}

echo json_encode($json);
ob_end_flush();