package com.sweetshop.config;

import com.sweetshop.entity.Sweet;
import com.sweetshop.repository.SweetRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class DataLoader {

        @Bean
        CommandLineRunner loadData(SweetRepository sweetRepository) {
                return args -> {
                        // Only load data if database is empty
                        if (sweetRepository.count() == 0) {
                                // Traditional Indian Sweets
                                sweetRepository.save(createSweet(
                                                "Gulab Jamun",
                                                "Traditional",
                                                new BigDecimal("150.00"),
                                                100));

                                sweetRepository.save(createSweet(
                                                "Rasgulla",
                                                "Traditional",
                                                new BigDecimal("120.00"),
                                                80));

                                sweetRepository.save(createSweet(
                                                "Jalebi",
                                                "Traditional",
                                                new BigDecimal("100.00"),
                                                150));

                                sweetRepository.save(createSweet(
                                                "Barfi",
                                                "Traditional",
                                                new BigDecimal("200.00"),
                                                75));

                                sweetRepository.save(createSweet(
                                                "Ladoo",
                                                "Traditional",
                                                new BigDecimal("180.00"),
                                                120));

                                // Modern/Fusion Sweets
                                sweetRepository.save(createSweet(
                                                "Chocolate Barfi",
                                                "Chocolate",
                                                new BigDecimal("250.00"),
                                                60));

                                sweetRepository.save(createSweet(
                                                "Kaju Katli",
                                                "Premium",
                                                new BigDecimal("400.00"),
                                                50));

                                sweetRepository.save(createSweet(
                                                "Rasmalai",
                                                "Traditional",
                                                new BigDecimal("220.00"),
                                                70));

                                sweetRepository.save(createSweet(
                                                "Soan Papdi",
                                                "Traditional",
                                                new BigDecimal("130.00"),
                                                90));

                                sweetRepository.save(createSweet(
                                                "Peda",
                                                "Traditional",
                                                new BigDecimal("160.00"),
                                                110));

                                // Special/Seasonal Sweets
                                sweetRepository.save(createSweet(
                                                "Motichoor Ladoo",
                                                "Festival",
                                                new BigDecimal("190.00"),
                                                85));

                                sweetRepository.save(createSweet(
                                                "Mysore Pak",
                                                "Premium",
                                                new BigDecimal("280.00"),
                                                45));

                                System.out.println(
                                                "✅ Database initialized with " + sweetRepository.count() + " sweets");
                        } else {
                                System.out.println(
                                                "ℹ️ Database already contains " + sweetRepository.count() + " sweets");
                        }
                };
        }

        private Sweet createSweet(String name, String category,
                        BigDecimal price, int quantity) {
                Sweet sweet = new Sweet();
                sweet.setName(name);
                sweet.setCategory(category);
                sweet.setPrice(price);
                sweet.setQuantityInStock(quantity);
                return sweet;
        }
}
