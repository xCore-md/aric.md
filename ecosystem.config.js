module.exports = {
  apps: [
    {
      name: "aric-md",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
      watch: false,
      max_restarts: 5,
      autorestart: true,
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      kill_timeout: 5000,
      listen_timeout: 5000,
    },
  ],
};
