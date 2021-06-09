export default () => ({
  port: process.env.PORT || 3000,
  mongodbUrl: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}/${process.env.DATABASE_BASE}?retryWrites=true&w=majority`,
});
