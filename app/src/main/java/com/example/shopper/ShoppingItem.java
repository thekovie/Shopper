package com.example.shopper;

public class ShoppingItem {

    private String itemName;
    private String itemCategory;
    private String itemPriority;
    private String itemShoppingPlatform;
    private String itemNotes;
    private float itemPrice;


    public ShoppingItem(String itemName, String itemCategory, String itemPriority, String itemShoppingPlatform, String itemNotes, float itemPrice) {
        this.itemName = itemName;
        this.itemCategory = itemCategory;
        this.itemPriority = itemPriority;
        this.itemShoppingPlatform = itemShoppingPlatform;
        this.itemNotes = itemNotes;
        this.itemPrice = itemPrice;
    }

    public String getItemName(){
        return this.itemName;
    }

    public String getItemCategory(){
        return this.itemCategory;
    }

    public String getItemPriority(){
        return this.itemPriority;
    }

    public String getItemShoppingPlatform(){
        return this.itemShoppingPlatform;
    }

    public String getItemNotes(){
        return this.itemNotes;
    }

    public float getItemPrice(){
        return this.itemPrice;
    }




}
