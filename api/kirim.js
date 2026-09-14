export default async function handler(req, res) {
  // Biar ga CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ status: false, reason: 'Pakai POST' });
  }

  try {
    // Vercel udah auto parse JSON
    const { nama, wa, menu, harga, tgl, jam } = req.body;
    
    const token = "8BrJG3zsBmCxwcqLAa9J";
    const target_grup = "6285143890586@s.whatsapp.net"; // INI WA LU. NANTI GANTI KE ID GRUP

    const message = `🎉 *PENUKARAN BARU KENPOP* 🎉\n\n👤 Nama: ${nama}\n📱 WA: ${wa}\n🎁 Menu: ${menu}\n💎 Harga: ${Number(harga).toLocaleString('id-ID')} Koin\n📅 ${tgl} ${jam}`;

    const fonnteRes = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: { 
        'Authorization': token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ 
        target: target_grup, 
        message: message 
      })
    });
    
    const data = await fonnteRes.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ status: false, reason: error.message });
  }
}
