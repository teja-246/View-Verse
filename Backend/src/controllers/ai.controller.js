import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { GoogleGenAI} from "@google/genai";
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
  const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
  const { prompt } = req.body;

  if (prompt === ""){
    throw new ApiError(400, "Text is required")
  }

  let operation = await ai.models.generateVideos({
    model: "veo-3.0-generate-preview",
    prompt: prompt,
  })

  while(!operation.done){
    console.log("waiting for video generation to complete");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({
      operation: operation,
    });
  }

  ai.files.download({
    file: operation.response.generatedVideos[0].video,
    downloadPath: "./downloads/video.mp4",
  })
  console.log("Generated video saved");
  return res.json(new ApiResponse(200, operation.response.generatedVideos[0], "Content generated successfully"));
});

const textGenerate = asyncHandler(async (req,res) =>{
    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
    const { prompt } = req.body;

    if (prompt === ""){
        throw new ApiError(400, "Text is required")
    }

    let operation = await ai.models.generateText({
        model: "text-bison-001",
        prompt: `Generate a suitable Title and Description for the following content and give it in the form of a json with title first and description next: ${prompt}`,
    })

    while(!operation.done){
        console.log("waiting for text generation to complete");
        await new Promise((resolve) => setTimeout(resolve, 10000));
        operation = await ai.operations.getTextOperation({
            operation: operation,
        });
    }

    return res.json(new ApiResponse(200, operation.response.generatedText, "Texts generated successfully"));
});

const thumbnailGenerate = asyncHandler(async (req,res) =>{
    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
    const { prompt } = req.body;

    if (prompt === ""){
        throw new ApiError(400, "Text is required")
    }

    let operation = await ai.models.generateImage({
        model: "image-bison-001",
        prompt: `Generate a suitable image for the thumbnail of the following content: ${prompt}`,
    })

    while(!operation.done){
        console.log("waiting for image generation to complete");
        await new Promise((resolve) => setTimeout(resolve, 10000));
        operation = await ai.operations.getImageOperation({
            operation: operation,
        });
    }

    return res.json(new ApiResponse(200, operation.response.generatedImage, "Thumbnail generated successfully"));
});

export { textParser, autoContentGenerate, textGenerate, thumbnailGenerate };