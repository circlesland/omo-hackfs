import { Dreams as DreamsQueries } from "../../../queries/omo/dreams/dreams";
import { Omosapiens } from "../../../queries/omo/odentity/omosapiens";

export class ProductMutations {
  static async createNewProduct(
    name: string,
    description: string,
    category: string,
    cityName: string,
    price: string,
    pictureHash: string
  ) {
    if (!window.o.odentity.current)
      throw new Error("No current odentity");

    const omosapien = await Omosapiens.byOdentityId(window.o.odentity.current._id);
    console.log("createNewProduct mutation: omosapien:", omosapien);

    const newProduct = await window.o.graphQL.mutation(
      `addProduct(name: "${name}", category: "${category}", description: "${description}", creatorId: "${omosapien._id}", city: "${cityName}", price: "${price}", pictureHash: "${pictureHash}") {_id}`
    );
    return !newProduct.data ? null : newProduct.data.addProduct;
  }
}
