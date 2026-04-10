export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({
    groq_key: process.env.GROQ_KEY || ''
  });
}
