import mongoose from "mongoose";
import { DB_NAME } from "./constants";

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error
        })
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to port ${process.env.PORT}`);

        })
    }
    catch (error) {
        console.log('ERROR:', error);
        throw err
    }
})()