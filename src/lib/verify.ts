// lib/verify.ts
import { jwtVerify } from 'jose';
import { type NextRequest } from 'next/server';
import { parse } from 'cookie';

export type JwtPayload = {
  userId: number;
  email: string;
  iat?: number;
  exp?: number;
};

export function parseAuthCookie(cookieHeader: string | undefined): string | null {
  if (!cookieHeader) return null;
  const cookies = parse(cookieHeader);
  return cookies.token || null;
}

export async function verifyJwt(token: string): Promise<JwtPayload | null> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return payload as JwtPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}
