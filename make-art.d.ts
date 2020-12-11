import '@types/node';

declare namespace makeArt
{
    interface Options
    {
        /**
         * Include code for `art.css`.
         * It is also possible to specify an object with an optional property `keyframes` that
         * determines whether to also include code for `art.css.keyframes`.
         */
        readonly css?: boolean | { readonly keyframes?: boolean; };

        /** Also generate a TypeScript declaration file (.d.ts) along with the JavaScript file. */
        readonly dts?: boolean;

        /** Generate an ECMAScript module; otherwise, generate a script. */
        readonly esModule?: boolean;

        /** Include code for `art.off`. */
        readonly off?: boolean;

        /** Include code for `art.an`. */
        readonly on?: boolean;
    }
}

declare const makeArt:
{
    /**
     * Generates art library files synchronously. Same as `makeArt.sync`.
     *
     * @param outDir
     * The path of the output folder.
     *
     * @param options
     * `makeArt` options.
     */
    (outDir: string, options?: makeArt.Options): void;

    async(outDir: string, callback: (err: NodeJS.ErrnoException | null) => void): void;

    /**
     * Generates art library files asynchronously. Runs a callback when done.
     *
     * @param outDir
     * The path of the output folder.
     *
     * @param options
     * `makeArt` options.
     *
     * @param callback
     * A callback funtion invoked when file generation terminates.
     * If en arror occurs, it is passed to the callback as a parameter.
     */
    async
    (
        outDir: string,
        options: makeArt.Options,
        callback: (err: NodeJS.ErrnoException | null) => void,
    ):
    void;

    /**
     * Generates art library files asynchronously. Returns a promise.
     *
     * @param outDir
     * The path of the output folder.
     *
     * @param options
     * `makeArt` options.
     *
     * @returns
     * A promise that settles when file generation terminates.
     */
    promise(outDir: string, options?: makeArt.Options): Promise<void>;

    /**
     * Generates art library files synchronously.
     *
     * @param outDir
     * The path of the output folder.
     *
     * @param options
     * `makeArt` options.
     */
    sync(outDir: string, options?: makeArt.Options): undefined;
};

export default makeArt;
