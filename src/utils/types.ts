export type Product = { id: number, code: string, model: string, category: number, url: string, is_available: boolean }
export type Client = { id: number, first: string, last: string, email: string, phone?: string, address?: string, city?: string, state?: string, zip?: string }
export type CampaignStatus = 'active' | 'inactive' | 'paused' | 'cancelled'
export type Campaign = { id: number, code: string, product: number, client: number, meeting_url: string, quote: number, status: CampaignStatus, start_date: string }
export type CampaignProcessed = { id: number, code: string, product: string, client: string, meeting_url: string, quote: string, status: CampaignStatus, start_date: string }
export type Template = { id: number, name: string, description: string, file: string }