# 位置服务

  Android位置API使您可以轻松构建可识别位置的应用程序，而无需关注基础定位技术的细节。

  借助Google Play服务，这将成为可能，该服务可通过自动的位置跟踪，地理围栏和活动识别功能，为您的应用添加位置感知功能。本教程向您展示如何在APP中使用定位服务来获取当前位置，获取定期的位置更新，查找地址等。
  
## 位置对象
  
  位置对象表示的地理位置，其可以由纬度，经度，时间戳，和其他信息，诸如轴承，海拔高度和速度。您可以将以下重要方法与Location对象一起使用，以获取特定于位置的信息-
  
  | 方法                                    | 说明                                               |
  | --------------------------------------- | -------------------------------------------------- |
  | **float distanceTo(Location dest)**     | 返回此位置和给定位置之间的近似距离（以米为单位）。 |
  | **float getAccuracy()**                 | 获取此位置的估计精度，以米为单位。                 |
  | **double getAltitude()**                | 如果可以的话，获取海拔高度，以米为单位。           |
  | **float getBearing()**                  | 以度为单位获取方位角。                             |
  | **double getLatitude()**                | 获取以度为单位的纬度。                             |
  | **double getLongitude()**               | 获取经度，以度为单位。                             |
  | **float getSpeed()**                    | 取得速度（如果有的话），在地面上以米/秒为单位。    |
  | **boolean hasAccuracy()**               | 如果该位置具有准确性，则为True。                   |
  | **boolean hasAltitude()**               | 如果该位置有海拔，则为True。                       |
  | **boolean hasBearing()**                | 如果此位置有方位，则为true。                       |
  | **boolean hasSpeed()**                  | 如果该位置具有速度，则为true。                     |
  | **void reset()**                        | 清除位置的内容。                                   |
  | **void setAccuracy(float accuracy)**    | 设置此位置的估计精度，以米为单位。                 |
  | **void setAltitude(double altitude)**   | 设置海拔高度（以米为单位）。                       |
  | **void setBearing(float bearing)**      | 设置轴承，以度为单位。                             |
  | **void setLatitude(double latitude)**   | 设置纬度（以度为单位）。                           |
  | **void setLongitude(double longitude)** | 设置经度（以度为单位）。                           |
  | **void setSpeed(float speed)**          | 设置速度（以米/秒为单位）。                        |
  | **String toString()**                   | 返回一个字符串，其中包含该对象的简明易懂的描述。   |

## 获取当前位置
  
  要获取当前位置，请创建一个位置客户端（即**LocationClient**对象），使用**connect()**方法将其连接到Location Services ，然后调用其**getLastLocation()**方法。此方法以Location对象的形式返回最近的位置，该对象包含纬度和经度坐标以及其他信息，如上所述。要在您的活动中具有基于位置的功能，您将必须实现两个接口-
  
- GooglePlayServicesClient.ConnectionCallbacks
- GooglePlayServicesClient.OnConnectionFailedListener
  
  这些接口提供以下重要的回调方法，您需要在活动类中实现它们-
  
  | 回调方法                                                      | 说明                                                                                         |
  | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
  | **abstract void onConnected(Bundle connectionHint)**          | 当位置服务成功连接到位置客户端时，将调用此回调方法。 您将使用connect()方法连接到位置客户端。 |
  | **abstract void onDisconnected()**                            | 当客户端断开连接时，将调用此回调方法。 您将使用disconnect()方法与位置客户端断开连接。        |
  | **abstract void onConnectionFailed(ConnectionResult result)** | 当将客户端连接到服务时发生错误时，将调用此回调方法。                                         |
  
  > 您应该在活动类的onCreate()方法中创建位置客户端，然后在onStart()中将其连接，以便位置服务在您的活动完全可见时维护当前位置。您应该使用onStop()方法断开客户端连接，以便在看不到您的应用程序时，Location Services不会维护当前位置。这样可以最大程度地节省电池电量。

## 获取更新的位置
  
  如果您愿意进行位置更新，那么除了上述接口外，您还需要实现LocationListener接口。该接口提供以下回调方法，您需要在活动类中实现该方法-
  
  | 回调方法                                               | 说明                                                 |
  | ------------------------------------------------------ | ---------------------------------------------------- |
  | **abstract void onLocationChanged(Location location)** | 位置更改后，此回调方法用于从LocationClient接收通知。 |

## 位置服务质量
  
  所述LocationRequest对象用于请求的服务质量（QoS），用于从所述的位置更新一个质量LocationClient。您可以使用以下有用的设置方法来处理QoS。您可以在Android官方文档中查看等效的getter方法。
  
  | 方法                                   | 说明                                             |
  | -------------------------------------- | ------------------------------------------------ |
  | **setExpirationDuration(long millis)** | 设置此请求的持续时间（以毫秒为单位）。           |
  | **setExpirationTime(long millis)**     | 设置请求有效时间，以自启动后的毫秒数为单位。     |
  | **setFastestInterval(long millis)**    | 明确设置位置更新的最快间隔（以毫秒为单位）。     |
  | **setInterval(long millis)**           | 设置活动位置更新所需的时间间隔（以毫秒为单位）。 |
  | **setNumUpdates(int numUpdates)**      | 设置位置更新的数量。                             |
  | **setPriority(int priority)**          | 设置请求的优先级。                               |
  
  现在，例如，如果您的应用程序需要高精度位置，则应创建一个位置请求，将setPriority(int)设置为**PRIORITY_HIGH_ACCURACY**并将setInterval(long)设置为5秒。您也可以使用更大的间隔和/或其他优先级（例如PRIORITY_LOW_POWER）来请求“城市”级别的准确性，或者使用PRIORITY_BALANCED_POWER_ACCURACY来获取“阻止”级别的准确性。
  
  > 活动应该强烈考虑在进入后台时删除所有位置请求（例如，在onPause()处），或者至少将请求交换为较大的间隔和较低的质量以节省功耗。

## 显示位置地址
  
  一旦有了**Location**对象，就可以使用**Geocoder.getFromLocation()**方法来获取给定纬度和经度的地址。此方法是同步的，可能需要很长时间才能完成工作，因此您应该从**AsyncTask**类的**doInBackground()**方法中调用该方法。该**AsyncTask**必须被继承使用和子类将覆盖doInBackground（参数...）方法在后台执行任务onPostExecute（结果）方法被调用的后台计算结束后的UI线程，并在时间显示结果。AyncTask中还有一个更重要的方法execute（Params ... params），该方法使用指定的参数执行任务。
  
  以下示例以实用方式向您展示了如何在应用中使用定位服务来获取当前位置及其等效地址等。
  
  > 要尝试此示例，您将需要配备最新Android OS的实际移动设备，否则，您将不得不使用可能无法工作的仿真器。
  
  1. 您将使用Android Studio IDE创建一个Android应用程序，并在com.example.demo包下将其命名为Demo。
  2. 添加src/GPSTracker.java文件并添加所需的代码。
  3. 修改src/MainActivity.java文件如下所示，以确保获取当前位置及其等效地址。
  4. 修改布局XML文件res/layout/activity_main.xml添加所有GUI组件，其中包括三个按钮和两个文本视图以显示位置/地址。
  5. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  
  import android.Manifest;
  import android.app.Activity;
  import android.content.pm.PackageManager;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  import android.widget.Toast;
  
  import androidx.core.app.ActivityCompat;
 

public class MainActivity extends Activity {
 Button btnShowLocation;
 private static final int REQUEST_CODE_PERMISSION = 2;
 String mPermission = Manifest.permission.ACCESS_FINE_LOCATION;

 

  // GPSTracker 类
  GPSTracker gps;

  @Override
  public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      try {
          if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) !=
                  PackageManager.PERMISSION_GRANTED &&
                  ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION)
                          != PackageManager.PERMISSION_GRANTED)  {

              ActivityCompat.requestPermissions(this, new String[]{mPermission}, REQUEST_CODE_PERMISSION);

              // 如果用户不允许以上任何权限，此条件将每次执行，否则您的其他部分将正常工作
          }
      } catch (Exception e) {
          e.printStackTrace();
      }

      btnShowLocation = (Button) findViewById(R.id.button);

      // 显示位置按钮单击事件
      btnShowLocation.setOnClickListener(new View.OnClickListener() {

          @Override
          public void onClick(View arg0) {
              // create class object
              gps = new GPSTracker(MainActivity.this);

              // 检查 GPS 是否可用
              if(gps.canGetLocation()){

                  double latitude = gps.getLatitude();
                  double longitude = gps.getLongitude();

                  Toast.makeText(getApplicationContext(), "您的位置是 - \n纬度: "
                          + latitude + "\n经度: " + longitude, Toast.LENGTH_LONG).show();
              }else{
                  // 不能获取位置
                  // GPS 或者网络 不可用
                  // 要求用户在设置中启用GPS /网络
                  gps.showSettingsAlert();
              }

          }
      });
  }

 

}

```

以下是文件src/com.jc2182.demo/GPSTracker.java

```java

package com.jc2182.demo;

import android.app.AlertDialog;
import android.app.Service;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.IBinder;
import android.provider.Settings;
import android.util.Log;


public class GPSTracker extends Service implements LocationListener {

    private final Context mContext;

    //  GPS 状态标识
    boolean isGPSEnabled = false;

    // 网络状态标识
    boolean isNetworkEnabled = false;

    // 位置状态标识
    boolean canGetLocation = false;

    Location location; // 位置
    double latitude; // 纬度
    double longitude; // 经度

    // 更改的最小距离更新以米为单位
    private static final long MIN_DISTANCE_CHANGE_FOR_UPDATES = 10; // 10 米

    // 更新之间的最短时间（以毫秒为单位）
    private static final long MIN_TIME_BW_UPDATES = 1000 * 60 * 1; // 一分钟

    // 声明位置管理器
    protected LocationManager locationManager;

    public GPSTracker(Context context) {
        this.mContext = context;
        getLocation();
    }

    public Location getLocation() {
        try {
            locationManager = (LocationManager) mContext.getSystemService(LOCATION_SERVICE);

            // 获取 GPS 状态
            isGPSEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);

            // 获取网络状态
            isNetworkEnabled = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);

            if (!isGPSEnabled && !isNetworkEnabled) {
                //没有启用网络提供商
            } else {
                this.canGetLocation = true;
                // 首先从网络提供商获取位置
                if (isNetworkEnabled) {

                    locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, MIN_TIME_BW_UPDATES, MIN_DISTANCE_CHANGE_FOR_UPDATES, this);
                    Log.d("Network", "Network");
                    if (locationManager != null) {
                        location = locationManager .getLastKnownLocation(LocationManager.NETWORK_PROVIDER);

                        if (location != null) {
                            latitude = location.getLatitude();
                            longitude = location.getLongitude();
                        }
                    }
                }

                // 如果启用GPS，则使用GPS服务获取经纬度
                if (isGPSEnabled) {
                    if (location == null) {
                        locationManager.requestLocationUpdates( LocationManager.GPS_PROVIDER, MIN_TIME_BW_UPDATES, MIN_DISTANCE_CHANGE_FOR_UPDATES, this);

                        Log.d("GPS Enabled", "GPS Enabled");
                        if (locationManager != null) {
                            location = locationManager .getLastKnownLocation(LocationManager.GPS_PROVIDER);

                            if (location != null) {
                                latitude = location.getLatitude();
                                longitude = location.getLongitude();
                            }
                        }
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return location;
    }

    /**     * 获取纬度     * */

    public double getLatitude(){
        if(location != null){
            latitude = location.getLatitude();
        }

        return latitude;
    }

    /**     * 获取经度     * */

    public double getLongitude(){
        if(location != null){
            longitude = location.getLongitude();
        }

        // return longitude
        return longitude;
    }

    /**     * 检查GPS/WIFI是否可用     * @return boolean     * */

    public boolean canGetLocation() {
        return this.canGetLocation;
    }

    /**     * 显示设置警报对话框的功能按下“设置”按钮将启动“设置选项”     * */

    public void showSettingsAlert(){
        AlertDialog.Builder alertDialog = new AlertDialog.Builder(mContext);

        // Setting Dialog Title
        alertDialog.setTitle("GPS设置");

        // Setting Dialog Message
        alertDialog.setMessage("GPS未启用。 您要进入设置菜单吗？");

        // On pressing Settings button
        alertDialog.setPositiveButton("设置", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog,int which) {
                Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
                mContext.startActivity(intent);
            }
        });

        // on pressing cancel button
        alertDialog.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
            }
        });

        // Showing Alert Message
        alertDialog.show();
    }

    @Override
    public void onLocationChanged(Location location) {
    }

    @Override
    public void onProviderDisabled(String provider) {
    }

    @Override
    public void onProviderEnabled(String provider) {
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {
    }

    @Override
    public IBinder onBind(Intent arg0) {
        return null;
    }
}
```

以下是res/layout/activity_main.xml文件的内容-

```xml
<?xml version = "1.0" encoding = "utf-8"?>
<LinearLayout xmlns:android = "http://schemas.android.com/apk/res/android"
    android:layout_width = "fill_parent"
    android:layout_height = "fill_parent"
    android:orientation = "vertical" >


    <Button
        android:id = "@+id/button"
        android:layout_width = "fill_parent"
        android:layout_height = "wrap_content"
        android:text = "获取位置"/>

</LinearLayout>
```

让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

![](https://www.jc2182.com/images/android/location1.png)

点击“获取位置”按钮，看到如下（您应该在真机中测试该Demo）。

![](https://www.jc2182.com/images/android/location2.png)
