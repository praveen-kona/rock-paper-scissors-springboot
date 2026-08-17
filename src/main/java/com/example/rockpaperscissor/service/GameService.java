package com.example.rockpaperscissor.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.example.rockpaperscissor.entity.Game;
import com.example.rockpaperscissor.repository.GameRepository;

@Service
public class GameService {

    private final GameRepository gameRepository;

    private final Random random = new Random();

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }


    // =========================================
    // PLAY ONE ROUND
    // =========================================

    public Game playGame(String userChoice) {

        // Remove extra spaces
        userChoice = userChoice.trim();

        // Remove double quotes sent by Swagger/Postman
        userChoice = userChoice.replace("\"", "");

        // Convert to uppercase
        userChoice = userChoice.toUpperCase();


        // =========================================
        // VALIDATE USER CHOICE
        // =========================================

        if (!userChoice.equals("ROCK")
                && !userChoice.equals("PAPER")
                && !userChoice.equals("SCISSORS")) {

            throw new IllegalArgumentException(
                    "Invalid choice. Please choose ROCK, PAPER, or SCISSORS."
            );
        }


        // =========================================
        // COMPUTER CHOICE
        // =========================================

        String computerChoice;

        int computerNumber = random.nextInt(3) + 1;

        if (computerNumber == 1) {

            computerChoice = "ROCK";

        }
        else if (computerNumber == 2) {

            computerChoice = "PAPER";

        }
        else {

            computerChoice = "SCISSORS";
        }


        // =========================================
        // CHECK WINNER
        // =========================================

        String result;

        if (userChoice.equals(computerChoice)) {

            result = "DRAW";

        }
        else if (

                (userChoice.equals("ROCK")
                        && computerChoice.equals("SCISSORS"))

                ||

                (userChoice.equals("PAPER")
                        && computerChoice.equals("ROCK"))

                ||

                (userChoice.equals("SCISSORS")
                        && computerChoice.equals("PAPER"))

        ) {

            result = "USER_WON";

        }
        else {

            result = "COMPUTER_WON";
        }


        // =========================================
        // CREATE GAME OBJECT
        // =========================================

        Game game = new Game();

        game.setUserChoice(userChoice);

        game.setComputerChoice(computerChoice);

        game.setResult(result);

        // This round belongs to the current game
        game.setCurrentGame(true);


        // =========================================
        // SAVE GAME TO MYSQL
        // =========================================

        return gameRepository.save(game);
    }


    // =========================================
    // GET CURRENT GAME SCORE
    // =========================================

    public Map<String, Long> getScore() {

        long userScore =
                gameRepository.countByCurrentGameTrueAndResult("USER_WON");

        long computerScore =
                gameRepository.countByCurrentGameTrueAndResult("COMPUTER_WON");

        long draws =
                gameRepository.countByCurrentGameTrueAndResult("DRAW");


        Map<String, Long> score = new HashMap<>();

        score.put("userScore", userScore);

        score.put("computerScore", computerScore);

        score.put("draws", draws);


        return score;
    }


    // =========================================
    // GET CURRENT GAME HISTORY
    // =========================================

    public List<Game> getGameHistory() {

        return gameRepository.findByCurrentGameTrue();
    }


    // =========================================
    // GET PREVIOUS GAME RESULTS
    // =========================================

    public List<Game> getPreviousGameHistory() {

        return gameRepository.findByCurrentGameFalse();
    }


    // =========================================
    // RESET CURRENT GAME
    // =========================================

    public void resetGame() {

        List<Game> currentGames =
                gameRepository.findByCurrentGameTrue();


        for (Game game : currentGames) {

            game.setCurrentGame(false);
        }


        gameRepository.saveAll(currentGames);
    }
}