package com.milkdairy.version1.kafka.consumer;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.milkdairy.version1.kafka.event.MilkEntryEvent;

@Service 
public class MilkEntryConsumer {

   @KafkaListener(
            topics = "milk-entry-topic",
            groupId = "notification-group"
    )
    public void milkEntryConsumer(MilkEntryEvent event){
        System.out.println("Milk entry event received...");
        System.out.println("Farmer ID: " + event.getFarmerId()); 
        System.out.println("Quantity: " + event.getQuantity()); 
        System.out.println("Fat: " + event.getFat()); 
        System.out.println("Amount: " + event.getAmount());
    }
}
