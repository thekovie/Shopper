package com.example.shopper;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class ShoppingListAdapter extends RecyclerView.Adapter<ShoppingListAdapter.ViewHolder> {

    ShoppingItem[] itemCart;
    Context context;

    public ShoppingListAdapter(ShoppingItem[] itemCart, Context context) {
        this.itemCart = itemCart;
        this.context = context;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.shopping_item_list,parent,false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        final ShoppingItem shoppingItemList = itemCart[position];
        holder.itemNameView.setText(shoppingItemList.getItemName());
        holder.additionalInfoView.setText(shoppingItemList.getItemPriority() + " • " + shoppingItemList.getItemShoppingPlatform() + " • " + shoppingItemList.getItemCategory());
        holder.itemPriceView.setText("PHP ~"+shoppingItemList.getItemPrice());

//        holder.itemView.setOnClickListener(new View.OnClickListener() {
//            /* TODO Call an intent for OrderActivity allowing you to order food */
//            @Override
//            public void onClick(View v) {
//
//                int currentPosition = holder.getAdapterPosition();
//
//                if (currentPosition == RecyclerView.NO_POSITION) return;
//
//                ShoppingItem currentShoppingItem = itemCart[currentPosition];
//
//                Intent i = new Intent(context, ShoppingItemActivity.class);
//
//                i.putExtra("position", currentPosition);
//                i.putExtra("itemName", currentShoppingItem.getItemName());
//                i.putExtra("itemNotes", currentShoppingItem.getItemNotes());
////                i.putExtra("itemPrice", currentShoppingItem.getItemPrice());
//
//                // If context is an instance of HomePage, use the launcher
//                if (context instanceof HomePage) {
//                    ((HomePage) context).getShoppingItemActivityLauncher().launch(i);
//                } else {
//                    // Fallback if not MainActivity
//                    context.startActivity(i);
//                }
//            }
//        });
    }

    @Override
    public int getItemCount() {
        return itemCart.length;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder{
        TextView itemNameView;
        TextView additionalInfoView;
        TextView itemPriceView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            itemNameView = itemView.findViewById(R.id.itemNameView);
            additionalInfoView = itemView.findViewById(R.id.additionalInfoView);
            itemPriceView = itemView.findViewById(R.id.itemPrice);
        }
    }

}
