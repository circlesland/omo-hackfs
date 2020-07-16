import { Quant } from "../Data/Entities/Quant";
import { JSONSchema } from "@textile/threads-database";
import { PubSub } from "graphql-subscriptions";
import { Quantum } from "./QuantumBackup";
let pluralize = require('pluralize');


export class ModelQuant {

    // static pubsub = new PubSub();
    // private isManyToMany: boolean;
    // name: string;
    // collectionName: string;
    // private properties: { name: string, type: string }[];
    // private oneToManyRelations: { name: string, reference: string, fieldName: string }[];
    // private ManyToOneRelations: { name: string, reference: string, fieldName: string }[];
    // private ManyToManyRelations: { name: string, reference: string, fieldName: string }[];
    // private oneToOneRelations: { name: string, reference: string, fieldName: string }[];

    // static definitons: any = {
    //     oneToOne: {
    //         type: "object",
    //         properties: {
    //             reference: { "type": "string" }
    //         },
    //         required: ["reference"]
    //     },
    //     manyToOne: {
    //         type: "object",
    //         properties: {
    //             reference: { "type": "string" }
    //         },
    //         required: ["reference"]
    //     },
    //     oneToMany: {
    //         type: "object",
    //         properties: {
    //             reference: { "type": "string" }
    //         },
    //         required: ["reference"]
    //     },
    //     manyToMany: {
    //         type: "object",
    //         properties: {
    //             reference: { "type": "string" }
    //         },
    //         required: ["reference"]
    //     }
    // };

    // static byQuant(quant: Quant) {
    //     return new ModelQuant(quant);
    // }

    // static ManyToMany(collection1: string, collection2: string) {
    //     return new ModelQuant(undefined, collection1, collection2);
    // }

    // getGraphQlQuery() {
    //     if (this.isManyToMany) return "";
    //     return `${pluralize(this.typeName(this.name))}: [${this.typeName(this.name)}]
    //     ${this.typeName(this.name)}ById(_id:String): ${this.typeName(this.name)}
    //     `;
    // }

    // addQueryResolver(query: any, quantum: Quantum) {
    //     if (this.isManyToMany) return "";
    //     var collection = quantum.getCollectionWithoutSchema(this.collectionName);
    //     query[pluralize(this.typeName(this.name))] = {
    //         resolve: async () => await collection.find({})
    //     };
    //     query[this.typeName(this.name) + 'ById'] = async (_, { _id }) => await collection.findById(_id);
    // }

    // addTypeResolver(typeResolvers: any, quantum: Quantum) {
    //     var retval: any = {};
    //     this.oneToManyRelations.forEach(rel => {
    //         let collection = quantum.getCollectionWithoutSchema(rel.reference);
    //         retval[rel.name] = async (x: any) => await collection.find({ ands: [{ fieldPath: this.collectionName.toLowerCase() + 'Id', value: { string: x._id } }] })
    //     });

    //     this.ManyToOneRelations.forEach(rel => {
    //         let collection = quantum.getCollectionWithoutSchema(rel.reference);
    //         retval[rel.name] = async (x: any) => {
    //             if (x[rel.fieldName])
    //                 return await collection.findById(x[rel.fieldName]);
    //             return null;
    //         }
    //     });
    //     typeResolvers[this.collectionName] = retval;
    // }
    // addMutationResolver(mutation: any, quantum: Quantum) {
    //     if (this.isManyToMany) return "";
    //     var collection = quantum.getCollectionWithoutSchema(this.collectionName);
    //     mutation['add' + this.typeName(this.name)] = {
    //         resolve: async (_, data) => {
    //             var entity: any = {};
    //             Object.keys(data).forEach(key => {
    //                 if (this.properties.some(x => x.name == key)) {
    //                     entity[key] = data[key];
    //                     delete data[key];
    //                 }
    //             });
    //             entity = await collection.create(entity);

    //             //relations
    //             this.oneToOneRelations.forEach(relation => {
    //                 let value = data[relation.fieldName];
    //                 if (value) {
    //                     entity[relation.reference.toLowerCase() + 'Id'] = value;
    //                     var refCollection = quantum.getCollectionWithoutSchema(relation.reference);
    //                     var refEntity = refCollection.findById(data[relation.fieldName]);
    //                     if (refEntity == null) throw new Error("Referenced item not found");
    //                     refEntity[this.collectionName.toLowerCase() + 'Id'] = entity._id;
    //                     refCollection.save(refEntity);
    //                     delete data[relation.fieldName];
    //                 }
    //             })

    //             this.ManyToOneRelations.forEach(relation => {
    //                 let value = data[relation.fieldName];
    //                 if (value) {
    //                     entity[relation.reference.toLowerCase() + 'Id'] = value;
    //                     delete data[relation.fieldName];
    //                 }
    //             });

    //             this.oneToManyRelations.forEach(async relation => {
    //                 let value = data[relation.fieldName];
    //                 if (value && Array.isArray(value) && value.length != 0) {
    //                     var refCollection = quantum.getCollectionWithoutSchema(relation.reference);
    //                     var entities = await refCollection.find({
    //                         ors: value.map(x => {
    //                             return {
    //                                 ands: [{ fieldPath: "_id", value: { string: x } }]
    //                             };
    //                         })
    //                     });
    //                     let updated = entities.map((e: any) => {
    //                         e[this.collectionName.toLowerCase() + 'Id'] = entity._id;
    //                         return e;
    //                     });
    //                     await refCollection.saveMany(updated);
    //                     delete data[relation.fieldName];
    //                 }
    //             })
    //             return entity;
    //         }
    //     };
    // }
    // addSubscriptionResolver(subscription: any, quantum: Quantum) {
    //     if (this.isManyToMany) return "";
    //     console.log(this.collectionName + "_changed");
    //     var collection = quantum.getCollectionWithoutSchema(this.collectionName);
    //     subscription[pluralize(this.typeName(this.name))] = {
    //         resolve: async () => await collection.find({}),
    //         subscribe: async () => ModelQuant.pubsub.asyncIterator(this.collectionName + "_changed"),
    //     }
    //     subscription[this.typeName(this.name) + 'ById'] = {
    //         resolve: async (_, data) => { console.log(data); return await collection.find({}) },
    //         subscribe: async (_, { _id }) => { console.warn("Subscrition not working in the moment"); return ModelQuant.pubsub.asyncIterator(_id + "_changed") },
    //     }
    //     subscription[this.typeName(this.name) + 'Added'] = {
    //         resolve: async (_, data) => { console.log(data); return await collection.find({}) },
    //         subscribe: async () => { console.warn("Subscrition not working in the moment"); return ModelQuant.pubsub.asyncIterator(this.collectionName + "_added") },
    //     }
    //     subscription[this.typeName(this.name) + 'Updated'] = {
    //         resolve: async (_, data) => { console.log(data); return await collection.find({}) },
    //         subscribe: async () => { console.warn("Subscrition not working in the moment"); return ModelQuant.pubsub.asyncIterator(this.collectionName + "_updated") },
    //     }
    //     subscription[this.typeName(this.name) + 'Deleted'] = {
    //         resolve: async (_, data) => { console.log(data); return await collection.find({}) },
    //         subscribe: async () => { console.warn("Subscrition not working in the moment"); return ModelQuant.pubsub.asyncIterator(this.collectionName + "_deleted") },
    //     }
    // }

    // getGraphQlMutation() {
    //     if (this.isManyToMany) return "";
    //     var args = this.getArguments();
    //     return `add${this.typeName(this.name)}(${args}): ${this.typeName(this.name)}
    //     update${this.typeName(this.name)}(${args}): ${this.typeName(this.name)}
    //     delete${this.typeName(this.name)}(_id:String): ${this.typeName(this.name)}
    //     `;
    // }
    // getGraphQlSubscription() {
    //     if (this.isManyToMany) return "";
    //     return `${pluralize(this.typeName(this.name))}: [${this.typeName(this.name)}]
    //     ${this.typeName(this.name)}ById(_id:String): ${this.typeName(this.name)}
    //     ${this.typeName(this.name)}Added: ${this.typeName(this.name)}
    //     ${this.typeName(this.name)}Updated: ${this.typeName(this.name)}
    //     ${this.typeName(this.name)}Deleted: ${this.typeName(this.name)}
    //     `;
    // }
    // getArguments() {
    //     var args = this.properties.map(prop => `${prop.name}: ${prop.type}`);
    //     args.push(...this.oneToOneRelations.map(rel => `${rel.fieldName}:String`));
    //     args.push(...this.ManyToOneRelations.map(rel => `${rel.fieldName}:String`));
    //     args.push(...this.oneToManyRelations.map(rel => `${rel.fieldName}:[String]`));
    //     args.push(...this.ManyToManyRelations.map(rel => `${rel.fieldName}:[String]`));
    //     return args.join(', ');
    // }

    // private typeName(name) {
    //     return name.split(' ').join('');
    // }

    // private constructor(quant?: Quant, collection1?: string, collection2?: string) {
    //     this.isManyToMany = false;
    //     this.name = '';
    //     this.collectionName = '';
    //     this.properties = [];
    //     this.oneToManyRelations = [];
    //     this.ManyToManyRelations = [];
    //     this.ManyToOneRelations = [];
    //     this.oneToOneRelations = [];
    //     if (quant) this.createByQuant(quant);
    //     if (collection1 && collection2)
    //         this.createManyToMany(collection1, collection2);
    // }

    // private createByQuant(quant: Quant) {
    //     this.name = quant.name;
    //     this.collectionName = quant.collectionName;
    //     let properties = JSON.parse(quant.jsonSchema).properties;
    //     Object.keys(properties).map(name => {

    //         if (properties[name].type) {
    //             switch (properties[name].type.toLowerCase()) {
    //                 case "string":
    //                     this.properties.push({ name, type: "String" });
    //                     break;
    //                 case "integer":
    //                     this.properties.push({ name, type: "Integer" });
    //                     break;
    //                 case "number":
    //                     this.properties.push({ name, type: "Float" });
    //                     break;
    //                 case "boolean":
    //                     this.properties.push({ name, type: "Boolean" });
    //                     break;
    //                 default: throw new Error(`Type '${properties[name].type.toLowerCase()}' of property '${name}'is not supported. If you need this feature please create dream`);
    //             }
    //         }

    //         if (properties[name]["$ref"]) {
    //             switch (properties[name]["$ref"]) {
    //                 case '#/definitions/oneToMany':
    //                     this.oneToManyRelations.push({ name, reference: properties[name].description, fieldName: pluralize(name.toLowerCase()) + 'Ids' });
    //                     break;
    //                 case '#/definitions/manyToOne':
    //                     this.ManyToOneRelations.push({ name, reference: properties[name].description, fieldName: name.toLowerCase() + 'Id' });
    //                     break;
    //                 case '#/definitions/oneToOne':
    //                     this.oneToOneRelations.push({ name, reference: properties[name].description, fieldName: name.toLowerCase() + 'Id' });
    //                     break;
    //                 case '#/definitions/manyToMany':
    //                     this.ManyToManyRelations.push({ name, reference: properties[name].description, fieldName: pluralize(name.toLowerCase()) + 'Ids' });
    //                     break;
    //             }
    //         }
    //     });
    // }

    // createManyToMany(collection1: string, collection2: string) {
    //     var relationName = [collection1, collection2].sort().join("-oo-");
    //     this.name = relationName;
    //     this.collectionName = relationName;
    //     this.properties.push({ name: '_id', type: "string" });
    //     this.properties.push({ name: collection1.toLowerCase() + 'Id', type: "string" });
    //     this.properties.push({ name: collection2.toLowerCase() + 'Id', type: "string" });
    //     this.isManyToMany = true;
    // }

    // UpdateRelations(modelQuanta: ModelQuant[]): void {
    //     this.updateOneToManyRelations(modelQuanta);
    //     this.updateManyToOneRelations(modelQuanta);
    //     this.updateOneToOneRelations(modelQuanta);
    //     this.updateManyToManyRelations(modelQuanta);
    // }

    // private updateManyToManyRelations(modelQuanta: ModelQuant[]) {
    //     this.ManyToManyRelations.forEach(relation => {
    //         var referenceQuant = modelQuanta.find(mQ => mQ.collectionName == relation.reference);
    //         if (referenceQuant == undefined)
    //             throw Error(`Reference ${relation.reference} was not found. Did you forget to create those collection?`);

    //         var relationName = [this.collectionName, relation.reference].sort().join("-oo-");
    //         var relQuant = modelQuanta.find(mQ => mQ.name == relationName);

    //         if (relQuant == null) {
    //             relQuant = ModelQuant.ManyToMany(this.collectionName, relation.reference);
    //             modelQuanta.push(relQuant);
    //         }

    //         if (!referenceQuant.ManyToManyRelations.some(q => q.reference == this.collectionName))
    //             referenceQuant.ManyToManyRelations.push({ name: pluralize(this.name), reference: this.collectionName, fieldName: pluralize(this.collectionName).toLowerCase() + 'Ids' });
    //     })
    // }

    // private updateOneToOneRelations(modelQuanta: ModelQuant[]) {
    //     this.oneToOneRelations.forEach(relation => {
    //         var referenceQuant = modelQuanta.find(mQ => mQ.collectionName == relation.reference);
    //         if (referenceQuant == undefined)
    //             throw Error(`Reference ${relation.reference} was not found. Did you forget to create those collection?`);
    //         if (!referenceQuant.oneToOneRelations.some(q => q.reference == this.collectionName))
    //             referenceQuant.oneToOneRelations.push({ name: this.name, reference: this.collectionName, fieldName: this.collectionName.toLowerCase() + 'Id' });
    //     });
    // }

    // private updateManyToOneRelations(modelQuanta: ModelQuant[]) {
    //     this.ManyToOneRelations.forEach(relation => {
    //         var referenceQuant = modelQuanta.find(mQ => mQ.collectionName == relation.reference);
    //         if (referenceQuant == undefined)
    //             throw Error(`Reference ${relation.reference} was not found. Did you forget to create those collection?`);
    //         if (!referenceQuant.oneToManyRelations.some(q => q.reference == this.collectionName))
    //             referenceQuant.oneToManyRelations.push({ name: pluralize(this.name), reference: this.collectionName, fieldName: this.collectionName.toLowerCase() + 'Ids' });
    //     });
    // }

    // private updateOneToManyRelations(modelQuanta: ModelQuant[]) {
    //     this.oneToManyRelations.forEach(relation => {
    //         var referenceQuant = modelQuanta.find(mQ => mQ.collectionName == relation.reference);
    //         if (referenceQuant == undefined)
    //             throw Error(`Reference ${relation.reference} was not found. Did you forget to create those collection?`);
    //         if (!referenceQuant.ManyToOneRelations.some(q => q.reference == this.collectionName))
    //             referenceQuant.ManyToOneRelations.push({ name: this.name, reference: this.collectionName, fieldName: this.collectionName.toLowerCase() + 'Id' });
    //     });
    // }

    // toTextileSchema(): JSONSchema {
    //     var props = {};
    //     this.properties.forEach(prop => props[prop.name] = { type: prop.type.toLowerCase() });
    //     this.ManyToOneRelations.forEach(relation => props[relation.reference.toLowerCase() + 'Id'] = { type: "string" });
    //     this.oneToOneRelations.forEach(relation => props[relation.reference.toLowerCase() + 'Id'] = { type: "string" });
    //     return {
    //         $id: `https://omo.earth/quant.${this.collectionName}.json`,
    //         $schema: "http://json-schema.org/draft-07/schema#",
    //         title: this.name,
    //         type: "object",
    //         required: ["_id"],
    //         properties: props
    //     };
    // }

    // toJsonSchema(): JSONSchema {
    //     var props = {};
    //     this.properties.forEach(prop => props[prop.name] = { type: prop.type.toLowerCase() });
    //     this.ManyToOneRelations.forEach(relation => props[relation.name] = { "$ref": "#/definitions/manyToOne", description: relation.reference });
    //     this.oneToOneRelations.forEach(relation => props[relation.name] = { "$ref": "#/definitions/oneToOne", description: relation.reference });
    //     this.oneToManyRelations.forEach(relation => props[relation.name] = { "$ref": "#/definitions/oneToMany", description: relation.reference });
    //     this.ManyToManyRelations.forEach(relation => props[relation.name] = { "$ref": "#/definitions/manyToMany", description: relation.reference });

    //     return {
    //         $id: `https://omo.earth/quant.${this.collectionName}.json`,
    //         $schema: "http://json-schema.org/draft-07/schema#",
    //         title: this.name,
    //         type: "object",
    //         required: ["_id"],
    //         definitions: ModelQuant.definitons,
    //         properties: props
    //     };
    // }

    // toGraphQlTypeDefs() {
    //     if (this.isManyToMany) return "";
    //     var props = "";
    //     this.properties.forEach(prop => {
    //         props += `${prop.name}: ${prop.type}
    //         `;
    //     });
    //     var relations = "";
    //     this.oneToManyRelations.forEach(relation => {
    //         relations += `${relation.name}:[${this.typeName(relation.reference)}]
    //         `;
    //     })
    //     this.ManyToManyRelations.forEach(relation => {
    //         relations += `${relation.name}:[${this.typeName(relation.reference)}]
    //         `;
    //     })
    //     this.ManyToOneRelations.forEach(relation => {
    //         relations += `${relation.name}:${this.typeName(relation.reference)}
    //         `;
    //     })
    //     this.oneToOneRelations.forEach(relation => {
    //         relations += `${relation.name}:${this.typeName(relation.reference)}
    //         `;
    //     })
    //     return `
    //     type ${this.typeName(this.name)} {
    //         ${props}
    //         ${relations}
    //     }
    //     `;
    // }
}