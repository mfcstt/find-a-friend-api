import { env } from "@/env";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function refreshTokenController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		await request.jwtVerify({ onlyCookie: true })

		const { sub } = request.user as { sub: string }

		const token = await reply.jwtSign({}, {
			sign: {
				sub,
			},
		})

		const refreshToken = await reply.jwtSign({}, {
			sign: {
				sub,
				expiresIn: "7d",
			},
		})

		return reply
			.setCookie("refreshToken", refreshToken, {
				path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
			})
			.status(200)
			.send({ token })
	} catch (error) {
		return reply.status(401).send({ message: "Unauthorized" })
	}
}