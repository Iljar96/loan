<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

//От кого письмо
$mail->setFrom('kirasimow@mail.ru', 'pictures.ru');
//Кому отправить
$mail->addAddress('iljar646@gmail.com');
//Тема письма
$mail->Subject = 'Привет!';


//Тело письма
$body = '<h1>Обращение с сайта!</h1>';

if (trim(!empty($_POST['name']))) {
	$body .= '<p><strong>Имя:</strong> ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['phone']))) {
	$body .= '<p><strong>Номер телефона:</strong> ' . $_POST['phone'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
	$body .= '<p><strong>Email:</strong> ' . $_POST['email'] . '</p>';
}
if (trim(!empty($_POST['city']))) {
	$body .= '<p><strong>Город:</strong> ' . $_POST['city'] . '</p>';
}
if (trim(!empty($_POST['position']))) {
	$body .= '<p><strong>Позиция:</strong> ' . $_POST['position'] . '</p>';
}
if (trim(!empty($_POST['date']))) {
	$body .= '<p><strong>Дата:</strong> ' . $_POST['date'] . '</p>';
}

$mail->Body = $body;

//Отправляем
if (!$mail->send()) {
	$message = 'Ошибка';
} else {
	$message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
