import {ProcessState} from "./ProcessState";
import {IProcessContext} from "./IProcessContext";
import {v4} from "uuid";

export class ProcessNode<TContext extends IProcessContext>
{
    id: string = v4();
    parentId: string | undefined;

    children: ProcessNode<TContext>[] = [];
    parent: ProcessNode<TContext> | null = null;
    state: ProcessState = ProcessState.Pristine;
    title: string = "";

    quant?:string;
    sideEffect?: string;

    constructor(parent?:ProcessNode<TContext>)
    {
        this.parent = !parent ? null : parent;
        this.parentId = !this.parent ? undefined : this.parent.id;
    }

    findActiveBranch(childNodesOnly: boolean = false): ProcessNode<TContext>[]
    {
        const activeLeaf = this.findActiveLeaf(childNodesOnly);
        if (!activeLeaf) {
            return [];
        }
        const path = this.path(activeLeaf);
        return path;
    }

    findActiveLeaf(childNodesOnly: boolean = false): ProcessNode<TContext> | null
    {
        for (let node of this.flattenSequential(childNodesOnly))
        {
            if (!this.isLeaf(node)) {
                continue;
            }
            if (!this.isActive(node)){
                continue;
            }

            return node;
        }

        return null;
    }

    findNextNode(currentNode: ProcessNode<TContext>): ProcessNode<TContext> | null
    {
        let next:boolean = false;

        for (let node of this.flattenSequential(false, currentNode))
        {
            if (node == currentNode) {
                next = true;
                continue;
            }
            if (next) {
                return node;
            }
        }

        return null;
    }

    findPreviousNode(currentNode: ProcessNode<TContext>): ProcessNode<TContext> | null
    {
        let previous: ProcessNode<TContext>|null = null;
        for (let node of this.flattenSequential(false, currentNode))
        {
            if (node == currentNode) {
                return previous;
            }
            previous = node;
        }

        return null;
    }

    isLeaf(otherNode?:ProcessNode<TContext>) : boolean
    {
        return (!otherNode ? this : otherNode).children.length == 0;
    }

    isActive(otherNode?:ProcessNode<TContext>) : boolean
    {
        return (!otherNode ? this : otherNode).state == ProcessState.Active;
    }

    async canActivate<TArgument>(context:TContext, argument:TArgument, otherNode?:ProcessNode<TContext>) : Promise<boolean>
    {
        const nodeToTest:ProcessNode<TContext> = (!otherNode ? this : otherNode);
        if (!this.isLeaf(nodeToTest)) {
            return Promise.resolve(false);
        }

        const sideEffect = (<any>window).sideEffectRegistrar.get(nodeToTest.sideEffect);
        if (!sideEffect || !sideEffect.canExecute) {
            return Promise.resolve(true);
        }

        return await sideEffect.canExecute(context, argument);
    }

    path(otherNode?:ProcessNode<TContext>) : ProcessNode<TContext>[]
    {
        const path:ProcessNode<TContext>[] = [];
        let root:ProcessNode<TContext> = this;

        path.unshift((!otherNode ? this : otherNode));

        while (root.parent)
        {
            root = root.parent;
            path.unshift(root);
        }

        return path;
    }

    root(otherNode?:ProcessNode<TContext>) : ProcessNode<TContext>
    {
        const path = this.path(otherNode);
        return path[0];
    }

    flattenSequential(childNodesOnly: boolean, otherNode?:ProcessNode<TContext>) : ProcessNode<TContext>[] {
        const stack:ProcessNode<TContext>[] = [];
        const array = [];
        const hashMap = {};

        stack.push(!otherNode ? this : otherNode);

        while(stack.length !== 0) {
            var node = stack.pop();
            if (!node) {
                throw new Error("The stack returned an undefined element during the recursive iteration of a IProcessNode.");
            }
            if(node.children.length == 0) {
                ProcessNode.visitNode(node, hashMap, array);
            } else {
                for(var i = node.children.length - 1; i >= 0; i--) {
                    stack.push(node.children[i]);
                }
            }
        }

        return array;
    }

    private static visitNode(node, hashMap, array) {
        if(!hashMap[node.data]) {
            hashMap[node.data] = true;
            array.push(node);
        }
    }
}
