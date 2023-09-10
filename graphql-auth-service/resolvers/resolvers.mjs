import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.mjs';
import { ApolloError } from 'apollo-server-errors';
import { SECRET_KEY } from '../config/config.mjs';
import { context } from '../middleware/context.mjs';


export const resolvers = {
    Query: {
        user: async (_, __, context) => {
        const user = await User.findById(id);
            if (!context.user) {
                throw new ApolloError('User not found', 'USER_NOT_FOUND');
            }
            return context.user;
        },
    },
    Mutation: {
        signup: async (_, { signupInput: {name, email, password} }) => {
            const existingUser = await User.findOne({ email });

            // Check if user exists
            if (existingUser) {
                throw new ApolloError ('User already exists' + email, 'USER_ALREADY_EXISTS');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                name,
                email,
                password: hashedPassword,
            });
            const token = jwt.sign({ user_id: user._id, email }, SECRET_KEY, { expiresIn: '1h' });
            user.token = token;
            await user.save();
            return {
                id: user._id,
                ...user._doc,
            }
        },
        login: async (_, {loginInput: {email, password} }) => {
            const user = await User.findOne({ email });
            if(user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign({ user_id: user._id, email }, SECRET_KEY, { expiresIn: '1h' });
                user.token = token;
                await user.save();
                return {
                    id: user._id,
                    ...user._doc,
                }
        } else {
            // If user does not exist
            throw new ApolloError('Invalid credentials', 'INVALID_CREDENTIALS');
        }
    }
    }
}
