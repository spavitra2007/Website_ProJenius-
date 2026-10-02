export const config = {
  api: {
    bodyParser: {
      sizeLimit: "12mb",
    },
  },
};

export default async function handler(req, res) {
  if (!["GET", "POST", "PUT", "DELETE"].includes(req.method)) {
    res.setHeader("Allow", "GET,POST,PUT,DELETE");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const backendUrl = process.env.BACKEND_API_URL;
  const adminToken = process.env.ADMIN_API_TOKEN;

  if (!backendUrl || !adminToken) {
    res.status(500).json({
      error: "BACKEND_API_URL and ADMIN_API_TOKEN must be configured in Vercel.",
    });
    return;
  }

  try {
    const blogId = typeof req.query.id === "string" ? req.query.id : "";
    const targetPath =
      req.method === "GET"
        ? "/api/blogs/admin/all"
        : req.method === "POST"
          ? "/api/blogs"
          : `/api/blogs/${blogId}`;

    if ((req.method === "PUT" || req.method === "DELETE") && !blogId) {
      res.status(400).json({ error: "Blog id is required." });
      return;
    }

    const response = await fetch(`${backendUrl.replace(/\/$/, "")}${targetPath}`, {
      method: req.method,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        "Content-Type": "application/json",
      },
      body: req.method === "GET" ? undefined : JSON.stringify(req.body || {}),
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : { error: await response.text() };

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Unable to reach blog API.",
    });
  }
}
