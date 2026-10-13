package com.milkdairy.version1.tests;
import org.testng.annotations.Test;
import com.milkdairy.version1.BaseTest; 
import com.milkdairy.version1.pages.AdvancePaymentPage;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class AdvancePaymentTest extends BaseTest {
    
    // Add your test methods here
    @Test
    public void giveAdvancePayment() {
        loginAsOperator(); // Call the login method from BaseTest to perform login

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        // Wait for the operator page to load
        wait.until(ExpectedConditions.urlContains("/operator/"));
        
        AdvancePaymentPage advancePaymentPage = new AdvancePaymentPage(driver);

        advancePaymentPage.navigateToAdvancePaymentPage(); // Navigate to the advance payment page

       
        advancePaymentPage.giveAdvancePayment(13, 500, "Advance payment for Diwali vacations...");
        // Implement the test logic for giving advance payment
    }
    
}
