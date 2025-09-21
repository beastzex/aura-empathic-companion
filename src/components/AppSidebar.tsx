import React from 'react';
import { 
  User, 
  Info, 
  Settings, 
  Brain,
  Activity,
  Shield,
  Bell,
  Moon,
  LogOut
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const profileItems = [
    { title: "My Profile", icon: User, content: "profile" },
    { title: "Activity", icon: Activity, content: "activity" },
    { title: "Privacy", icon: Shield, content: "privacy" },
  ];

  const infoItems = [
    { title: "About Aura", icon: Info, content: "about" },
    { title: "Wellness Tips", icon: Brain, content: "tips" },
    { title: "Support", icon: Info, content: "support" },
  ];

  const settingsItems = [
    { title: "Notifications", icon: Bell, content: "notifications" },
    { title: "Appearance", icon: Moon, content: "appearance" },
    { title: "General", icon: Settings, content: "general" },
  ];

  return (
    <Sidebar
      className={`glass-card border-r border-glass-border ${isCollapsed ? "w-16" : "w-80"}`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* Profile Section */}
        {!isCollapsed && (
          <Card className="glass-card p-4 mb-6">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
                  AU
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Anonymous User</h3>
                <p className="text-sm text-muted-foreground">Your wellness journey</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Badge variant="outline" className="text-xs">
                Day 1
              </Badge>
              <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                Active
              </Badge>
            </div>
          </Card>
        )}

        {/* Profile Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">
            {isCollapsed ? "👤" : "Profile"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {profileItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    className="hover:bg-surface-elevated/50 transition-colors"
                    title={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                    {!isCollapsed && <span className="text-foreground">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Information Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">
            {isCollapsed ? "ℹ️" : "Information"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {infoItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    className="hover:bg-surface-elevated/50 transition-colors"
                    title={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className="w-4 h-4 text-accent" />
                    {!isCollapsed && <span className="text-foreground">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">
            {isCollapsed ? "⚙️" : "Settings"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    className="hover:bg-surface-elevated/50 transition-colors"
                    title={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className="w-4 h-4 text-secondary" />
                    {!isCollapsed && <span className="text-foreground">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Privacy Notice */}
        {!isCollapsed && (
          <Card className="glass-card p-3 mt-6">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">
                  <strong className="text-green-400">100% Private:</strong> All conversations stay on your device.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Logout Button */}
        <div className="mt-auto pt-6">
          <Button 
            variant="outline" 
            className={`w-full glass-card border-destructive/20 hover:bg-destructive/10 ${isCollapsed ? 'p-2' : ''}`}
            title={isCollapsed ? "Sign Out" : undefined}
          >
            <LogOut className="w-4 h-4 text-destructive" />
            {!isCollapsed && <span className="ml-2 text-destructive">Sign Out</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}