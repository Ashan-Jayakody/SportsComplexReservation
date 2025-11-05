import { NavLink } from 'react-router-dom';
import {
    FiHome, FiUsers, FiCalendar, FiSettings,
    FiShoppingBag, FiPackage, FiUserPlus
} from 'react-icons/fi';

const Sidebar = () => {
    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: FiHome },
        { name: 'User Management', href: '/admin/users', icon: FiUsers },
        { name: 'Employee Management', href: '/admin/employees', icon: FiUserPlus },
        { name: 'Reservations', href: '/admin/reservations', icon: FiCalendar },
        { name: 'Services', href: '/admin/services', icon: FiSettings },
        { name: 'Shop Products', href: '/admin/shop', icon: FiShoppingBag },
        
    ];

    return (
        <div className='w-full bg-white rounded-lg shadow-lg'>

            <div className='h-full overflow-y-auto'>
                <nav className='px-2 py-4'>
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({isActive}) =>
                                `group flex items-center px-4 py-4 text-sm my-3 font-medium rounded-md ${
                                    isActive
                                        ? 'bg-red-600  text-white '
                                        : 'text-black hover:bg-zinc-200 hover:text-zinc-700'
                                }`
                            }>
                                {({isActive}) => (
                                    <>
                                        <item.icon
                                              className={`mr-4 h-5 w-5 flex-shrink-0 ${
                                                isActive
                                                    ? 'text-white'
                                                    : 'text-red-700 group-hover:text-red-600'
                                                }`}
                                        />
                                        {item.name}
                                    </>
                                )}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;