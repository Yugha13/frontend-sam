import { Calendar, Home, Inbox, Search, Settings, UserRound } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"

// Menu items.
const items = [
  {
    name: "Students",
    icon: <UserRound/>,
    submenu: [
        {
            name: "add",
            link: "/"
        },
        {
            name: "edit",
            link: "/"
        }, 
        {
            name: "remove",
            link: "/"
        }
    ]
  },
  {
    name: "Teachers",
    icon: <UserRound/>,
    submenu: [
        {
            name: "add",
            link: "/"
        },
        {
            name: "edit",
            link: "/"
        }, 
        {
            name: "remove",
            link: "/"
        }
    ]
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
          <SidebarMenu>
                {items.map((item, index) => (
                    <Collapsible defaultOpen key={index} className="group/collapsible">
                        <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                                {item.icon}
                                {item.name}
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                            {item.submenu.map((subItem, subIndex) => (
                                <SidebarMenuSubItem key={subIndex}>{subItem.name}</SidebarMenuSubItem>
                            ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
                </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
