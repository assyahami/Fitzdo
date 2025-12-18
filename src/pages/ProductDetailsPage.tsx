import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Heart, Share2, Tag } from "lucide-react"
import Layout from "@/layout/Layout"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { APIRequest } from "@/services/apiServices"
// import { useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { formatPrice } from "@/utils"

interface IDimensions {
    width: number;
    height: number;
    depth: number;
}

interface IReview {
    rating: number;
    comment: string;
    date: Date;
    reviewerName: string;
    reviewerEmail: string;
}

interface IMeta {
    createdAt: Date;
    updatedAt: Date;
    barcode: string;
    qrCode: string;
}

interface IProduct {
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: IDimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: IReview[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: IMeta;
    images: string[];
    thumbnail: string;
}

interface ProductResponse {
    status: boolean;
    data: {
        data: IProduct
    }
}

export default function ProductDetailPage() {
    const [product, setProduct] = useState<IProduct | null>(null);
    const [selectedImage, setSelectedImage] = useState(
        ""
    );
    const params = useParams();
    // console.log(params.id, 'params')
    useEffect(() => {
        const getProducts = async () => {
            try {
                // setLoading(true);
                const response = await APIRequest.getGetService<ProductResponse>(`/products/${params.id}`);
                if (response?.status) {
                    console.log(response.data.data, "getProducts");
                    setProduct(response.data.data);
                    setSelectedImage(response.data.data.thumbnail);
                }
                // setLoading(false);
                // setProducts(response);
            } catch (error) {
                // setLoading(false);
                console.error(error);
            }
        }
        getProducts();
    }, [params.id]);

    const images = product?.images || []

    const currentIndex = images.indexOf(selectedImage)

    const handlePrev = () => {
        if (currentIndex > 0) {
            setSelectedImage(images[currentIndex - 1])
        }
    }

    const handleNext = () => {
        if (currentIndex < images.length - 1) {
            setSelectedImage(images[currentIndex + 1])
        }

    }

    const discountPercentageValue2 = product?.discountPercentage || 0; // example
    const mrpRat = Math.round((product?.price || 0) / (1 - discountPercentageValue2 / 100));

    return (
        <Layout headerLabel="Product Details">
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">


                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-3 space-y-6">
                            {/* Product Images */}
                            <Card className="p-6">
                                <div className="flex gap-2 justify-end mb-4">
                                    <Button variant="outline" size="icon">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Heart className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="relative mb-4 flex justify-center items-center">
                                    <Button
                                        variant="outline"
                                        onClick={handlePrev}
                                        disabled={currentIndex === 0}
                                        className="absolute left-2 z-10 rounded-full bg-background/80 p-2 shadow hover:bg-background disabled:opacity-40"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </Button>

                                    <img
                                        src={selectedImage}
                                        alt="Product"
                                        className="w-1/2 rounded-lg  object-contain transition-all duration-300 ease-in-out"
                                    />

                                    <Button
                                        variant="outline"
                                        onClick={handleNext}
                                        disabled={currentIndex === images.length - 1}
                                        className="absolute right-2 z-10 rounded-full bg-background/80 p-2 shadow hover:bg-background disabled:opacity-40"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-4 gap-4">
                                    {product?.images.map((i) => (
                                        <button
                                            key={i}
                                            onClick={() => { setSelectedImage(i) }}
                                            className={"border-2 border-border hover:border-primary rounded-lg p-2 transition-colors" + (i === selectedImage ? " border-primary" : "")}
                                        >
                                            <img
                                                src={i}
                                                alt={`Treadmill view ${i}`}
                                                className="w-full h-auto"
                                            />
                                        </button>
                                    ))}
                                </div>
                                <Accordion
                                    type="single"
                                    collapsible
                                    defaultValue="specifications"
                                    className="space-y-4"
                                >
                                    {/* Product Specification */}
                                    <div className="p-0">
                                        <AccordionItem value="specifications" className="border-none">
                                            <AccordionTrigger className="px-6 py-4 text-xl font-semibold">
                                                Product Specification
                                            </AccordionTrigger>

                                            <AccordionContent className="px-6 pb-6">
                                                <div className="space-y-3 text-sm">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="text-muted-foreground">Brand</div>
                                                        <div>{product?.brand}</div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="text-muted-foreground">Category</div>
                                                        <div>{product?.category}</div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="text-muted-foreground">Product Dimension</div>
                                                        <div>
                                                            {product?.dimensions?.height} ×{" "}
                                                            {product?.dimensions?.width} ×{" "}
                                                            {product?.dimensions?.depth} mm
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="text-muted-foreground">Item Weight</div>
                                                        <div>{product?.weight} Kilograms</div>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </div>

                                    {/* Additional Information */}
                                    <div className="p-0">
                                        <AccordionItem value="additional" className="border-none">
                                            <AccordionTrigger className="px-6 py-4 text-xl font-semibold">
                                                Additional Information
                                            </AccordionTrigger>

                                            <AccordionContent className="px-6 pb-6 text-sm text-muted-foreground">
                                                <div className="space-y-3 text-sm">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="text-muted-foreground">Availability Status</div>
                                                        <Badge variant="outline">{product?.availabilityStatus}</Badge>
                                                    </div>
                                                    {/* stock count */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="text-muted-foreground">Stock Count</div>
                                                        <Badge variant="outline">{product?.stock}</Badge>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="text-muted-foreground">Minimum Order Quantity</div>
                                                        <Badge variant="outline">{product?.minimumOrderQuantity}</Badge>
                                                    </div>

                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </div>

                                    {/* Delivery & Returns */}
                                    <div className="p-0">
                                        <AccordionItem value="delivery" className="border-none">
                                            <AccordionTrigger className="px-6 py-4 text-xl font-semibold">
                                                Delivery & Returns
                                            </AccordionTrigger>

                                            <AccordionContent className="px-6 pb-6 text-sm text-muted-foreground">
                                                <div className="space-y-3 text-sm">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="text-muted-foreground">Delivery</div>
                                                        <div>
                                                            Tomorrow, 10:00 AM
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="text-muted-foreground">Warranty</div>
                                                        <div>
                                                            {product?.warrantyInformation}
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="text-muted-foreground">Shipping</div>
                                                        <div>
                                                            {product?.shippingInformation}
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="text-muted-foreground">Return policy</div>
                                                        <div>
                                                            {product?.returnPolicy}
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </div>
                                </Accordion>
                            </Card>





                        </div>

                        <div className="lg:col-span-2">
                            <div className="sticky top-2">
                                <Card className="p-6 space-y-6">
                                    {/* Brand and Product Name */}
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-2">{product?.brand}</div>
                                        <h1 className="text-lg font-semibold leading-tight mb-2">
                                            {product?.title}
                                        </h1>
                                        <p className="text-sm text-muted-foreground mb-2" >{product?.description}</p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span>⭐ {product?.rating}/5</span>
                                            <span>•</span>
                                            <span>{product?.reviews.length}  Reviews</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="text-3xl font-bold">₹{product?.price}</div>
                                        <span className="text-md text-gray-500 line-through">{formatPrice(mrpRat)}</span>

                                        <Badge variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600">
                                            {product?.discountPercentage} %
                                        </Badge>
                                    </div>



                                    {/* Action Buttons */}
                                    <div className="space-y-3">
                                        <Button className="w-full bg-transparent" variant="outline">
                                            Add to Cart
                                        </Button>
                                        <Button className="w-full bg-black text-white hover:bg-black/90">Buy Now</Button>
                                    </div>

                                    {/* Promo Code */}
                                    <div>
                                        <div className="text-sm mb-2">Please enter the code to track delivery dates</div>
                                        <div className="flex gap-2">
                                            <Input placeholder="Enter code" className="flex-1" />
                                            <Button size="sm">Check</Button>
                                        </div>
                                    </div>

                                    {/* Delivery Info */}
                                    <div className="pt-4 border-t">
                                        <div className="flex items-center gap-2 text-sm text-green-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>FREE delivery by Trendyto 1st to</span>
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            Eligible free for eazy repalcement option available
                                        </div>
                                    </div>

                                    {/* Offers & Discounts */}
                                    <div className="pt-4 border-t">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-semibold">Offers & Discounts</h3>
                                            <button className="text-sm text-blue-600">See All</button>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 border rounded-lg">
                                            <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                                                <Tag className="w-4 h-4 text-orange-600" />
                                            </div>
                                            <div className="text-xs">
                                                <div className="font-medium mb-1">Flat Delivery Discount</div>
                                                <div className="text-muted-foreground">
                                                    Get Flat ₹20,000 Instant Discount on ICICI Credit Card use purchase via checkout only
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
