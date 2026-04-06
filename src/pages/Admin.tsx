import { useState, useEffect } from 'react';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Dashboard from '@/components/admin/Dashboard';
import LogsViewer from '@/components/admin/LogsViewer';
import Login from '@/components/admin/Login';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'loggedin') {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarContent>
            <nav className="p-4">
              <button onClick={() => setActiveTab('dashboard')} className="block mb-2">Dashboard</button>
              <button onClick={() => setActiveTab('logs')} className="block">Logs Viewer</button>
            </nav>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-4">
          <SidebarTrigger />
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'logs' && <LogsViewer />}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Admin;