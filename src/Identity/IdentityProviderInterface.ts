import { Omo } from "../Core/Entities/Omo";
import { LoginRequest } from "../Core/Entities/LoginRequest";
import { IdentityProvider } from "../Core/Entities/IdentityProvider";

export interface IdentityProviderInterface {
    loginOmo(iloginRequest: LoginRequest, providerIdentity: IdentityProvider): Promise<Omo | null>;
}