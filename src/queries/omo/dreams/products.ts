import Observable from "zen-observable";

export class Products {

  /**
   * Gets all dreams and optionally filters for the dream-state
   */
  static all(category?: string) {
    const sub = window.o.graphQL.subscribe(
      "Products{ _id, name, category, description, creatorId, city, price, pictureHash }"
    );

    return new Observable(s => {
      sub.subscribe(o => {
        if (o.error)
          throw new o.error;

        let allProducts = o.data.Products;
        /*if (category) {
          allProducts = allProducts.filter(o => o.category == category);
        }*/
        s.next(allProducts);
      });
    });
  }
}
