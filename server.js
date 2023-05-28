const express = require ('express')//Importo libreria express per Api
const mongoose = require('mongoose')//Importo libreria mongoose per dialogare con mongo db
const app = express()//Per invocare express


//Importo le routes//

//users
const usersRoute = require('./routes/users');
//Posts
const postsRoute = require('./routes/posts');


//Middleware per leggere i json nel body//

app.use(express.json())

//Middleware per le route da utilizzare da radice a rotta//
app.use('/', usersRoute);
app.use('/', postsRoute);


//Imposto le crud

app.get('/users', (req, res) => {
    res.status('200')
    .send({
        firstname: "Luca",
        lastname: 'Marangotto',
        age: '29'
    })
})





const PORT = 5050;//Porta locale

//Connette il db a Mongoose con indirizzo fisico del cloud

mongoose.connect('mongodb+srv://lucatecktonik:<K1kk08893>@cluster0.6ksrr4a.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//Inglobiamo Mongoose:

const db = mongoose.connection

//Quando il db si connette ascolta errore ed apertura del server:

db.on('error', console.error.bind(console, 'Errore di connessione al database'))

db.once('open', () => {
    console.log('Database connesso correttamente')
})
//ascolta tutti gli eventi sulla porta:

app.listen(PORT,  () => console.log(`Server avviato sulla porta ${PORT}`))