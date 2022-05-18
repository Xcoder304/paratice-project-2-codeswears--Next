export default function handler(req, res) {
  res.status(200).json([
    { name: "ABBAS PUR", code: 12200 },
    { name: "ABDUL GHAFOOR LEHRI", code: 80820 },
    { name: "ACHORI", code: 16320 },
    { name: "BADIN", code: 72200 },
    { name: "Pakka Qilla, Hyderabad", code: 17000 },
    { name: "Latifabad Unit 2,Hyderabad", code: 71800 },
    { name: "Zamanabad,Karachi", code: 12345 },
    { name: "PECHS, Karachi", code: 74000 },
    { name: "Bata Pur, Lahore", code: 53480 },
    { name: "Nasirabad Aitchison Society, Lahore", code: 40050 },
    { name: "G-10, Islamabad", code: 22222 },
  ]);
}
