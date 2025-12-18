import { Search } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function EcomHeader({ label = "Product List" }: { label: string }) {
    const getUsers = localStorage.getItem('user');
    const user = JSON.parse(getUsers || '{}');
    const navigate = useNavigate();
    // console.log();
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 m-1 rounded-xl shadow-md">
            <div className="mx-auto px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-8 m-3">
                    <h2 className="text-2xl font-bold text-gray-900">{label}</h2>
                </div>

                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="search"
                            placeholder="Search for Bookings, Enquiries, Staffs & Clients"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <div className="font-semibold text-gray-900">{user?.user?.email}</div>
                    </div>
                    <Avatar className="h-10 w-10">
                        <AvatarFallback>{user?.user?.email.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" onClick={() => {
                        localStorage.clear();
                        navigate('/');
                    }}>Logout</Button>

                </div>
            </div>
        </header>
    )
}
