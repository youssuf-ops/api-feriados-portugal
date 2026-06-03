# 🗓 API Feriados Portugal

API REST pública com feriados nacionais e municipais portugueses, sistema de alertas e campanhas automáticas de marketing para PMEs.

**Live:** https://api-feriados-portugal.vercel.app

---

## Endpoints

| Método | Endpoint                             | Descrição                               |
| ------ | ------------------------------------ | --------------------------------------- |
| GET    | `/api/feriados`                      | Todos os feriados nacionais             |
| GET    | `/api/feriados/proximo`              | Próximo feriado a partir de hoje        |
| GET    | `/api/feriados/alertas?dias=7`       | Feriados nos próximos X dias + campanha |
| GET    | `/api/feriados/municipais/:distrito` | Feriados municipais por distrito        |

---

## Exemplos

```bash
# Todos os feriados
GET https://api-feriados-portugal.vercel.app/api/feriados

# Próximo feriado
GET https://api-feriados-portugal.vercel.app/api/feriados/proximo

# Alertas para os próximos 30 dias
GET https://api-feriados-portugal.vercel.app/api/feriados/alertas?dias=30

# Feriados municipais de Lisboa
GET https://api-feriados-portugal.vercel.app/api/feriados/municipais/lisboa
```

## Resposta do endpoint /alertas

```json
[
  {
    "data": "2026-06-10",
    "nome": "Dia de Portugal",
    "tipo": "nacional",
    "dias_restantes": 7,
    "campanha": {
      "tipo": "Antecipação",
      "mensagem": "Feriado a aproximar-se — os nossos horários vão ser diferentes. Marca já o teu lugar antes que esgote.",
      "canal": "SMS / WhatsApp / Email"
    }
  }
]
```

## Distritos disponíveis

`lisboa` `porto` `braga` `aveiro` `coimbra` `faro` `evora` `setubal`
`viseu` `guarda` `viana-do-castelo` `braganca` `vila-real` `santarem`
`leiria` `portalegre` `beja` `castelo-branco`

---

## Stack

Node.js · Express.js · Vercel

---

## Caso de uso real

Integrado no **BeautyTime** (https://beautytime.site) — plataforma SaaS de gestão de agenda para salões de beleza.

O sistema envia automaticamente alertas por email aos donos de salão antes de cada feriado com a campanha de marketing sugerida.

---

Desenvolvido por **Youssuf Abdula** — [Albiclick](https://albiclick.com)
