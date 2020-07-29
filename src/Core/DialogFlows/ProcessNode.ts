import {IProcessNode} from "./IProcessNode";
import {ProcessState} from "./ProcessState";
import {IProcessContext} from "./IProcessContext";

export class ProcessNode<TContext extends IProcessContext> implements IProcessNode<TContext>
{
    children: ProcessNode<TContext>[] = [];
    parent: IProcessNode<TContext> | null = null;
    state: ProcessState = ProcessState.Pristine;
    title: string = "";

    constructor(parent?:IProcessNode<TContext>)
    {
        this.parent = !parent ? null : parent;
    }

    findActiveBranch(childNodesOnly: boolean): IProcessNode<TContext>[]
    {
        const activeLeaf = this.findActiveLeaf(childNodesOnly);
        if (!activeLeaf) {
            return [];
        }
        const path = this.path(activeLeaf);
        return path;
    }

    findActiveLeaf(childNodesOnly: boolean): IProcessNode<TContext> | null
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

    findNextNode(currentNode: IProcessNode<TContext>): IProcessNode<TContext> | null
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

    findPreviousNode(currentNode: IProcessNode<TContext>): IProcessNode<TContext> | null
    {
        let previous: IProcessNode<TContext>|null = null;
        for (let node of this.flattenSequential(false, currentNode))
        {
            if (node == currentNode) {
                return previous;
            }
            previous = node;
        }

        return null;
    }

    isLeaf(otherNode?:IProcessNode<TContext>) : boolean
    {
        return (!otherNode ? this : otherNode).children.length == 0;
    }

    isActive(otherNode?:IProcessNode<TContext>) : boolean
    {
        return (!otherNode ? this : otherNode).state == ProcessState.Active;
    }

    async canActivate<TArgument>(context:TContext, argument:TArgument, otherNode?:IProcessNode<TContext>) : Promise<boolean>
    {
        const nodeToTest:IProcessNode<TContext> = (!otherNode ? this : otherNode);
        if (!this.isLeaf(nodeToTest)) {
            return Promise.resolve(false);
        }
        if (!nodeToTest.sideEffect || !nodeToTest.sideEffect.canExecute) {
            return Promise.resolve(true);
        }

        return await nodeToTest.sideEffect.canExecute(context, argument);
    }

    path(otherNode?:IProcessNode<TContext>) : IProcessNode<TContext>[]
    {
        const path:IProcessNode<TContext>[] = [];
        let root:IProcessNode<TContext> = this;

        path.unshift((!otherNode ? this : otherNode));

        while (root.parent)
        {
            root = root.parent;
            path.unshift(root);
        }

        return path;
    }

    root(otherNode?:IProcessNode<TContext>) : IProcessNode<TContext>
    {
        const path = this.path(otherNode);
        return path[0];
    }

    *flattenSequential(childNodesOnly: boolean, otherNode?:IProcessNode<TContext>) {
        const stack:IProcessNode<TContext>[] = [];
        const hashMap = {};

        stack.push(childNodesOnly ? (!otherNode ? this : otherNode) : this.root((!otherNode ? this : otherNode)));

        while(stack.length !== 0) {
            const node = stack.pop();
            if (!node) {
                throw new Error("The stack returned an undefined element during the recursive iteration of a IProcessNode.");
            }
            if(node.children === null) {
                const matchingNode = ProcessNode.visitNode(node, hashMap);
                if (matchingNode) {
                    yield matchingNode;
                }
            } else {
                for(let i = node.children.length - 1; i >= 0; i--) {
                    stack.push(node.children[i]);
                }
            }
        }
    }

    private static visitNode(node, hashMap) {
        if(!hashMap[node.data]) {
            hashMap[node.data] = true;
            return node;
        }
        return null;
    }
}

/*
export class _ProcessNode {
    state?:State = State.Locked;
    title?:string;

    parent:ProcessNode|null;
    children:ProcessNode[] = [];

    quant?:string;
    action?:() => Promise<void>;

    constructor(parent:ProcessNode|null)
    {
        this.parent = parent;
    }

    getActiveNode() : ProcessNode|null {
        const stack:ProcessNode[] = [];
        stack.push(this);
        while (stack.length > 0)
        {
            const element = stack.shift();
            if (!element)
            {
                return null;
            }
            if (element.state == State.Active){
                return element;
            }
            element.children.forEach(o => stack.push(o));
        }
        return null;
    }

    getNextNode() : ProcessNode|null {
        const activeNode = this.getActiveNode();
        if (!activeNode) {
            throw new Error("No currently active node so no next node.");
        }
        const activeParent = activeNode.parent;
        if (!activeParent) {
            throw new Error("The currently active node is a root node.");
        }
        const activeNodeIndex = activeParent.children.indexOf(activeNode);
        if (activeNodeIndex < 0) {
            throw new Error("Couldn't find the active node in it's parent's 'children' list");
        }
        if (activeParent.children.length < activeNodeIndex + 2) {
            return null
        }
        return activeParent.children[activeNodeIndex + 1];
    }

    async submit() : Promise<ProcessNode|null>{
        if (!this.action) {
            throw new Error("The node '" + this.title + "' has no action.");
        }
        try
        {
            await this.action();
            const next = this.getNextNode();

            this.state = State.Succeeded;

            if (!next) {
                await this.finish();
                return null;
            } else {
                next.state = State.Active;
                return next;
            }
        }
        catch (e)
        {
            this.state = State.Failed;
            // TODO: Retry?!
            throw e;
        }
    }

    async finish() {

    }
}
*/
