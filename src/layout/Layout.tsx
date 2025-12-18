import { EcomHeader } from "./EcomHeader";

export default function Layout({ children, headerLabel = "Product List" }: { children: React.ReactNode, headerLabel?: string }) {
    return (
        <div className="flex h-screen bg-gray-50 p-2">
            {/* Sidebar */}
            <aside className="w-64 bg-white ml-2  m-1 rounded-md shadow-md">
                <div className="p-6 text-4xl text-center  font-bold text-[#ff5722]">
                    FITZDO
                </div>
                {/* nav items */}
            </aside>

            {/* Main area */}
            <div className="flex flex-col flex-1">
                <EcomHeader label={headerLabel} />

                {/* Content */}
                <main className="m-1 flex-1 shadow-md rounded-md bg-white overflow-y-auto ">
                    {children}
                </main>
            </div>
        </div>
    );
}
