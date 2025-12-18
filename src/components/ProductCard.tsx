import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router"
import { formatPrice } from "@/utils"

export interface ProductCardProps {
    _id: string
    thumbnail: string
    brand: string
    title: string
    rating: number
    reviews: number
    discount?: number
    delivery?: string
    price: number
    originalPrice?: number,
    discountPercentage?: number,
    sponsored?: boolean
}

export function ProductCard({
    _id,
    thumbnail,
    brand,
    title,
    rating,
    price,
    discountPercentage,
    sponsored = true,
}: ProductCardProps) {

    const navigate = useNavigate();

    const discountPercentageValue2 = discountPercentage || 0; // example
    const mrpRat = Math.round(price / (1 - discountPercentageValue2 / 100));


    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group" onClick={() => {
            navigate(`/product/${_id}`);
        }}>
            <div className="relative bg-white">
                <img
                    src={thumbnail || "/placeholder.svg"}
                    alt={title}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
                {sponsored && (
                    <Badge className="flex justify-center items-center  bg-white/95 text-gray-700 border border-gray-200 hover:bg-white">
                        Fitzdo Sponsored
                    </Badge>
                )}
            </div>

            <CardContent className="p-4">
                <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-600">{brand}</div>

                    <h3 className="font-medium text-gray-900 line-clamp-2 min-h-[2.5rem] text-sm leading-tight">{title}</h3>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-900 font-medium">{rating}</span>
                        {/* <span className="text-sm text-gray-500">({reviews.toLocaleString()})</span> */}
                        <Badge
                            variant="secondary"
                            className="bg-[#e8f5e9] text-[#2e7d32] hover:bg-[#e8f5e9] text-xs font-semibold px-1.5"
                        >
                            {discountPercentage}%
                        </Badge>
                    </div>

                    <div className="text-xs text-gray-600">{"FREE delivery by " + "Tomorrow 10AM"}</div>

                    <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-2xl font-bold text-gray-900">{formatPrice(price)}</span>
                        <span className="text-sm text-gray-500 line-through">M.R.P: {formatPrice(mrpRat)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
