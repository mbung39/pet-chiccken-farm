<?php
header('Content-Type: application/json');
$token = "8BrJG3zsBmCxwcqLAa9J"; 
$target_grup = "120363401234567890@g.us"; // ID grup KenPop

$nama   = $_POST['nama'] ?? '-';
$wa     = $_POST['wa'] ?? '-';
$menu   = $_POST['menu'] ?? '-';
$harga  = $_POST['harga'] ?? '0';
$tgl    = $_POST['tgl'] ?? '-';
$jam    = $_POST['jam'] ?? '-';

$message = "🎉 *PENUKARAN BARU KENPOP* 🎉\n\n"
         . "👤 Nama: $nama\n"
         . "📱 WA: $wa\n"
         . "🎁 Menu: $menu\n"
         . "💎 Harga: " . number_format($harga,0,',','.') . " Koin\n"
         . "📅 $tgl $jam\n\n"
         . "Mohon segera diproses min 🙏";

$curl = curl_init();
curl_setopt_array($curl, [
  CURLOPT_URL => 'https://api.fonnte.com/send',
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => ['target' => $target_grup, 'message' => $message],
  CURLOPT_HTTPHEADER => ["Authorization: $token"],
  CURLOPT_RETURNTRANSFER => true
]);
echo curl_exec($curl);
curl_close($curl);
?>
