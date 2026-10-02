const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const courseRoutes = require("./routes/courseRoutes");
const newsRoutes = require("./routes/newsRoutes");
const contactRoutes = require("./routes/contactRoutes");
const googleReviewRoutes = require("./routes/googleReviewRoutes");

const app = express();


/* =========================================================
   CONFIGURATION
========================================================= */

const PORT = Number(process.env.PORT) || 5000;

const FRONTEND_URL =
    process.env.FRONTEND_URL || "http://localhost:5173";


/* =========================================================
   DATABASE
========================================================= */

connectDB();


/* =========================================================
   CORS
========================================================= */

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);


/* =========================================================
   BODY PARSER
========================================================= */

app.use(
    express.json({
        limit: "1mb",
    })
);


/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Projenius backend is running",
    });
});


app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Projenius API is healthy",
    });
});


/* =========================================================
   API ROUTES
========================================================= */

app.use(
    "/api/courses",
    courseRoutes
);

app.use(
    "/api/news",
    newsRoutes
);

app.use(
    "/api",
    contactRoutes
);

app.use(
    "/api/reviews",
    googleReviewRoutes
);


/* =========================================================
   404 HANDLER
========================================================= */

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.originalUrl,
        method: req.method,
    });
});


/* =========================================================
   GLOBAL ERROR HANDLER
========================================================= */

app.use((err, req, res, next) => {

    console.error(
        "========================================"
    );

    console.error(
        "Backend Error:"
    );

    console.error(err);

    console.error(
        "========================================"
    );

    res.status(
        err.status || 500
    ).json({
        success: false,
        message:
            err.message ||
            "Internal server error",
    });
});


/* =========================================================
   START SERVER
========================================================= */

app.listen(
    PORT,
    () => {

        console.log(
            "========================================"
        );

        console.log(
            "Projenius Backend Started"
        );

        console.log(
            `Server: http://localhost:${PORT}`
        );

        console.log(
            `Health: http://localhost:${PORT}/api/health`
        );

        console.log(
            `Reviews: http://localhost:${PORT}/api/reviews`
        );

        console.log(
            `Frontend: ${FRONTEND_URL}`
        );

        console.log(
            "========================================"
        );
    }
);