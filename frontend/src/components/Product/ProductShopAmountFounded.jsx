const ProductShopAmountFounded = ({ product }) => {
  return (
    <tr className="bg-[#dfdfdf]">
      <td>{product.count ? product.count : "-"}</td>
      <td>{product.min ? product.min : "-"}</td>
      <td>{product.max ? product.max : "-"}</td>
    </tr>
  );
};

export default ProductShopAmountFounded;
