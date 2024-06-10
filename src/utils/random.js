function getLength() {
    try {
        const files = require.context(
            "@/assets/image/illness",
            false,
            /\.png$/
        );
        return files.keys().length;
    } catch (error) { }
}
export default function random() {
    return Math.floor(getLength() * Math.random()) + 1;
}