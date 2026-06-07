import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({children}) => {
    return(
        <div className="min-h-screen bg-[#faf8f5] flex">
            <Sidebar />

            <div className="flex-1 felx flex-col">
                <Navbar/>

                <main className="flex-1 p-8 overflow-y-auto" >
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;