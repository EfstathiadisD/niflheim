import type { FastifyReply, FastifyRequest } from "fastify";

type FastifyYoga = {
  req: FastifyRequest;
  reply: FastifyReply;
};

export type { FastifyYoga };
