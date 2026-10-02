import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf8"));
    });

    req.on("error", reject);
  });
}

function createAdminApiMiddleware(env) {
  const backendUrl =
    env.BACKEND_API_URL || "http://127.0.0.1:5000";

  const adminToken = env.ADMIN_API_TOKEN || "";

  return {
    name: "projenius-admin-api-middleware",

    configureServer(server) {
      const handleAdminRequest = async (
        req,
        res,
        resource
      ) => {
        if (
          !["GET", "POST", "PUT", "DELETE"].includes(
            req.method
          )
        ) {
          res.statusCode = 405;

          res.setHeader(
            "Content-Type",
            "application/json"
          );

          res.end(
            JSON.stringify({
              error: "Method not allowed.",
            })
          );

          return;
        }

        if (!adminToken) {
          res.statusCode = 500;

          res.setHeader(
            "Content-Type",
            "application/json"
          );

          res.end(
            JSON.stringify({
              error:
                "ADMIN_API_TOKEN is missing in .env.",
            })
          );

          return;
        }

        try {
          const url = new URL(
            req.url || "",
            "http://localhost"
          );

          const id = url.searchParams.get("id");

          let targetPath;

          const isVideoUpload = resource === "blogs" && url.pathname.endsWith("/video");

          if (isVideoUpload) {
            // Multipart video uploads are streamed directly to the backend.
            const response = await fetch(
              `${backendUrl.replace(/\/$/, "")}/api/blogs/video`,
              {
                method: req.method,
                headers: { Authorization: `Bearer ${adminToken}`, ...(req.headers["content-type"] ? { "Content-Type": req.headers["content-type"] } : {}) },
                body: req,
                duplex: "half",
              },
            );
            const text = await response.text();
            res.statusCode = response.status;
            res.setHeader("Content-Type", response.headers.get("content-type") || "application/json");
            res.end(text);
            return;
          }

          if (req.method === "GET") {
            targetPath = `/api/${resource}/admin/all`;
          } else if (req.method === "POST") {
            targetPath = `/api/${resource}`;
          } else {
            targetPath = `/api/${resource}/${id || ""}`;
          }

          if (
            (req.method === "PUT" ||
              req.method === "DELETE") &&
            !id
          ) {
            res.statusCode = 400;

            res.setHeader(
              "Content-Type",
              "application/json"
            );

            res.end(
              JSON.stringify({
                error: `${resource.slice(
                  0,
                  -1
                )} id is required.`,
              })
            );

            return;
          }

          const rawBody =
            req.method === "GET"
              ? undefined
              : await readRequestBody(req);

          const response = await fetch(
            `${backendUrl.replace(/\/$/, "")}${targetPath}`,
            {
              method: req.method,

              headers: {
                Authorization: `Bearer ${adminToken}`,
                "Content-Type": "application/json",
              },

              body: rawBody,
            }
          );

          const text = await response.text();

          res.statusCode = response.status;

          res.setHeader(
            "Content-Type",
            response.headers.get(
              "content-type"
            ) || "application/json"
          );

          res.end(text);
        } catch (error) {
          console.error(
            "Admin API middleware error:",
            error
          );

          res.statusCode = 500;

          res.setHeader(
            "Content-Type",
            "application/json"
          );

          res.end(
            JSON.stringify({
              error:
                error?.message ||
                "Unable to reach backend API.",
            })
          );
        }
      };

      /*
       * ADMIN BLOG API
       */

      server.middlewares.use(
        "/api/admin/blogs",
        (req, res) => {
          handleAdminRequest(
            req,
            res,
            "blogs"
          );
        }
      );

      /*
       * ADMIN COURSE API
       */

      server.middlewares.use(
        "/api/admin/courses",
        (req, res) => {
          handleAdminRequest(
            req,
            res,
            "courses"
          );
        }
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(
    mode,
    process.cwd(),
    ""
  );

  return {
    plugins: [
      react(),
      createAdminApiMiddleware(env),
    ],

    /*
     * ==========================================
     * PUBLIC API PROXY
     * ==========================================
     *
     * Frontend:
     * /api/courses
     *
     * goes to:
     * http://127.0.0.1:5000/api/courses
     */

    server: {
      proxy: {
        "/api": {
          target:
            env.BACKEND_API_URL ||
            "http://127.0.0.1:5000",

          changeOrigin: true,

          secure: false,
        },
      },
    },
  };
});