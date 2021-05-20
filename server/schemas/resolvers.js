import { AuthenticationError, UserInputError } from "apollo-server-errors"

const resolvers = {
    Mutation: {
        saveMovie: async (parent, {movieData}, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id:context.user._id},
                    {$push:{savedMovies: movieData}},
                    {new:true}
                );

                return updatedUser;
            }

            // throw new AuthenticationError('You need to be logged in');
        },

        removeMovie: async (parent, {movieId}, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id:context.user._id},
                    {$pull:{savedMovies:{movieId}}},
                    {new:true}
                );

                return updatedUser;
            }

            // throw new AuthenticationError('You need to be logged in');
        }
    }
};

module.exports = resolvers;