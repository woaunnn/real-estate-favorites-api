const request = require('supertest');
const express = require('express');
const userRoutes = require('../src/routes/user.route');

// Create Express app for testing
const app = express();
app.use(express.json());
app.use('/api/user', userRoutes);

describe('User Controller - updateFavorites', () => {

    describe('PATCH /api/user/favorites/:id - Toggle favorites', () => {

        it('should add a property to favorites when it does not exist', async () => {
            const userId = 1;
            const propertyId = 2;

            const response = await request(app)
                .patch(`/api/user/favorites/${userId}`)
                .send({ propertyId })
                .expect(200);

            expect(response.body).toHaveProperty('user');
            expect(response.body.user.favorites).toContain(propertyId);
        });

        it('should remove a property from favorites when it already exists', async () => {
            const userId = 1;
            const propertyId = 3;

            const response = await request(app)
                .patch(`/api/user/favorites/${userId}`)
                .send({ propertyId })
                .expect(200);

            expect(response.body).toHaveProperty('user');
            expect(response.body.user.favorites).not.toContain(propertyId);
        });

        it('should toggle favorite: add when not present, remove when present', async () => {
            const userId = 4;
            const propertyId = 1;

            const addResponse = await request(app)
                .patch(`/api/user/favorites/${userId}`)
                .send({ propertyId })
                .expect(200);

            expect(addResponse.body.user.favorites).toContain(propertyId);

            const removeResponse = await request(app)
                .patch(`/api/user/favorites/${userId}`)
                .send({ propertyId })
                .expect(200);

            expect(removeResponse.body.user.favorites).not.toContain(propertyId);
        });

    });

    describe('Validation Tests', () => {

        it('should return 400 when userId is invalid (NaN)', async () => {
            const response = await request(app)
                .patch('/api/user/favorites/invalid')
                .send({ propertyId: 1 })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Valid User ID and Property ID are required');
        });

        it('should return 400 when userId is 0', async () => {
            const response = await request(app)
                .patch('/api/user/favorites/0')
                .send({ propertyId: 1 })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Valid User ID and Property ID are required');
        });

        it('should return 400 when propertyId is missing', async () => {
            const response = await request(app)
                .patch('/api/user/favorites/1')
                .send({}) // No propertyId
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Valid User ID and Property ID are required');
        });

        it('should return 400 when propertyId is invalid (not a number)', async () => {
            const response = await request(app)
                .patch('/api/user/favorites/1')
                .send({ propertyId: 'invalid' })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Valid User ID and Property ID are required');
        });

        it('should return 400 when propertyId is null', async () => {
            const response = await request(app)
                .patch('/api/user/favorites/1')
                .send({ propertyId: null })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Valid User ID and Property ID are required');
        });

        it('should return 404 when user does not exist', async () => {
            const nonExistentUserId = 999;

            const response = await request(app)
                .patch(`/api/user/favorites/${nonExistentUserId}`)
                .send({ propertyId: 1 })
                .expect(404);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('User not found');
        });

    });

});
