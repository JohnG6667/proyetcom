import resolvers from "./resolver";
import { GraphQLServer } from "graphql-yoga";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const typeDefs = mergeTypeDefs(loadFilesSync(`${__dirname}/**/*.graphql`));

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start({ port: 3100 }, ({ port }) => {
  console.log("Server on port http://localhost:" + port);
});

/*//Variables
const PORT = 3000
const endPoint = "/proyetcom_api"
//Web Server EXPRESS
const app = express()
app.use(endPoint, bodyParser.json(), graphqlExpress({ schema }))
app.use("/graphiql", graphiqlExpress({ endpointURL: endPoint, }))

//API-GraphQL execution

app.listen(PORT, () => {
    console.log("GraphQL-API listen in http://localhost:" + PORT + endPoint)
    console.log("GraphQL-API CLIENT-TOOL listen in http://localhost:" + PORT + "/graphiql")
})*/
