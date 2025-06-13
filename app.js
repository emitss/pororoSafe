const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); //para manejar JSON en las peticiones
app.use("/api/auth", authRoutes); // rutas de autenticación
app.use("/api", movieRoutes);
app.use("/api", favoriteRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
