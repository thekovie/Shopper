export interface ListShoppingItemProps {
    itemName: string;
    itemPrice: number;
    itemPriority: string;
    itemPlatform: string;
    itemCategory: string;
    itemNotes?: string;
}

export interface RecentFindsProps{
    data: ListShoppingItemProps[]
}