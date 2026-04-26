import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type PageStatus = "Completed" | "Started"
type PageGroup = "Public Pages" | "User Pages" | "Auth Pages" | "Admin Pages"

interface PageInfo {
  name: string
  group: PageGroup
  status: PageStatus
  features: string
  details: string
  structure: string
}

const pagesData: PageInfo[] = [
  // --- Public Pages ---
  {
    name: "Home",
    group: "Public Pages",
    status: "Completed",
    features: "Hero, Categories, Showcases, FAQ, Contact Marquee, Standards",
    details: "Main landing page showcasing brand and top categories.",
    structure: "Navbar -> Hero -> Brands -> Products -> Solutions -> Mission -> FAQ -> Footer",
  },
  {
    name: "About",
    group: "Public Pages",
    status: "Started",
    features: "Company history, Team, Mission statement",
    details: "Provides background information about the company.",
    structure: "Navbar -> Header -> Content -> Footer",
  },
  {
    name: "Blog",
    group: "Public Pages",
    status: "Started",
    features: "Article list, Categories, Pagination",
    details: "Listing of all blog posts and company news.",
    structure: "Navbar -> Header -> Grid -> Footer",
  },
  {
    name: "Blog Post",
    group: "Public Pages",
    status: "Started",
    features: "Rich text content, Author info, Related posts",
    details: "Individual blog article view.",
    structure: "Navbar -> Article -> Author -> Related -> Footer",
  },
  {
    name: "Categories",
    group: "Public Pages",
    status: "Started",
    features: "Category grid, Images, Links",
    details: "Overview of all product categories.",
    structure: "Navbar -> Header -> Grid -> Footer",
  },
  {
    name: "Contact",
    group: "Public Pages",
    status: "Started",
    features: "Contact form, Map, Office details",
    details: "Allows users to get in touch.",
    structure: "Navbar -> Header -> Form -> Footer",
  },
  {
    name: "FAQ",
    group: "Public Pages",
    status: "Started",
    features: "Accordion, Search questions",
    details: "Frequently asked questions and answers.",
    structure: "Navbar -> Header -> Accordion -> Footer",
  },
  {
    name: "Privacy Policy",
    group: "Public Pages",
    status: "Started",
    features: "Legal text, Last updated date",
    details: "Legal privacy policy document.",
    structure: "Navbar -> Content -> Footer",
  },
  {
    name: "Product",
    group: "Public Pages",
    status: "Started",
    features: "Product grid, Filtering, Sorting",
    details: "Fallback or main product listing page.",
    structure: "Navbar -> Header -> Filters -> Grid -> Footer",
  },
  {
    name: "Product Details",
    group: "Public Pages",
    status: "Started",
    features: "Image gallery, Add to cart, Description, Reviews",
    details: "Detailed view of a single product.",
    structure: "Navbar -> Gallery/Info -> Description -> Reviews -> Footer",
  },
  {
    name: "Returns",
    group: "Public Pages",
    status: "Started",
    features: "Return policy details, Instructions",
    details: "Information on how to return items.",
    structure: "Navbar -> Content -> Footer",
  },
  {
    name: "Search",
    group: "Public Pages",
    status: "Started",
    features: "Search input, Results grid",
    details: "Search results page.",
    structure: "Navbar -> Input -> Results -> Footer",
  },
  {
    name: "Shipping",
    group: "Public Pages",
    status: "Started",
    features: "Shipping methods, Delivery times, Costs",
    details: "Information about shipping policies.",
    structure: "Navbar -> Content -> Footer",
  },
  {
    name: "Shop",
    group: "Public Pages",
    status: "Started",
    features: "Products, Pagination, Filters",
    details: "Main shopping interface.",
    structure: "Navbar -> Sidebar -> Grid -> Footer",
  },
  {
    name: "Terms of Service",
    group: "Public Pages",
    status: "Started",
    features: "Legal text",
    details: "Terms and conditions of use.",
    structure: "Navbar -> Content -> Footer",
  },

  // --- User Pages ---
  {
    name: "Account",
    group: "User Pages",
    status: "Started",
    features: "Dashboard, Quick links",
    details: "Main user account overview.",
    structure: "Navbar -> Sidebar -> Dashboard -> Footer",
  },
  {
    name: "Addresses",
    group: "User Pages",
    status: "Started",
    features: "List addresses, Add new, Edit, Delete",
    details: "User address management.",
    structure: "Navbar -> Sidebar -> Address List -> Footer",
  },
  {
    name: "Cart",
    group: "User Pages",
    status: "Started",
    features: "Items, Quantity update, Remove, Subtotal",
    details: "Shopping cart review before checkout.",
    structure: "Navbar -> Cart Items -> Summary -> Footer",
  },
  {
    name: "Checkout",
    group: "User Pages",
    status: "Started",
    features: "Shipping details, Payment gateway, Order summary",
    details: "Final step to place an order.",
    structure: "Navbar -> Forms -> Order Summary -> Footer",
  },
  {
    name: "Checkout Success",
    group: "User Pages",
    status: "Started",
    features: "Order confirmation, Number, Next steps",
    details: "Thank you page after purchase.",
    structure: "Navbar -> Confirmation message -> Footer",
  },
  {
    name: "Orders",
    group: "User Pages",
    status: "Started",
    features: "Order history list, Status badges",
    details: "List of past and current orders.",
    structure: "Navbar -> Sidebar -> Order List -> Footer",
  },
  {
    name: "Order Details",
    group: "User Pages",
    status: "Started",
    features: "Order items, Tracking link, Invoice",
    details: "Detailed view of a specific order.",
    structure: "Navbar -> Sidebar -> Order Details -> Footer",
  },
  {
    name: "Profile",
    group: "User Pages",
    status: "Started",
    features: "Update name, Email, Password",
    details: "User profile settings.",
    structure: "Navbar -> Sidebar -> Form -> Footer",
  },
  {
    name: "Track Order",
    group: "User Pages",
    status: "Started",
    features: "Tracking input, Status timeline",
    details: "Page to track a shipment without logging in.",
    structure: "Navbar -> Input -> Timeline -> Footer",
  },
  {
    name: "Wishlist",
    group: "User Pages",
    status: "Started",
    features: "Saved items, Add to cart, Remove",
    details: "User's saved products.",
    structure: "Navbar -> Sidebar -> Grid -> Footer",
  },

  // --- Auth Pages ---
  {
    name: "Forgot Password",
    group: "Auth Pages",
    status: "Started",
    features: "Email input, Send reset link",
    details: "Initiates password reset flow.",
    structure: "Auth Layout -> Form",
  },
  {
    name: "Register",
    group: "Auth Pages",
    status: "Started",
    features: "Sign up form, Social login",
    details: "New user registration.",
    structure: "Auth Layout -> Form",
  },
  {
    name: "Reset Password",
    group: "Auth Pages",
    status: "Started",
    features: "New password input",
    details: "Sets a new password via token.",
    structure: "Auth Layout -> Form",
  },
  {
    name: "Sign In",
    group: "Auth Pages",
    status: "Started",
    features: "Login form, Social login",
    details: "User authentication.",
    structure: "Auth Layout -> Form",
  },
  {
    name: "Verify Email",
    group: "Auth Pages",
    status: "Started",
    features: "Verification status, Resend link",
    details: "Confirms user email address.",
    structure: "Auth Layout -> Message",
  },

  // --- Admin Pages ---
  {
    name: "Console Dashboard",
    group: "Admin Pages",
    status: "Completed",
    features: "Metrics, Charts, Data Table",
    details: "Main admin overview.",
    structure: "Admin Layout -> Metrics -> Chart -> Table",
  },
  {
    name: "Customers",
    group: "Admin Pages",
    status: "Started",
    features: "Customer list, Search, Ban/Edit",
    details: "Admin customer management.",
    structure: "Admin Layout -> Data Table",
  },
  {
    name: "Orders",
    group: "Admin Pages",
    status: "Started",
    features: "Order list, Status update, Details",
    details: "Admin order management.",
    structure: "Admin Layout -> Data Table",
  },
  {
    name: "Products",
    group: "Admin Pages",
    status: "Started",
    features: "Product list, Create, Edit, Delete",
    details: "Admin product catalog management.",
    structure: "Admin Layout -> Data Table",
  },
  {
    name: "Style Guide",
    group: "Admin Pages",
    status: "Started",
    features: "UI Components preview",
    details: "Internal component library reference.",
    structure: "Admin Layout -> Components",
  },
]

export function PagesTable() {
  // Organize: Public first, then User, Auth, Admin
  const groups: PageGroup[] = ["Public Pages", "User Pages", "Auth Pages", "Admin Pages"]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pages Overview</CardTitle>
        <CardDescription>
          A comprehensive list of all completed and started pages in the application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-10">
          {groups.map((group) => {
            const groupPages = pagesData.filter((p) => p.group === group)
            if (groupPages.length === 0) return null

            // Sort: Completed first, then Started
            const sortedPages = [...groupPages].sort((a, b) => {
              if (a.status === "Completed" && b.status !== "Completed") return -1
              if (a.status !== "Completed" && b.status === "Completed") return 1
              return a.name.localeCompare(b.name)
            })

            return (
              <div key={group} className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b pb-2">{group}</h3>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted">
                      <TableRow>
                        <TableHead className="w-[200px]">Page Name</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead>Features</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Structure</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedPages.map((page) => (
                        <TableRow key={page.name}>
                          <TableCell className="font-medium">{page.name}</TableCell>
                          <TableCell>
                            <Badge
                              variant={page.status === "Completed" ? "default" : "secondary"}
                              className={
                                page.status === "Completed"
                                  ? "bg-green-600 hover:bg-green-700"
                                  : "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300"
                              }
                            >
                              {page.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{page.features}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{page.details}</TableCell>
                          <TableCell className="text-sm font-mono text-xs">{page.structure}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
