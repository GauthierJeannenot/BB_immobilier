const mongoose = require('mongoose');
mongoose.connect(
    process.env.URI_MONGODB, 
    {connectTimeoutMS : 3000, socketTimeoutMS: 20000, useNewUrlParser: true, useUnifiedTopology: true }
);