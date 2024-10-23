package com.example.shopper;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class ShoppingItemActivity extends AppCompatActivity {

    TextView itemNameView;
    TextView itemNotesView;
    TextView itemPriceView;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_shopping_item);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        Intent i = getIntent();
        String itemNameData = i .getStringExtra("itemName");
        String itemNotesData = i .getStringExtra("itemNotes");
//        String itemPriceData = i .getStringExtra("itemPrice");

        itemNameView = findViewById(R.id.itemNameView);
        itemNotesView = findViewById(R.id.additionalInfoView);
//        itemPriceView = findViewById(R.id.itemPriceView);

        itemNameView.setText(itemNameData);
        itemNotesView.setText(itemNotesData);
//        itemPriceView.setText(itemPriceData);




    }
}