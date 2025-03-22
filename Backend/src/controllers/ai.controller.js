import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const textParser = asyncHandler(async (req, res) => {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;


    const { text } = req.body;

    if (text === "") {
        throw new ApiError(400, "Text is required")
    }

    const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "contents": [
                {
                    "parts": [
                        {
                            "text": `Modify the following text into professional language. Correct the grammar if any and replace the problematic words/phrases with appropriate alternatives. Also make sure to keep the original meaning of the text.:"${text}"
                            Return the modified text only.`
                        }
                    ]
                }
            ]
        }),
    });

    const data = await response.json();

    return res.json(new ApiResponse(200, data, "Text parsed successfully"))
});

const textToVideo = asyncHandler(async (req, res) => {
    const api_key = process.env.TEXT_TO_VIDEO_API_KEY;

    const { script } = req.body;

    if (script === "") {
        throw new ApiError(400, "Script is required")
    }

    const url = 'https://text-to-video.p.rapidapi.com/v3/process_text_and_search_media';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': api_key,
            'x-rapidapi-host': 'text-to-video.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: {
            script: script,
            dimension: '16:9'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();

        return res.json(new ApiResponse(200, result, "Text converted to video successfully"));
    } 
    catch (error) {
        throw new ApiError(500, "Error converting text to video");
    }
});

export { textParser, textToVideo }