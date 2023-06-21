import { BASEURL } from "./constants";


export const processProducts = (data: any) => {
    let products = [] as any;
    data.forEach((category: any) => {
        // console.log(category);

        const categoryName = category.name;
        const categoryId = category.id;
        const categoryUrl = BASEURL + category.url;

        category.items.forEach((item: any) => {

            let product = {} as any;

            product.categoryName = categoryName;
            product.categoryId = categoryId;
            product.categoryUrl = categoryUrl;
            product.name = item.name;
            product.id = item.id;
            product.model = item.model;
            product.url = BASEURL + item.url;

            products.push(product);
        })
    })
    // console.log(products);
    return products;
}

export const processCampaigns = (data: any) => {
    return data;
}

export const findById = (data: Array<any>, id: number) => {
    if (data !== null || id !== null) {
        return (data.filter((item) => item.id === id))[0];
    } else {    
        return {};
    }
}
