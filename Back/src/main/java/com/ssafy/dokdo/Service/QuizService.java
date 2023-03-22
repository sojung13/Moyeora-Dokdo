package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.Quiz;
import com.ssafy.dokdo.Repository.QuizRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;

@AllArgsConstructor
@Service
public class QuizService {

    private final QuizRepository quizRepository;
    public HashSet<Quiz> getQuizByNumber(int number){
         List<Quiz> quizList = quizRepository.findAll();
        HashSet<Quiz> randomQuiz = new HashSet<>();


        long seed = System.currentTimeMillis();
        Random rand = new Random(seed);


        while(randomQuiz.size() < number){
            int randomIndex = rand.nextInt(quizList.size());
            Quiz randomElement = quizList.get(randomIndex);
            randomQuiz.add(randomElement);
        }

         return  randomQuiz;
    }

}
