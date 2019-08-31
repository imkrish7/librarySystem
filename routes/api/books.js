const express = require('express');
const router = express.Router();

const Books =  require('../../models/Books')


router.get('/',(req,res)=>{

    Books.find()
          .then(books => res.json(books))
})

router.get('/:id',(req,res)=>{
    
    Books.findById(req.params.id).then( book=> res.json(book));
})

router.post('/add',(req,res)=>{

    const newBook = new Books({
        name: req.body.name,
        description: req.body.description,
        genere: req.body.genere,
        rating: req.body.rating,
        author: req.body.author
    })

    newBook.save().then(data=> res.json(data));
})

router.put('/edit/:id',(req,res)=>{

    // console.log(req.params.id);
    Books.findById(req.params.id, (error, data)=>{
        if(error){
            res.status(404).json({"error": "Id is not valid"})
        }  
        data.name=  req.body.name;
        data.description = req.body.description;
        data.genere = req.body.genere;
        data.rating = req.body.rating;
        data.author = req.body.author;
        data.save().then((book)=> res.json(book));
    })
})

router.delete('/delete/:id',(req,res)=>{

    const id = req.params.id;

    Books.findById(id, (error,data)=>{
        
        if(error){
            res.status(404).json({"error": "Id is not valid"});
        }
        data.remove().then(()=> res.send({ "success": " Book is deleted"}))
    })
})

module.exports = router;