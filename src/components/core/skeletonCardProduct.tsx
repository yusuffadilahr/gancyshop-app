import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function SkeletonCardProduct() {
    return (
        <Card className="overflow-hidden flex flex-col h-fit animate-pulse">
            <CardHeader className="p-0 relative h-60 w-full bg-gray-200" />
            <CardContent className="p-4 flex flex-col justify-between space-y-2">
                <div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="space-y-1 mt-2">
                    <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-100 rounded w-2/4"></div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-8 bg-gray-300 rounded w-16" />
            </CardFooter>
        </Card>
    );
}