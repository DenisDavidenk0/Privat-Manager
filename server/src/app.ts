import cors from 'cors';
import express from 'express';
import sequelize from './config/db';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      'Connection to the database has been established successfully.'
    );
    return sequelize.sync();
  })
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default app;
