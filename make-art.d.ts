import '@types/node';

declare namespace makeArt
{
    interface Context
    {
        readonly css?: boolean | { readonly keyframes?: boolean; };

        readonly off?: boolean;

        readonly on?: boolean;
    }
}

declare const makeArt:
{
    (destPath: string, context?: makeArt.Context): undefined;

    async(destPath: string, callback: (err: NodeJS.ErrnoException | null) => void): undefined;

    async
    (
        destPath: string,
        context: makeArt.Context,
        callback: (err: NodeJS.ErrnoException | null) => void,
    ):
    undefined;

    promise(destPath: string, context?: makeArt.Context): Promise<undefined>;

    sync(destPath: string, context?: makeArt.Context): undefined;
};

export = makeArt;
