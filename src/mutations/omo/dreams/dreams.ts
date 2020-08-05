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
      `addDream(name:"${name}" description:"${description}" city:"${cityName}" safeAddress:"${safeAddress}" state:"dream") {_id name state description safeAddress}`
    );
    return !newDream.data ? null : newDream.data.addDream;
  }

  static async newVote(dreamId:string, omosapienId:string)
  {
    const newVote = await window.o.graphQL.mutation(`addVote(creatorId: "${omosapienId}", voteforId: "${dreamId}") {_id}`);
    if (!newVote.data) {
      throw new Error("Couldn't create a new vote.");
    }
    return newVote.data.addVote._id;
  }

  static async newReservation(dreamId:string, omosapienId:string)
  {
    const newSubscription = await window.o.graphQL.mutation(`addDreamSubscription(state: "reservation", creatorId: "${omosapienId}", dreamId: "${dreamId}") {_id}`);
    if (!newSubscription.data) {
      throw new Error("Couldn't create a new reservation.");
    }
    return newSubscription.data.addDreamSubscription._id;
  }

  static async newSubscription(dreamId:string, omosapienId:string)
  {
    const newSubscription = await window.o.graphQL.mutation(`addDreamSubscription(state: "subscription", creatorId: "${omosapienId}", dreamId: "${dreamId}") {_id}`);
    if (!newSubscription.data) {
      throw new Error("Couldn't create a new subscription.");
    }
    return newSubscription.data.addDreamSubscription._id;
  }
}
