using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MemoryGame
{
    public class ExerciseCard : Card
    {
        public string Exercise { get; set; }
        public string Solution
        {
            get
            {
                DataTable table = new DataTable();
                return table.Compute(Exercise,"").ToString();
            }
        }
        public ExerciseCard(string exercise)
        {
            Exercise = exercise;
        }
        public ExerciseCard()
        {

        }
        public ExerciseCard(string exercise, bool first):base(Status.Close, first)
        {
            Exercise=exercise;
        }
        public ExerciseCard(ExerciseCard card1):base(card1)
        {
            Exercise=card1.Exercise;
        }
        public override void GetCardArr(Card [] card)
        {
            
            string exercise = "";
           for(int i = 0; i < card.Length/2; i++)
            {
                exercise = GetRandExercise(card);
                card[i] = new ExerciseCard(exercise, true);
                card[card.Length - 1 - i] = new ExerciseCard(exercise);
            }
        }
        private string GetRandExercise(Card[] card)
        {
            Random rand = new Random();
            string exercise = "";
            do
            {
                exercise = rand.Next(1, 10).ToString() + "" + GetOperator(rand.Next(1, 5)) + "" + rand.Next(1, 10).ToString();
            } 
            while ((card.Contains(new ExerciseCard(exercise))));
            return exercise;
        }
        private char GetOperator(int n)
        {
            switch(n)
            {
                case 1: return '+';break;
                case 2:return '-';break;
                case 3:return '*';break;
                case 4:return '/';break;
                default:return '\0';
            }
        }
        public override void PrintCard()
        {
           if(First)
            {
                Console.Write(Exercise);
            }
            else
            {
                Console.Write(Solution);
            }
        }
        public override bool Equals(object obj)
        {
            if(obj is ExerciseCard)
            {
                return this.Solution == ((ExerciseCard)obj).Solution;
            }
            return base.Equals(obj);    
        }

    }
}
