import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// الشات
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices?.[0]?.message?.content || "مفيش رد"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// مهم لـ Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
