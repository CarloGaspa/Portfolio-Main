export default function handler(req, res) {
  console.log("API test reached");
  return res.status(200).json({ message: "API working!" });
}
