import { Calistoga, Inter } from 'next/font/google';

const interFont = Inter({
	subsets: ['latin'],
	weight: ['200', '400', '600'],
	variable: '--font-inter'
})

const calistogaFont = Calistoga({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-calistoga'
})

export const inter = interFont.variable;
export const calistoga = calistogaFont.variable;
