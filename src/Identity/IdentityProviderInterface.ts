import { OdentityEntity } from "../Core/Data/Entities/OdentityEntity";
import { LoginRequest } from "../Core/Data/Entities/LoginRequest";
import { OdentityProvider } from "../Core/Data/Entities/OdentityProvider";

export interface IdentityProviderInterface {
    login(loginRequest: LoginRequest, providerIdentity: OdentityProvider): Promise<OdentityEntity | null>;
}