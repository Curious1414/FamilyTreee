package com.ouri.tree;

import org.aspectj.lang.*;
import org.aspectj.lang.annotation.*;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.*;
import java.lang.annotation.*;
import java.util.*;

@Aspect
@Component
public class TestDoMeAOP {
    @Autowired private Logger logger;
    
    //@Before("@annotation(LogExecution)")
    //@Before("*")
    public void loggingAdvice(JoinPoint jp) {
    	 System.out.println("Before "+logger);
    	 Config config = new Config();
    	 Logger logger = config.logger();
    	 logger.log("message");
    	 logger.log("Join Point: " + jp.toLongString());
    }
    
    public static void main(String[] args) {
        AnnotationConfigApplicationContext config = new AnnotationConfigApplicationContext();
        config.register(Config.class);
        config.refresh();
            
        NameRepository repository = config.getBean(NameRepository.class);
        System.out.println(repository.getNames());
    }
}

@Component
class NameRepository {
	
    @LogExecution
    @Pointcut("execution(public * *(..)) && @annotation(LogExecution)")
    public List<String> getNames() {
        List<String> names = new ArrayList<>();
        names.add("John");
        names.add("Mary");
        return names;
    }
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface LogExecution {}

interface Logger {
    public void log(String data);
}

@Configuration
@EnableAspectJAutoProxy
@Import({TestDoMeAOP.class, NameRepository.class})
class Config {
    @Bean
    public Logger logger() {
        return (message) -> System.out.println(message);
    }
}
