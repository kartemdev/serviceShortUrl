module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('shorturls', [{
      userId: 1,
      longUrl: 'https://v3c.ru/javascript/arr-alphabet',
      shortUrl: 'DSBGH',
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('shorturls', null, {});
  }
};
