'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING } = Sequelize;
    await queryInterface.createTable('students', {
      sid: {
        type: STRING(50),
        primaryKey: true,
      },
      name: {
        type: STRING(100),
      },
      age: {
        type: STRING(100),
      },
      sex: {
        type: STRING(100),
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 student 表
  down: async queryInterface => {
    await queryInterface.dropTable('students');
  },
};
