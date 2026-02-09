import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/analyze", async (req, res) => {
  const text = req.body.text || "";

  const prompt = `
Beräkna LIX och uppskatta lyssnarnivå.
Svara mycket kort i JSON:
{ lix: number, level: string, note: string }

Text:
${text}
`;

  const r = await client.responses.create({
    model: "gpt-5.2",
    input: prompt
  });

  res.send(r.output_text);
});

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(process.env.PORT || 3000);

