using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemoryGame
{
    public enum CardType { Exercise,Letter,ColoredChar};
    public class Board
    {
        public Card[] Cards { get; set; }
        public int Size { get; set; }

        public Board(int n,CardType type)
        {
            Cards = new Card[n*2];
            MixCards(type);
        }
        private void MixCards(CardType type)
        {
            Card c=GetCard(type);
            if (c != null)
            {
                Card[] card = new Card[Cards.Length];
                Random random = new Random();
                c.GetCardArr(card);
                int[] arr = new int[Cards.Length];
                for (int i = 0; i < arr.Length; i++)
                {
                    arr[i] = i;
                }
                int[] newArr = arr.OrderBy(x => random.Next()).ToArray();
                for (int i = 0; i < Cards.Length; i++)
                {
                    Cards[newArr[i]] = card[i];
                }
            }
        }
        private Card GetCard(CardType type)
        {
            switch(type)
            {
                case CardType.Exercise:return new ExerciseCard();
                    case CardType.Letter:return new LetterCard();
                case CardType.ColoredChar:return new ColoredCharCard();
            }
            return null;
        }
        public void Print()
        {
            for (int j = 0; j < 3; j++)
            {
                for (int i = 0; i < Cards.Length; i++)
                {
                    Cards[i].Print();
                    Console.Write(" ");
                }
                Console.WriteLine();
            }
        }
        public bool IsOKCard(int num)
        {
            return num >= 0 && num < Cards.Length && Cards[num].Status != Status.Open && Cards[num].Status!=Status.Taken;
        }
        public bool AllCardsTaken()
        {
            int num = 0;
            for (int i = 0; i < Cards.Length; i++)
            {
                if (Cards[i].Status==Status.Taken)
                {
                    num++;
                }
            }
            return num==Cards.Length;
        }
    }
}
