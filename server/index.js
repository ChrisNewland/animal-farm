import Chance from 'chance';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());

// Make some animals
const chance = new Chance();

const animals = [...Array(1000).keys()].map((id) => {
  return {
    id,
    species: chance.animal(),
    name: chance.name(),
    age: chance.age(),
  };
});

// Endoint to search for animals
app.get('', (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  const result = animals.filter(a => a.species.toLowerCase().includes(q));
  res.send(result);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

export default app;
