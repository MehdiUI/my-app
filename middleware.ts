import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Exclure explicitement le webhook Stripe
    '/((?!_next|webhook|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes EXCEPT webhook
    '/(api|trpc)(?!/webhook)(.*)',
  ],
}