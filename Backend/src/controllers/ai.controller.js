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
                            "text": `Modify the following text into professional language. Correct the grammar if any and replace the problematic words/phrases with appropriate alternatives. Also make sure to keep the original meaning of the text and try to keep the length of the text close to the input text.:"${text}"
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

const autoContentGenerate = asyncHandler(async (req, res) => {
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
                            "text": `This is a description text. A video is made on the basis of this description and will be uploaded on social media. Generate a suitable title and a short, precise description for the video to be uploaded on social media platforms:"${text}"
                            Return the generated title and description in a json format like: 
                            {
                                title: "generated title", 
                                description: "generated description"
                            }.`
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

    if (!script || script.trim() === "") {
        throw new ApiError(400, "Script is required");
    }

    const url = 'https://text-to-video.p.rapidapi.com/v3/process_text_and_search_media';

    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': api_key,
            'x-rapidapi-host': 'text-to-video.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({  // ✅ Convert body to JSON string
            script: script,
            dimension: '16:9'
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();  // ✅ parse as JSON if the API returns JSON
        console.log(result);

        return res.json(new ApiResponse(200, response, "Text converted to video successfully"));
    }
    catch (error) {
        console.error("Error converting text to video:", error);
        throw new ApiError(500, "Error converting text to video");
    }
});


export { textParser, textToVideo, autoContentGenerate }