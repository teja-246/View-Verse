import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";

const uploadVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const videoFileLocalPath = req.files["videoFile"][0].path;
    const thumbnailLocalPath = req.files["thumbnail"][0].path;

    if (title === "") {
        throw new ApiError(400, "Title is required")
    }
    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail is required")
    }
    if (!videoFileLocalPath) {
        throw new ApiError(400, "Video file is required")
    }

    const videoFile = await uploadOnCloudinary(videoFileLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    const video = new Video({
        videoFile : videoFile.url,
        thumbnail : thumbnail.url,
        title,
        description,
        owner: req.user._id
    })

    await video.save()

    return res.json(new ApiResponse(200, "Video uploaded successfully", video))
});

const getRequiredVideo = asyncHandler(async (req, res) => {
    const video = await Video.findById(req.params.id).populate("owner", "username avatar")
    if (!video) {
        throw new ApiError(404, "Video not found")
    }
    return res.json(new ApiResponse(200, video, "Video retrieved successfully"))
})

const getVideos = asyncHandler(async (req, res) => {
    const videos = await Video.find().populate("owner", "username avatar")
    return res.json(new ApiResponse(200, videos, "Videos retrieved successfully"))
})

const deleteVideo = asyncHandler(async (req, res) => {
    const video = await Video.findById(req.params.id)
    if (!video) {
        throw new ApiError(404, "Video not found")
    }
    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this video")
    }
    await video.remove()
    return res.json(new ApiResponse(200, "Video deleted successfully"))
})

const editVideo = asyncHandler(async (req, res) => {
    const video = await Video.findById(req.params.id)
    if (!video) {
        throw new ApiError(404, "Video not found")
    }
    // if (video.owner.toString() !== req.user._id.toString()) {
    //     throw new ApiError(403, "You are not authorized to edit this video")
    // }
    const { title, description } = req.body;
    video.title = title;
    video.description = description;
    await video.save()
    return res.json(new ApiResponse(200, "Video updated successfully", video))
})

const addComment = asyncHandler(async (req, res) => {
    const video = await Video.findById(req.params.id)
    if (!video) {
        throw new ApiError(404, "Video not found")
    }
    if (!req.body.content || req.body.content.trim() === "") {
        throw new ApiError(400, "Content is required");
    }
    const comment = new Comment({
        content: req.body.content,
        video: video._id,
        owner: req.user._id
    })
    await comment.save()
    return res.json(new ApiResponse(200, video, "Comment added successfully"))
})

const getComments = asyncHandler(async (req, res) => {
    const video = await Video.findById(req.params.id)
    if (!video) {
        throw new ApiError(404, "Video not found")
    }
    const comments = await Comment.find({ video: video._id }).populate("owner", "username avatar")
    return res.json(new ApiResponse(200, comments, "Comments retrieved successfully"))
})

export { uploadVideo, getRequiredVideo, deleteVideo, editVideo, getVideos, addComment, getComments }