import { OdentityEntity } from "../Core/Entities/OdentityEntity";
import { LoginRequest } from "../Core/Entities/LoginRequest";
import { OdentityProvider } from "../Core/Entities/OdentityProvider";

export interface IdentityProviderInterface {
    login(loginRequest: LoginRequest, providerIdentity: OdentityProvider): Promise<OdentityEntity | null>;
}