const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/shopping-list', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db=>console.log('DB is connected'))
    .catch(error=>console.log(error));