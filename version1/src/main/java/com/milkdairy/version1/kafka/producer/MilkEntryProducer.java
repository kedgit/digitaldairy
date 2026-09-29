package com.milkdairy.version1.kafka.producer;

import com.milkdairy.version1.kafka.event.MilkEntryEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class MilkEntryProducer {

    // create vaiable name topic 
    private static final String TOPIC="milk_entry_events";

    // crate object of template from kafka to send event
    private final KafkaTemplate<String ,MilkEntryEvent> kafkaTemplate;

    // create constructor takes event initialize
    public MilkEntryProducer(KafkaTemplate<String ,MilkEntryEvent> kafkaTemplate){
        this.kafkaTemplate=kafkaTemplate;
    }

    // creae method too send event to kafka topic with name

    public void sendMilkEntryEvent(MilkEntryEvent event){
        kafkaTemplate.send(TOPIC,event.getFarmerId().toString(),event);
    }
    
}
