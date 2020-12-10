import '@types/node';

declare namespace makeArt
{
    interface Context
    {
        readonly css?: boolean | { readonly keyframes?: boolean; };

        readonly esModule?: boolean;

        readonly off?: boolean;

        readonly on?: boolean;
    }
}

declare const makeArt:
{
    (outDir: string, context?: makeArt.Context): undefined;

    async(outDir: string, callback: (err: NodeJS.ErrnoException | null) => void): undefined;

    async
    (
        outDir: string,
        context: makeArt.Context,
        callback: (err: NodeJS.ErrnoException | null) => void,
    ):
    undefined;

    promise(outDir: string, context?: makeArt.Context): Promise<undefined>;

    sync(outDir: string, context?: makeArt.Context): undefined;
};

export = makeArt;
