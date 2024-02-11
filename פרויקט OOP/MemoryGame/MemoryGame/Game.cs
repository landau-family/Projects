using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Schema;
using System.Timers;
using System.Data;
using System.Threading;

namespace MemoryGame
{
    public enum GameType { Memory=1};
    public class Game
    {
        public List<Player> PlayerList { get; set; }
        public Board Board { get; set; }
        public GameType Type { get; set; }
        public int Current { get; set; }
        public Game()
        {

            PlayerList = new List<Player>();
            GameProcess();
            
            Current = 0;
            
        }
      
        private void IntPlayer()
        {
            
            int num=Checks.PositiveInputOnly("Type players number: ");
            int input;
            for (int i = 0; i < num; i++)
            {
                input = Checks.PositiveNoMoreThan($"choose type for player number {i + 1}: \n\t1 for human, \n\t2 for computer\n\t3 for smart computer", 3);
                InitPlayerByInput(input,i);
                
            }
        }
        private void InitPlayerByInput(int input,int i)
        {
            if (input == 1)
            {
                IntHumanPlayer(i + 1);
            }
            else
            {
                if (input == 2)
                {
                    IntComputerPlayer();
                }
                else
                {
                    IntSmartComputerPlayer();
                }
            }
        }
      
        private void IntHumanPlayer(int num)
        {
            Console.WriteLine($"type name for player: {num}");
            PlayerList.Add(new HumanPlayer(Console.ReadLine()));
        }
        private void IntComputerPlayer()
        {
            PlayerList.Add(new ComputerPlayer());
        }
        private void IntSmartComputerPlayer()
        {
            PlayerList.Add(new SmartComputerPlayer(Board.Cards.Length));
        }
      
        private CardType InitCardType()
        {
            int num2 = Checks.PositiveNoMoreThan("Choose card type:\n\t1-exercise&solution\n\t2-letters\n\t3-char&colors",3);            
            switch (num2)
            {
                case 1: return CardType.Exercise; 
                case 2: return CardType.Letter; 
                default: return CardType.ColoredChar;

            }
        }
        private void IntBoard()
        {
            int num=Checks.PositiveNoMoreThan("type number of couples of cards no more than 20:", 20);
            CardType type=InitCardType();
            Board = new Board(num, type);
        }
        private bool IsMatch(int player,int num1,int num2)
        {
            bool flag = Board.Cards[num1].Match(Board.Cards[num2]);
            if(flag)
            {
                PlayerList[player].Cards.Add(Board.Cards[num1]);
                PlayerList[player].Cards.Add(Board.Cards[num2]);
                Board.Cards[num1].Status = Status.Taken;
                Board.Cards[num2].Status=Status.Taken;
                PlayerList[player].Rank += 10;
            }
            return flag;
        }
        private void PrintPlayerCards(int player)
        {
            for (int j = 0; j < 3; j++)
            {
                for (int i = 0; i < PlayerList[player].Cards.Count; i++)
                {
                    PlayerList[player].Cards[i].Print();
                    Console.Write(" ");
                }
                Console.WriteLine();
            }
        }
        private void ShowWinner()
        {
            int player = FindWinner();
            
            if (player != -1)
            {
                if (TwoEven(player))
                {
                    Console.WriteLine("there two players with even number of points!\ntherefore there are no winners");
                }
                else
                {
                    Console.WriteLine(PlayerList[player].ToString());
                    Console.WriteLine("Cards:");
                    PrintPlayerCards(player);
                }
            }
        }
            private int FindWinner()
            {
                int max = -1, maxi = -1;
                for (int i = 0; i < PlayerList.Count; i++)
                {
                    if (PlayerList[i].Rank > max)
                    {
                        max = PlayerList[i].Rank;
                        maxi = i;
                    }
                }
                return maxi;
            }
        private int PickCard(bool first, int player)
        {
            int num = PlayerList[player].PickCard(first,Board.Cards.Length)-1;
            while (!Board.IsOKCard(num))
            {
                if (PlayerList[player] is HumanPlayer)
                { Console.WriteLine("wrong choice! try again!"); }
                num = PlayerList[player].PickCard(first, Board.Cards.Length) -1;
            } 
            return num;
        }
        private void PickCards(out int  first ,out int second,int i)
        {
            first = PickCard(true, i);
            Board.Cards[first].Status = Status.Open;
            Board.Print();
            second = PickCard(false, i);
            Board.Cards[second].Status = Status.Open;
            Board.Print();
            AddCardsToSmartComputer(first, second);
        }
        private void AddCardsToSmartComputer(int first, int second)
        {
            AddToSmartComputer(Board.Cards[first], first);
            AddToSmartComputer(Board.Cards[second], second);
        }
        private bool CheckMatch(int first, int second, int i)
        {
            if (IsMatch(i, first, second))
            {
                Console.WriteLine("congratulations! match found!");
                Thread.Sleep(1000);
                Console.Clear();
                return true;
            }
           
            NoMatch( first, second,i);
            return false;
        }
        private void NoMatch(int first, int second, int i)
        {
            
                Board.Cards[first].Status = Status.Close;
                Board.Cards[second].Status = Status.Close;
            
        }
        private void CheckWin(int first, int second, int i)
        {
            if (Board.AllCardsTaken())
            {

                Console.WriteLine("game over! \nthe winner is:");
                ShowWinner();
                Thread.Sleep(1000);
                PrintByeBye();
            }
            
        }
        private void PrintByeBye()
        {
            Console.Write("\n\nBye ");
            Thread.Sleep(500);
            Console.Write("Bye");
            Thread.Sleep(500);
            Console.Write(" .");
            Thread.Sleep(750);
            Console.Write(" .");
            Thread.Sleep(750);
            Console.Write(" .");
            Thread.Sleep(750);
        }
        private void MemoryGameProcess()
        {
            Console.WriteLine("welcome to the memory game!");
            IntBoard();
            IntPlayer();
            int first, second;
            
            while (!Board.AllCardsTaken())
            {
                Board.Print();
                for (int i = 0; i < PlayerList.Count; i++)
                {
                    Console.WriteLine(PlayerList[i].Name + "'s turn:");

                    PickCards(out first,out second, i);
                    
                    Thread.Sleep(1000);
                    Console.Clear();
                    
                    if(CheckMatch(first,second,i))
                    {
                        CheckWin(first, second, i);

                    }
                    if(Board.AllCardsTaken())
                    {
                        break;
                    }
                    
                }
            }
        }
        private void AddToSmartComputer(Card card, int ind)
        {
            for (int i = 0; i < PlayerList.Count; i++)
            {
                if (PlayerList[i] is SmartComputerPlayer)
                {
                    ((SmartComputerPlayer)PlayerList[i]).AddPick(card, ind);
                }
            }
            
        }
       
        private void SetType(int num)
        {
            switch(num)
            {
                case 1:Type = GameType.Memory; break;
            }
        }
        private void GameProcess()
        {
            int type = Checks.PositiveNoMoreThan("choose game type: \n\t\t1-memory",1);
            SetType(type);
            if (type==(int)GameType.Memory)
            {
                MemoryGameProcess();    
            }
        }
        private bool TwoEven(int maxi )
        {
            int rank = PlayerList[maxi].Rank;
            for (int i = 0; i <PlayerList.Count; i++)
            {
                if (i != maxi && PlayerList[i].Rank==rank)
                {
                    return true;
                }
            }
            return false;
        }

    }
}
