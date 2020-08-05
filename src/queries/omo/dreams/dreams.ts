import Observable from "zen-observable";
import {Dream} from "../../../schema/omo/dreams/dream";

export interface Interaction
{
  _id:string;
}

export class Dreams
{
  leapMap = {
    1: "Leap 1",
    2: "Leap 2",
    3: "Leap 3"
  }

  static readonly fields =
    "_id " +
    "name " +
    "description " +
    "safeAddress " +
    "state " +
    "creator {" +
    " _id " +
    " name " +
    " safeAddress " +
    " odentityId" +
    "} " +
    "reservations {" +
    " _id" +
    "} " +
    "Votes {" +
    "  _id" +
    "}";

  /**
   * Gets all dreams and optionally filters for the dream-state
   * @param state
   */
  static all(state?:string)
  {
    const sub = window.o.graphQL.subscribe(
      "Dreams{" + Dreams.fields + "}"
    );

    return new Observable(s =>
    {
      sub.subscribe(o =>
      {
        if (o.error)
          throw new o.error;

        let allDreams = o.data.Dreams;
        if (state) {
          allDreams = allDreams.filter(o => o.state == state);
        }
        s.next(allDreams);
      });
    });
  }

  static byId(id: string)
  {
    const dream = window.o.graphQL.query(`DreamById(_id:"${id}"){${Dreams.fields}}`);
    return dream;
  }
/*
  static allInteractions(dreamId:string) : Interaction[] {
    let data = Dreams.byId(dreamId);
    totalInteractions = d.data.DreamById.Votes.length + d.data.DreamById.reservations.length;
  }
*/
  static *calcLevels(interactions: Interaction[])
  {
    let sum = 0;
    let prev1 = 0;
    let prev2 = 1;
    let i = 1;

    for (let i = 0; i < interactions.length; i++)
    {
      let fib = prev1 + prev2;
      if (i == 1)
      {
        prev1 = 0;
        prev2 = 1;
      }
      else if (i == 2)
      {
        prev1 = 1;
        prev2 = 1;
      }
      else
      {
        prev1 = prev2;
        prev2 = fib;
      }
      sum += fib;
      //console.log("Fibonacci: " + fib + ", sum: " + sum + ", level: " + i + ", leap: " + Math.ceil(i / 5))
    }

    return {
      leap: Math.ceil((i - 1) / 5),
      level: i - 1
    }
  }

  static calcLevel(targetSum: number): {
    leap: number,
    level: number
  }
  {
    let sum = 0;
    let prev1 = 0;
    let prev2 = 1;
    let i = 1;
    while (sum <= targetSum)
    {
      let fib = prev1 + prev2;
      if (i == 1)
      {
        prev1 = 0;
        prev2 = 1;
      }
      else if (i == 2)
      {
        prev1 = 1;
        prev2 = 1;
      }
      else
      {
        prev1 = prev2;
        prev2 = fib;
      }
      sum += fib;
      //console.log("Fibonacci: " + fib + ", sum: " + sum + ", level: " + i + ", leap: " + Math.ceil(i / 5))
      i++;
    }

    return {
      leap: Math.ceil((i - 1) / 5),
      level: i - 1
    }
  }
}
