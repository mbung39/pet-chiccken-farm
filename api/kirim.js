export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ status: false })

  const formData = await req.formData();
  const nama = formData.get('nama');
  const wa = formData.get('wa');
  const menu = formData.get('menu');
  const harga = formData.get('harga');
  const tgl = formData.get('tgl');
  const jam = formData.get('jam');
  
  const token = "8BrJG3zsBmCxwcqLAa9J";
  const target_grup = "120363401234567890@g.us";

  const message = `🎉 *PENUKARAN BARU KENPOP* 🎉\n\n👤 Nama: ${nama}\n📱 WA: ${wa}\n🎁 Menu: ${menu}\n💎 Harga: ${Number(harga).toLocaleString('id')} Koin\n📅 ${tgl} ${jam}`;

  const fonnte = await fetch('https://api.fonnte.com/send', {
    method: 'POST',
    headers: { 'Authorization': token },
    body: new URLSearchParams({ target: target_grup, message: message })
  });
  
  const data = await fonnte.json();
  return res.status(200).json(data);
}
