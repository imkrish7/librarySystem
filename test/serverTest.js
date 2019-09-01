const chai = require('chai');
const mongoose = require('mongoose');
let Book = require('../models/Books');
const assert  = require('chai').assert;
const chaiHttp = require('chai-http');
const app = require('../server');


chai.use(chaiHttp);

describe('Server',()=>{
    describe('GET Request',()=>{
        it("It should GET all the books",(done)=>{
            chai
              .request(app)
              .get("/api/books")
              .end((error, res) => {
                assert.equal(res.status,200);
                assert.isArray(res.body);
                done();
              });    
        })

         it("It should GET the book",(done)=>{
            chai
              .request(app)
              .get("/api/books/5d6a4cc271a5782e4867ec51")
              .end((error, res) => {
                assert.equal(res.status,200);
                assert.isObject(res.body);
                done();
              });

         it("It should not GET the book",(done)=>{
            chai
              .request(app)
              .get("/api/books/5d6a4cc271a5782e48671")
              .end((error, res) => {
                assert.equal(res.status,404);
                assert.isObject(res.body);
                assert.equal(res.body.error, "Id is not valid");
                done();
              });
    })
})

describe('POST Request', () => {
   it("IT will Give error a books to database and return save data", done => {
     let book = {
       name: "The Lord of the Rings",
       description:
         "The Lord of the Rings is a film series of three epic fantasy adventure films directed by Peter Jackson, based on the eponymous novel written by J. R. R. Tolkien. The films are subtitled The Fellowship of the Ring (2001), The Two Towers (2002) and The Return of the King (2003).",
       genere: "Adventure",
       author: "J.R.R. Tolkien"
     };

     chai
       .request(app)
       .post("/api/books/add")
       .send(book)
       .end((error, res) => {
         assert.equal(res.status, 404);
         assert.isObject(res.body);
         assert.equal(res.body.error, "Something is missing");
         done();
       });
   });

    it('IT will add a books to database and return save data',(done)=>{
          let book = {
            name: "The Lord of the Rings",
            description:"The Lord of the Rings is a film series of three epic fantasy adventure films directed by Peter Jackson, based on the eponymous novel written by J. R. R. Tolkien. The films are subtitled The Fellowship of the Ring (2001), The Two Towers (2002) and The Return of the King (2003).",
            genere: "Adventure",
            rating: 5,
            author: "J.R.R. Tolkien",
           
          };

          chai.request(app)
              .post('/api/books/add')
              .send(book)
              .end((error,res)=>{
                  assert.equal(res.status,200);
                  assert.isObject(res.body);
                  assert.property(res.body,"_id");
                  assert.equal(res.body.name, book.name);
                  done();
              })
    })
    
});


describe('PUT Request',()=>{
    it("IT will save edit data and return the books",(done)=>{
       
        let book = new Book(
          {
             name: "The Lord of the Rings",
             description:
               "The Lord of the Rings is a film series of three epic fantasy adventure films directed by Peter Jackson, based on the eponymous novel written by J. R. R. Tolkien. The films are subtitled The Fellowship of the Ring (2001), The Two Towers (2002) and The Return of the King (2003).",
             genere: "Adventure",
             rating: 5,
             author: "J.R.R. Tolkien"
           }
        )
        
        book.save((error,book)=>{
          chai
            .request(app)
            .put("/api/books/edit/" + book.id )
            .send({
              name: "The Lord of the Rings",
              description:
                "The Lord of the Rings is a film series of three epic fantasy adventure films directed by Peter Jackson, based on the eponymous novel written by J. R. R. Tolkien. The films are subtitled The Fellowship of the Ring (2001), The Two Towers (2002) and The Return of the King (2003).",
              genere: "Adventure",
              rating: 4,
              author: "J.R.R. Tolkien"
            })
            .end((error, res) => {
              assert.equal(res.status, 200);
              assert.isObject(res.body);
              assert.equal(res.body._id, book.id);
              assert.notEqual(res.body.rating, 5);
              done();
            });
        })
    })
    it("If id does not found in database", done => {
      chai
        .request(app)
        .put("/api/books/edit/5d6a9f0beb227a377c990")
        .send({
          name: "The Lord of the Rings",
          description:
            "The Lord of the Rings is a film series of three epic fantasy adventure films directed by Peter Jackson, based on the eponymous novel written by J. R. R. Tolkien. The films are subtitled The Fellowship of the Ring (2001), The Two Towers (2002) and The Return of the King (2003).",
          genere: "Adventure",
          rating: 4,
          author: "J.R.R. Tolkien"
        })
        .end((error, res) => {
          assert.equal(res.status, 404);
          assert.isObject(res.body);
          assert.equal(res.body.error, "Id is not valid");
          done();
        });
    });

})

    describe('DELETE Request',()=>{
            it("It will delete given ID ",(done)=>{
              
               let book = new Book({
                 name: "The Lord of the Rings",
                 description:
                   "The Lord of the Rings is a film series of three epic fantasy adventure films directed by Peter Jackson, based on the eponymous novel written by J. R. R. Tolkien. The films are subtitled The Fellowship of the Ring (2001), The Two Towers (2002) and The Return of the King (2003).",
                 genere: "Adventure",
                 rating: 5,
                 author: "J.R.R. Tolkien"
               });


               book.save((error,data)=>{
                     chai
                       .request(app)
                       .delete("/api/books/delete/" + book.id)
                       .end((error, res) => {
                         assert.equal(res.status, 200);
                         assert.isObject(res.body);
                         assert.equal(res.body.success, "Book is deleted");
                         done();
                       });
               })
               
            })
            it("If id does not found in database", done => {
            chai
                .request(app)
                .delete("/api/books/delete/5d6a9f0beb227a377c990")
                .end((error, res) => {
                assert.equal(res.status, 404);
                assert.isObject(res.body);
                assert.equal(res.body.error, "Id is not valid");
                done();
                });
            });
    })

})

})