import Observable from "zen-observable";

export class Dreams
{
  static readonly fields =
    "_id " +
    "name " +
    "description " +
    "safeAddress " +
    "creator {" +
    " _id " +
    " name " +
    " safeAddress " +
    " odentityId" +
    "} " +
    "reservations {" +
    " _id" +
    "} " +
    "subscriptions {" +
    " _id" +
    "} " +
    "Votes {" +
    "  _id" +
    "}";

  static all()
  {
    const sub = window.o.graphQL.subscribe(
      "Dreams{" + Dreams.fields + "}"
    );

    return new Observable(s =>
    {
      sub.subscribe(o =>
      {
        s.next(o.data.Dreams);
      });
    });
  }

  static byId(id:string)
  {
    const dream = window.o.graphQL.query(`DreamById(_id:"${id}"){${Dreams.fields}}`);
    return dream;
  }

  static calcLevel(targetSum:number) : {
    leap:number,
    level:number
  } {

    let sum = 0;
    let prev1 = 0;
    let prev2 = 1;
    let i = 1;
    while(sum <= targetSum) {
      let fib = prev1 + prev2;
      if (i == 1) {
        prev1 = 0;
        prev2 = 1;
      } else if (i == 2) {
        prev1 = 1;
        prev2 = 1;
      } else {
        prev1 = prev2;
        prev2 = fib;
      }
      sum += fib;
      //console.log("Fibonacci: " + fib + ", sum: " + sum + ", level: " + i + ", leap: " + Math.ceil(i / 5))
      i++;
    }

    return {
      leap: Math.ceil((i - 1) / 5),
      level: i -1
    }
  }
}
