<?php
header("Content-Type: application/json");

// Replace with your EmailJS private key
$privateKey = "YOUR_EMAILJS_PRIVATE_KEY";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "error" => "Invalid request"]);
    exit;
}

$payload = [
    "service_id" => "service_9d4v51e",
    "template_id" => "template_u419r99",
    "user_id" => $privateKey,
    "template_params" => $data
];

$curl = curl_init("https://api.emailjs.com/api/v1.0/email/send");
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($curl);
$error = curl_error($curl);
curl_close($curl);

if ($error) {
    echo json_encode(["success" => false, "error" => $error]);
} else {
    echo json_encode(["success" => true]);
}
?>
