package com.milkdairy.version1.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class AdvancePaymentPage {

    WebDriver driver;
    WebDriverWait wait;
    private By farmerId = By.id("farmerId");
    private By amount = By.id("amount");
    private By remarks = By.id("remarks");
    private By advancePaymentButton = By.id("advancePaymentButton");
    private By advancebtn = By.linkText("Advance");

    public AdvancePaymentPage(WebDriver driver) {
        this.driver = driver; // Constructor logic if needed
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));

    }

    // navigate to advance payment page
    public void navigateToAdvancePaymentPage() {
        wait.until(ExpectedConditions.elementToBeClickable(advancebtn)).click();
    }

    // Method to give advance payment
    public void enterFarmerId(String id) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(farmerId)).sendKeys(id);
    }

    public void enterAmount(String amt) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(amount)).sendKeys(amt);
    }

    public void enterRemarks(String rmks) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(remarks)).sendKeys(rmks);
    }

    public void clickAdvancePaymentButton() {
        wait.until(ExpectedConditions.elementToBeClickable(advancePaymentButton)).click();
    }

    public void giveAdvancePayment(int id, int amt, String rmks) {
        enterFarmerId(String.valueOf(id));
        enterAmount(String.valueOf(amt));
        enterRemarks(rmks);
        clickAdvancePaymentButton();
    }
}
