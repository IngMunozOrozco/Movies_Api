const request = require('supertest');
const app = require('../app');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
const Genres = require('../models/Genres');
require('../models')

let id;

test('GET /movies', async() => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200)
})
test('POST /movies', async() => {

    const movie = {
        name: "Pirates of the Caribbean: The Curse of the Black Pearl",
        image: "https://upload.wikimedia.org/wikipedia/en/8/89/Pirates_of_the_Caribbean_-_The_Curse_of_the_Black_Pearl.png",
        synopsis: "lorepm ipsum",
        releaseYear: "2003"
    }
    
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined(); 
})
test("PUT /movies/:id", async () => {
    const movie = {
        synopsis: "The story follows pirate Captain Jack Sparrow (Depp) and blacksmith Will Turner (Bloom) as they rescue the kidnapped"
    }
    const res = (await request(app).put(`/movies/${id}`).send(movie));
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(movie);
})
test('POST /movies/:id/actors', async () => {
    const actor = await Actors.create({
            firstName: "Jhonny",
            lastName: "Deep",
            nationality: "USA",
            image: "https://cdn-3.expansion.mx/dims4/default/d715d3f/2147483647/strip/true/crop/1024x683+0+0/resize/1200x800!/format/webp/quality/60/?url=https%3A%2F%2Fcdn-3.expansion.mx%2Fdd%2F82%2Ffa20580d4ad79cd4c0e040776e5a%2F6-disney-johnny-depp-gettyimages-684952386.jpeg",
            birthday: "1963-06-09"
        
    })
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id])
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1)
})

test('POST /movies/:id/directors', async () => {
    const director = await Directors.create({
        firstName: "Gores",
        lastName: "Verbinski",
        nationality: "Usa",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Verbinski_gore.jpg/220px-Verbinski_gore.jpg",
        birthday: "1964-03-16"
        
    })
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id])
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1)
})

test('POST /movies/:id/genres', async () => {
    const genre = await Genres.create({
       name: "Horror"
        
    })
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id])
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1)
})

test('DELETE /movies/:id', async() => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204)
})