export default () => ({
  app_port: parseInt(process.env.APP_PORT, 10) || 3000,
  app_url: process.env.APP_URL,
  jwt_secret: process.env.JWT_SECRET,
  locale : "es",
});