import { createSchema } from "graphql-yoga";
import type { FastifyYoga } from "../interfaces";

export const schema = createSchema<FastifyYoga>({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => "from the OnePunchMan Universe",
    },
  },
});
