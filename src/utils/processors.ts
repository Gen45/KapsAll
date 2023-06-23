import { BASEURL } from "./constants";
import { formatter } from "./utils";


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

export const processCampaigns = (campaigns: any, products: any, clients: any) => {
    return campaigns.map((campaign: any) => {
        // console.log(campaign.client);
        // console.log(clients);
        // console.log(findById(clients, campaign.client));
        const product = findById(products, campaign.product);
        const client = findById(clients, campaign.client);
        // if (product !== undefined && client !== undefined) {
            return {
                id: campaign.id,
                code: campaign.code,
                product: product,
                client: client,
                quote: formatter.format(campaign.quote),
                status: campaign.status,
                start_date: campaign.start_date,
                // end_date: campaign.end_date,
                // created_at: campaign.created_at,
                // updated_at: campaign.updated_at,
            }
        // } 
        // else {
        //     return undefined;
        // }
    }) //.filter((campaign: any) => campaign !== undefined);
}

export const findById = (data: Array<any>, id: number) => {
    if (data !== null || id !== null) {
        return (data.filter((item) => String(item.id) == String(id)))[0];
    } else {
        return {};
    }
}
