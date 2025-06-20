//lectura y escritura del archivo favoritos.txt
const fs = require("fs").promises;
const path = require("path");

const FAVORITES_FILE = path.join(process.cwd(), "data", "favoritos.txt");

const readFavorites = async () => {
  try {
    const content = await fs.readFile(FAVORITES_FILE, "utf-8");
    return content ? JSON.parse(content) : [];
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
};

const writeFavorites = async (allFavorites) => {
  await fs.writeFile(FAVORITES_FILE, JSON.stringify(allFavorites, null, 2));
};

module.exports = { readFavorites, writeFavorites };
