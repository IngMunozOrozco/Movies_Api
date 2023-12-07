const request = require('supertest');
const app = require('../app');


test('GET /directors', async() => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200)
})

test('POST /directors', async() => {

    const director = {
        firstName: "Gores",
        lastName: "Verbinski",
        nationality: "Usa",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Verbinski_gore.jpg/220px-Verbinski_gore.jpg",
        birthday: "1964-03-16"
    }
    
    const res = await request(app).post('/directors').send(director);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();  
})
test("PUT /directors/:id", async () => {
    const director = {
        lastName: 'Burton'
    }
    const res = (await request(app).put(`/directors/${id}`).send(director));
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(director);
})

test('DELETE /directors/:id', async() => {
    
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204)
})
