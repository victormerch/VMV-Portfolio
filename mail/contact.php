<?php
if(empty($_GET['name']) || empty($_GET['subject']) || empty($_GET['message']) || !filter_var($_GET['email'], FILTER_VALIDATE_EMAIL)) {
  http_response_code(500);
  exit();
}

$name = strip_tags(htmlspecialchars($_GET['name']));
$email = strip_tags(htmlspecialchars($_GET['email']));
$m_subject = strip_tags(htmlspecialchars($_GET['subject']));
$message = strip_tags(htmlspecialchars($_GET['message']));

$to = "1Victormerch@gmail.com"; // Change this email to your //
$subject = "$m_subject:  $name";
$body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\n\nEmail: $email\n\nSubject: $m_subject\n\nMessage: $message";
$header = "From: $email";
$header .= "Reply-To: $email";	

if(!mail($to, $subject, $body, $header))
  http_response_code(500);
?>