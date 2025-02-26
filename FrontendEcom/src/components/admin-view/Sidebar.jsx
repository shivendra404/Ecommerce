
import { BaggageClaim, ChartBarStacked, LayoutDashboard, ShoppingBasket, Trello } from 'lucide-react';
import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboard />,
    },
    {
        id: "products",
        label: "products",
        path: "/admin/products",
        icon: <ShoppingBasket />
    },
    // {
    //     id: "orders",
    //     label: "Orders",
    //     path: "/admin/orders",
    //     icon: <BaggageClaim />
    // },
    {
        id: "category",
        label: "Category",
        path: "/admin/category",
        icon: <ChartBarStacked />,
    },
    {
        id: "Brand",
        label: "brands",
        path: "/admin/brands",
        icon: <Trello />,
    },
];

function MenuItem({ setOpen }) {
    const navigate = useNavigate();

    return (
        <nav className='mt-8 flex-col flex gap-2'>
            {adminSidebarMenuItems.map((menuItem) => (
                <div
                    key={menuItem.id}
                    onClick={() => {
                        navigate(menuItem.path);
                        setOpen(false);
                    }}
                    className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                    {menuItem.icon}
                    <span>{menuItem.label}</span>
                </div>
            ))}
        </nav>
    );
}

function AdminSidebar({ open, setOpen }) {
    const navigate = useNavigate();

    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64 bg-white">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b">
                            <SheetTitle className="flex gap-2 mt-5 mb-5">
                                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItem setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>
            <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
                <div onClick={() => { navigate("/admin/dashboard") }} className='flex cursor-pointer items-center gap-2'>
                    <h1 className='text-xl'>Admin Panel</h1>
                </div>
                <MenuItem />
            </aside>
        </Fragment>
    )
}

export default AdminSidebar
