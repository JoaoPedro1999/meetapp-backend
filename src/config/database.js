module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: 'postgres',
  password: 'docker',
  database: 'meetapp',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
