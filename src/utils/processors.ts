import { BASEURL } from "./constants";
import { formatter } from "./utils";

export const processProducts = (data: any) => {
    let products = [] as any;
    data.forEach((category: any) => {

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
    return products;
}

export const processCampaigns = (campaigns: any, products: any, clients: any) => {
    return campaigns.map((campaign: any) => {
        const product = findById(products, campaign.product);
        const client = findById(clients, campaign.client);
        const clientName = client !== undefined ? `${client.first || ''} ${client.last || ''}` : undefined;
        const productName = product !== undefined ? `${product.name}` : undefined;
        return {
            id: campaign.id,
            code: campaign.code,
            product: productName,
            client: clientName,
            meeting_url: campaign.meeting_url,
            quote: formatter.format(campaign.quote),
            status: campaign.status,
            start_date: campaign.start_date,
        }
    })
}

export const findById = (data: Array<any>, id: number) => {
    if (data !== null && id !== null) {
        // console.log(data);
        return (data.filter((item) => String(item.id) == String(id)))[0];
    } else {
        return null;
    }
}
