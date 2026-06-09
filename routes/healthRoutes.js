const router = require("express").Router();
const mongoose = require("mongoose");

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Retrieving information about current server status
 *     tags: [HealthCheck]
 *     responses:
 *       200:
 *         description: Server is working fine
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 db:
 *                   type: string
 *                   example: connected
 *                 uptime:
 *                   type: string
 *                   example: 2s
 *                 env:
 *                   type: string
 *                   example: dev
 *       503:
 *         description: Server has problem with db
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 db:
 *                   type: string
 *                   example: disconnected
 *                 uptime:
 *                   type: string
 *                   example: 2s
 *                 env:
 *                   type: string
 *                   example: dev
 */
router.get("/", async (req, res) => {
  const dbOk = mongoose.connection.readyState === 1;
  res.status(dbOk ? 200 : 503).json({
    status: dbOk ? "ok" : "error",
    db: dbOk ? "connected" : "disconnected",
    uptime: Math.round(process.uptime()) + "s",
    env: process.env.NODE_ENV,
  });
});
module.exports = router;
