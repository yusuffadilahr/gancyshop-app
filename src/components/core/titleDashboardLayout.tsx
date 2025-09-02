interface ITitleDashboardLayoutProps {
    titleMenuDashboard: string,
    description: string,
    action?: React.ReactNode
}

export default function TitleDashboardLayout({ titleMenuDashboard, description, action }: ITitleDashboardLayoutProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{titleMenuDashboard}</h1>
                <p className="text-gray-600 mt-1">{description}</p>
            </div>
            <div className="flex items-center gap-2 pb-5">
                {action}
            </div>
        </div>
    );
}