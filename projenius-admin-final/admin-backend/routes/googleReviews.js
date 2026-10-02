const express = require("express");

const router = express.Router();


/* =========================================================
   GOOGLE PLACES CONFIGURATION
========================================================= */

const GOOGLE_API_KEY =
    process.env.GOOGLE_MAPS_API_KEY;


/*
   Exact company name used for Google search.
*/
const PLACE_SEARCH_TEXT =
    "ProJenius Innovation Technology Private Limited, Madurai";


/*
   Google Maps listing URL.
*/
const GOOGLE_MAPS_URL =
    "https://www.google.com/maps/place/ProJenius+Innovation+Technology+Private+Limited/@9.9136785,78.0876084,17z";


/* =========================================================
   HELPER
========================================================= */

function cleanText(text) {

    if (!text) {
        return "";
    }

    if (typeof text === "string") {
        return text;
    }

    /*
       Google Places API sometimes returns
       localizedText / text objects.
    */

    if (text.text) {
        return text.text;
    }

    return "";
}


/* =========================================================
   GET GOOGLE REVIEWS
========================================================= */

router.get("/", async (req, res) => {

    try {

        /* -----------------------------------------------
           API KEY CHECK
        ------------------------------------------------ */

        if (!GOOGLE_API_KEY) {

            return res.status(500).json({
                success: false,
                message:
                    "GOOGLE_MAPS_API_KEY is missing in backend .env file.",
            });

        }


        /* -----------------------------------------------
           SEARCH FOR PROJENIUS PLACE
        ------------------------------------------------ */

        const searchResponse =
            await fetch(
                "https://places.googleapis.com/v1/places:searchText",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",

                        "X-Goog-Api-Key":
                            GOOGLE_API_KEY,

                        "X-Goog-FieldMask":
                            "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.reviews,places.googleMapsUri",
                    },

                    body: JSON.stringify({

                        textQuery:
                            PLACE_SEARCH_TEXT,

                        languageCode:
                            "en",

                        maxResultCount: 5,

                    }),
                }
            );


        /* -----------------------------------------------
           GOOGLE SEARCH ERROR
        ------------------------------------------------ */

        if (!searchResponse.ok) {

            const errorText =
                await searchResponse.text();

            console.error(
                "Google Places Search Error:",
                errorText
            );

            return res.status(
                searchResponse.status
            ).json({
                success: false,
                message:
                    "Google Places search failed.",
                error:
                    errorText,
            });

        }


        const searchData =
            await searchResponse.json();


        /* -----------------------------------------------
           CHECK PLACE
        ------------------------------------------------ */

        if (
            !searchData.places ||
            searchData.places.length === 0
        ) {

            return res.status(404).json({
                success: false,
                message:
                    "ProJenius Google Maps place was not found.",
                reviews: [],
            });

        }


        /*
           First result should be ProJenius because
           the search text is highly specific.
        */

        const place =
            searchData.places[0];


        /* -----------------------------------------------
           FORMAT REVIEWS
        ------------------------------------------------ */

        const reviews =
            Array.isArray(place.reviews)
                ? place.reviews.map(
                    (review) => {

                        const author =
                            review.authorAttribution ||
                            {};

                        return {

                            id:
                                review.name ||
                                `${author.displayName || "Google User"}-${review.publishTime || Date.now()}`,

                            authorName:
                                author.displayName ||
                                "Google User",

                            authorPhoto:
                                author.photoUri ||
                                "",

                            authorUri:
                                author.uri ||
                                "",

                            rating:
                                Number(
                                    review.rating || 0
                                ),

                            text:
                                cleanText(
                                    review.text
                                ),

                            relativeTime:
                                review.relativePublishTimeDescription ||
                                "",

                            publishTime:
                                review.publishTime ||
                                "",

                            googleMapsUri:
                                review.googleMapsUri ||
                                place.googleMapsUri ||
                                GOOGLE_MAPS_URL,

                        };

                    }
                )
                : [];


        /* -----------------------------------------------
           SORT
           Newest reviews first
        ------------------------------------------------ */

        reviews.sort(
            (a, b) => {

                const dateA =
                    new Date(
                        a.publishTime || 0
                    ).getTime();

                const dateB =
                    new Date(
                        b.publishTime || 0
                    ).getTime();

                return dateB - dateA;

            }
        );


        /* -----------------------------------------------
           RESPONSE
        ------------------------------------------------ */

        return res.status(200).json({

            success: true,

            place: {

                id:
                    place.id || "",

                name:
                    place.displayName?.text ||
                    "ProJenius Innovation Technology Private Limited",

                address:
                    place.formattedAddress ||
                    "",

                rating:
                    Number(
                        place.rating || 0
                    ),

                totalReviews:
                    Number(
                        place.userRatingCount || 0
                    ),

                googleMapsUri:
                    place.googleMapsUri ||
                    GOOGLE_MAPS_URL,

            },

            reviews,

            /*
               Google Places API may return only
               a limited number of reviews.
            */
            reviewCount:
                reviews.length,

        });

    }

    catch (error) {

        console.error(
            "========================================"
        );

        console.error(
            "GOOGLE REVIEWS ERROR"
        );

        console.error(error);

        console.error(
            "========================================"
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch Google reviews.",

            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,

            reviews: [],

        });

    }

});


module.exports = router;