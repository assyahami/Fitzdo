import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Layout from "@/layout/Layout";
import { APIRequest } from "@/services/apiServices";
import { useEffect, useState } from "react";

interface Products {
    _id: string;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
}

interface ProductsResponse {
    status: boolean;
    data: {
        data: Products[];
        total: number;

    };
}
function ProductListingPage() {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Products[]>([]);
    const [total, setTotal] = useState(0);


    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const response = await APIRequest.getGetService<ProductsResponse>(`/products?limit=10&skip=${page * 10}`);
                console.log(response, "getProducts");
                if (response?.status) {
                    setTotal(response.data.total);
                    if (page === 0) { setProducts(response.data.data) }
                    else {
                        setProducts(prev => [...prev, ...response.data.data]);
                    }
                }
                setLoading(false);
                // setProducts(response);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        }
        getProducts();
    }, [page]);

    const loaded = page * 10;
    const hasMore = loaded < total;



    return (
        <Layout>
            <div className="p-3">
                <div className="my-3">
                    <h1 className="text-2xl font-bold">Offer Products ({total})</h1>
                </div>
                {(loading && page === 0) ? <div className="flex justify-center mt-4 items-center gap-2">
                    <Spinner fontSize={28} />
                    Loading Products!...
                </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            {...product}
                            image={product.thumbnail}
                        />
                    ))}

                </div>}
                {loading && page > 0 && (
                    <div className="flex justify-center mt-4 items-center gap-2">
                        <Spinner fontSize={28} />
                        Loading Products!...
                    </div>
                )}

                {!loading && hasMore && (
                    <div className="flex justify-center mt-4 items-center">
                        <Button
                            onClick={() => setPage((prev) => prev + 1)}
                            variant="outline"
                        >
                            Load more
                        </Button>
                    </div>
                )}

            </div>
        </Layout>
    )

}

export default ProductListingPage;