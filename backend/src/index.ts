import {app} from "./app.js"
import dotenv from "dotenv"
import { prisma } from "./lib/prisma.js"

dotenv.config({
  path: "./.env"
})

const PORT = process.env.PORT || 8000

async function startServer() {
  try {
    await prisma.$connect();
    console.log("DB Connected Successfully");
    
    app.listen(PORT, ()=>{
      console.log(`Server is running on port ${PORT}`);
    })
  } catch (err) {
    console.log(`Failed to start server `, err);
    process.exit(1)
  }
}

startServer()