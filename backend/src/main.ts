import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Routes placeholder — see /src/{module}/ for implementation
app.get('/health', (_, res) => res.json({ status: 'ok', service: 'VOLT229 API', version: '1.0.0', region: 'BJ' }));

// Mount routers (to be implemented with NestJS or Express)
// import authRouter from './auth/router';
// import productsRouter from './products/router';
// app.use('/api/auth', authRouter);
// app.use('/api/products', productsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`⚡ VOLT229 API running on :${PORT}`);
});

export default app;
