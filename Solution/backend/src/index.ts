import express from 'express';
import apiRoutes from './routes/api';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Welcome to the backend server!');
});

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get('/test', (_req, res) => {
  res.json({ message: 'Test route is working' });
});