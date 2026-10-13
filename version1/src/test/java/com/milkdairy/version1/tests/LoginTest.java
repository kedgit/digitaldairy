package com.milkdairy.version1.tests;

import org.testng.annotations.Test;

import com.milkdairy.version1.BaseTest;
import com.milkdairy.version1.pages.LoginPage;

import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import java.time.Duration;

public class LoginTest extends BaseTest {

    @Test(groups = { "smoke" })
    public void ValidateLoginTest() {

        LoginPage loginpage = new LoginPage(driver);

        loginpage.login("tilakvarma", "tilakvarma");

        // Debug output
        System.out.println("Current URL: " + driver.getCurrentUrl());

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        boolean redirected = wait.until(
                ExpectedConditions.urlContains("/operator/"));

        Assert.assertTrue(redirected, "Operator page redirect failed");
    }

}
