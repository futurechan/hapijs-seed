var Sequelize = require('sequelize')
    , config = require('../config')
    , fs = require('fs')
    , path = require('path')
    , modelsDir = path.join(__dirname, 'models')
    , db = {}
    , child_process = require('child_process')
    ;

// console.log('running migrations')
// child_process.execSync('sequelize db:migrate');

//console.log('running seeds')
//child_process.execSync('sequelize db:seed');

var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});


fs
    .readdirSync(modelsDir)
    .forEach(file => {
      var model = sequelize['import'](path.join(modelsDir, file));
      db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;