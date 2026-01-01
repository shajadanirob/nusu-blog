import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const AuthRoutes = ["/login", "/register"];

const roleBasedRoutes = {
  ADMIN: [/^\/dashboard/],
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Simulated user data for demonstration purposes
  // You should replace this with actual authentication logic
  // const user = {
  //   name: "Mir",
  //   token: "adsf asda",
  //   role: "ADMIN", // Change this to "USER" or "ADMIN" to test different scenarios
  // };

  // Uncomment the line below for actual use case where user might be undefined
  const user = await getCurrentUser();
  console.log(user);

  // Check if the user is authenticated
  if (!user) {
    // Allow access to authentication routes
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // Redirect unauthenticated users to the login page
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Check if the user has the correct role for the requested route
  if (user?.role && roleBasedRoutes[user?.role]) {
    const routes = roleBasedRoutes[user?.role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // Redirect to the home page if the user is not authorized for the requested route
  return NextResponse.redirect(new URL("/", request.url));
}

// Configure the paths for which the middleware should run
export const config = {
  matcher: ["/profile", "/dashboard/:page*", "/login", "/register"],
};
