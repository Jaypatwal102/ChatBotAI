import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ChatCountProvider } from "@/src/context/chatcontext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatCountProvider>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset className="h-screen overflow-hidden">
          <div className="flex flex-col h-full overflow-hidden">
            {/* Mobile Top Bar */}
            <div className="h-14 border-b flex items-center px-4 md:hidden">
              <SidebarTrigger />
            </div>

            {/* Page Content */}
            <main className="flex-1 flex  overflow-hidden min-h-0 relative">
              {children}
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ChatCountProvider>
  );
}
