package com.ouri.tree;

import java.io.ByteArrayInputStream;
import java.sql.Array;
import java.util.Set;
import java.util.HashSet;
import java.util.ArrayList;
import java.util.Arrays;

import java.util.Collection;

import java.util.List;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.util.Assert;
import org.junit.Assert;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class TestDoMe {
    
    public static String[] uniqueNames(String[] names1, String[] names2) {
    	
        Set<String> result = new HashSet<String>(Arrays.asList(names1));
        result.addAll(Arrays.asList(names2));
       return  result.toArray(new String[result.size()]);
        
    }
    
    public static void findRoots(double a, double b, double c) {
        double x1 = (-b + Math.sqrt(b*b - 4*a*c))/2*a;
        double x2 = (-b + Math.sqrt(b*b - 4*a*c))/2*a;
        
    }
    
    public static int[] findTwoSum(int[] list, int sum) {
        for (int i=0; i<list.length-1 ; i++){
            for (int j=i+1; j<list.length ; j++){
                if ((list[i]+list[j]) == sum){
                    return new int[] {i, j};
                }
            }
        }
        return null;
    }
    
    public static int countNumbers(int[] sortedArray, int lessThan) {
    	 System.out.println("Array "+ Arrays.toString(sortedArray)+ ", lessThan "+lessThan);
        int result = 0;
        int max = sortedArray.length-1;
        int min = 0;
        System.out.println(", min "+ min +", max "+max);
        int i = 0;
        int index = (max-min)/2;
        int factor =  1 ;
        while ((max-min) >= 0  && index != 0){
        	
        	if (max - min < 1)
        		index += factor;
        	else 
             index = min + ((max-min)/2);
            System.out.println("Before index " +index +", min "+ min +", max "+max+ ", sortedArray[index] "+sortedArray[index]
            		+", factor "+factor);
            if (sortedArray[index] < lessThan){
                result = index+1;
                min = min == index ? index+1 : index;
                factor =  1 ;
                System.out.println("result "+result+ ", index " +index+ ", min "+min);
            } else {
                max = index;
                factor =  -1 ;
            }
            System.out.println("After index " +index +", min "+ min +", max "+max+ ", sortedArray[index] "+sortedArray[index]
            		+ ", result "+result+", factor "+factor);
            if (i++ ==7) {
            	System.out.println("BREAK");
            	break;
            }
        }
        return result;
    }
    
    public static void main(String[] args) {
    	//System.out.println(countNumbers(new int[] { 1,2, 3, 5, 7 }, 4));
    	
    	System.out.println(countNumbers(new int[] { 1, 2, 3, 5, 7 }, 9));
    	System.out.println(countNumbers(new int[] { 1, 2, 3, 5, 7 }, 1));
    	System.out.println(countNumbers(new int[] { 3 }, 1));
    	System.out.println(countNumbers(new int[] { 3 }, 4));
    	
        String[] names1 = new String[] {"Ava", "Emma", "Olivia"};
        String[] names2 = new String[] {"Olivia", "Sophia", "Emma"};
        System.out.println(String.join(", ", TestDoMe.uniqueNames(names1, names2))); // should print Ava, Emma, Olivia, Sophia
        
        String xml =
                "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                "<folder name=\"c\">" +
                    "<folder name=\"program files\">" +
                        "<folder name=\"uninstall information\" />" +
                    "</folder>" +
                    "<folder name=\"users\" />" +
                "</folder>";

        
        
        Collection<String> names;
		try {
			names = folderNames(xml, 'u');
			for(String name: names)
	            System.out.println(name);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
    }
    
    public static Collection<String> folderNames(String xml, char startingLetter) throws Exception {
    	ArrayList<String> result =new ArrayList<String>();
    	try {
    		
    		
    		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
    		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
    		Document doc = dBuilder.parse(new ByteArrayInputStream(xml.getBytes()));

    		//optional, but recommended
    		//read this - http://stackoverflow.com/questions/13786607/normalization-in-dom-parsing-with-java-how-does-it-work
    		doc.getDocumentElement().normalize();

    		System.out.println("Root element :" + doc.getDocumentElement().getNodeName());

    		NodeList nList = doc.getElementsByTagName("folder");

    		System.out.println("----------------------------"+nList.getLength());

    		for (int temp = 0; temp < nList.getLength(); temp++) {

    			Node nNode = nList.item(temp);

    			System.out.println("\nCurrent Element :" + nNode.getNodeName());

    			if (nNode.getNodeType() == Node.ELEMENT_NODE) {

    				Element eElement = (Element) nNode;
    				String eName = eElement.getAttribute("name");
    				System.out.println("eElement : " + eName);
    				if (eName.startsWith(""+startingLetter)) {
    					result.add(eName);
    					System.out.println("eElement : " + eName + ", ADDED");
    				}
    				
    			}
    		}
    	    } catch (Exception e) {
    	    	e.printStackTrace();
    	    }
    	return result;
    	
    }
}



interface AlertDAO {    	
    UUID addAlert(Date time);
    Date getAlert(UUID id);        
}

class AlertService {
    private AlertDAO storage;
	
    public AlertService(AlertDAO alertDAO){
        this.storage = alertDAO;
    }
    
    public UUID raiseAlert() {
        return this.storage.addAlert(new Date());
    }
	
    public Date getAlertTime(UUID id) {
        return this.storage.getAlert(id);
    }	
}

class MapAlertDAO implements AlertDAO{
    private final Map<UUID, Date> alerts = new HashMap<UUID, Date>();
	
    public UUID addAlert(Date time) {
    	UUID id = UUID.randomUUID();
        this.alerts.put(id, time);
        return id;
    }
	
    public Date getAlert(UUID id) {
        return this.alerts.get(id);
    }	
}

class TextInput {
    String result="";
    
    public void add(char c){
        result +=c;
    }
    
    public String getValue(){
        return result;
    }
}

class NumericInput extends TextInput{
            
    public void add(char c){
        if (Character.isDigit(c))
            result +=c;
    }
}

class MovieRepository {

    @Autowired
    private JdbcTemplate template;

    @PostConstruct
    public void createTable() {
        template.execute("CREATE TABLE movies (id bigint auto_increment primary key, name VARCHAR(50), year int, rating int)");
    }

    public void createMovie(String name, int year, int rating) {
        template.execute("INSERT INTO movies ( name, year, rating ) VALUES ( '"+name+
                         "', " +year +", "+rating+")" );

    }
    
    class Movie {
        public String name;
        public int year;
        public int rating;
        
        public Movie(String name, int year, int rating) {
            this.name = name;
            this.year = year;
            this.rating = rating;
        }
    }
    
    public List<Movie> findMoviesByName(String likeName) {
        String sql = "SELECT * FROM movies where name like '"+likeName+"'";
	    return template.query(
	            sql,
	            (rs, rowNum) ->
	                    new Movie(
	                        rs.getString("name"),
	                        rs.getInt("year"),
	                        rs.getInt("rating")
	                    )
	    );
    }    
}

class SortedSearch {
   
    
}
 
class AccountTest {
    private double epsilon = 1e-6;

    @Test
    public void accountCannotHaveNegativeOverdraftLimit() {
        Person person = new Person();
        
        ////import org.springframework.util.Assert;
        //Assert.isTrue(person.getId() > 0, "The value must be greater than zero");
        
      //import org.junit.Assert;
        Assert.assertEquals("ouri", person.getFirstName());
    }
}
    

