module.exports = {
  apps: [
    {
      name: "heatfleet",
      cwd: "/home/deploy/client-ssr-seo",
      script: "npm run serve:ssr",
      // args: "start",
      // instances: "4",
      // exec_mode: "cluster",
      // env: {
      //   NODE_ENV: "production",
      // },
    }
  ],
};
