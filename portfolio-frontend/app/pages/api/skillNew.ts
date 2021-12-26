export default function handler(req: any, res: any) {
  if (req.method == "POST") {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/skills`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    res.status(200).end();
  } else {
    res.status(405).end();
  }
}
