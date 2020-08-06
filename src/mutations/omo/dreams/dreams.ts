import {Dreams as DreamsQueries} from "../../../queries/omo/dreams/dreams";

export class Dreams {
  static async deleteDream(id) {
    return await window.o.graphQL.mutation(`deleteDream(_id:"${id}") {name}`);
  }

  static async createNewDream(
    name: string,
    description: string,
    cityName: string,
    safeAddress: string
  ) {
    const newDream = await window.o.graphQL.mutation(
      `addDream(name:"${name}" description:"${description}" city:"${cityName}" safeAddress:"${safeAddress}" leap: "1") {_id name leap description safeAddress}`
    );
    return !newDream.data ? null : newDream.data.addDream;
  }

  static async newCommitment(dreamId:string, omosapienId:string)
  {
    const newSubscription = await window.o.graphQL.mutation(`addStream(state: "commitment", creatorId: "${omosapienId}", dreamId: "${dreamId}") {_id}`);
    if (!newSubscription.data) {
      throw new Error("Couldn't create a new commitment.");
    }
    return newSubscription.data.addStream._id;
  }

  static async newReservation(dreamId:string, omosapienId:string)
  {
    const newSubscription = await window.o.graphQL.mutation(`addStream(state: "reservation", creatorId: "${omosapienId}", dreamId: "${dreamId}") {_id}`);
    if (!newSubscription.data) {
      throw new Error("Couldn't create a new reservation.");
    }
    return newSubscription.data.addStream._id;
  }

  static async newSubscription(dreamId:string, omosapienId:string)
  {
    const newSubscription = await window.o.graphQL.mutation(`addStream(state: "subscription", creatorId: "${omosapienId}", dreamId: "${dreamId}") {_id}`);
    if (!newSubscription.data) {
      throw new Error("Couldn't create a new subscription.");
    }
    return newSubscription.data.addStream._id;
  }
}
