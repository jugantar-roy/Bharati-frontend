import { Metadata } from 'next';
import { getProductBySlug } from '@/lib/api/products';
import ProductClient from './ProductClient';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const product = await getProductBySlug(params.slug);
    
    const title = `${product.title} | Bharati Kitchenware`;
    const description = product.description.substring(0, 160);
    
    let imageUrl = 'https://bharatikitchen.com/default-product.png';
    if (product.media && product.media.length > 0) {
      const primaryMedia = product.media.find((m: any) => m.isPrimary);
      imageUrl = primaryMedia ? primaryMedia.url : product.media[0].url;
    }

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://bharatikitchen.com/product/${params.slug}`,
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 800,
            alt: product.title,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: 'Product Not Found | Bharati Kitchenware',
    };
  }
}

export default function Page() {
  return <ProductClient />;
}
