export async function addTrustLineAsync(
    trustGivingSafeOwner,
    trustGivingSafe,
    trustReceivingSafe,
    trustPercentage
) {
    // .. give user the permission to send their Token to you
    const trusted = await window.o.circlesCore.trust.addConnection(trustGivingSafeOwner, {
        canSendTo: trustGivingSafe.safeAddress,
        user: trustReceivingSafe.safeAddress,
        limitPercentage: trustPercentage
    });
    alert(JSON.stringify(trusted));
    return trusted;
}
