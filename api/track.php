<?php
// ===== TRACK VISITEUR =====

// Ton webhook Discord (remplace par ton vrai webhook si besoin)
$webhook_url = "https://discord.com/api/webhooks/1442435182580862977/L3IHk1qfduhQrpvFHjYufUwevXlK60Mg3EOw6FcsR4JR7pxdn9BrjM2FtaJ2dHyoQb6_";

// Récupérer les infos du visiteur
$ip = $_SERVER['REMOTE_ADDR'] ?? 'IP inconnue';
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'User-Agent inconnu';
$referer = $_SERVER['HTTP_REFERER'] ?? 'Direct';
$time = date('Y-m-d H:i:s');

// Préparer le message à envoyer
$data = [
    "content" => "👤 **Nouveau visiteur**\n• IP: $ip\n• Navigateur: $user_agent\n• Provenance: $referer\n• Heure: $time"
];

// Initialiser cURL
$ch = curl_init($webhook_url);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Exécuter la requête
$response = curl_exec($ch);
curl_close($ch);

// Retourner un petit JSON pour le fetch
echo json_encode([
    "status" => "ok",
    "ip" => $ip,
    "user_agent" => $user_agent
]);
?>
