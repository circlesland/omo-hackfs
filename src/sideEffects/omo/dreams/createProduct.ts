import {ISideEffect} from "../../../core/Flows/ISideEffect";
import {IProcessContext} from "../../../core/Flows/IProcessContext";
import {Dreams as DreamsMutations} from "../../../mutations/omo/dreams/dreams";
import {ProductMutations} from "../../../mutations/omo/dreams/products";

export const createProduct: ISideEffect<IProcessContext, any> = {
  _$schemaId: "sideEffects:omo.dreams.createProduct",
  inputs: [{
    name: "name",
    type: "schema:omo.string"
  },{
    name: "description",
    type: "schema:omo.any"
  },{
    name: "category",
    type: "schema:omo.any"
  },{
    name: "city",
    type: "schema:omo.any"
  },{
    name: "price",
    type: "schema:omo.any"
  },{
    name: "pictureHash",
    type: "schema:omo.any"
  }],
  outputs: [{
    name: "dreamId",
    type: "schema:omo.string"
  }],
  execute: async (context, argument) =>
  {
    /*
    name: string,
    description: string,
    category: string,
    cityName: string,
    price: string,
    pictureHash: string
     */
    const name = context.local.inputs["name"];
    const description = context.local.inputs["description"];
    const category = context.local.inputs["category"];
    const city = context.local.inputs["city"];
    const price = context.local.inputs["price"];
    const pictureHash = context.local.inputs["pictureHash"];

    const newProduct = await ProductMutations.createNewProduct(name, description, category, city, price, pictureHash);
    console.log("Created new product:", newProduct);
  },
  canExecute: async context => true
};
