package com.ouri.tree;

import java.util.*;
import javax.persistence.*;
import org.hibernate.*;
import org.hibernate.cfg.*;
import org.hibernate.query.Query;

public class TestDoMeHibernate {
    
    public List<Animal> getAllAnimals(Session session) {
        Query query=session.createQuery("from Animal");
        return query.list();
    }
        
    @Entity(name = "Animal")
    public static class Animal {
        @Id
        public Integer id;
        @Column
        public String name;
    }
    
    public static void main(String[] args) {
        Properties prop = new Properties();
        prop.setProperty("hibernate.connection.url", "jdbc:h2:mem:db1");
        prop.setProperty("dialect", "org.hibernate.dialect.H2Dialect");
        prop.setProperty("hibernate.hbm2ddl.auto", "create");

        SessionFactory sessionFactory = new Configuration().addProperties(prop)
            .addAnnotatedClass(Animal.class).buildSessionFactory();
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        
        Animal animal = new Animal();
        animal.id = 0;
        animal.name ="Mr. Rabbit";
        
        session.save(animal);
        session.flush();
        
        TestDoMeHibernate animalDAO = new TestDoMeHibernate();
        List<Animal> animals = animalDAO.getAllAnimals(session);
        for(Animal an : animals) {
            System.out.println(an.id + " - " + an.name);
        }
    }
}
    

