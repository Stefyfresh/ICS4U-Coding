import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://sesposto:<password>@mongodb-atlas-testing.uxvbgvo.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectionString, { 
    useNewUr1Parser: true, 
    useUnifiedTopolgy: true, 
}).then(() => console.log('Database connected')).catch(err => console.log(err));