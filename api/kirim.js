export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: false, reason: 'Pakai POST' })
  }

  try {
    const body = await req.json();
    const { nama, wa, menu, harga, tgl, jam } = body;
    
    const token = "8BrJG3zsBmCxwcqLAa9J";
    const target_grup = "120363401234567890@g.us";

    const message = `🎉 *PENUKARAN BARU KENPOP* 🎉\n\n👤 Nama: ${nama}\n📱 WA: ${wa}\n🎁 Menu: ${menu}\n💎 Harga: ${Number(harga).toLocaleString('id')} Koin\n📅 ${tgl} ${jam}`;

    const fonnte = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: { 
        'Authorization': token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ target: target_grup, message: message })
    });
    
    const data = await fonnte.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ status: false, reason: error.message });
  }
}
