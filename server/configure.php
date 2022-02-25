<?php

$conn = new mysqli("localhost","root", "", "beautypala");
    
    if(!$conn){
        echo "failed to connect to database";
    }else{
    }

    define("BASE_URL", "http://localhost/developer/projects/beutyPala");
?>