import {ProcessNode} from "./ProcessNode";
import {ProcessState} from "./ProcessState";
import {ISideEffect} from "./ISideEffect";
import {IProcessContext} from "./IProcessContext";

/**
 * Describes a sequential process with categories (leafs are actions, everything else is a category).
 */
export interface IProcessNode<TContext extends IProcessContext>
{
    state:ProcessState;
    title:string;

    parent:IProcessNode<TContext>|null;
    children:ProcessNode<TContext>[];

    /**
     * When the node is active, the UI should display this quant.
     * This applies to categories as well as to leaf nodes.
     *
     * Example:
     * If a category node has a 'quant' set and the following leafs have none,
     * the 'quant' of the category will be displayed in the UI as long as
     * it's children without own 'quant' are executed.
     */
    quant?:string;

    /**
     * The side effect that should be executed when this node becomes active.
     * If the side effect cannot be executed in the current environment, the node
     * must not become the active node.
     */
    sideEffect?: ISideEffect<TContext, any>;

    /**
     * Gets the one and only active leaf node (if any).
     * @param childNodesOnly If only child nodes should be considered. If 'false', the search will start from the root node.
     */
    findActiveLeaf(childNodesOnly:boolean):IProcessNode<TContext>|null;

    /**
     * Gets the whole path to the active leaf node (including the leaf - if any) or returns an empty array.
     */
    findActiveBranch(childNodesOnly:boolean): IProcessNode<TContext>[];

    /**
     * Takes the 'currentNode' and finds the next node in the flattened representation of the tree.
     * Finds categories and leafs.
     * @param currentNode The current node.
     */
    findNextNode(currentNode:IProcessNode<TContext>) : IProcessNode<TContext>|null;

    /**
     * Takes the 'currentNode' and finds the previous node in the flattened representation of the tree.
     * Finds categories and leafs.
     * @param currentNode
     */
    findPreviousNode(currentNode:IProcessNode<TContext>) : IProcessNode<TContext>|null;
}
