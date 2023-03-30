export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/surveylab-api',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? 'BU0zESudIP'
}
