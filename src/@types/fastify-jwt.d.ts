import "@fastify/jwt";

declare module "@fastif/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string;
    };
  }
}
