using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemoryGame
{
    public class SmartComputerPlayer : ComputerPlayer
    {
        private const string NAME = "SMART ";
        public override string Name => NAME + base.Name;
        public Card[] PickCards { get; set; }
        public Card FirstPick { get; set; }
        public int FirstPickI { get; set; }
        public SmartComputerPlayer(int cardNum):base()
        {
            PickCards = new Card[cardNum];
        }
        public void AddPick(Card card, int i)
        {
            PickCards[i] = card;
        }
        public override int PickCard(bool first, int cardNum)
        {
            int output;
            if(first)
            {
               ChooseFirst(out output);
                   
            }
            else
            {

                ChooseSecond(out output, first);
            }
            if (output == -1)
            { output = base.PickCard(first, cardNum); }
            return output;
        }
        private void ChooseFirst(out int output)
        {
            output = -1;
            for (int i = 0; i < PickCards.Length; i++)
            {
                if (PickCards[i] != null && PickCards[i].Status != Status.Taken && FindMatch(PickCards[i], i) != -1)
                {
                    FirstPick = PickCards[i];
                    FirstPickI = i;
                    output = i + 1;
                    
                }

            }
        }
        private void ChooseSecond(out int output,bool first)
        {
            output = -1;
            if (!first && FirstPick != null)
            {
                if (FindMatch(FirstPick, FirstPickI) != -1)
                {
                    output = FindMatch(FirstPick, FirstPickI);
                    FirstPick = null;
                    
                }
            }
        }
        private int FindMatch(Card card, int index)
        {
            for (int i = 0; i < PickCards.Length; i++)
            {
                if (i != index && PickCards[i] != null && PickCards[i].Match(card))
                {
                    return i+1;
                }
            }
            return -1;
        }

    }
}
