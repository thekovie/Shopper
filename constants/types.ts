export interface ListShoppingItemProps {
    itemName: string;
    itemPrice: number;
    itemPriority: string;
    itemPlatform: string;
    itemCategory: string;
}

export interface RecentFindsProps{
    data: ListShoppingItemProps[]
}