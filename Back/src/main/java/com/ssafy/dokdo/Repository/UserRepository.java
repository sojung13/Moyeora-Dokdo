package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByName(String nickname);

    Boolean existsUserByName(String name);

}
