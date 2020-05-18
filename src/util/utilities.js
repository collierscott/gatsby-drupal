export default function cleanBlockUrl(url) {
    // internal:/en/recipes/vegan-chocolate-and-nut-brownies
    url = url.replace("internal:", "");
    url = url.replace("/en/", "/");
    return url;
};

export function getImageInfo(item) {
    let image = null;

    if (
        item && 
        item.node && 
        item.node.relationships && 
        item.node.relationships.field_media_image &&
        item.node.relationships.field_media_image.relationships &&
        item.node.relationships.field_media_image.relationships.field_media_image &&
        item.node.relationships.field_media_image.relationships.field_media_image.localFile &&
        item.node.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp &&
        item.node.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.fluid
    ) {
        const i = item.node.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp.fluid;
        
        image = {
            name: i.originalName,
            src: i.src,
            srSet: i.srcSet,
        };
    }
    return image;
};