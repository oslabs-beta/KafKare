const supertest = require('supertest');

const { app, server } = require('../server/server');
const request = supertest(app);

describe('User Endpoint Test Suite', () => {
  const userData = {};

  // test creation of user
  it('create a user', async (done) => {
    const payload = {
      name: 'TestName',
      email: 'testEmail@gmail.com',
      password: 'testPass',
    };

    const response = await request.post('/user/signup').send(payload);

    const { id, name, email, success } = response.body;
    userData.testId = id;
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');

    expect(typeof id).toBe('number');
    expect(name).toBe('TestName');
    expect(email).toBe('testEmail@gmail.com');
    expect(success).toBe(true);
    done();
  });

  // test user login
  it('get newly created user', async (done) => {
    const payload = {
      email: 'testEmail@gmail.com',
      password: 'testPass',
    };
    const response = await request.post('/user/login').send(payload);
    const { loginSuccess, userId } = response.body;

    expect(response.status).toBe(200);
    expect(typeof userId).toBe('number');
    expect(loginSuccess).toBe(true);
    done();
  });

  // test deletion of user
  it('delete the user', async (done) => {
    const response = await request.delete(`/user/${userData.testId}`);
    expect(response.body).toBe(1);
    done();
  });
});

server.close();
