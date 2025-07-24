module.exports = {
  apps: [
    {
      name: "aric-md",           // Numele aplicației în pm2
      script: "npm",
      args: "start",             // Comanda care pornește Next.js (npm start)
      env: {
        NODE_ENV: "production",  // Variabilă mediu, importantă pentru build-urile Next.js
      },
      watch: false,              // Dezactivat pentru producție (nu doriți restarturi automate)
      max_restarts: 5,           // Protecție împotriva restarturilor în buclă
      autorestart: true,
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
