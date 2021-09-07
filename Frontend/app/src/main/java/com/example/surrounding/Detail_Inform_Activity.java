package com.example.surrounding;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

public class Detail_Inform_Activity extends AppCompatActivity {

    TextView placename;
    ImageView bookmark;
    TextView address;
    TextView distance;
    String pn;
    String ad;
    String dis;
    int d;//distance
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail_inform);

        bookmark = (ImageView) findViewById(R.id.bookmark);
        placename = (TextView) findViewById(R.id.placename);
        pn = "example";
        d = 15;
        dis = "현재 위치에서 "+d+"km";
        ad = "여긴 어디 나는 누구";
        placename.setText(pn);
        address.setText(ad);
        distance.setText(dis);
        bookmark.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                bookmark.setImageResource(R.drawable.ic_baseline_bookmark_24);
            }
        });
    }
}