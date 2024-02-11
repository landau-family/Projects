using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemoryGame
{
    public class HumanPlayer:Player
    {
        public new string Name 
        { 
            get
            {
                return base.Name;
            }
            set
            {
                Name = value;
            }
        }
        public HumanPlayer(string name):base(0,name)
        {
            
        }

        public override void IntName(string name)
        {
            Name = name;
        }
        public override int PickCard(bool first,int cardNum)
        {
            
               return Checks.PositiveInputOnly(("pick " + ((first) ? "first" : "second") + " card"));
           
        }
        
        
        
    }
}
