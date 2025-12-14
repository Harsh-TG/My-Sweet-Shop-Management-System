package com.sweetshop.repository;

import com.sweetshop.entity.Role;
import com.sweetshop.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.TestPropertySource;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@TestPropertySource(properties = {
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.datasource.url=jdbc:h2:mem:testdb"
})
class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldSaveUser() {
        // Given
        User user = new User("testuser", "test@example.com", "password123");

        // When
        User savedUser = userRepository.save(user);

        // Then
        assertThat(savedUser).isNotNull();
        assertThat(savedUser.getId()).isNotNull();
        assertThat(savedUser.getUsername()).isEqualTo("testuser");
        assertThat(savedUser.getEmail()).isEqualTo("test@example.com");
        assertThat(savedUser.getRole()).isEqualTo(Role.USER);
    }

    @Test
    void shouldFindUserByUsername() {
        // Given
        User user = new User("johndoe", "john@example.com", "password123");
        entityManager.persist(user);
        entityManager.flush();

        // When
        Optional<User> found = userRepository.findByUsername("johndoe");

        // Then
        assertThat(found).isPresent();
        assertThat(found.get().getUsername()).isEqualTo("johndoe");
    }

    @Test
    void shouldNotFindUserByNonExistentUsername() {
        // When
        Optional<User> found = userRepository.findByUsername("nonexistent");

        // Then
        assertThat(found).isEmpty();
    }

    @Test
    void shouldFindUserByEmail() {
        // Given
        User user = new User("jane", "jane@example.com", "password123");
        entityManager.persist(user);
        entityManager.flush();

        // When
        Optional<User> found = userRepository.findByEmail("jane@example.com");

        // Then
        assertThat(found).isPresent();
        assertThat(found.get().getEmail()).isEqualTo("jane@example.com");
    }

    @Test
    void shouldReturnTrueWhenUsernameExists() {
        // Given
        User user = new User("existinguser", "existing@example.com", "password123");
        entityManager.persist(user);
        entityManager.flush();

        // When
        Boolean exists = userRepository.existsByUsername("existinguser");

        // Then
        assertThat(exists).isTrue();
    }

    @Test
    void shouldReturnFalseWhenUsernameDoesNotExist() {
        // When
        Boolean exists = userRepository.existsByUsername("nonexistent");

        // Then
        assertThat(exists).isFalse();
    }

    @Test
    void shouldReturnTrueWhenEmailExists() {
        // Given
        User user = new User("user", "exists@example.com", "password123");
        entityManager.persist(user);
        entityManager.flush();

        // When
        Boolean exists = userRepository.existsByEmail("exists@example.com");

        // Then
        assertThat(exists).isTrue();
    }

    @Test
    void shouldReturnFalseWhenEmailDoesNotExist() {
        // When
        Boolean exists = userRepository.existsByEmail("nonexistent@example.com");

        // Then
        assertThat(exists).isFalse();
    }

    @Test
    void shouldSaveAdminUser() {
        // Given
        User admin = new User("admin", "admin@example.com", "admin123", Role.ADMIN);

        // When
        User savedAdmin = userRepository.save(admin);

        // Then
        assertThat(savedAdmin).isNotNull();
        assertThat(savedAdmin.getRole()).isEqualTo(Role.ADMIN);
    }
}
