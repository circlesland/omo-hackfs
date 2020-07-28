import {addTrustLineAsync} from "./addTrustLineAsync";

export async function trust(trustSafeAddress:string) {
    const w = <any>window;
    if (!w)
        throw new Error("No 'window'!");

    let safeGivingChecksumAddress = w.o.web3.utils.toChecksumAddress(w.o.odentity.current.circleSafe.safeAddress.trim());
    let safeReceivingChecksumAddress = w.o.web3.utils.toChecksumAddress(trustSafeAddress.trim());

    let trustGivingSafe = {
        safeAddress: safeGivingChecksumAddress
    };
    let trustReceivingSafe = {
        safeAddress: safeReceivingChecksumAddress
    };

    let response = await addTrustLineAsync(
        w.o.odentity.current.circleSafeOwner,
        trustGivingSafe,
        trustReceivingSafe,
        100);

    console.log("trusted:", response);
    // TODO: Implement
}
