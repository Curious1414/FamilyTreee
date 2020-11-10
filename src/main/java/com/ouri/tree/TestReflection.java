package com.ouri.tree;

import java.lang.annotation.*;
import java.lang.reflect.*;
import java.util.Arrays;
import java.util.List;

@MyAnnotation(name="someName",  value = "Hello World")
public class TestReflection {
	
	public List<String> stringList = Arrays.asList("A", "B", "C");

	  public List<String> getStringList(){
	    return this.stringList;
	  }
	  
	  public void setStringList(List<String> list){
		    this.stringList = list;
		  }

	public static void main(String[] args) {
		Method method;
		try {
			method = TestReflection.class.getMethod("getStringList", null);
			Type returnType = method.getGenericReturnType();

			if(returnType instanceof ParameterizedType){
			    ParameterizedType type = (ParameterizedType) returnType;
			    Type[] typeArguments = type.getActualTypeArguments();
			    for(Type typeArgument : typeArguments){
			        Class typeArgClass = (Class) typeArgument;
			        System.out.println("typeArgClass = " + typeArgClass);
			    }
			}
			
			method = TestReflection.class.getMethod("setStringList", List.class);

			Type[] genericParameterTypes = method.getGenericParameterTypes();

			for(Type genericParameterType : genericParameterTypes){
			    if(genericParameterType instanceof ParameterizedType){
			        ParameterizedType aType = (ParameterizedType) genericParameterType;
			        Type[] parameterArgTypes = aType.getActualTypeArguments();
			        for(Type parameterArgType : parameterArgTypes){
			            Class parameterArgClass = (Class) parameterArgType;
			            System.out.println("parameterArgClass = " + parameterArgClass);
			        }
			    }
			}
			
			Field fields[] =TestReflection.class.getFields();
			for (Field field : fields) {
				System.out.println("Fields name " +field.getName());
			}
			
			Field field = TestReflection.class.getField("stringList");

			Type genericFieldType = field.getGenericType();

			if(genericFieldType instanceof ParameterizedType){
			    ParameterizedType aType = (ParameterizedType) genericFieldType;
			    Type[] fieldArgTypes = aType.getActualTypeArguments();
			    for(Type fieldArgType : fieldArgTypes){
			        Class fieldArgClass = (Class) fieldArgType;
			        System.out.println("fieldArgClass = " + fieldArgClass);
			    }
			}
		} catch (NoSuchMethodException | SecurityException | NoSuchFieldException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		

	}

}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)

@interface MyAnnotation {
    public String name();
    public String value();
}