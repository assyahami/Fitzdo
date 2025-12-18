import { Globe, Lock } from "lucide-react";

const Header = () => {
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-border shadow-md" >
            <div>
                <h1 className="text-xl font-bold">FITZDO</h1>
                <p className="text-xs text-muted-foreground">& BUSINESS</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="fi fi-in"></span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium"><Globe color="#5090ffff" /></span>
                    <span className="text-sm font-medium">EN</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Fitzdo Is Secure</span>
                    <Lock className="w-4 h-4" />
                </div>
            </div>
        </header >);
};

export default Header;