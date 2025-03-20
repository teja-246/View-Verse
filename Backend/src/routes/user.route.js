import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
} from '../controllers/user.controller.js'
import {
    uploadVideo,
    getRequiredVideo,
    deleteVideo,
    editVideo,
    getVideos,
    addComment,
    getComments,
    createPlaylist,
    addToPLaylist,
    getPlaylists,
    getPlaylistVideos
} from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
// User routes
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)

// Video Routes
router.route("/upload-video").post(verifyJWT, upload.fields([
    {
        name: "videoFile",
        maxCount: 1
    },
    {
        name: "thumbnail",
        maxCount: 1
    }
]), uploadVideo)
router.route("/get-required-video/:id").get(getRequiredVideo)
router.route("/get-videos").get(getVideos)
router.route("/delete-video/:id").delete(verifyJWT, deleteVideo)
router.route("/edit-video/:id").patch(verifyJWT, editVideo)
router.route("/add-comment/:id").post(verifyJWT, addComment)
router.route("/get-comments/:id").get(getComments)
router.route("/create-playlist").post(verifyJWT, createPlaylist)
router.route("/playlists/:id/add-video").post(verifyJWT, addToPLaylist)
router.route("/playlists").get(verifyJWT, getPlaylists)
router.route("/playlists/:id").get(verifyJWT, getPlaylistVideos)


export default router