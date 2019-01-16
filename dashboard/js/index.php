<?php
/**
 * Created by PhpStorm.
 * User: Shadow
 * Date: 11/27/2016
 * Time: 12:53 AM
 */
session_start();
$msg="";
if($_SESSION["id"]!="Done")
{
    $msg="Error Id!";
}
else
{
    $msg="Done";
}

if($_POST["msg"]) {
    $newmsg = $_POST["msg"];
    $msg = $newmsg;
    $_SESSION["id"]="Done";
}
?>

<html>
<header>


</header>
<body>

<h3>Welcome <?php echo $msg ?></h3>
<form method="post" action="" >
    <input type="text" name="msg">
    <button type="submit">Submit</button>
</form>
</body>

</html>



