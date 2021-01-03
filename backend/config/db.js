const mongoose=require('mongoose');
const config=require('config');

const db=config.get('mongoURI');

const dbConnect=async ()=>{
    try {
        
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false  
        });

        console.log('MongoDB connected...');
    } catch (error) {
        console.log(error);
        //exit process on failure
        process.exit(1)
    }
}


module.exports=dbConnect;