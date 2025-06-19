const fs = require("fs").promises;
const path = require("path");

const FAVORITES_FILE = path.join(process.cwd(), "data", "favoritos.txt");

// Lee todos los datos del archivo de favoritos
const readAllFavorites = async () => {
  try {
    const content = await fs.readFile(FAVORITES_FILE, "utf-8");
    return content ? JSON.parse(content) : [];
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
};

// Escribe todos los favoritos en el archivo
const writeAllFavorites = async (allFavorites) => {
  await fs.writeFile(FAVORITES_FILE, JSON.stringify(allFavorites, null, 2));
};

module.exports = { readAllFavorites, writeAllFavorites };
