package com.example.rockpaperscissor.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rockpaperscissor.entity.Game;
import com.example.rockpaperscissor.service.GameService;

@RestController
@RequestMapping("/api/game")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }


    // =========================================
    // PLAY ONE ROUND
    // =========================================

    @PostMapping("/play")
    public Game playGame(@RequestBody String userChoice) {

        return gameService.playGame(userChoice);
    }


    // =========================================
    // GET CURRENT SCORE
    // =========================================

    @GetMapping("/score")
    public Map<String, Long> getScore() {

        return gameService.getScore();
    }


    // =========================================
    // GET CURRENT GAME HISTORY
    // =========================================

    @GetMapping("/history")
    public List<Game> getGameHistory() {

        return gameService.getGameHistory();
    }


    // =========================================
    // GET PREVIOUS GAME RESULTS
    // =========================================

    @GetMapping("/previous")
    public List<Game> getPreviousGameHistory() {

        return gameService.getPreviousGameHistory();
    }


    // =========================================
    // RESET CURRENT GAME
    // =========================================

    @DeleteMapping("/reset")
    public String resetGame() {

        gameService.resetGame();

        return "Game reset successfully";
    }


    // =========================================
    // HANDLE INVALID CHOICE
    // =========================================

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleInvalidChoice(
            IllegalArgumentException exception) {

        Map<String, String> error = Map.of(
                "error", "Invalid Choice",
                "message", exception.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(error);
    }
}