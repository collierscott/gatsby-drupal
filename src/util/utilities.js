export default function cleanBlockUrl(url) {
    // internal:/en/recipes/vegan-chocolate-and-nut-brownies
    url = url.replace("internal:", "");
    url = url.replace("/en/", "/");
    return url;
};