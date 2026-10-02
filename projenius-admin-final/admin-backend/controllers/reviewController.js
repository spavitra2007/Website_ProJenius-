const axios = require("axios");

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const GOOGLE_PLACES_SEARCH_URL =
    "https://places.googleapis.com/v1/places:searchText";

const GOOGLE_PLACE_DETAILS_URL =
    "https://places.googleapis.com/v1/places";


/* =========================================================
   GET PROJENIUS GOOGLE REVIEWS
========================================================= */

const getGoogleReviews = async (req, res) => {
    try {

        if (!GOOGLE_API_KEY) {
            return res.status(500).json({
                success: false,
                message: "GOOGLE_MAPS_API_KEY is missing in .env",
            });
        }


        /* =====================================================
           STEP 1 — FIND PROJENIUS PLACE
        ===================================================== */

        const searchResponse = await axios.post(
            GOOGLE_PLACES_SEARCH_URL,
            {
                textQuery:
                    "ProJenius Innovation Technology Private Limited Madurai",
                languageCode: "en",
                maxResultCount: 5,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": GOOGLE_API_KEY,

                    "X-Goog-FieldMask":
                        "places.id,places.displayName,places.formattedAddress",
                },
                timeout: 10000,
            }
        );


        const places =
            searchResponse.data?.places || [];


        if (!places.length) {
            return res.status(404).json({
                success: false,
                message: "ProJenius Google place was not found",
            });
        }


        /* =====================================================
           TRY TO SELECT EXACT BUSINESS
        ===================================================== */

        const exactPlace =
            places.find((place) =>
                place.displayName?.text
                    ?.toLowerCase()
                    .includes("projenius")
            ) || places[0];


        const placeId = exactPlace.id;


        if (!placeId) {
            return res.status(404).json({
                success: false,
                message: "Google Place ID was not found",
            });
        }


        /* =====================================================
           STEP 2 — GET PLACE DETAILS + REVIEWS
        ===================================================== */

        const detailsResponse = await axios.get(
            `${GOOGLE_PLACE_DETAILS_URL}/${placeId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": GOOGLE_API_KEY,

                    "X-Goog-FieldMask":
                        [
                            "id",
                            "displayName",
                            "formattedAddress",
                            "rating",
                            "userRatingCount",
                            "reviews",
                            "googleMapsUri",
                        ].join(","),
                },

                timeout: 10000,
            }
        );


        const place = detailsResponse.data;


        /* =====================================================
           FORMAT REVIEWS FOR FRONTEND
        ===================================================== */

        const reviews = (place.reviews || []).map(
            (review, index) => {

                return {
                    id:
                        `${placeId}-${index}`,

                    authorName:
                        review.authorAttribution
                            ?.displayName ||
                        "Google User",

                    authorPhoto:
                        review.authorAttribution
                            ?.photoUri ||
                        "",

                    rating:
                        Number(review.rating) || 0,

                    text:
                        review.text?.text ||
                        "",

                    relativeTime:
                        review.relativePublishTimeDescription ||
                        "",

                    publishTime:
                        review.publishTime ||
                        "",

                    googleMapsUri:
                        review.authorAttribution
                            ?.uri ||
                        place.googleMapsUri ||
                        "",
                };
            }
        );


        /* =====================================================
           RESPONSE
        ===================================================== */

        return res.status(200).json({

            success: true,

            business: {
                name:
                    place.displayName?.text ||
                    "ProJenius Innovation Technology Private Limited",

                address:
                    place.formattedAddress ||
                    "",

                rating:
                    Number(place.rating) || 0,

                totalReviews:
                    Number(place.userRatingCount) || 0,

                googleMapsUrl:
                    place.googleMapsUri || "",
            },

            reviews,

        });

    } catch (error) {

        console.error(
            "========================================"
        );

        console.error(
            "Google Reviews API Error"
        );

        console.error(
            error.response?.data ||
            error.message
        );

        console.error(
            "========================================"
        );


        return res.status(
            error.response?.status || 500
        ).json({

            success: false,

            message:
                error.response?.data?.error?.message ||
                "Failed to fetch Google reviews",

        });
    }
};


module.exports = {
    getGoogleReviews,
};