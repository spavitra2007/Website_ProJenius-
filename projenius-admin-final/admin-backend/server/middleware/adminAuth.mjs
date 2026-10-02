export function requireAdmin(req, res, next) {
  const expectedToken = process.env.ADMIN_API_TOKEN;
  const authHeader = req.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!expectedToken) {
    res.status(500).json({ error: "ADMIN_API_TOKEN is not configured." });
    return;
  }

  if (token !== expectedToken) {
    res.status(401).json({ error: "Unauthorized." });
    return;
  }

  next();
}
