import express from 'express';


const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000;

app.get('/api/jokes', (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "The Techie",
      content: "Why do programmers prefer dark mode? Because the light attracts bugs!"
    },
    {
      id: 2,
      title: "The Busy Bee",
      content: "Why don't scientists trust atoms? Because they make up everything!"
    },
    {
      id: 3,
      title: "The Hungry Coder",
      content: "Why don't programmers like nature? It has too many bugs."
    },
    {
      id: 4,
      title: "The Overthinker",
      content: "Why was the math book sad? Because it had too many problems."
    },
    {
      id: 5,
      title: "The Sneaky One",
      content: "Why did the scarecrow win an award? Because he was outstanding in his field!"
    }
  ];
  
  res.json(jokes);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
