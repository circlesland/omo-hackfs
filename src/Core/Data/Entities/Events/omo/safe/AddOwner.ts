import {Event} from "../../../Event"

export class AddOwner extends Event
{
    readonly _$eventType = "omo.safe.addOwner";

    /*
    await core.safe.addOwner(account, {
      safeAddress,
      ownerAddress: '0x123...',
    });
     */
    data: {
        safeAddress:string,
        ownerAddress:string
    }|undefined = undefined;
}
