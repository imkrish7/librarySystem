const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const Books =  require('../../models/Books')


router.get('/',(req,res)=>{

    Books.find()
          .then(books => res.json(books)).catch(error=> res.status(404).json({"error":"Server Problem"}))
})

router.get('/:id',(req,res)=>{
    
    Books.findById(req.params.id).then( book=> res.json(book)).catch(error=> res.status(404).json({"error": "Id is not valid"}));
})

router.post('/add',auth,(req,res)=>{

    const newBook = new Books({
        name: req.body.name,
        description: req.body.description,
        genre: req.body.genre,
        rating: req.body.rating,
        author: req.body.author
    })

    newBook.save().then(data=> res.json(data)).catch(error=> res.status(404).json({"error":"Something is missing"}));
})

router.put('/edit/:id',(req,res)=>{

    Books.findById(req.params.id, (error, data)=>{
        if(error){
            return res.status(404).json({"error": "Id is not valid"})
        }
        if(data!==null){  
            data.name=  req.body.name;
            data.description = req.body.description;
            data.genre = req.body.genre;
            data.rating = req.body.rating;
            data.author = req.body.author;
            data.save().then((book)=> res.json(book));
        }
    })
})

router.delete('/delete/:id',(req,res)=>{

    const id = req.params.id;

    Books.findById(id, (error,data)=>{
        
        if(error){
            return res.status(404).json({"error": "Id is not valid"});
        }
        if(data!=null){
             data.remove().then(()=> res.send({ "success": "Book is deleted"}))
        }
    })
})

module.exports = router;