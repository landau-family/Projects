using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemoryGame
{
    public abstract class Player
    {
        public int Rank { get; set; }
        public virtual string Name { get;  }
        public List<Card> Cards { get; set; }
        public Player()
        {
            
        }
        public Player(int rank, string name )
        {
            Rank = rank;
            Name = name;
            Cards = new List<Card>();
           
        }
        public virtual void IntName(string name)
        {

        }
        
        public abstract int PickCard(bool first,int cardNum);
        public  void ShowCards()
        {
            for (int j = 0; j < 3; j++)
            {
                for (int i = 0; i < Cards.Count; i++)
                {
                    Cards[i].Print();
                }
            }
        }
        public override string ToString()
        {
            return "Name: "+Name+"\nRank: "+Rank;
        }
    }
}
