import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("OK");
});

app.post("/analyze", async (req, res) => {
  try {
    const text = req.body?.text || "";

    if (!text) {
      return res.send("No text received");
    }

    const prompt = `
Beräkna LIX och uppskatta lyssnarnivå.
Svara mycket kort i JSON:
{ lix: number, level: string, note: string }

Text:
${text}
`;

    const r = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    });

    res.send(r.output_text || "No output");
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).send("SERVER ERROR: " + err.message);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
