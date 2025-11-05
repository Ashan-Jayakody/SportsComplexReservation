import { Outlet } from "react-router-dom"
import Sidebar from "../../components/admin/Sidebar"
import Topbar from "../../components/admin/Topbar"


export default function AdminLayout() {
    return(
        <div className="min-h-screen bg-gray-100">
            {/* Top Navigation Bar */}
            <div className="fixed top-0 left-0 right-0 z-40 bg-zinc-800 shadow-lg">
                <Topbar/>
                
            </div>
            
            {/* Main Content Area */}
            <div className="flex pt-20">
                {/* Sidebar */}
                <div className="w-64 flex-shrink-0">
                    <Sidebar/>
                </div>
                
                {/* Main Content */}
                <div className="flex-1 p-6 ml-4">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}