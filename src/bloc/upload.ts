export async function dataUrlToFileInstance(dataUrl: string): Promise<File> {
    return new Promise(resolve => {
        const array = dataUrl.split(`,`);
        const mime = array[0]?.match(/:(.*?);/)?.[1];
        const bstr = atob(array[1]);
        let n = bstr.length;
        const u8array = new Uint8Array(n);

        while (n--) {
            // eslint-disable-next-line unicorn/prefer-code-point
            u8array[n] = bstr.charCodeAt(n);
        }

        resolve(new File([new Blob([u8array], { type: mime })], `screenshot.png`, { type: `image/png` }));
    });
}
