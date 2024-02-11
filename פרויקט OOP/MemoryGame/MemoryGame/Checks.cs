using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemoryGame
{
    public class Checks
    {
        public static bool AllArePositiveNumbers(string str)
        {
            if (str == "")
                return false;
            for (int i = 0; i < str.Length; i++)
            {
                if (i == 0 && str[i] == '+')
                {
                    continue;
                }
                if (str[i] < '0' || str[i] > '9')
                {
                    return false;
                }
            }
            return true;
        }
        public static int PositiveInputOnly( string message)
        {
            string str= null;
            int input=0;
            while(input<1)
            {
               if(str!=null)
                {
                    Console.WriteLine("positive input only! try again!\n");
                }
                Console.WriteLine(message);
                str = Console.ReadLine();
                if(!AllArePositiveNumbers(str))
                {
                    continue ;
                }
                input=int.Parse(str);   
            }
            return input;
        }
        public static int PositiveNoMoreThan(string message, int top)
        {
            
            int input=PositiveInputOnly(message);
            while(input>top)
            {
                Console.WriteLine("positive no more than "+top);
                input=PositiveInputOnly(message);   
            }
            return input;
        }
    }
}
