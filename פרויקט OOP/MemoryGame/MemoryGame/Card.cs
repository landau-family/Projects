using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemoryGame
{
    public enum Status { Open, Close, Taken};
    public abstract class Card
    {
        public Status Status { get; set; }
        public bool First { get; set; }

        public Card(Card c)
        {
            Status = c.Status;
            First = c.First;
        }
        public Card()
        {
            Status=Status.Close;
            First=false;   
        }
        public Card(Status status, bool first)
        {
            this.Status = status;
            this.First = first;
        }

        public abstract void GetCardArr(Card[] card);

        public abstract void PrintCard();
        
        public void Print()
        {
            if (Status == Status.Close)
            {
                Console.Write("*");
            }
            else
            {
                PrintCard();
            }

        }
        public override bool Equals(object obj)
        {
            
            return false;
        }
        public bool Match(Card card)
        {
            return this.Equals(card);
        }
        
    }
}
