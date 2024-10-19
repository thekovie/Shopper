package com.example.shopper;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

public class HomePage extends AppCompatActivity {

    private ActivityResultLauncher<Intent> shoppingItemActivityLauncher;
    ShoppingItem[] itemCart;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_home_page);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        RecyclerView recyclerView =findViewById(R.id.recyclerView);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        itemCart = new ShoppingItem[]{
                new ShoppingItem("iPhone 15 Pro Max Case Fully Loaded", "Mobile & Gadgets", "High", "Shoppee", "I’m not really sure if im in to this but there is AI so why not?", 700),
                new ShoppingItem("Strawberries", "Mobile & Gadgets", "High", "Shoppee", "I’m not really sure if im in to this but there is AI so why not?", 700),
                new ShoppingItem("Chiken NUggets", "Mobile & Gadgets", "High", "Shoppee", "I’m not really sure if im in to this but there is AI so why not?", 700),
                new ShoppingItem("Katsu Curry", "Mobile & Gadgets", "High", "Shoppee", "I’m not really sure if im in to this but there is AI so why not?", 700)
        };

        ShoppingListAdapter shoppingListAdapter = new ShoppingListAdapter(itemCart, HomePage.this);
        recyclerView.setAdapter(shoppingListAdapter);

        shoppingItemActivityLauncher = registerForActivityResult(
                new ActivityResultContracts.StartActivityForResult(), new ActivityResultCallback<ActivityResult>() {
                    public void onActivityResult(ActivityResult result) {
                        if (result.getResultCode() == Activity.RESULT_OK)
                        {
                            Intent data = result.getData();

                            int position = data.getIntExtra("position", -1);

                            shoppingListAdapter.notifyItemChanged(position);
                        }
                        else if (result.getResultCode() == Activity.RESULT_CANCELED)
                        {
                            int duration = Toast.LENGTH_SHORT;

                            Toast toast = Toast.makeText(HomePage.this, "Cancelled", duration);
                            toast.show();
                        }
                    }
                });
    }

    public ActivityResultLauncher<Intent> getShoppingItemActivityLauncher() {
        return shoppingItemActivityLauncher;
    }
}