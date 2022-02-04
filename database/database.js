const Sequelize = require ("sequelize")

const connection = new Sequelize("blog","root","sasa2008",{ // Configurações para a conexão do banco de dados
    host: "localhost", // Local que está o banco de dados
    dialect: "mysql", // Qual banco de dados que será utilizado
    timezone: "-03:00" // Configurando o horário para o brasileiro na hora de salvar os dados
})

module.exports = connection