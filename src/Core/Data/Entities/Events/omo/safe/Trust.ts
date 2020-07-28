import {Event} from "../../../Event"

export class Trust extends Event
{
    readonly _$eventType = "omo.safe.trust";

    data: {
        trustGiver: { // Owner of the trust-giving safe
            address: string,
            privateKey: string
        },
        trustGiverSafe: string, // The trust-giving safe (web3.utils.toChecksumAddress(window.o.odentity.current.circleSafe.safeAddress.trim());)
        trustReceiverSafe: string, // The trust-receiving safe (web3.utils.toChecksumAddress(trustSafeAddress.trim()))
    }|undefined = undefined;
}
