const superagent = require('superagent');

let res;
let id;

describe('dictionaryApiTest', () => {
    it('createDictionary fails with response status 401 when authorization header is absent', async () => {
        try {
            res = await superagent
                .post('https://dictionary.iachieved.it/dictionary')
                .set('Content-Type', 'application/json');
        } catch (e) {
            // console.log(`test.createDictionary: e => ${JSON.stringify(e)}`);
            expect(e.status).toBe(401);
            expect(e.response.status).toBe(401);
            expect(e.response.header['content-length']).toBe('0');
            expect(e.response.header.status).toBe('401 Unauthorized');
            expect(e.response.header['content-type']).toBe('text/plain');
        }
    });
    it('createDictionary fails with response status 401 when authorization header is wrong or invalid', async () => {
        try {
            res = await superagent
                .post('https://dictionary.iachieved.it/dictionary')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Basic <invalid_authorization_token>');
        } catch (e) {
            // console.log(`test.createDictionary: e => ${JSON.stringify(e)}`);
            expect(e.status).toBe(401);
            expect(e.response.status).toBe(401);
            expect(e.response.header['content-length']).toBe('0');
            expect(e.response.header.status).toBe('401 Unauthorized');
            expect(e.response.header['content-type']).toBe('text/plain');
        }
    });
    it('createDictionary succeeds with response status 201 and response is json and has id property of type string', async () => {
        res = await superagent
            .post('https://dictionary.iachieved.it/dictionary')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Basic <valid_authorization_token>');
        // console.log(`test.createDictionary: res => ${JSON.stringify(res)}`);
        expect(res.status).toBe(201);
        expect(res.header['content-type']).toBe('application/json');
        expect(res.header['content-length']).toBe('45');
        expect(res.header.status).toBe('201 Created');
        expect(res.body).toHaveProperty('id');
        expect(res.body).toEqual(expect.objectContaining({
            id: expect.any(String)
        }));
        id = res.body.id;
        // console.log(`test.createDictionary: id => ${id}`);
    });
    it('editDictionary fails with response status 401 when authorization header is absent or invalid', async () => {
        try {
            res = await superagent
                .post(`https://dictionary.iachieved.it/dictionary/${id}/keys/myKey1`)
                .send({ value: 'myValue1' })
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Basic <invalid_authorization_token>');
        } catch (e) {
            // console.log(`test.editDictionary: e => ${JSON.stringify(e)}`);
            expect(e.status).toBe(401);
            expect(e.response.status).toBe(401);
            expect(e.response.header['content-length']).toBe('0');
            expect(e.response.header.status).toBe('401 Unauthorized');
            expect(e.response.header['content-type']).toBe('text/plain');
        }
    });
    it('editDictionary fails with response status 404 when id is wrong or invalid', async () => {
        try {
            res = await superagent
                .post(`https://dictionary.iachieved.it/dictionary/invalid_id/keys/myKey1`)
                .send({ value: 'myValue1' })
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Basic <valid_authorization_token>');
        } catch (e) {
            // console.log(`test.editDictionary: e => ${JSON.stringify(e)}`);
            expect(e.status).toBe(404);
            expect(e.response.status).toBe(404);
            expect(e.response.header['content-length']).toBe('0');
            expect(e.response.header.status).toBe('404 Not Found');
            expect(e.response.header['content-type']).toBe('application/json');
        }
    });
    it('editDictionary fails with response status 404 when id is valid but there is no key', async () => {
        try {
            res = await superagent
                .post(`https://dictionary.iachieved.it/dictionary/${id}/keys/`)
                .send({ value: 'myValue1' })
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Basic <valid_authorization_token>');
        } catch (e) {
            // console.log(`test.editDictionary: e => ${JSON.stringify(e)}`);
            expect(e.statusCode).toBe(404);
            expect(e.rawResponse).toBe('<h1>Not Found</h1>');
        }
    });
    it(`editDictionary fails with response status 200 and response text {"error":"error"} when id is valid but there is no value`, async () => {
        res = await superagent
            .post(`https://dictionary.iachieved.it/dictionary/${id}/keys/myKey1`)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Basic <valid_authorization_token>');
        // console.log(`test.editDictionary: res => ${JSON.stringify(res)}`);
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toBe('application/json');
        expect(res.header['content-length']).toBe('17');
        expect(res.header.status).toBe('200 OK');
        expect(res.text).toBe(`{\"error\":\"error\"}`);
    });
    it(`editDictionary fails with response status 200 and response text {"error":"error"} when id is valid and value is not valid json`, async () => {
        res = await superagent
            .post(`https://dictionary.iachieved.it/dictionary/${id}/keys/myKey1`)
            .send('myValue1')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Basic <valid_authorization_token>');
        // console.log(`test.editDictionary: res => ${JSON.stringify(res)}`);
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toBe('application/json');
        expect(res.header['content-length']).toBe('17');
        expect(res.header.status).toBe('200 OK');
        expect(res.text).toBe(`{\"error\":\"error\"}`);
    });
    it('editDictionary succeeds with response status 200 when id is valid and key and value are both present and valid. The dictionary is updated with key-value pair.', async () => {
        res = await superagent
            .post(`https://dictionary.iachieved.it/dictionary/${id}/keys/myKey1`)
            .send({ value: 'myValue1' })
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Basic <valid_authorization_token>');
        // console.log(`test.editDictionary: res => ${JSON.stringify(res)}`);
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toBe('application/json');
        expect(res.header['content-length']).toBe('0');
        expect(res.header.status).toBe('200 OK');
    });
    it('deleteDictionary fails with response status 401 when authorization header is absent or invalid', async () => {
        try {
            res = await superagent
                .delete(`https://dictionary.iachieved.it/dictionary/${id}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Basic <invalid_authorization_token>');
        } catch (e) {
            // console.log(`test.deleteDictionary: e => ${JSON.stringify(e)}`);
            expect(e.status).toBe(401);
            expect(e.response.status).toBe(401);
            expect(e.response.header['content-length']).toBe('0');
            expect(e.response.header.status).toBe('401 Unauthorized');
            expect(e.response.header['content-type']).toBe('text/plain');
        }
    });
    it('deleteDictionary fails with response status 404 when id is invalid or absent', async () => {
        try {
            res = await superagent
                .delete(`https://dictionary.iachieved.it/dictionary/invalid_id`)
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Basic <valid_authorization_token>');
        } catch (e) {
            // console.log(`test.deleteDictionary: e => ${JSON.stringify(e)}`);
            expect(e.status).toBe(404);
            expect(e.response.status).toBe(404);
            expect(e.response.header['content-type']).toBe('application/json');
            expect(e.response.header['content-length']).toBe('0');
            expect(e.response.header.status).toBe('404 Not Found');
        }
    });
    it('deleteDictionary succeeds with response status 204 when id is both present and valid', async () => {
        res = await superagent
            .delete(`https://dictionary.iachieved.it/dictionary/${id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Basic <valid_authorization_token>');
        // console.log(`test.deleteDictionary: res => ${JSON.stringify(res)}`);
        expect(res.status).toBe(204);
        expect(res.header.status).toBe('204 No Content');
    });
});