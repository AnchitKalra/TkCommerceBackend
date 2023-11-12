const express = require('express');
const db = require('./utils/dbConnection');
const cookieParser = require('cookie-parser'); 
const {userRouter, loginRouter, loginTokenRouter, resetPasswordRouter, logoutRouter, prevOrdersRouter} = require('./router/userRouter');
const { getCartRouter, updateCart, checkout, clearCartRouter } = require('./router/cartRouter');
const cors = require('cors');
const productsRouter = require('./router/productsRouter');
const app = express();
const PORT = 4000;

//app.use('/', (req, res) => res.send('Hello, welcome to our web-app'));


app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use(express.json());
app.use(cookieParser());
app.use('/products', productsRouter);
app.use("/user", userRouter);
app.use("/user", loginRouter);
app.use("/user", loginTokenRouter);
app.use('/user', resetPasswordRouter);
app.use('/user', logoutRouter);
app.use('/cart', getCartRouter);
// a'pp.use('/cart', addToCart);
app.use('/cart', clearCartRouter);
app.use('/cart', updateCart);
app.use('/cart', checkout);
app.use('/order', prevOrdersRouter);


app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log("server started at port = " + PORT)
    }
})