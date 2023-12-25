const app = require('./app');


if(process.env.NODE_ENV=='Production'){
    app.listen(()=>{
    
    });
  }else{
    app.listen(8000,()=>{
      console.log(` port ${8000} is listening.......`)
    
  })
  
  }


  