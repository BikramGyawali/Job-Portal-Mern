import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';

let mongoServer;
let app;
let User;
let JobseekerProfile;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	process.env.MONGO_URI = mongoServer.getUri();
	process.env.JWT_KEY = 'testjwtkey';
	// import after MONGO_URI is set so connectDB uses it
	const importedApp = await import('../app.js');
	app = importedApp.default;
	const models = await import('./../src/models/LoginModel/SignupLogic.js');
	User = models.User;
	const js = await import('./../src/models/jobseeker/JobseekerProfile.js');
	JobseekerProfile = js.JobseekerProfile;

});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

afterEach(async () => {
	const collections = mongoose.connection.collections;
	for (const key in collections) {
		await collections[key].deleteMany({});
	}
});

test('should link existing unassociated jobseeker profile to user', async () => {
	// create an unassociated profile with same email
	await JobseekerProfile.create({ email: 'test@example.com', phone: '0123456789' });
	// create user
	const user = await User.create({ email: 'test@example.com', password: 'pass', role: 'jobseeker' });
	const token = jwt.sign({ email: user.email, role: user.role, id: user._id }, process.env.JWT_KEY);

	const res = await request(app)
		.post('/jobseeker/profile')
		.set('Cookie', [`token=${token}`])
		.field('email', 'test@example.com')
		.field('phone', '0123456789')
		.field('fname', 'Test')
		.field('sname', 'User');

	expect(res.status).toBe(201);
	expect(res.body.status).toBe(1);
	// profile should be linked
	const profileInDb = await JobseekerProfile.findOne({ email: /test@example.com/i });
	expect(profileInDb.userId.toString()).toBe(user._id.toString());
	// user should be updated
	const updatedUser = await User.findById(user._id);
	expect(updatedUser.isProfileCompleted).toBe(true);
});

test('should reject profile creation if email belongs to another user', async () => {
	// profile already linked to another user
	const otherUser = await User.create({ email: 'other@example.com', password: 'pass', role: 'jobseeker' });
	await JobseekerProfile.create({ email: 'other@example.com', userId: otherUser._id });

	const user = await User.create({ email: 'test2@example.com', password: 'pass', role: 'jobseeker' });
	const token = jwt.sign({ email: user.email, role: user.role, id: user._id }, process.env.JWT_KEY);

	const res = await request(app)
		.post('/jobseeker/profile')
		.set('Cookie', [`token=${token}`])
		.field('email', 'other@example.com')
		.field('phone', '0123456790')
		.field('fname', 'Test');

	expect(res.status).toBe(409);
	expect(res.body.message).toMatch(/Email already exists/);
});