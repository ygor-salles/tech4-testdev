import { createConnection } from 'typeorm';

createConnection()
    .then(() => console.log('Successfully connected remote with database'))
    .catch(e => console.log('Failure connection remote database ->', e.message || e))

