/*
 * Name: Christopher Carbone
 * Date: 2/26/2021
 * Purpose: Basic random guesser program
 * File: Program.cs
 */

using System;
using System.Collections.Generic;

namespace GuessTheFood
{
    class Program
    {
        static void Main(string[] args)
        {
            //Create list of food
            List<string> foodList = new List<string>
            {
                "Pizza", "Pasta", "Salmon", "Steak", "Miso"
            };
            //choose a random item to be the correct guess
            Random rand = new Random();
            string correctFood = foodList[rand.Next(foodList.Count)];

            //Print menu and give list of options
            Console.WriteLine("Guess The Food!");
            Console.WriteLine("---------------\n");
            Console.Write("Choices: ");
            foreach(var food in foodList)
                Console.Write(food + ", ");

            //Loop 3 times and let the user guess one of the options
            string guess = "";
            for(int i = 3; i > 0; i--)
            {
                //accept user input
                Console.Write("\nGuess: ");
                guess = Console.ReadLine();

                //Invalid choice
                if(!foodList.Contains(guess))
                {
                    Console.WriteLine("Invalid choice, please try again");
                    i++;
                }
                //correct answer
                else if(guess == correctFood)
                {
                    Console.WriteLine("\nYou guessed correct! Congratulations!");
                    break;
                }
                //Ran out of tries
                else if(i == 1)
                {
                    Console.WriteLine("\nYou lose!");
                }
                //Incorrect answer
                else
                {
                    Console.WriteLine("\nIncorrect guess. You have " + (i-1) + " tries left");
                }
            }
            
        }
    }
}
