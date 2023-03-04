import connectDB from "../database/connect.js";

const startServer = async (app) => {
    try {
        connectDB(process.env.MONGODB_URL);
        
        app.listen(3333, () => {
            console.log("Server has started on port http://localhost:3333");
        });

    } catch (err) {
        console.log(err);
    }
}

export default startServer;