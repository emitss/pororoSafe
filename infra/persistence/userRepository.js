//lectura y escritura del archivo users.txt
const fs = require("fs").promises;
const path = require("path");

const USERS_FILE = path.join(process.cwd(), "data", "users.txt");

//lee el archivo users.txt
const readUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    if (err.code === "ENOENT") return []; //devuelve un array vacio si no hay
    throw err;
  }
};

//registra el arreglo de usuarios en el archivo
const writeUsers = async (users) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};

module.exports = { readUsers, writeUsers };
