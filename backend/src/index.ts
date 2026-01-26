import {app} from "./app.js"
import dotenv from "dotenv"
import { prisma } from "./lib/prisma.js"
import logger from "./lib/logger.js"

dotenv.config({
  path: "./.env"
})

const PORT = process.env.PORT || 8000

async function startServer() {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    logger.info("DB Connected Successfully");
    
    app.listen(PORT, ()=>{
      logger.info(`Server is running on port ${PORT}`);
    })
  } catch (err) {
    logger.error(`Failed to start server `, err);
    process.exit(1)
  }
}

startServer()