<?php
header('Content-Type: application/json');

// SETTING RAHASIA
$token = "8BrJG3zsBmCxwcqLAa9J"; 
$target_grup = "120363401234567890@g.us"; // ID grup KenPop

// AMBIL DATA DARI JS
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

// KIRIM KE FONNTE
$curl = curl_init();
curl_setopt_array($curl, [
  CURLOPT_URL => 'https://api.fonnte.com/send',
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => ['target' => $target_grup, 'message' => $message],
  CURLOPT_HTTPHEADER => ["Authorization: $token"],
  CURLOPT_RETURNTRANSFER => true
]);
$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

// BALIKIN KE JS BENTUK JSON
if($err){
    echo json_encode(['status' => false, 'reason' => $err]);
} else {
    $res = json_decode($response, true);
    if(isset($res['status']) && $res['status'] == true){
        echo json_encode(['status' => true, 'pesan' => 'Terkirim']);
    } else {
        echo json_encode(['status' => false, 'reason' => $response]);
    }
}
?>
