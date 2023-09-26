import { GraphQLClient } from "graphql-request/build/cjs/index.js";

export const client = new GraphQLClient(
  "https://beta.pokeapi.co/graphql/v1beta"
);
