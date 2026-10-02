const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();


/* =========================================================
   EMAIL CONFIGURATION
========================================================= */

const MAIL_USER =
    process.env.MAIL_USER ||
    "teamprojenius@gmail.com";

const MAIL_RECEIVER =
    process.env.MAIL_RECEIVER ||
    "teamprojenius@gmail.com";

const MAIL_APP_PASSWORD =
    process.env.MAIL_APP_PASSWORD;


/* =========================================================
   EMAIL TRANSPORTER
========================================================= */

const transporter =
    nodemailer.createTransport({

        service: "gmail",

        auth: {
            user: MAIL_USER,
            pass: MAIL_APP_PASSWORD,
        },

    });


/* =========================================================
   VERIFY EMAIL SERVICE
========================================================= */

transporter.verify(
    (error) => {

        if (error) {

            console.error(
                "========================================"
            );

            console.error(
                "EMAIL SERVICE ERROR"
            );

            console.error(
                error.message
            );

            console.error(
                "========================================"
            );

        } else {

            console.log(
                "Email service is ready"
            );

        }

    }
);


/* =========================================================
   POST /api/contact
========================================================= */

router.post(
    "/contact",
    async (req, res) => {

        try {

            /* =================================================
               CHECK EMAIL CONFIGURATION
            ================================================= */

            if (!MAIL_APP_PASSWORD) {

                console.error(
                    "MAIL_APP_PASSWORD is missing in .env"
                );

                return res.status(500).json({
                    success: false,
                    message:
                        "Email service is not configured correctly.",
                });

            }


            /* =================================================
               GET REQUEST DATA
            ================================================= */

            const {
                name,
                email,
                phone,
                service,
                message,
            } = req.body;


            /* =================================================
               VALIDATION
            ================================================= */

            if (
                !name ||
                !email ||
                !phone ||
                !service ||
                !message
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Please provide all required details.",
                });

            }


            /* =================================================
               CLEAN DATA
            ================================================= */

            const clientName =
                String(name).trim();

            const clientEmail =
                String(email).trim();

            const clientPhone =
                String(phone).trim();

            const clientService =
                String(service).trim();

            const clientMessage =
                String(message).trim();


            /* =================================================
               EMAIL VALIDATION
            ================================================= */

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(clientEmail)) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Please provide a valid email address.",
                });

            }


            /* =================================================
               LENGTH VALIDATION
            ================================================= */

            if (clientName.length > 100) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Name is too long.",
                });

            }


            if (clientEmail.length > 150) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Email address is too long.",
                });

            }


            if (clientPhone.length > 30) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Phone number is too long.",
                });

            }


            if (clientService.length > 150) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Service name is too long.",
                });

            }


            if (clientMessage.length > 5000) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Project details are too long.",
                });

            }


            /* =================================================
               EMAIL TO PROJENIUS
            ================================================= */

            const adminMail = {

                from:
                    `"ProJenius Website" <${MAIL_USER}>`,

                to:
                    MAIL_RECEIVER,

                replyTo:
                    clientEmail,

                subject:
                    `New Project Enquiry - ${clientName}`,

                text: `
New Project Enquiry
===================

A new project enquiry has been submitted through the ProJenius website.

CLIENT DETAILS
--------------

Name:
${clientName}

Email:
${clientEmail}

Phone:
${clientPhone}

Service Interested In:
${clientService}

Project Details:
${clientMessage}


Reply directly to this email to contact the client.

ProJenius
Innovation Technology Private Limited
Madurai, Tamil Nadu
                `.trim(),

                html: `
<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <title>
        New Project Enquiry
    </title>

</head>

<body
    style="
        margin:0;
        padding:0;
        background:#f4f6f8;
        font-family:Arial,Helvetica,sans-serif;
        color:#1a1a1a;
    "
>

    <div
        style="
            max-width:700px;
            margin:30px auto;
            background:#ffffff;
            padding:35px;
            border-radius:12px;
        "
    >

        <h2
            style="
                margin:0 0 20px;
                color:#0b1426;
            "
        >
            New Project Enquiry
        </h2>


        <p>
            A new project enquiry has been
            submitted through the ProJenius website.
        </p>


        <hr
            style="
                border:0;
                border-top:1px solid #e5e7eb;
                margin:25px 0;
            "
        />


        <h3
            style="
                color:#0b1426;
            "
        >
            Client Details
        </h3>


        <p>
            <strong>Name:</strong>
            ${escapeHtml(clientName)}
        </p>


        <p>
            <strong>Email:</strong>
            ${escapeHtml(clientEmail)}
        </p>


        <p>
            <strong>Phone:</strong>
            ${escapeHtml(clientPhone)}
        </p>


        <p>
            <strong>Service:</strong>
            ${escapeHtml(clientService)}
        </p>


        <h3
            style="
                color:#0b1426;
                margin-top:30px;
            "
        >
            Project Details
        </h3>


        <div
            style="
                background:#f5f7fa;
                padding:20px;
                border-radius:8px;
                line-height:1.7;
                white-space:pre-wrap;
            "
        >
            ${escapeHtml(clientMessage)}
        </div>


        <p
            style="
                margin-top:25px;
                color:#68758a;
                font-size:13px;
            "
        >
            Reply directly to this email
            to contact the client.
        </p>


        <hr
            style="
                border:0;
                border-top:1px solid #e5e7eb;
                margin:25px 0;
            "
        />


        <p
            style="
                color:#68758a;
                font-size:13px;
            "
        >
            ProJenius<br />
            Innovation Technology Private Limited<br />
            Madurai, Tamil Nadu
        </p>

    </div>

</body>

</html>
                `,

            };


            /* =================================================
               CONFIRMATION EMAIL TO CLIENT
            ================================================= */

            const clientMail = {

                from:
                    `"ProJenius Team" <${MAIL_USER}>`,

                to:
                    clientEmail,

                subject:
                    "We've Received Your Project Enquiry - ProJenius",

                text: `
Hi ${clientName},

Thank you for contacting ProJenius.

We've successfully received your project enquiry.

SERVICE
${clientService}

PROJECT DETAILS
${clientMessage}

Our team will review your requirements and contact you shortly.

We appreciate your interest in working with ProJenius.

Regards,
ProJenius Team
Innovation Technology Private Limited
Madurai, Tamil Nadu
                `.trim(),

                html: `
<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <title>
        Thank You - ProJenius
    </title>

</head>

<body
    style="
        margin:0;
        padding:0;
        background:#f4f6f8;
        font-family:Arial,Helvetica,sans-serif;
        color:#1a1a1a;
    "
>

    <div
        style="
            max-width:700px;
            margin:30px auto;
            background:#ffffff;
            padding:35px;
            border-radius:12px;
        "
    >

        <h2
            style="
                margin:0 0 20px;
                color:#0b1426;
            "
        >
            Thank You for Contacting ProJenius!
        </h2>


        <p>
            Hi ${escapeHtml(clientName)},
        </p>


        <p>
            Thank you for reaching out to
            <strong>ProJenius</strong>.
        </p>


        <p>
            We've successfully received your
            project enquiry.
        </p>


        <div
            style="
                margin:25px 0;
                padding:20px;
                background:#f5f7fa;
                border-radius:8px;
            "
        >

            <p>
                <strong>
                    Service:
                </strong>

                ${escapeHtml(clientService)}
            </p>


            <p>
                <strong>
                    Your Requirements:
                </strong>
            </p>


            <p
                style="
                    line-height:1.7;
                    white-space:pre-wrap;
                "
            >
                ${escapeHtml(clientMessage)}
            </p>

        </div>


        <p>
            Our team will review your requirements
            and contact you shortly with the next steps.
        </p>


        <p>
            We appreciate your interest in
            working with ProJenius.
        </p>


        <p
            style="
                margin-top:30px;
            "
        >
            Regards,<br />

            <strong>
                ProJenius Team
            </strong>
        </p>


        <p
            style="
                color:#68758a;
                font-size:13px;
            "
        >
            Innovation Technology Private Limited<br />
            Madurai, Tamil Nadu
        </p>

    </div>

</body>

</html>
                `,

            };


            /* =================================================
               SEND ADMIN EMAIL
            ================================================= */

            console.log(
                `Sending enquiry email to ${MAIL_RECEIVER}...`
            );

            await transporter.sendMail(
                adminMail
            );

            console.log(
                "Admin email sent successfully."
            );


            /* =================================================
               SEND CLIENT EMAIL
            ================================================= */

            console.log(
                `Sending confirmation email to ${clientEmail}...`
            );

            await transporter.sendMail(
                clientMail
            );

            console.log(
                "Client confirmation email sent successfully."
            );


            /* =================================================
               SUCCESS RESPONSE
            ================================================= */

            return res.status(200).json({

                success: true,

                message:
                    "Your enquiry has been submitted successfully. A confirmation email has been sent to your inbox.",

            });


        } catch (error) {

            /* =================================================
               EMAIL ERROR
            ================================================= */

            console.error(
                "========================================"
            );

            console.error(
                "CONTACT EMAIL ERROR"
            );

            console.error(
                "Name:",
                error.name
            );

            console.error(
                "Message:",
                error.message
            );

            console.error(
                "Code:",
                error.code
            );

            console.error(
                "Command:",
                error.command
            );

            console.error(
                "========================================"
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to send your enquiry right now. Please try again later.",

            });

        }

    }
);


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   EXPORT
========================================================= */

module.exports = router;