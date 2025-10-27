import React from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { UserCircleIcon, InboxIcon, PowerIcon , BellAlertIcon} from "@heroicons/react/24/solid"
import { Input } from "antd"

export default function Topbar() {
    return(
        
            <div className="flex items-center gap-6 w-full h-20 px-8">
                <div className="ml-auto flex items-center gap-6">
                    <Input 
                        placeholder="Search..."
                        prefix={<MagnifyingGlassIcon className="h-5 w-5 ml-2 text-black"/>}
                        className="w-64 rounded-lg shadow-md border border-black hover:!border-red-500"
                    />
                </div>
                 
                <div className="flex items-center gap-6">
                    <UserCircleIcon className="h-7 w-7 text-white cursor-pointer  " title="User"/>
                    <BellAlertIcon className="h-7 w-7 text-white cursor-pointer" title="Notifications"/>
                </div>
            </div>
    
    )
}