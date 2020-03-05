const { GraphQLServer } = require('graphql-yoga')


let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    deleteLink: (parent, args) => {
      const link = {
        id: args.id
      }
      links.splice(link)
      return link
    },
    updateLink: (parent, args) => {
      const link = {
        id: args.id,
        url: args.url,
        description: args.description
      }
      //TODO this isn't right, updating the whole array each time's probably not the way to go
      links = link
      return links
    }
  },
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers
})
server.start(() => console.log(`Server is running on http://localhost:4000`))