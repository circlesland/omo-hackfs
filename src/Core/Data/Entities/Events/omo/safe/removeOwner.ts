import {Event} from "../../../Event"

export class RemoveOwner extends Event
{
    readonly _$eventType = "omo.safe.removeOwner";
    /*
    await core.safe.removeOwner(account, {
      safeAddress,
      ownerAddress: '0x123...',
    });
     */
    data: {
        safeAddress:string,
        ownerAddress:string
    }|undefined = undefined;
}
