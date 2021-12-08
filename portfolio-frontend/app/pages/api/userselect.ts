export default function handler(req: any, res: any) {
  if (req.method == "GET") {
    const user = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    return user;
  } else {
    return undefined;
  }
}
