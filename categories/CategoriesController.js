const express = require("express")
const router = express.Router()
const Category = require("./Category")
const slugify = require("slugify")

router.get("/admin/categories/new", (req,res)=>{
    res.render("admin/categories/new")
})

// Salvando o dado no banco

router.post("/categories/save",(req,res)=>{
    var title = req.body.title // Pegando dados do formulário

    if(title != undefined){ // Tratando validação dos dados
        Category.create({
            title: title, // Pegando a variável title e inserindo no campo title do banco de dados
            slug: slugify(title) // Pegando o title e transformando em URL    
        }).then(()=>{
            res.redirect("/admin/categories")
        })
    }else{
        res.redirect("/admin/categories/new")
    }
})

// Renderizando os dados na tela

router.get("/admin/categories",(req,res)=>{
    // Pegando os dados no banco
    Category.findAll().then(categories =>{
        res.render("admin/categories/index",{categories: categories}) // Passando os dados na tela
    })
})

// Deletando os dados no banco

router.post("/categories/delete",(req,res)=>{
    var id = req.body.id

    if(id != undefined){ // Valor Diferente de Indefinido
        if(!isNaN(id)){ // Se não for um número
            Category.destroy({ // Excluindo no banco de dados
                where:{
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/categories")
            })
        }else{
            res.redirect("/admin/categories")
        }
    }else{
        res.redirect("/admin/categories")
    }
})

// Editando os dados no banco

router.get("/admin/categories/edit/:id",(req,res)=>{
    var id = req.params.id

    if(isNaN(id)){
        res.redirect("/admin/categories")
    }
    Category.findByPk(id).then(category =>{
        if(category != undefined){
            res.render("admin/categories/edit",{category: category})
        }else{
            res.redirect("/admin/categories")
        }
    }).catch(erro =>{
        res.redirect("/admin/categories")
    })
})

// Salvando atualizações do dado no banco

router.post("/categories/update",(req,res)=>{
    var id = req.body.id
    var title = req.body.title

    Category.update({title: title, slug: slugify(title)},{ // Selecionando pelo título
        where:{ // Atualizando pelo id
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/categories")
    })
})

module.exports = router