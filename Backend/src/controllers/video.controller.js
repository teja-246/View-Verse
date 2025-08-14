import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";
import { Playlist } from "../models/playlist.model.js";
import { Like } from "../models/like.model.js";
import { Subscription } from "../models/subscription.model.js";

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

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, videos } = req.body;
    const playlist = new Playlist({
        name,
        videos,
        owner: req.user._id
    })
    await playlist.save()
    return res.json(new ApiResponse(200, playlist, "Playlist created successfully"))
})

const addToPLaylist = asyncHandler(async (req, res) => {
    const playlist = await Playlist.findById(req.params.id)
    if (!playlist) {
        throw new ApiError(404, "Playlist not found")
    }
    if (playlist.videos.includes(req.body.videoId)) {
        throw new ApiError(400, "Video already exists in playlist")
    }
    playlist.videos.push(req.body.videoId)
    await playlist.save()
    return res.json(new ApiResponse(200, playlist, "Video added to playlist successfully"))
})

const getPlaylists = asyncHandler(async (req, res) => {
    const playlists = await Playlist.find({ owner: req.user._id }).populate("videos")
    return res.json(new ApiResponse(200, playlists, "Playlists retrieved successfully"))
})

const getPlaylistVideos = asyncHandler(async (req, res) => {
    const playlist = await Playlist.findById(req.params.id).populate("videos")
    return res.json(new ApiResponse(200, playlist.videos, "Playlist videos retrieved successfully"))
})

const toggleLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const existingLike = await Like.findOne({ video: videoId, likedBy: req.user._id });

    if (existingLike) {
        // Unlike the video
        await existingLike.deleteOne();

        const newCount = await Like.countDocuments({ video: videoId });
        return res.json(
            new ApiResponse(200, { liked: false, likesCount: newCount }, "Video unliked successfully")
        );
    } else {
        // Like the video
        const like = new Like({
            video: videoId,
            likedBy: req.user._id
        });
        await like.save();

        const newCount = await Like.countDocuments({ video: videoId });
        return res.json(
            new ApiResponse(200, { liked: true, likesCount: newCount }, "Video liked successfully")
        );
    }
});

const getLikeCount = asyncHandler(async (req, res) => {
    const videoId = req.params.id;
    const userId = req.user?._id; // from your auth middleware

    // Total likes
    const likeCount = await Like.countDocuments({ video: videoId });

    // Check if the logged-in user has liked this video
    let isLiked = false;
    if (userId) {
        const existingLike = await Like.exists({ video: videoId, likedBy: userId });
        isLiked = !!existingLike;
    }

    return res.json(
        new ApiResponse(
            200,
            {
                likesCount: likeCount,
                isLiked
            },
            "Like count retrieved successfully"
        )
    );
});

const dislikeVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const userId = req.user._id;

    // Check if the user has already liked this video
    const existingLike = await Like.findOne({ video: videoId, likedBy: userId });

    if (existingLike) {
        // Remove the like
        await existingLike.deleteOne();
    }

    // Return updated like count
    const newCount = await Like.countDocuments({ video: videoId });

    return res.json(
        new ApiResponse(
            200,
            { disliked: true, likesCount: newCount },
            existingLike
                ? "Like removed, video disliked"
                : "Video disliked (no like to remove)"
        )
    );
});

const subscribeToChannel = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    const userId = req.user._id;

    // Check if the user is already subscribed
    const existingSubscription = await Subscription.findOne({ channel: channelId, subscriber: userId });

    if (existingSubscription) {
        // Unsubscribe
        await existingSubscription.deleteOne();
        return res.json(new ApiResponse(200, { subscribed: false }, "Unsubscribed successfully"));
    } else {
        // Subscribe
        const subscription = new Subscription({ channel: channelId, subscriber: userId });
        await subscription.save();
        return res.json(new ApiResponse(200, { subscribed: true }, "Subscribed successfully"));
    }
});

const getSubscribedOrNot = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    const userId = req.user._id;

    const existingSubscription = await Subscription.findOne({ channel: channelId, subscriber: userId });

    return res.json(new ApiResponse(200, { subscribed: !!existingSubscription }, "Subscription status retrieved successfully"));
});

const getSubscriptions = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const subscriptions = await Subscription.find({ subscriber: userId }).populate("channel");
    return res.json(new ApiResponse(200, subscriptions, "Subscriptions retrieved successfully"));
});

export { uploadVideo, getRequiredVideo, deleteVideo, editVideo, getVideos, addComment, getComments, createPlaylist, addToPLaylist, getPlaylists, getPlaylistVideos, toggleLike, getLikeCount, dislikeVideo, subscribeToChannel, getSubscribedOrNot, getSubscriptions }