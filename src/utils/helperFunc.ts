import { User } from "../database/models/User"
import { Product } from "../database/models/Product"


function current_time() : number {
  return new Date().getTime();
}

const check_user = async (user_id: number) => {
    const user =  await User.findOne({ where: { id: user_id } });
    if (!user) {
        const error: any = new Error("No User was found with this ID");
        error.statusCode = 404;
        throw error;
      }
    return user  
} 

const check_product = async (product_id: number) => {
  const product =  await Product.findOne({ where: { id: product_id } });
  if (!product) {
      const error: any = new Error("No Product was found with this ID");
      error.statusCode = 404;
      throw error;
    }
  return product 
} 

export { check_user, check_product, current_time }