package com.milkdairy.version1;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
//import org.openqa.selenium.support.ui.WebDriverWait;
//import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import com.milkdairy.version1.pages.LoginPage;

//import java.time.Duration;

public class BaseTest {
    protected WebDriver driver;
    // WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();

        driver.manage().window().maximize();

        driver.get("http://localhost:5173/login");
        // wait = new WebDriverWait(driver,Duration.ofMinuts(10))
    }

    protected void loginAsOperator() {
        LoginPage loginpage = new LoginPage(driver);
        loginpage.login("tilakvarma", "tilakvarma");
    }

    // @AfterMethod
    // public void cleanUp(){
    // if(driver!=null){
    // driver.quit();
    // }
    // }
}
