<?php
// Récupération des informations du visiteur
$ip = $_SERVER['REMOTE_ADDR'];
$browser = $_SERVER['HTTP_USER_AGENT'];
$page = $_SERVER['HTTP_REFERER'] ?? "Page inconnue";
$date = date("Y-m-d H:i:s");

// Géolocalisation simple via API gratuite
$geo = @file_get_contents("http://ip-api.com/json/$ip");
$geoData = json_decode($geo, true);

$country = $geoData['country'] ?? 'Inconnu';
$city = $geoData['city'] ?? 'Inconnue';

// Format du log
$log = "[$date] - IP: $ip - Page: $page - Browser: $browser - Pays: $country - Ville: $city\n";

// Stockage dans le fichier visites.log
file_put_contents(__DIR__ . "/../visites.log", $log, FILE_APPEND);

echo json_encode([
    "status" => "ok",
    "ip" => $ip,
    "country" => $country,
    "city" => $city
]);
?>
