import io.appium.java_client.MobileElement;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.remote.MobileCapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.Color;
import org.testng.Assert;

import java.net.MalformedURLException;
import java.net.URL;

public class automationTest {
    public static void delay(int sec){
        try{
            int convertDelay = sec*1000;
            Thread.sleep(convertDelay);
        } catch (InterruptedException e){
            System.out.println("error");
        }
    }

    public static void main(String args[]) throws MalformedURLException, InterruptedException {

        DesiredCapabilities dc = new DesiredCapabilities();
        dc.setCapability("skipDeviceInitialization", true);
        dc.setCapability("skipServerInstallation", true);
        dc.setCapability("fullReset", false);
        dc.setCapability("noReset", true);

        dc.setCapability(MobileCapabilityType.DEVICE_NAME,"emulator-5554");
        dc.setCapability("platformName","android");
        dc.setCapability("appPackage","com.janacorporation.lantern.mobile.core.enbridge");
        dc.setCapability("appActivity", "com.janacorporation.lantern.core.activities.SplashActivity");

        AndroidDriver<AndroidElement> ad = new AndroidDriver<AndroidElement>(new URL("http://0.0.0.0:4723/wd/hub"), dc);

        delay(8);
        MobileElement el1 = (MobileElement) ad.findElementById("com.janacorporation.lantern.mobile.core.enbridge:id/mapservice_card_holder");
        el1.click();

        delay(5);
        MobileElement el2 = (MobileElement) ad.findElementByAccessibilityId("Open navigation drawer");
        el2.click();

        delay(4);
        MobileElement el3 = (MobileElement) ad.findElementById("com.janacorporation.lantern.mobile.core.enbridge:id/filtering_spinner");
        el3.click();

        delay(13);
        MobileElement el4 = (MobileElement) ad.findElementById("com.janacorporation.lantern.mobile.core.enbridge:id/edit_button");
        el4.click();

        delay(6);
        MobileElement el5 = (MobileElement) ad.findElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.LinearLayout[1]/android.widget.LinearLayout");
        el5.click();

        delay(10);
        MobileElement el6 = (MobileElement) ad.findElementById("com.janacorporation.lantern.mobile.core.enbridge:id/show_gps_button");
        el6.click();

        delay(7);
        MobileElement el7 = (MobileElement) ad.findElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.view.ViewGroup[1]/android.widget.FrameLayout/android.widget.EditText");
        el7.click();

        delay(7);
        el7.sendKeys("automatedValue1");

        delay(6);
        MobileElement el8 = (MobileElement) ad.findElementById("com.janacorporation.lantern.mobile.core.enbridge:id/save_button");
        el8.click();

        delay(6);
        MobileElement el9 = (MobileElement) ad.findElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.view.ViewGroup[1]/android.widget.FrameLayout/android.widget.EditText");
        el9.sendKeys("automatedValue2");

        delay(6);
        MobileElement el10 = (MobileElement) ad.findElementById("com.janacorporation.lantern.mobile.core.enbridge:id/menu_save");
        el10.click();

        delay(6);
        el10.sendKeys("hi");

        delay(6);
        MobileElement el11 = (MobileElement) ad.findElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.view.ViewGroup[4]/android.widget.FrameLayout/android.widget.EditText");
        el11.click();

        delay(6);
        el11.sendKeys("3");
        MobileElement el12 = (MobileElement) ad.findElementById("com.janacorporation.lantern.mobile.core.enbridge:id/save_button");
        el12.click();

        delay(6);
        MobileElement el13 = (MobileElement) ad.findElementById("com.janacorporation.lantern.mobile.core.enbridge:id/tv_spinner_dropdown_item");
        el13.click();

        delay(6);
        MobileElement el14 = (MobileElement) ad.findElementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[8]");
        el14.click();

        delay(6);
        MobileElement el15 = (MobileElement) ad.findElementById("com.janacorporation.lantern.mobile.core.enbridge:id/save_button");
        el15.click();
      
        (new TouchAction(ad))
            .press({x: 530, y: 39})
            .moveTo({x: 530: y: 1461})
            .release()
            .perform()

        (new TouchAction(ad))
            .press({x: 526, y: 429})
            .moveTo({x: 530: y: 1374})
            .release()
            .perform()

        MobileElement el26 = (MobileElement) ad.findElementByXPath("//android.widget.Switch[@content-desc=\"Do Not Disturb.\"]/android.widget.FrameLayout/android.view.ViewGroup/android.widget.ImageView");
        el26.click();

        Assert.assertEquals(ad.findElementById("com.janacorporation.lantern.mobile.core.enbridge:id/tv_spinner_dropdown_item").getText(),"map");
        Assert.assertEquals(ad.findElementById("com.janacorporation.lantern.mobile.core.enbridge:id/map_service_item").getColorCodeHex(), #0B97E2);
        Assert.assertEquals(ad.findElementById("com.janacorporation.lantern.mobile.core.enbridge:id/map_dropdown_item").getColorCodeHex(), #0734AD);
    }
}
