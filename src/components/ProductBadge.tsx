import type { Product } from '../types/rewards';

type ProductBadgeProps = {
  products: Product[];
};

const productLabels: Record<Product, string> = {
  Casino: 'Casino',
  Sports: 'Sports',
  Poker: 'Poker',
  CrossProduct: 'All products'
};

function getPrimaryProduct(products: Product[]): Product {
  return products[0] ?? 'CrossProduct';
}

export function ProductBadge({ products }: ProductBadgeProps) {
  const primaryProduct = getPrimaryProduct(products);

  return (
    <span className={`product-badge product-badge--${primaryProduct.toLowerCase()}`}>
      {productLabels[primaryProduct]}
    </span>
  );
}
