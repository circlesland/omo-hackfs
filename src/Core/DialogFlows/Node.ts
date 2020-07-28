export enum State
{
    Locked = "Locked",
    Active = "Active",
    Succeeded = "Succeeded",
    Failed = "Failed"
}

export class Node {
    state?:State = State.Locked;
    title?:string;

    parent:Node|null;
    children:Node[] = [];

    action?:() => Promise<void>;

    constructor(parent:Node|null)
    {
        this.parent = parent;
    }

    getActiveNode() : Node|null {
        const stack:Node[] = [];
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

    getNextNode() : Node|null {
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

    async submit() {
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
            } else {
                await this.next(next);
            }
        }
        catch (e)
        {
            this.state = State.Failed;
            // TODO: Retry?!
            throw e;
        }
    }

    async next(node:Node) {
        node.state = State.Active;
    }

    async finish() {

    }
}
