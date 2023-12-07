const request = require('supertest');
const app = require('../app');


test('GET /actors', async() => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200)
})

test('POST /actors', async() => {

    const actor = {
        firstName: "Jhonny",
        lastName: "Deep",
        nationality: "American",
        image: "https://cdn-3.expansion.mx/dims4/default/d715d3f/2147483647/strip/true/crop/1024x683+0+0/resize/1200x800!/format/webp/quality/60/?url=https%3A%2F%2Fcdn-3.expansion.mx%2Fdd%2F82%2Ffa20580d4ad79cd4c0e040776e5a%2F6-disney-johnny-depp-gettyimages-684952386.jpeg",
        birthday: "1963-06-09"
    }
    
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();  
})
test("PUT /actors/:id", async () => {
    const actor = {
        lastName: 'Depp'
    }
    const res = (await request(app).put(`/actors/${id}`).send(actor));
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(actor);
})

test('DELETE /actors/:id', async() => {
    
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204)
})
