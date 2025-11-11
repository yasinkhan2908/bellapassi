import { GetStaticProps, GetStaticPaths } from "next";

export interface CategoryPageProps {
  categoryName: string;
}

export default function CategoryPage({ categoryName }: CategoryPageProps) {
  return (
    <main>
      <h1>Category: {categoryName}</h1>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = ["new-arrival", "shoes", "clothing", "boots", "bags", "boutique", "hot-trending", "influencer-program", "grab-and-go", "accessories", "shop-the-reel", "mens", "descover", "upcoming-drops", "women-fashion", "mens-fashion", "kids-fashion", "cosmetics", "mordern-backpack", "season-collection", "stradivarius-top-trainers"];
  const paths = categories.map((categoryName) => ({
    params: { categoryName },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({
  params,
}) => {
  const categoryName = params?.categoryName as string;

  return {
    props: {
      categoryName,
    },
  };
};
