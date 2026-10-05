package com.milkdairy.version1.kafka.producer;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.milkdairy.version1.kafka.event.MilkEntryEvent;

@Service
public class MilkEntryProducer {

    private final KafkaTemplate<String, MilkEntryEvent> kafkaTemplate;

    public MilkEntryProducer(
            KafkaTemplate<String, MilkEntryEvent> kafkaTemplate) {

        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendMilkEntry(MilkEntryEvent event) {

        kafkaTemplate.send("milk-entry-topic", event);

        System.out.println("Milk entry event sent");
    }
}