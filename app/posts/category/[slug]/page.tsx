import React from "react";

const CategorySlugpage = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const { slug } = params;
  return <div>{`CategorySlugpage ${slug}`}</div>;
};

export default CategorySlugpage;
