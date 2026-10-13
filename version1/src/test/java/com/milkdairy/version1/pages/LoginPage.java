package com.milkdairy.version1.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.By;
import java.time.Duration;

public class LoginPage {

    private WebDriver driver;
    private WebDriverWait wait;

    // locators
    private By usernameele = By.id("login");
    private By passwordele = By.id("password");
    private By loginbtn = By.tagName("button");

    // constructor to assign driver from basetest
    public LoginPage(WebDriver driver) {
        this.driver = driver;
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // username field fetch method

    public void enterUserName(String login) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(usernameele)).sendKeys(login);
    }

    // password field fetch method

    public void enterPassWord(String password) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(passwordele)).sendKeys(password);
    }

    // click btn

    public void clickLogin() {
        wait.until(ExpectedConditions.elementToBeClickable(loginbtn)).click();
    }

    // perform login

    public void login(String login, String password) {
        enterUserName(login);
        enterPassWord(password);
        clickLogin();
    }
}