import { API_URL } from "@/utils/constants";

export const getCampaignsData = async () => {
    const products = fetch(`${API_URL}products`).then(r => r.json());
    const clients = fetch(`${API_URL}clients`).then(r => r.json());
    const campaigns = fetch(`${API_URL}campaigns`).then(r => r.json());
    const res = await Promise.all([products, clients, campaigns]);
    return res;
};

export const getProductsData = async () => {
    const products = fetch(`${API_URL}products`).then(r => r.json());
    const res = await Promise.all([products]);
    return res;
};

export const getClientsData = async () => {
    const clients = fetch(`${API_URL}clients`).then(r => r.json());
    const res = await Promise.all([clients]);
    return res;
};

export const getTemplatesData = async () => {
    const templates = fetch(`${API_URL}templates`).then(r => r.json());
    const res = await Promise.all([templates]);
    return res;
};