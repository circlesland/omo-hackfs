import {ISideEffect} from "./ISideEffect";
import {ProcessNode} from "./ProcessNode";
import {IProcessContext} from "./IProcessContext";

export class StepBuilder<TContext extends IProcessContext>
{
    readonly id:string;
    title?:string;
    readonly parent:CategoryBuilder<TContext>;

    quant?:string;
    sideEffect?:ISideEffect<TContext, any>;

    constructor(parent:CategoryBuilder<TContext>, id:string)
    {
        this.parent = parent;
        this.id = id;
    }

    withQuant(quant:string) : StepBuilder<TContext>
    {
        this.quant = quant;
        return this;
    }

    withSideEffect<TArgument>(sideEffect:ISideEffect<TContext, TArgument>) : StepBuilder<TContext>
    {
        this.sideEffect = sideEffect;
        return this;
    }

    step(id:string) : StepBuilder<TContext>
    {
        return new StepBuilder(this.parent, id);
    }

    withTitle(title:string) : StepBuilder<TContext>
    {
        this.title = title;
        return this;
    }
}

export class CategoryBuilder<TContext extends IProcessContext>
{
    readonly parent?:CategoryBuilder<TContext>;
    readonly title:string;

    quant?:string;

    readonly categoriesOrSteps:(CategoryBuilder<TContext>|StepBuilder<TContext>)[] = [];

    constructor(title:string, parent?:CategoryBuilder<TContext>)
    {
        this.parent = parent;
        this.title = title;
    }

    category(title:string, nestedBuilder:(b:CategoryBuilder<TContext>) => void): CategoryBuilder<TContext>
    {
        const builder = new CategoryBuilder(title, this);
        this.categoriesOrSteps.push(builder);
        nestedBuilder(builder);
        return builder;
    }

    withQuant(quant:string) : CategoryBuilder<TContext>
    {
        this.quant = quant;
        return this;
    }

    step(id:string) : StepBuilder<TContext>
    {
        const builder = new StepBuilder(this, id);
        this.categoriesOrSteps.push(builder);
        return builder;
    }

    build() : ProcessNode<TContext>
    {
        return new ProcessNode<TContext>();
    }
}

export class ProcessBuilder<TContext extends IProcessContext>
{
    readonly categories:CategoryBuilder<TContext>[] = [];

    readonly id:string;

    constructor(id:string)
    {
        this.id = id;
    }

    category(title:string, nestedBuilder:(b:CategoryBuilder<TContext>) => void): CategoryBuilder<TContext>
    {
        const builder = new CategoryBuilder(title);
        this.categories.push(builder);
        nestedBuilder(builder);
        return builder;
    }
}
