const express = require("express");
const router = express.Router();
const { feriados2026 } = require("../data/feriados");

// GET /api/feriados — todos os feriados
router.get("/", (req, res) => {
  res.status(200).json(feriados2026);
});

// GET /api/feriados/proximo — próximo feriado a partir de hoje
router.get("/proximo", (req, res) => {
  const hoje = new Date();
  const proximo = feriados2026.find((f) => new Date(f.data) >= hoje);
  if (!proximo) {
    return res.status(404).json({ mensagem: "Sem feriados futuros este ano." });
  }
  res.status(200).json(proximo);
});

// GET /api/feriados/alertas?dias=7 — feriados nos próximos X dias
router.get("/alertas", (req, res) => {
  const dias = parseInt(req.query.dias) || 7;
  const hoje = new Date();
  const limite = new Date();
  limite.setDate(hoje.getDate() + dias);

  const proximosFeriados = feriados2026.filter((f) => {
    const data = new Date(f.data);
    return data >= hoje && data <= limite;
  });

  const resultado = proximosFeriados.map((f) => {
    const diasRestantes = Math.ceil(
      (new Date(f.data) - hoje) / (1000 * 60 * 60 * 24),
    );
    let campanha;

    if (diasRestantes <= 1) {
      campanha = {
        tipo: "Última Hora",
        mensagem:
          "Amanhã é feriado e ainda tens vaga disponível. Agenda agora — responde a esta mensagem.",
        canal: "SMS / WhatsApp",
      };
    } else if (diasRestantes <= 3) {
      campanha = {
        tipo: "Promoção de Feriado",
        mensagem:
          "Feriado é dia de cuidar de si. Tratamento especial com 15% de desconto esta semana. Agenda agora.",
        canal: "SMS / WhatsApp",
      };
    } else {
      campanha = {
        tipo: "Antecipação",
        mensagem:
          "Feriado a aproximar-se — os nossos horários vão ser diferentes. Marca já o teu lugar antes que esgote.",
        canal: "SMS / WhatsApp / Email",
      };
    }

    return { ...f, dias_restantes: diasRestantes, campanha };
  });

  res.status(200).json(resultado);
});

// GET /api/feriados/municipais/:distrito
router.get("/municipais/:distrito", (req, res) => {
  const { distrito } = req.params;
  const municipais = feriados2026.filter(
    (f) => f.tipo === "municipal" && f.distrito === distrito.toLowerCase(),
  );
  if (municipais.length === 0) {
    return res
      .status(404)
      .json({
        mensagem: `Sem feriados municipais para o distrito: ${distrito}`,
      });
  }
  res.status(200).json(municipais);
});

module.exports = router;
