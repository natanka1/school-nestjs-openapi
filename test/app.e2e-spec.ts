import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const mongoose = require('mongoose');


describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async()=>{
    await mongoose.connect('mongodb://localhost:27017/local')
    await mongoose.connection.db.dropDatabase(function(err, result) {
      console.log(`database cleared`)
    });
  })

  afterAll(()=>{
    mongoose.disconnect();
  })

  beforeEach(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/classroom (GET)', () => {
    return request(app.getHttpServer())
      .get('/classroom')
      .expect(200)
  });

  it('/classroom (POST) create a new classroom', async () => {
        
    return request(app.getHttpServer())
      .post('/classroom')
      .send({
        className: "JavaScript3",
        classSize: 15
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
    }
  )

  it('/classroom (POST) get 409 http exception creating classroom with conflicting name',async ()=> {
    return request(app.getHttpServer())
      .post('/classroom')
      .send({
        className: "JavaScript3",
        classSize: 15
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)

  })
  
  it('get bad request execption missing required className field', async () =>{

      return request(app.getHttpServer())
      .post('/classroom')
      .send({
        //className: "JavaScript3", className excluded
        classSize: 15
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
  })
  
});
