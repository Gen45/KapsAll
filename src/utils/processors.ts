import { Campaign, CampaignProcessed, Client, Product } from "./types";
import { formatter } from "./utils";

export const processCampaigns = (campaigns: Array<Campaign>, products: Array<Product>, clients: Array<Client>): Array<CampaignProcessed> => {
    return campaigns.map((campaign: Campaign): CampaignProcessed => {
        const product = findById(products, campaign.product);
        const client = findById(clients, campaign.client);
        const clientName = client !== undefined && client !== null ? `${client.first || ''} ${client.last || ''}` : '';
        const productName = product !== undefined && product !== null ? `${product.name}` : '';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findById = (data: any, id: number): any => {
    if (data !== null && id !== null) {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (data.filter((item: any) => String(item.id) == String(id)))[0];
    } else {
        return null;
    }
}
