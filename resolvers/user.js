const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');
const User = require('../database/models/user');
const Task = require('../database/models/task');
const { isAuthenticated } = require('./middleware');

module.exports = {
    Query: {
        user: combineResolvers(isAuthenticated, async (_, __, { email }) => {
            try {
                const user = await User.findOne({ email });
                if (!user) throw new Error(`User not found!`);
                return user;
            } catch (error) {
                console.log(error);
                throw error;
            }

        }),
    },
    Mutation: {
        signUp: async (_, { input }) => {
            try {
                const user = await User.findOne({ email: input.email });
                if (user) throw new Error(`Email already in use`);
                const hashedPassword = await bcrypt.hash(input.password, 12);
                const newUser = new User({ ...input, password: hashedPassword });
                return newUser.save();
            } catch (error) {
                console.log(error);
                throw  error;
            };
        },
        login: async (_, { input }) => {
            try {
                const user  = await User.findOne({ email: input.email });
                if (!user) throw new Error(`User not found`);
                const isPasswordValid = await bcrypt.compare(input.password, user.password);
                if (!isPasswordValid) throw new Error(`Invalid Password`);
                const secret = process.env.JWT_SECRET_KEY || 'mysecretkey';
                const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1d' })
                return { token };
            } catch (error) {
                console.log(error);
                throw error;
            }

        }
    },
    User: {
        tasks: async ({ id }) => {
            try {
                return Task.find({ user: id });
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    }
}
