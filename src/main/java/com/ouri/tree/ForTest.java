package com.ouri.tree;

public class ForTest {

	
	public static void main(String args[]) {
	      int a = 20, b = 10;
	      My_Calculation myC = new My_Calculation();
	      myC.addition(a, b);
	      myC.Subtraction(a, b);
	      myC.multiplication(a, b);
	      
	      Calculation cal1 = (Calculation) myC;
	      My_Calculation myC3  = (My_Calculation) cal1;
	      myC3.addition(a, b);
	      myC3.Subtraction(a, b);
	      myC3.multiplication(a, b);
	      
	      Calculation cal = new My_Calculation();
	      cal.addition(a, b);
	      cal.Subtraction(a, b);
	      //cal.multiplication(a, b);
	      
	      //My_Calculation myC2 = new Calculation();
	      //My_Calculation myC2 = (My_Calculation) new Calculation(); // java.lang.ClassCastException
	      //myC2.addition(a, b);
	      //myC2.Subtraction(a, b);
	      //myC2.multiplication(a, b);
	      
	   }

}


class Calculation {
	   int z;
		
	   public void addition(int x, int y) {
	      z = x + y;
	      System.out.println("The sum of the given numbers:"+z);
	   }
		
	   public void Subtraction(int x, int y) {
	      z = x - y;
	      System.out.println("The difference between the given numbers:"+z);
	   }
	}

	class My_Calculation extends Calculation {
	   public void multiplication(int x, int y) {
	      z = x * y;
	      System.out.println("The product of the given numbers:"+z);
	   }
		
	   
	}
