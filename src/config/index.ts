const config = {
    port: process.env.PORT || 3000,
    mongoUrl: process.env.MONGO_URL || "mongodb://user123:senha123@localhost:27017",
};

export default config;