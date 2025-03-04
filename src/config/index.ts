const config = {
    port: process.env.PORT || 3000,
    mongoUrl: process.env.MONGO_URL || "mongodb://user123:senha123@localhost:27017",
    jwtSecret: process.env.JWT_SECRET || "e8a789d12c49ef4a8b4efbce8efcb6b830fc7336bf1aa101fd91b0c13f2159e80c88ea5c17ec331a6fc6bfb8aaab007f703a76b7ee668ec32213d3c98bbcf4f4"
};

export default config;