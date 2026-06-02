const express = require("express");
const cors = require("cors");
const feriadosRouter = require("./routes/feriados");

const app = express();

app.use(cors());
app.use(express.json());

// Rota base
app.get("/", (req, res) => {
  res.json({
    nome: "API Feriados Portugal",
    versao: "1.0.0",
    autor: "Albiclick — albiclick.com",
    endpoints: [
      "GET /api/feriados",
      "GET /api/feriados/proximo",
      "GET /api/feriados/alertas?dias=7",
      "GET /api/feriados/municipais/:distrito",
    ],
  });
});

app.use("/api/feriados", feriadosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Feriados a correr na porta ${PORT}`));
