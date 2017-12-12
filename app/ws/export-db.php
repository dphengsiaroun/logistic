<?php 
require_once(BASE_DIR . "/include/misc.inc.php");
require_once(BASE_DIR . "/include/database.inc.php");

debug('export db start');

// get Users
$query = "SELECT * FROM xx_user";
if (!$result = mysqli_query($con, $query)) {
    exit(mysqli_error($con));
}

$users = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $users[] = $row;
    }
}

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=Users.csv');
$output = fopen('php://output', 'w');
fputcsv($output, array('Id', 'Email', 'Login', 'Phone', 'Password', 'Content'));

if (count($users) > 0) {
    foreach ($users as $row) {
        fputcsv($output, $row);
    }
}
