import mongoose from 'mongoose';

export const configureDatabase = () => {
  	mongoose
		.connect(process.env.DB_HOST as string)
		.then(() => {
			console.log('Connected to MongoDB');
		})
		.catch((err) => {
			console.error('MongoDB connection error:', err);
		});

	process.on('SIGINT', () => {
		mongoose.connection.close();
		console.log('MongoDB connection closed');
		process.exit(0);
	});
};
