import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import  {AppSidebar}  from "./Sidebar"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
    <SidebarTrigger />
      <main className="flex min-h-screen flex-col items-center p-4">
       <Outlet/>
      </main>
    </SidebarProvider>
  )
}
