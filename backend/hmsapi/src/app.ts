import express from "express";

const app= express();
app.get('/',(Request,Response)=>{
    Response.send("Hello World");
});
export default app;