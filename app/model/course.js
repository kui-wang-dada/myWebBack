'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  const Course = app.model.define('course', {
    cid: {
      type: STRING(50),
      primaryKey: true,
    },
    name: STRING(100),
  });

  Course.associate = function() {
    app.model.Course.belongsToMany(app.model.Student, {
      through: 'courseToStudent',
      foreignKey: 'sid',
      as: 'student',
    });
  };
  return Course;
};
