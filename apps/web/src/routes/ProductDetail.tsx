import { useParams } from "react-router-dom";
import ProductGallery from "../components/ProductDetail/ProductGallery";
import ProductInfo from "../components/ProductDetail/ProductInfo";
import { useGetProductByIdQuery } from "../store/api";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetProductByIdQuery(id ?? "");

  const product = data?.data;

  if (isLoading) {
    
    return (
      <section className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-center text-neutral-400 py-12">Yuklanmoqda...</p>
      </section>
    );
  }

  if (isError || !product) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-center text-red-500 py-12">
          Mahsulot topilmadi yoki yuklashda xatolik yuz berdi
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <ProductGallery
          images={product.images?.length ? product.images : [product.image]}
          alt={product.title}
        />
        <ProductInfo
        _id={product._id}
          brand={product.brand}
          title={product.title}
          price={product.price}
          rating={product.rating}
          reviewCount={product.reviewCount}
          description={product.description}
          colors={product.colors}
          sizes={product.sizes}
          image={product.image}
          category={product.category}
        />
      </div>
    </section>
  );
}