import {Quantum} from "../Quantum";

/**
 * Must be supplied to every action of a IProcessNode.
 */
export interface IProcessContext
{
    stepId:string;
    o:Quantum;
}
