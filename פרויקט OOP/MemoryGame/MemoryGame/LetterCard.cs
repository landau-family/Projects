using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemoryGame
{
    public class LetterCard:Card
    {
        public char Letter { get; set; }
        public LetterCard(char letter)
        {
            Letter = letter;
        }
        public LetterCard(LetterCard card2):base(card2)
        {
            Letter=card2.Letter;
        }
        public LetterCard(char letter, bool first):base(Status.Close,first)
        {
            Letter=letter;
        }
        public LetterCard()
        {

        }
        public override void GetCardArr(Card[] card)
        {
            char letter = '\0';
            for (int i = 0; i < card.Length / 2; i++)
            {
                letter = GetRandLetter(card);
                card[i] = new LetterCard(letter, true);
                card[card.Length - 1 - i] = new LetterCard(letter);
            }
        }
        private char GetRandLetter(Card[] card)
        {
            Random rand = new Random();
            char letter = '\0'; 
            do
            {
                letter = (char)('a' + rand.Next(1, 26));
            }
            while ((card.Contains(new LetterCard(letter))));
            return letter;
        }
        public override void PrintCard()
        {
            if (First)
            {
                Console.Write(Letter);
            }
            else
            {
                Console.Write((char)(Letter-'a'+'A'));
            }
        }
        public override bool Equals(object obj)
        {
            if(obj is LetterCard)
            {
                return this.Letter== ((LetterCard)obj).Letter;
            }
            return base.Equals(obj);
        }
    }
}
