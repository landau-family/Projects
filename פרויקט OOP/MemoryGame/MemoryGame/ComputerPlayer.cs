using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemoryGame
{
    public class ComputerPlayer:Player
    {
        private const string NAME = "COMPUTER";
        public override string Name => NAME;
        public ComputerPlayer():base(0,NAME)
        {

        }
        public override int PickCard(bool first,int cardNum)
        {
            Random random = new Random();
            return random.Next(1,(cardNum+1));
        }
    }
}
