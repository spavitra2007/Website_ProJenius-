export const config = {
  api: {
    bodyParser: false,
    responseLimit: "1gb",
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const backendUrl = process.env.BACKEND_API_URL;
  const adminToken = process.env.ADMIN_API_TOKEN;
  if (!backendUrl || !adminToken) return res.status(500).json({ error: "BACKEND_API_URL and ADMIN_API_TOKEN must be configured." });

  try {
    const response = await fetch(`${backendUrl.replace(/\/$/, "")}/api/blogs/video`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${adminToken}`,
        "Content-Type": req.headers["content-type"] || "application/octet-stream",
      },
      body: req,
      duplex: "half",
    });
    const text = await response.text();
    res.status(response.status).setHeader("Content-Type", response.headers.get("content-type") || "application/json").send(text);
  } catch (error) {
    res.status(500).json({ error: error.message || "Unable to reach video upload API." });
  }
}
