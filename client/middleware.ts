import { NextRequest, NextResponse } from 'next/server';

// Define the route patterns you want to protect
const userProtectedRoutes = ['/User/TFA', '/User/Dashboard'];

export function middleware(req: NextRequest) {
  // Use cookies to retrieve the token
  const token = req.cookies.get('token'); // Retrieve token from cookies

  if (userProtectedRoutes.includes(req.nextUrl.pathname)) {
    if (!token) {
      // Redirect to login page if the token is not present
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Allow the request to continue if the route is not protected or token is present
  return NextResponse.next();
}

// Export the config to specify which routes the middleware should run for
export const config = {
  matcher: ['/User/TFA', '/User/Dashboard'], // Adjust the routes as needed
};
