using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemoryGame
{
    public class ColoredCharCard:LetterCard
    {
        public ConsoleColor Color { get; set; }
        public ColoredCharCard(ConsoleColor color,char letter):base(letter)
        {
            Color = color;
        }
        public ColoredCharCard(ColoredCharCard card3) : base(card3)
        {
            Color=card3.Color;
        }
        public ColoredCharCard(ConsoleColor color,char letter, bool first) : base(letter, first)
        {
            Color=color;
        }
        public ColoredCharCard()
        {

        }
        public override void GetCardArr(Card[] card)
        {
            ColoredCharCard coloredCharCard;
            for (int i = 0; i < card.Length / 2; i++)
            {
                coloredCharCard = GetRandColoredChar(card);
                card[i] = new ColoredCharCard(coloredCharCard);
                card[card.Length - 1 - i] = new ColoredCharCard(coloredCharCard.Color, coloredCharCard.Letter);
            }
        }
        private ColoredCharCard GetRandColoredChar(Card[] card)
        {
            Random rand = new Random();
            char letter ;
            int color = 0;
            
            do
            {
                letter = (char)(rand.Next(1, 5));
                color = rand.Next(1, 16);
            }
            while ((card.Contains(new ColoredCharCard((ConsoleColor)color,letter))));
            return new ColoredCharCard((ConsoleColor)color,letter,true);
        }
        public override void PrintCard()
        {
            if (First)
            {
                Console.ForegroundColor = Color;                
                Console.Write(Letter);
                Console.ForegroundColor = ConsoleColor.White;
            }
            else
            {
                Console.BackgroundColor = (ConsoleColor)((int)(Color));
                Console.Write(Letter);
                Console.BackgroundColor = ConsoleColor.Black;
            }
            //Console.BackgroundColor = (ConsoleColor)(0);
        }
        public override bool Equals(object obj)
        {
            if(base.Equals(obj))
            {
                return Color ==(((ColoredCharCard)obj).Color);  
            }
            return false;
        }
    }
}
