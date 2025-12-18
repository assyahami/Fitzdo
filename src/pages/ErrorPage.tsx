"use client"

import { Button } from "@/components/ui/button"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty"
import { AlertCircle, Home, RefreshCw } from "lucide-react"
import { Link } from "react-router"
// import Link from "next/link"

export default function Error() {


    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Empty className="border-none">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <AlertCircle className="text-destructive" />
                    </EmptyMedia>
                    <EmptyTitle className="text-2xl">Something went wrong</EmptyTitle>
                    <EmptyDescription>
                        We encountered an unexpected error. This has been logged and we'll look into it.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Button onClick={() => {
                            window.location.reload();
                        }} className="w-full sm:w-auto">
                            <RefreshCw />
                            Try again
                        </Button>
                        <Button variant="outline" asChild className="w-full sm:w-auto bg-transparent">
                            <Link to="/">
                                <Home />
                                Go home
                            </Link>
                        </Button>
                    </div>
                </EmptyContent>
            </Empty>
        </div>
    )
}
