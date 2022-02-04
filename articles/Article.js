const Sequelize = require("sequelize")
const connection = require("../database/database")
const Category = require("../categories/Category")

const Article = connection.define("articles",{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article) // UMA categoria pertence a MUITOS artigos
Article.belongsTo(Category) // UM artigo está se relacionando com categoria no banco de dados

//Article.sync({force: true}) // Cria tabela no banco de dados ERRO 
// Nesta parte deu um erro na hora de criar as tabelas, para resolver rode este arquivo separadamente

module.exports = Article