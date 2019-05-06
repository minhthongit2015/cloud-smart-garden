import express from 'express';
import path from 'path';

const router = express.Router();

router.get('*', async (req, res) => {
  const indexPath = path.resolve('dist/index.html');
  res.sendFile(indexPath);
});

export default router;
