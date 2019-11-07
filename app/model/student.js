'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  const Student = app.model.define('student', {
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

  Student.associate = function() {
    app.model.Student.belongsToMany(app.model.Course, {
      through: 'courseToStudent',
      foreignKey: 'cid',
      as: 'course',
    });
  };
  return Student;
};
