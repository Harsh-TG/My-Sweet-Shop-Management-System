package com.sweetshop.service;

import com.sweetshop.dto.SweetRequest;
import com.sweetshop.entity.Sweet;
import com.sweetshop.repository.SweetRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class SweetService {

    private final SweetRepository sweetRepository;

    public SweetService(SweetRepository sweetRepository) {
        this.sweetRepository = sweetRepository;
    }

    public List<Sweet> getAllSweets() {
        return sweetRepository.findAll();
    }

    public Sweet getSweetById(Long id) {
        return sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found with id: " + id));
    }

    public Sweet createSweet(SweetRequest request) {
        Sweet sweet = new Sweet();
        sweet.setName(request.getName());
        sweet.setCategory(request.getCategory());
        sweet.setPrice(request.getPrice());
        sweet.setQuantityInStock(request.getQuantityInStock());

        return sweetRepository.save(sweet);
    }

    public Sweet updateSweet(Long id, SweetRequest request) {
        Sweet sweet = getSweetById(id);

        sweet.setName(request.getName());
        sweet.setCategory(request.getCategory());
        sweet.setPrice(request.getPrice());
        sweet.setQuantityInStock(request.getQuantityInStock());

        return sweetRepository.save(sweet);
    }

    public void deleteSweet(Long id) {
        Sweet sweet = getSweetById(id);
        sweetRepository.delete(sweet);
    }

    public List<Sweet> searchSweets(String name, String category, BigDecimal minPrice, BigDecimal maxPrice) {
        return sweetRepository.searchSweets(name, category, minPrice, maxPrice);
    }

    @Transactional
    public Sweet purchaseSweet(Long id, Integer quantity) {
        Sweet sweet = getSweetById(id);

        if (sweet.getQuantityInStock() < quantity) {
            throw new RuntimeException("Insufficient stock. Available: " + sweet.getQuantityInStock());
        }

        sweet.setQuantityInStock(sweet.getQuantityInStock() - quantity);
        return sweetRepository.save(sweet);
    }

    @Transactional
    public Sweet restockSweet(Long id, Integer quantity) {
        Sweet sweet = getSweetById(id);
        sweet.setQuantityInStock(sweet.getQuantityInStock() + quantity);
        return sweetRepository.save(sweet);
    }
}
