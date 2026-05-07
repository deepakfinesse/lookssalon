
export const runtime = "nodejs"; // bcryptjs requires Node.js runtime

import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;