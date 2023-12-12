const ProductShopAmountFounded = ({ product }) => {
  return (
    <tr className="bg-[#dfdfdf]">
      <td>{product.amount}</td>
      <td>{product.min}</td>
      <td>{product.max}</td>
    </tr>
  );
};

export default ProductShopAmountFounded;
