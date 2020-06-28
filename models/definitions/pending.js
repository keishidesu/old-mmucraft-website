/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pending', {
    'id': {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'hash': {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "null"
    },
    'email': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    },
    'createdAt': {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "null"
    },
    'updatedAt': {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'pending',
    timestamps: true
  });
};
