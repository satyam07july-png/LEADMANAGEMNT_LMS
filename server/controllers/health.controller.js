/**
 * =====================================================
 * Health Controller
 * Project : IEM Admissions CRM
 * =====================================================
 */

export const healthCheck = (req, res) => {

  return res.status(200).json({

    success: true,

    message: "Server is running successfully.",

    data: {

      status: "UP",

      environment:
        process.env.NODE_ENV || "development",

      uptime: process.uptime(),

      timestamp: new Date().toISOString(),

      node_version: process.version,

    },

  });

};