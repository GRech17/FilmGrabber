const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
        movie: async (parent, { _id }) => {
            return await movie.findById(_id).populate('category');
          },
          user: async (parent, args, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id).populate({
                path: 'orders.products',
                populate: 'category'
              });
      
              user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
      
              return user;
            }
      
            throw new AuthenticationError('Not logged in');
          },

    },
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
