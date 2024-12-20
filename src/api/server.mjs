import cors from "cors"
import express from "express"
import mysql from "mysql"

const app = express()
const port = 3001

// Configurer la connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "studio-shifty",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
})

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
)

// Établir la connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion :" + err.stack)
    return
  }
  console.log("Connexion réussie")
})

app.get("/", (req, res) => {
  res.send("API en ligne !")
})

app.get("/projects", (req, res) => {
  connection.query("SELECT * FROM projects", (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des projets :", err);
      return res.status(500).json({ error: "Erreur lors de la récupération des projets" });
    }
    res.json(results);
  });
});

app.get("/services", (req, res) => {
  connection.query("SELECT * FROM services", (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des services :", err);
      return res.status(500).json({ error: "Erreur lors de la récupération des services" });
    }
    res.json(results);
  });
});

app.get("/feedback", (req, res) => {
  connection.query("SELECT * FROM feedback", (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des feedback :", err);
      return res.status(500).json({ error: "Erreur lors de la récupération des feedback" });
    }
    res.json(results);
  });
});

app.get("/navigation", (req, res) => {
  connection.query("SELECT * FROM navigation", (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des navigation :", err);
      return res.status(500).json({ error: "Erreur lors de la récupération des navigation" });
    }
    res.json(results);
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur API démarré sur http://localhost:${port}`)
})
