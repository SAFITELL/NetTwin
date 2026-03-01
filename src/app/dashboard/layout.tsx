// Production of Samuel.M.K also know as T756-Tech
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="layout">
            <Sidebar />
            <div className="main-content">
                <Header />
                <main className="page-content">{children}</main>
            </div>
        </div>
    );
}
