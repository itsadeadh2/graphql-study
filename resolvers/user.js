const { tasks, users } = require("../constants");
const uuid = require("uuid");

module.exports = {
    Query: {
        users:() => users,
        user: (_, { id }) => users.find((user) => user.id === id),
    },
    Mutation: {

    },
    User: {
        tasks: ({ id }) => {
            console.log("Executed the task resolver!");
            return tasks.filter((task) => task.userId === id)
        }
    }
}
