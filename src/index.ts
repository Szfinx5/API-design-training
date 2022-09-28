import app from './server'
import * as dotenv from 'dotenv'
dotenv.config()

app.listen(5000, () => {
  console.log(`Example app listening`);
});
