package com.example.rockpaperscissor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rockpaperscissor.entity.Game;

public interface GameRepository extends JpaRepository<Game, Long> {

    long countByCurrentGameTrueAndResult(String result);

    List<Game> findByCurrentGameTrue();

    List<Game> findByCurrentGameFalse();
}