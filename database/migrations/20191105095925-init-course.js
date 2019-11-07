'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DATE, STRING } = Sequelize;
    await queryInterface.createTable('courses', {
      cid: { type: STRING(50), primaryKey: true },
      name: STRING(100),

      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 course 表
  down: async queryInterface => {
    await queryInterface.dropTable('courses');
  },
};
